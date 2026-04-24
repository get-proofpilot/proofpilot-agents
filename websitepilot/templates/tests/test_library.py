import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT))

from websitepilot.templates.library import (  # noqa: E402
    REGISTRY_PATH,
    STYLE_FAMILIES_DIR,
    TEMPLATES_DIR,
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
