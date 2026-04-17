import { describe, expect, it } from "vitest";
import { ANALOGY_KEYS, isAnalogyKey } from "@/types/project";
import { analogyTemplates, getTemplateByKey } from "@/lib/templates";

describe("Analogy Key Validation", () => {
  it("validates all known analogy keys", () => {
    expect(isAnalogyKey("irrigation")).toBe(true);
    expect(isAnalogyKey("kitchen")).toBe(true);
    expect(isAnalogyKey("construction")).toBe(true);
    expect(isAnalogyKey("greenhouse")).toBe(true);
  });

  it("rejects invalid analogy keys", () => {
    expect(isAnalogyKey("invalid")).toBe(false);
    expect(isAnalogyKey("")).toBe(false);
    expect(isAnalogyKey(null)).toBe(false);
    expect(isAnalogyKey(undefined)).toBe(false);
    expect(isAnalogyKey(123)).toBe(false);
  });

  it("matches template keys with ANALOGY_KEYS constant", () => {
    const templateKeys = analogyTemplates.map(t => t.key);
    expect(templateKeys).toEqual(ANALOGY_KEYS);
  });
});

describe("Greenhouse Template", () => {
  it("exists in analogy templates", () => {
    const greenhouse = analogyTemplates.find(t => t.key === "greenhouse");
    expect(greenhouse).toBeDefined();
    expect(greenhouse?.title).toBe("Greenhouse Growing");
  });

  it("has 5 stages", () => {
    const greenhouse = getTemplateByKey("greenhouse");
    expect(greenhouse.stages).toHaveLength(5);
  });

  it("has correct stage sequence", () => {
    const greenhouse = getTemplateByKey("greenhouse");
    expect(greenhouse.stages[0]?.id).toBe("soil-prep");
    expect(greenhouse.stages[1]?.id).toBe("seed-selection");
    expect(greenhouse.stages[2]?.id).toBe("planting");
    expect(greenhouse.stages[3]?.id).toBe("growth-nurturing");
    expect(greenhouse.stages[4]?.id).toBe("harvest");
  });

  it("has visual elements", () => {
    const greenhouse = getTemplateByKey("greenhouse");
    expect(greenhouse.visualElements.length).toBeGreaterThan(0);
    expect(greenhouse.visualElements.some(e => e.name === "Soil")).toBe(true);
    expect(greenhouse.visualElements.some(e => e.name === "Seeds")).toBe(true);
  });

  it("has quality signals", () => {
    const greenhouse = getTemplateByKey("greenhouse");
    expect(greenhouse.qualitySignals.length).toBeGreaterThan(0);
  });
});

describe("Template Consistency", () => {
  it("all templates have required fields", () => {
    analogyTemplates.forEach(template => {
      expect(template.key).toBeTruthy();
      expect(template.title).toBeTruthy();
      expect(template.shortDescription).toBeTruthy();
      expect(template.story).toBeTruthy();
      expect(template.stages.length).toBeGreaterThan(0);
      expect(template.visualElements.length).toBeGreaterThan(0);
      expect(template.qualitySignals.length).toBeGreaterThan(0);
    });
  });

  it("all stages have required fields", () => {
    analogyTemplates.forEach(template => {
      template.stages.forEach(stage => {
        expect(stage.id).toBeTruthy();
        expect(stage.visualLabel).toBeTruthy();
        expect(stage.technicalLabel).toBeTruthy();
        expect(stage.description).toBeTruthy();
      });
    });
  });

  it("all visual elements have required fields", () => {
    analogyTemplates.forEach(template => {
      template.visualElements.forEach(element => {
        expect(element.name).toBeTruthy();
        expect(element.technicalLabel).toBeTruthy();
        expect(element.explanation).toBeTruthy();
      });
    });
  });
});
