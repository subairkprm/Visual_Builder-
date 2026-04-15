import { describe, expect, it } from "vitest";
import { buildStageTimeline, calculateProgress, clampStageIndex, getProgressSummary } from "@/lib/project-helpers";
import { analogyTemplates, getTemplateByKey } from "@/lib/templates";

const greenhouse = getTemplateByKey("greenhouse");

describe("greenhouse template", () => {
  it("exists in the template list", () => {
    expect(analogyTemplates.find((t) => t.key === "greenhouse")).toBeDefined();
  });

  it("has exactly 5 stages", () => {
    expect(greenhouse.stages).toHaveLength(5);
  });

  it("is retrievable by key", () => {
    expect(greenhouse.key).toBe("greenhouse");
    expect(greenhouse.title).toBe("Greenhouse Garden");
  });
});

describe("stage clamping with different stage counts", () => {
  it("clamps stage 6 from a 7-stage template to max 4 for greenhouse", () => {
    // Switching from irrigation (7 stages, at stage 6) to greenhouse (5 stages)
    // Stage 6 exceeds greenhouse max (4), should clamp to 4
    const clampedIndex = clampStageIndex(6, greenhouse.stages.length);
    expect(clampedIndex).toBe(4);
  });

  it("builds a correct timeline for greenhouse at stage 2", () => {
    const timeline = buildStageTimeline(greenhouse, 2);
    expect(timeline).toHaveLength(5);
    expect(timeline[0]?.status).toBe("done");
    expect(timeline[1]?.status).toBe("done");
    expect(timeline[2]?.status).toBe("active");
    expect(timeline[3]?.status).toBe("upcoming");
    expect(timeline[4]?.status).toBe("upcoming");
  });

  it("calculates progress correctly with 5 stages", () => {
    expect(calculateProgress(0, 5)).toBe(20);
    expect(calculateProgress(2, 5)).toBe(60);
    expect(calculateProgress(4, 5)).toBe(100);
  });

  it("summarizes progress for greenhouse", () => {
    expect(getProgressSummary(greenhouse, 2)).toEqual({
      activeStage: "Core Build & Integration",
      completedCount: 2,
      upcomingCount: 2,
    });
  });
});
