import { afterEach, describe, expect, it, vi } from "vitest";
import { mergeProjectDraft, loadProjectDraft } from "@/lib/storage";
import { defaultProjectDraft } from "@/lib/templates";

describe("mergeProjectDraft", () => {
  it("returns a valid draft unchanged", () => {
    const input = {
      projectName: "Test Project",
      objective: "Test objective",
      targetUsers: "Developers",
      desiredEnvironment: "VS Code",
      analogyKey: "kitchen" as const,
      currentStage: 3,
      technicalFocus: "Backend",
      notes: "Some notes",
    };
    expect(mergeProjectDraft(input)).toEqual(input);
  });

  it("fills missing fields with defaults", () => {
    const result = mergeProjectDraft({ analogyKey: "irrigation" });
    expect(result.analogyKey).toBe("irrigation");
    expect(result.projectName).toBe("");
    expect(result.objective).toBe("");
    expect(result.targetUsers).toBe("");
    expect(result.desiredEnvironment).toBe(defaultProjectDraft.desiredEnvironment);
    expect(result.technicalFocus).toBe(defaultProjectDraft.technicalFocus);
    expect(result.notes).toBe("");
  });

  it("falls back to default analogyKey for invalid values", () => {
    const result = mergeProjectDraft({ analogyKey: "invalid" });
    expect(result.analogyKey).toBe("irrigation");
  });

  it("clamps out-of-bounds currentStage", () => {
    const result = mergeProjectDraft({ analogyKey: "irrigation", currentStage: 99 });
    expect(result.currentStage).toBe(6);
  });

  it("returns defaultProjectDraft for null", () => {
    expect(mergeProjectDraft(null)).toEqual(defaultProjectDraft);
  });

  it("returns defaultProjectDraft for a string", () => {
    expect(mergeProjectDraft("hello")).toEqual(defaultProjectDraft);
  });

  it("returns defaultProjectDraft for a number", () => {
    expect(mergeProjectDraft(42)).toEqual(defaultProjectDraft);
  });
});

describe("loadProjectDraft", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns null for corrupt JSON", () => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn().mockReturnValue("not-json{"),
    });
    expect(loadProjectDraft()).toBeNull();
  });

  it("returns null when no data is stored", () => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn().mockReturnValue(null),
    });
    expect(loadProjectDraft()).toBeNull();
  });
});
