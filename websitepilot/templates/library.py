"""WebsitePilot template and style-family selector.

This module makes the design-library layer usable by the pilots instead of
leaving it as docs-only context. The intended flow is:

1. Infer the best-fit style family from brand + strategy cues.
2. Select the best scaffold templates inside that family.
3. Build prompt-ready context from both the family starter code and the
   scaffold source mirrors.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
WEBSITEPILOT_DIR = ROOT / "websitepilot"
TEMPLATES_DIR = WEBSITEPILOT_DIR / "templates"
STYLE_FAMILIES_DIR = WEBSITEPILOT_DIR / "style-families"
REGISTRY_PATH = TEMPLATES_DIR / "registry.json"
STYLE_MANIFEST_PATH = STYLE_FAMILIES_DIR / "manifest.json"

DEFAULT_CONTEXT_CHAR_LIMIT = 9000


def _read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def load_registry(path: Path | None = None) -> list[dict[str, Any]]:
    data = _read_json(path or REGISTRY_PATH)
    return data.get("templates", [])


def load_style_families(path: Path | None = None) -> list[dict[str, Any]]:
    data = _read_json(path or STYLE_MANIFEST_PATH)
    return data.get("families", [])


def list_templates(status: str | None = None) -> list[dict[str, Any]]:
    templates = load_registry()
    if not status or status == "all":
        return templates
    return [template for template in templates if template.get("status") == status]


def get_template(template_id: str) -> dict[str, Any] | None:
    for template in load_registry():
        if template.get("id") == template_id:
            return template
    return None


def get_style_family(family_id: str) -> dict[str, Any] | None:
    for family in load_style_families():
        if family.get("id") == family_id:
            return family
    return None


def _normalize_text(*parts: Any) -> str:
    text = " ".join(str(part or "") for part in parts)
    text = text.lower()
    text = re.sub(r"[^a-z0-9+#]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _normalize_list(values: list[str] | tuple[str, ...] | str | None) -> list[str]:
    if values is None:
        return []
    if isinstance(values, str):
        values = [values]
    return [_normalize_text(value) for value in values if _normalize_text(value)]


def _term_matches(blob: str, terms: list[str]) -> tuple[int, list[str]]:
    matches: list[str] = []
    score = 0
    for term in terms:
        normalized = _normalize_text(term)
        if normalized and normalized in blob:
            matches.append(term)
            score += 1
    return score, matches


def _load_summary(source_slug: str) -> dict[str, Any]:
    summary_path = TEMPLATES_DIR / "sources" / source_slug / "summary.json"
    if not summary_path.exists():
        return {}
    return _read_json(summary_path)


def _excerpt_file(path: Path, max_chars: int = 1200) -> str:
    if not path.exists():
        return "(missing)"
    text = path.read_text(encoding="utf-8", errors="ignore").strip()
    if len(text) <= max_chars:
        return text
    clipped = text[:max_chars].rstrip()
    last_newline = clipped.rfind("\n")
    if last_newline > 400:
        clipped = clipped[:last_newline].rstrip()
    return f"{clipped}\n..."


def _coerce_override_ids(override: str | list[str] | tuple[str, ...] | None) -> list[str]:
    if override is None:
        return []
    if isinstance(override, str):
        raw = override.split(",")
    else:
        raw = list(override)
    return [item.strip() for item in raw if item.strip()]


def _match_metadata_value(candidate: str | None, allowed: list[str]) -> bool:
    if not candidate:
        return False
    return _normalize_text(candidate) in {_normalize_text(value) for value in allowed}


def _score_style_family(
    family: dict[str, Any],
    *,
    page_type: str = "",
    service: str = "",
    keyword: str = "",
    location: str = "",
    notes: str = "",
    brand_maturity: str | None = None,
    proof_density: str | None = None,
    price_point: str | None = None,
    service_model: str | None = None,
    visual_temperament: list[str] | tuple[str, ...] | str | None = None,
) -> tuple[int, list[str]]:
    blob = _normalize_text(page_type, service, keyword, location, notes)
    score = 0
    reasons: list[str] = []

    term_score, term_matches = _term_matches(blob, family.get("selection_terms", []))
    if term_score:
        score += term_score * 5
        reasons.append(f"selection terms matched: {', '.join(term_matches[:5])}")

    anti_score, anti_matches = _term_matches(blob, family.get("anti_fit_terms", []))
    if anti_score:
        score -= anti_score * 6
        reasons.append(f"anti-fit terms matched: {', '.join(anti_matches[:3])}")

    if _match_metadata_value(brand_maturity, family.get("brand_maturity_fit", [])):
        score += 6
        reasons.append(f"brand maturity fits: {brand_maturity}")

    if _match_metadata_value(proof_density, family.get("proof_asset_requirements", [])):
        score += 6
        reasons.append(f"proof profile fits: {proof_density}")

    if _match_metadata_value(price_point, family.get("price_point_fit", [])):
        score += 5
        reasons.append(f"price point fits: {price_point}")

    if _match_metadata_value(service_model, family.get("service_model_fit", [])):
        score += 7
        reasons.append(f"service model fits: {service_model}")

    visual_terms = _normalize_list(visual_temperament)
    matched_visuals = [
        temperament
        for temperament in family.get("visual_temperament", [])
        if _normalize_text(temperament) in visual_terms or _normalize_text(temperament) in blob
    ]
    if matched_visuals:
        score += len(matched_visuals) * 4
        reasons.append(f"visual temperament fits: {', '.join(matched_visuals[:4])}")

    if page_type and page_type.lower() == "homepage":
        score += 2

    return score, reasons


def infer_style_families(
    *,
    page_type: str = "",
    service: str = "",
    keyword: str = "",
    location: str = "",
    notes: str = "",
    brand_maturity: str | None = None,
    proof_density: str | None = None,
    price_point: str | None = None,
    service_model: str | None = None,
    visual_temperament: list[str] | tuple[str, ...] | str | None = None,
    override: str | None = None,
    limit: int = 2,
) -> list[dict[str, Any]]:
    families = load_style_families()
    override_ids = _coerce_override_ids(override)

    if override_ids:
        ordered: list[dict[str, Any]] = []
        by_id = {family["id"]: family for family in families}
        for family_id in override_ids:
            family = by_id.get(family_id)
            if family:
                enriched = dict(family)
                enriched["score"] = 999
                enriched["reasons"] = ["manual override"]
                ordered.append(enriched)
        return ordered[:limit]

    ranked: list[tuple[int, dict[str, Any]]] = []
    for order, family in enumerate(families):
        score, reasons = _score_style_family(
            family,
            page_type=page_type,
            service=service,
            keyword=keyword,
            location=location,
            notes=notes,
            brand_maturity=brand_maturity,
            proof_density=proof_density,
            price_point=price_point,
            service_model=service_model,
            visual_temperament=visual_temperament,
        )
        enriched = dict(family)
        enriched["score"] = score
        enriched["reasons"] = reasons
        ranked.append((order, enriched))

    ranked.sort(key=lambda item: (-item[1].get("score", 0), item[0]))
    return [family for _, family in ranked[:limit]]


def infer_style_family(**kwargs: Any) -> dict[str, Any] | None:
    families = infer_style_families(limit=1, **kwargs)
    return families[0] if families else None


def _template_matches_family(template: dict[str, Any], family_id: str | None) -> bool:
    if not family_id:
        return True
    if template.get("style_family") == family_id:
        return True
    return family_id in template.get("secondary_style_families", [])


def _score_template(
    template: dict[str, Any],
    *,
    page_type: str = "",
    service: str = "",
    keyword: str = "",
    location: str = "",
    notes: str = "",
    style_family_id: str | None = None,
    default_template_ids: list[str] | None = None,
) -> tuple[int, list[str]]:
    blob = _normalize_text(page_type, service, keyword, location, notes)
    score = 0
    reasons: list[str] = []

    if page_type and page_type in template.get("page_types", []):
        score += 12
        reasons.append(f"supports page type: {page_type}")

    term_score, term_matches = _term_matches(blob, template.get("selection_terms", []))
    if term_score:
        score += term_score * 4
        reasons.append(f"selection terms matched: {', '.join(term_matches[:5])}")

    if style_family_id and template.get("style_family") == style_family_id:
        score += 10
        reasons.append(f"native scaffold for family: {style_family_id}")
    elif style_family_id and style_family_id in template.get("secondary_style_families", []):
        score += 5
        reasons.append(f"bridge scaffold for family: {style_family_id}")

    default_template_ids = default_template_ids or []
    if template.get("id") in default_template_ids:
        priority_bonus = max(1, 4 - default_template_ids.index(template["id"]))
        score += priority_bonus
        reasons.append(f"family default priority: +{priority_bonus}")

    if template.get("status") == "proven-recipe":
        score += 2
        reasons.append("proven recipe")

    return score, reasons


def select_templates(
    *,
    page_type: str = "",
    service: str = "",
    keyword: str = "",
    location: str = "",
    notes: str = "",
    style_family_id: str | None = None,
    override: str | list[str] | tuple[str, ...] | None = None,
    limit: int = 2,
) -> list[dict[str, Any]]:
    templates = load_registry()
    override_ids = _coerce_override_ids(override)

    if override_ids:
        by_id = {template["id"]: template for template in templates}
        picked: list[dict[str, Any]] = []
        for template_id in override_ids:
            template = by_id.get(template_id)
            if not template:
                continue
            enriched = dict(template)
            enriched["score"] = 999
            enriched["reasons"] = ["manual override"]
            picked.append(enriched)
        return picked[:limit]

    eligible = [template for template in templates if template.get("status") in {"ready", "proven-recipe"}]
    family_filtered = [template for template in eligible if _template_matches_family(template, style_family_id)]
    pool = family_filtered or eligible

    family = get_style_family(style_family_id) if style_family_id else None
    default_template_ids = family.get("default_template_ids", []) if family else []

    ranked: list[tuple[int, dict[str, Any]]] = []
    for order, template in enumerate(pool):
        score, reasons = _score_template(
            template,
            page_type=page_type,
            service=service,
            keyword=keyword,
            location=location,
            notes=notes,
            style_family_id=style_family_id,
            default_template_ids=default_template_ids,
        )
        enriched = dict(template)
        enriched["score"] = score
        enriched["reasons"] = reasons
        ranked.append((order, enriched))

    ranked.sort(key=lambda item: (-item[1].get("score", 0), item[0]))
    return [template for _, template in ranked[:limit]]


def _render_file_block(label: str, path: Path, max_chars: int) -> str:
    rel_path = path.relative_to(ROOT)
    body = _excerpt_file(path, max_chars=max_chars)
    return f"{label}: {rel_path}\n```{'tsx' if path.suffix == '.tsx' else 'css' if path.suffix == '.css' else 'md'}\n{body}\n```"


def build_style_family_context(
    families: list[dict[str, Any]] | None = None,
    *,
    max_chars: int = 5000,
) -> str:
    families = families or []
    if not families:
        return ""

    chunks: list[str] = ["STYLE FAMILY CONTEXT"]
    remaining = max_chars
    per_file_budget = 1200

    for family in families:
        lines = [
            f"Family: {family['name']} ({family['id']})",
            f"Description: {family.get('description', '')}",
            f"Why it fit: {'; '.join(family.get('reasons', [])) or 'highest scorer'}",
            f"Visual temperament: {', '.join(family.get('visual_temperament', []))}",
            f"Service model fit: {', '.join(family.get('service_model_fit', []))}",
            f"Default scaffolds: {', '.join(family.get('default_template_ids', [])) or 'use best-fit bridge scaffold'}",
        ]
        chunks.append("\n".join(lines))
        remaining -= len(chunks[-1])
        if remaining <= 0:
            break

        for starter_file in family.get("starter_files", []):
            path = ROOT / starter_file
            block = _render_file_block("Starter reference", path, min(per_file_budget, max(500, remaining)))
            if len(block) > remaining:
                break
            chunks.append(block)
            remaining -= len(block)
            if remaining <= 0:
                break

    return "\n\n".join(chunks)[:max_chars].rstrip()


def build_template_context(
    templates: list[dict[str, Any]] | None = None,
    *,
    max_chars: int = DEFAULT_CONTEXT_CHAR_LIMIT,
    include_source_excerpts: bool = True,
) -> str:
    templates = templates or []
    if not templates:
        return ""

    chunks: list[str] = ["TEMPLATE CONTEXT"]
    remaining = max_chars

    for template in templates:
        summary = _load_summary(template["source_slug"])
        header_lines = [
            f"Template: {template['name']} ({template['id']})",
            f"Family: {template.get('style_family', 'unassigned')}",
            f"Source slug: {template.get('source_slug')}",
            f"Why it fit: {'; '.join(template.get('reasons', [])) or template.get('best_for', '')}",
            f"Best for: {template.get('best_for', '')}",
            f"Prompt focus: {template.get('prompt_focus', '')}",
            f"Style traits: {', '.join(template.get('style_traits', []))}",
        ]
        if summary.get("component_order"):
            header_lines.append(f"Component order: {', '.join(summary['component_order'])}")
        header_block = "\n".join(header_lines)
        if len(header_block) > remaining:
            break
        chunks.append(header_block)
        remaining -= len(header_block)
        if remaining <= 0:
            break

        if not include_source_excerpts:
            continue

        source_dir = TEMPLATES_DIR / "sources" / template["source_slug"]
        excerpt_targets = [
            ("Scaffold CSS", source_dir / "src" / "index.css"),
            ("Scaffold homepage", source_dir / "src" / "pages" / "Index.tsx"),
        ]
        for label, path in excerpt_targets:
            block = _render_file_block(label, path, max_chars=min(1400, max(600, remaining)))
            if len(block) > remaining:
                break
            chunks.append(block)
            remaining -= len(block)
            if remaining <= 0:
                break

    return "\n\n".join(chunks)[:max_chars].rstrip()


def recommend_design_system(
    *,
    page_type: str = "",
    service: str = "",
    keyword: str = "",
    location: str = "",
    notes: str = "",
    brand_maturity: str | None = None,
    proof_density: str | None = None,
    price_point: str | None = None,
    service_model: str | None = None,
    visual_temperament: list[str] | tuple[str, ...] | str | None = None,
    style_family_override: str | None = None,
    template_override: str | list[str] | tuple[str, ...] | None = None,
    limit: int = 2,
) -> dict[str, Any]:
    families = infer_style_families(
        page_type=page_type,
        service=service,
        keyword=keyword,
        location=location,
        notes=notes,
        brand_maturity=brand_maturity,
        proof_density=proof_density,
        price_point=price_point,
        service_model=service_model,
        visual_temperament=visual_temperament,
        override=style_family_override,
        limit=limit,
    )
    lead_family = families[0] if families else None
    templates = select_templates(
        page_type=page_type,
        service=service,
        keyword=keyword,
        location=location,
        notes=notes,
        style_family_id=lead_family.get("id") if lead_family else None,
        override=template_override,
        limit=limit,
    )
    return {
        "style_families": families,
        "templates": templates,
        "style_family_context": build_style_family_context(families),
        "template_context": build_template_context(templates),
    }


def _build_cli_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="WebsitePilot style-family and template selector")
    parser.add_argument("--page-type", default="homepage")
    parser.add_argument("--service", default="")
    parser.add_argument("--keyword", default="")
    parser.add_argument("--location", default="")
    parser.add_argument("--notes", default="")
    parser.add_argument("--brand-maturity", default=None)
    parser.add_argument("--proof-density", default=None)
    parser.add_argument("--price-point", default=None)
    parser.add_argument("--service-model", default=None)
    parser.add_argument("--visual-temperament", action="append", default=[])
    parser.add_argument("--style-family", default=None)
    parser.add_argument("--design-template", default=None)
    parser.add_argument("--limit", type=int, default=2)
    parser.add_argument("--json", action="store_true")
    return parser


def _render_cli_text(recommendation: dict[str, Any]) -> str:
    families = recommendation.get("style_families", [])
    templates = recommendation.get("templates", [])
    lines = ["WebsitePilot design-system recommendation"]

    if families:
        lines.append("")
        lines.append("Style families:")
        for family in families:
            lines.append(
                f"- {family['name']} ({family['id']}) score={family.get('score', 0)}"
            )
            if family.get("reasons"):
                lines.append(f"  reasons: {', '.join(family['reasons'])}")

    if templates:
        lines.append("")
        lines.append("Templates:")
        for template in templates:
            lines.append(
                f"- {template['name']} ({template['id']}) score={template.get('score', 0)}"
            )
            if template.get("reasons"):
                lines.append(f"  reasons: {', '.join(template['reasons'])}")

    lines.append("")
    lines.append(recommendation.get("style_family_context", ""))
    lines.append("")
    lines.append(recommendation.get("template_context", ""))
    return "\n".join(line for line in lines if line is not None).strip()


def main() -> int:
    parser = _build_cli_parser()
    args = parser.parse_args()
    recommendation = recommend_design_system(
        page_type=args.page_type,
        service=args.service,
        keyword=args.keyword,
        location=args.location,
        notes=args.notes,
        brand_maturity=args.brand_maturity,
        proof_density=args.proof_density,
        price_point=args.price_point,
        service_model=args.service_model,
        visual_temperament=args.visual_temperament,
        style_family_override=args.style_family,
        template_override=args.design_template,
        limit=args.limit,
    )

    if args.json:
        print(json.dumps(recommendation, indent=2))
    else:
        print(_render_cli_text(recommendation))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
