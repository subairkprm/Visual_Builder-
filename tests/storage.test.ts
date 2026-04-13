import { describe, expect, it, vi } from "vitest";
import { mergeProjectDraft, loadProjectDraft } from "@/lib/storage";
import { defaultProjectDraft } from "@/lib/templates";

describe("mergeProjectDraft", () => {
  it("returns a valid full draft verbatim", () => {
    const input = {
      projectName: "My App",
      objective: "Build something useful",
      targetUsers: "Developers",
      desiredEnvironment: "VS Code",
      analogyKey: "kitchen" as const,
      currentStage: 3,
      technicalFocus: "Planning",
      notes: "Some notes",
    };
    expect(mergeProjectDraft(input)).toEqual(input);
  });

  it("falls back missing fields to defaults when only analogyKey is provided", () => {
    const result = mergeProjectDraft({ analogyKey: "irrigation" });
    expect(result.analogyKey).toBe("irrigation");
    expect(result.projectName).toBe("");
    expect(result.objective).toBe("");
    expect(result.targetUsers).toBe("");
    expect(result.desiredEnvironment).toBe(defaultProjectDraft.desiredEnvironment);
    expect(result.technicalFocus).toBe(defaultProjectDraft.technicalFocus);
    expect(result.notes).toBe("");
  });

  it("falls back to default analogyKey when analogyKey is invalid", () => {
    const result = mergeProjectDraft({ analogyKey: "invalid" });
    expect(result.analogyKey).toBe("irrigation");
  });

  it("clamps out-of-bounds currentStage to the max valid index", () => {
    const result = mergeProjectDraft({ analogyKey: "irrigation", currentStage: 99 });
    expect(result.currentStage).toBe(6);
  });

  it("returns defaultProjectDraft for non-object inputs", () => {
    expect(mergeProjectDraft(null)).toEqual(defaultProjectDraft);
    expect(mergeProjectDraft("hello")).toEqual(defaultProjectDraft);
    expect(mergeProjectDraft(42)).toEqual(defaultProjectDraft);
  });
});

describe("loadProjectDraft", () => {
  it("returns null for corrupt JSON", () => {
    const getItemMock = vi.fn().mockReturnValue("not-json{");
    vi.stubGlobal("localStorage", { getItem: getItemMock });
    expect(loadProjectDraft()).toBeNull();
    vi.unstubAllGlobals();
  });

  it("returns null when there is no saved data", () => {
    const getItemMock = vi.fn().mockReturnValue(null);
    vi.stubGlobal("localStorage", { getItem: getItemMock });
    expect(loadProjectDraft()).toBeNull();
    vi.unstubAllGlobals();
  });
});
