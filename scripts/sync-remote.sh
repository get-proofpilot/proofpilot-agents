#!/usr/bin/env bash
# sync-remote.sh — pull any client subpaths currently live on
# demo.proofpilotapps.com into the local meta-dist, so a deploy from THIS
# operator doesn't wipe another operator's work.
#
# The problem: every deploy uploads the ENTIRE meta-dist tree to the main
# branch as a single snapshot. If operator A deploys and their local meta-dist
# only has clients {X, Y}, all of operator B's clients get removed from live.
#
# The fix: before any deploy, call this script. It reads the landing index at
# demo.proofpilotapps.com/, finds every registered subpath, and mirrors any
# missing ones into the local meta-dist via a headless-browser scrape of
# each page (HTML + all resource URLs observed by the browser).
#
# Usage:
#   scripts/sync-remote.sh [--meta <dir>] [--domain <host>]
#
# Example:
#   scripts/sync-remote.sh
#   scripts/sync-remote.sh --meta /custom/path --domain demo.example.com

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[[ -f "$SCRIPT_DIR/proofpilot-env.sh" ]] && . "$SCRIPT_DIR/proofpilot-env.sh"

META_DIST="${PROOFPILOT_META_DIST:-$HOME/.proofpilot/meta-dist}"
DOMAIN="demo.proofpilotapps.com"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --meta)    META_DIST="$2"; shift 2 ;;
    --domain)  DOMAIN="$2"; shift 2 ;;
    -h|--help) sed -n '2,20p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *)         echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

command -v curl >/dev/null 2>&1 || { echo "error: curl required" >&2; exit 2; }
command -v node >/dev/null 2>&1 || { echo "error: node required" >&2; exit 2; }
command -v npx >/dev/null 2>&1 || { echo "error: npx required" >&2; exit 2; }

mkdir -p "$META_DIST"
echo "┌─ sync-remote"
echo "│  domain:   https://$DOMAIN/"
echo "│  meta:     $META_DIST"
echo "└─"

# 1. Fetch the live landing index, extract all subpath slugs
INDEX_HTML="$(curl -sL --max-time 15 "https://$DOMAIN/")"
LIVE_SLUGS="$(echo "$INDEX_HTML" | grep -oE 'href="/[^/"]+/"' | sed 's|href="/||;s|/"||' | sort -u)"

if [[ -z "$LIVE_SLUGS" ]]; then
  echo "  no live subpaths found — either the landing page is missing or the index format changed."
  echo "  (this is fine on a fresh account; nothing to sync)"
  exit 0
fi

echo ""
echo "live subpaths on $DOMAIN:"
echo "$LIVE_SLUGS" | sed 's|^|  /|;s|$|/|'

# 2. For each slug not in local meta-dist, scrape it
SYNC_TMP="$(mktemp -d)"
cat > "$SYNC_TMP/scrape.mjs" <<'JSEOF'
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const [slug, outDir, domain] = process.argv.slice(2);
const baseUrl = `https://${domain}/${slug}/`;

const download = (url, dest) => new Promise((resolve, reject) => {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const file = fs.createWriteStream(dest);
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      file.close();
      fs.unlinkSync(dest);
      download(res.headers.location, dest).then(resolve, reject);
      return;
    }
    if (res.statusCode !== 200) {
      file.close();
      try { fs.unlinkSync(dest); } catch {}
      return resolve(false);
    }
    res.pipe(file);
    file.on('finish', () => file.close(() => resolve(true)));
  }).on('error', (e) => {
    file.close();
    try { fs.unlinkSync(dest); } catch {}
    reject(e);
  });
});

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const urls = new Set();
  page.on('requestfinished', (req) => {
    const u = req.url();
    if (u.startsWith(`https://${domain}/`)) urls.add(u);
  });
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
  // Scroll to force lazy-loaded assets + reveals
  await page.evaluate(async () => {
    document.querySelectorAll('.reveal, [class*="reveal"]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
  // Collect DOM srcs too
  const domUrls = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('img[src], link[href], script[src], source[src], video[src]').forEach(el => {
      out.push(el.src || el.href);
    });
    return out;
  });
  domUrls.forEach(u => { if (u && u.startsWith(`https://${domain}/`)) urls.add(u); });
  await browser.close();

  // Save every url into outDir preserving its path
  const urlList = [...urls].filter(u => !u.startsWith(`https://${domain}/#`));
  let ok = 0, fail = 0;
  for (const u of urlList) {
    const p = new URL(u).pathname;
    // Path-strip the slug prefix since we write into <outDir> which IS the slug dir
    const stripped = p.startsWith(`/${slug}/`) ? p.substring(slug.length + 2) : p.substring(1);
    const dest = path.join(outDir, stripped || 'index.html');
    try {
      const gotten = await download(u, dest);
      if (gotten) ok++; else fail++;
    } catch (e) { fail++; }
  }
  // Also explicitly fetch index.html (some frameworks don't request it as a network resource on SPA hydration)
  await download(baseUrl, path.join(outDir, 'index.html'));
  console.log(JSON.stringify({ slug, urls: urlList.length, ok, fail }));
})().catch(e => { console.error(e.message); process.exit(1); });
JSEOF

# Install playwright once at the sync tmp dir
cd "$SYNC_TMP"
if [[ ! -d node_modules/playwright ]]; then
  echo ""
  echo "installing playwright (first-run)..."
  npm init -y >/dev/null 2>&1 || true
  npm i playwright --silent >/dev/null 2>&1 || true
  npx playwright install chromium >/dev/null 2>&1 || true
fi

SYNCED=0
SKIPPED=0
for slug in $LIVE_SLUGS; do
  if [[ -d "$META_DIST/$slug" ]]; then
    SKIPPED=$((SKIPPED+1))
    continue
  fi
  echo ""
  echo "syncing /$slug/ ..."
  mkdir -p "$META_DIST/$slug"
  node "$SYNC_TMP/scrape.mjs" "$slug" "$META_DIST/$slug" "$DOMAIN" 2>&1 | tail -2
  SYNCED=$((SYNCED+1))
done

rm -rf "$SYNC_TMP"

echo ""
echo "┌─ sync-remote complete"
echo "│  synced:  $SYNCED new slugs"
echo "│  skipped: $SKIPPED already in local meta-dist"
echo "│  total:   $(ls "$META_DIST" | grep -v '^index.html$' | wc -l | tr -d ' ') clients in meta-dist now"
echo "└─"
