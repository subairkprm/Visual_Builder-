import { describe, expect, it } from "vitest";
import { buildStageTimeline, calculateProgress, clampStageIndex, getProgressSummary } from "@/lib/project-helpers";
import { analogyTemplates } from "@/lib/templates";

const irrigation = analogyTemplates[0];

describe("project helper utilities", () => {
  it("clamps stage indexes into a safe range", () => {
    expect(clampStageIndex(-4, 7)).toBe(0);
    expect(clampStageIndex(2, 7)).toBe(2);
    expect(clampStageIndex(99, 7)).toBe(6);
  });

  it("builds a timeline with done, active, and upcoming stages", () => {
    const timeline = buildStageTimeline(irrigation, 2);
    expect(timeline[0]?.status).toBe("done");
    expect(timeline[1]?.status).toBe("done");
    expect(timeline[2]?.status).toBe("active");
    expect(timeline[3]?.status).toBe("upcoming");
  });

  it("calculates a percentage based on the active stage", () => {
    expect(calculateProgress(0, 7)).toBe(14);
    expect(calculateProgress(2, 7)).toBe(43);
    expect(calculateProgress(6, 7)).toBe(100);
  });

  it("summarizes the current progress state", () => {
    expect(getProgressSummary(irrigation, 2)).toEqual({
      activeStage: "Structure Setup",
      completedCount: 2,
      upcomingCount: 4,
    });
  });
});
