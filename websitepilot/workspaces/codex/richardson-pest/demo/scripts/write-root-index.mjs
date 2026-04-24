import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");

await mkdir(distDir, { recursive: true });

await writeFile(
  join(distDir, "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>ProofPilot - Demo Index</title>
    <style>
      body {
        max-width: 720px;
        margin: 0;
        padding: 60px 32px;
        background: #0a0a0a;
        color: #f0f0f0;
        font-family: -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif;
        line-height: 1.5;
      }

      @media (min-width: 784px) {
        body {
          margin: 60px auto;
        }
      }

      h1 {
        margin: 0 0 8px;
        font-size: clamp(40px, 8vw, 48px);
        font-weight: 900;
        letter-spacing: -0.02em;
      }

      p {
        margin: 0 0 32px;
        color: #a0a0a0;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      li {
        margin: 0 0 12px;
      }

      a {
        display: flex;
        align-items: center;
        gap: 16px;
        border: 1px solid #222;
        border-radius: 4px;
        padding: 16px 20px;
        color: #f0c000;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.15s, border-color 0.15s;
      }

      a:hover {
        border-color: #f0c000;
        background: #111;
      }

      .slug {
        min-width: 220px;
        color: #f0f0f0;
        font-size: 18px;
      }

      .tag {
        color: #a0a0a0;
        font-size: 13px;
        font-weight: 400;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>ProofPilot Demos</h1>
      <p>Live client previews. Each link below is a standalone build.</p>
      <ul>
        <li>
          <a href="/richardson-pest/">
            <span class="slug">/richardson-pest</span>
            <span class="tag">Richardson Pest Management | Same-Day East Valley Pest Control</span>
          </a>
        </li>
      </ul>
    </main>
  </body>
</html>
`,
);

await writeFile(
  join(distDir, "_headers"),
  `/*
  X-Robots-Tag: noindex
  X-Content-Type-Options: nosniff
`,
);

await writeFile(
  join(distDir, "_redirects"),
  `/richardson-pest /richardson-pest/ 301
/richardson-pest-management /richardson-pest/ 301
/richardson-pest-management/ /richardson-pest/ 301
`,
);
