import type { AnalogyTemplate, StageWithStatus } from "@/types/project";

export function clampStageIndex(index: number, total: number) {
  if (!Number.isFinite(index)) {
    return 0;
  }

  return Math.min(Math.max(Math.trunc(index), 0), Math.max(total - 1, 0));
}

export function buildStageTimeline(
  template: AnalogyTemplate,
  currentStage: number,
): StageWithStatus[] {
  const safeIndex = clampStageIndex(currentStage, template.stages.length);

  return template.stages.map((stage, index) => ({
    ...stage,
    sequence: index + 1,
    status:
      index < safeIndex ? "done" : index === safeIndex ? "active" : "upcoming",
  }));
}

export function calculateProgress(currentStage: number, totalStages: number) {
  const safeIndex = clampStageIndex(currentStage, totalStages);

  if (totalStages === 0) {
    return 0;
  }

  return Math.round(((safeIndex + 1) / totalStages) * 100);
}

export function getProgressSummary(template: AnalogyTemplate, currentStage: number) {
  const safeIndex = clampStageIndex(currentStage, template.stages.length);

  return {
    activeStage: template.stages[safeIndex]?.technicalLabel ?? "Not started",
    completedCount: safeIndex,
    upcomingCount: Math.max(template.stages.length - safeIndex - 1, 0),
  };
}
