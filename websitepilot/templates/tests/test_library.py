import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT))

from websitepilot.templates.library import (  # noqa: E402
    REGISTRY_PATH,
    STYLE_FAMILIES_DIR,
    TEMPLATES_DIR,
    derive_brand_customization,
    load_registry,
    load_style_families,
    recommend_design_system,
)


class DesignSystemSelectorTests(unittest.TestCase):
    def test_pest_control_maps_to_heroic_family(self) -> None:
        result = recommend_design_system(
            page_type="homepage",
            service="pest control",
            notes="family-owned scorpion shield bold urgent local service",
            brand_maturity="partial-anchor",
            proof_density="moderate",
            price_point="upper-mid",
            service_model="urgent one-off",
            visual_temperament=["bold", "character-led"],
        )

        self.assertEqual(result["style_families"][0]["id"], "heroic-branded-conversion")
        self.assertEqual(result["templates"][0]["id"], "rockin-family-home-service")

    def test_luxury_landscaping_maps_to_native_premium_scaffold(self) -> None:
        result = recommend_design_system(
            page_type="homepage",
            service="luxury landscaping",
            notes="architectural outdoor living project gallery premium design build",
            brand_maturity="preserve+elevate",
            proof_density="rich",
            price_point="premium",
            service_model="design-build project",
            visual_temperament=["editorial", "restrained"],
        )

        self.assertEqual(result["style_families"][0]["id"], "premium-outdoor-editorial")
        self.assertEqual(result["templates"][0]["id"], "premium-outdoor-editorial-showcase")

    def test_pool_maintenance_maps_to_recurring_service(self) -> None:
        result = recommend_design_system(
            page_type="homepage",
            service="pool maintenance",
            notes="weekly service recurring care friendly homeowner",
            brand_maturity="partial-anchor",
            proof_density="moderate",
            price_point="upper-mid",
            service_model="recurring plan",
            visual_temperament=["clean", "bright"],
        )

        self.assertEqual(result["style_families"][0]["id"], "clean-recurring-service")
        self.assertEqual(result["templates"][0]["id"], "proactive-clean-cyan")

    def test_quiet_brand_gets_restrained_readable_system_not_bold_default(self) -> None:
        result = recommend_design_system(
            page_type="homepage",
            service="home cleaning",
            notes="quiet logo simple thin wordmark calm trustworthy residential service",
            brand_maturity="partial-anchor",
            proof_density="moderate",
            price_point="mid",
            service_model="friendly operator",
            visual_temperament=["quiet", "minimal", "calm"],
            brand_cues="thin wordmark, simple leaf icon, soft muted green, quiet local service brand",
        )

        customization = result["brand_customization"]
        self.assertEqual(customization["typography_strategy"], "restrained-humanist-sans")
        self.assertIn("Inter", customization["font_pairing"])
        self.assertEqual(customization["corner_treatment"], "soft-moderate")
        self.assertNotIn("serif", customization["body_copy_rule"].lower())
        self.assertIn("Brand Customization Guardrails", result["brand_customization_context"])

    def test_bold_mascot_brand_gets_hard_edged_expressive_system(self) -> None:
        customization = derive_brand_customization(
            style_family_id="heroic-branded-conversion",
            service="pest control",
            notes="bold mascot shield urgent exterminator",
            visual_temperament=["bold", "character-led", "high-contrast"],
            brand_cues="heavy block combo mark with scorpion mascot, black and amber shield logo, aggressive local service",
        )

        self.assertEqual(customization["typography_strategy"], "expressive-bold-sans")
        self.assertIn("display", customization["font_pairing"].lower())
        self.assertEqual(customization["corner_treatment"], "hard-or-angular")
        self.assertEqual(customization["motif_intensity"], "high")
        self.assertIn("avoid soft generic rounded-card defaults", customization["anti_sameness_checks"])

    def test_serif_is_only_allowed_when_premium_editorial_cues_fit(self) -> None:
        cleaning = derive_brand_customization(
            style_family_id="clean-recurring-service",
            service="pool maintenance",
            notes="friendly weekly recurring care",
            visual_temperament=["clean", "bright"],
            brand_cues="simple blue water icon, modern sans wordmark",
        )
        premium = derive_brand_customization(
            style_family_id="premium-outdoor-editorial",
            service="luxury landscaping",
            notes="estate garden editorial gallery design build",
            visual_temperament=["editorial", "restrained", "luxury"],
            brand_cues="elegant wordmark, high-end estate landscape photography, refined serif-like logo",
        )

        self.assertNotEqual(cleaning["typography_strategy"], "restrained-serif-accent")
        self.assertEqual(premium["typography_strategy"], "restrained-serif-accent")
        self.assertIn("serif only for display accents", premium["body_copy_rule"].lower())

    def test_registry_and_manifest_paths_exist(self) -> None:
        self.assertTrue(REGISTRY_PATH.exists())

        templates = load_registry()
        families = load_style_families()
        template_ids = {template["id"] for template in templates}

        for family in families:
            for starter_file in family.get("starter_files", []):
                self.assertTrue((ROOT / starter_file).exists(), starter_file)
            for template_id in family.get("default_template_ids", []):
                self.assertIn(template_id, template_ids)

        for template in templates:
            source_dir = TEMPLATES_DIR / "sources" / template["source_slug"]
            self.assertTrue(source_dir.exists(), template["source_slug"])
            self.assertTrue((source_dir / "summary.json").exists(), template["source_slug"])

        self.assertTrue(STYLE_FAMILIES_DIR.exists())


if __name__ == "__main__":
    unittest.main()
