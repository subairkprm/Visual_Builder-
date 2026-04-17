import { defaultProjectDraft, getTemplateByKey } from "@/lib/templates";
import type { ProjectDraft } from "@/types/project";
import { isAnalogyKey } from "@/types/project";

const STORAGE_KEY = "visual-builder.project-draft";

export function mergeProjectDraft(raw: unknown): ProjectDraft {
  if (!raw || typeof raw !== "object") {
    return defaultProjectDraft;
  }

  const candidate = raw as Partial<ProjectDraft>;
  const analogyKey = isAnalogyKey(candidate.analogyKey)
    ? candidate.analogyKey
    : defaultProjectDraft.analogyKey;
  const stageCount = getTemplateByKey(analogyKey).stages.length;
  const currentStage =
    typeof candidate.currentStage === "number"
      ? Math.min(Math.max(Math.trunc(candidate.currentStage), 0), stageCount - 1)
      : defaultProjectDraft.currentStage;

  return {
    projectName: typeof candidate.projectName === "string" ? candidate.projectName : "",
    objective: typeof candidate.objective === "string" ? candidate.objective : "",
    targetUsers: typeof candidate.targetUsers === "string" ? candidate.targetUsers : "",
    desiredEnvironment:
      typeof candidate.desiredEnvironment === "string"
        ? candidate.desiredEnvironment
        : defaultProjectDraft.desiredEnvironment,
    analogyKey,
    currentStage,
    technicalFocus:
      typeof candidate.technicalFocus === "string"
        ? candidate.technicalFocus
        : defaultProjectDraft.technicalFocus,
    notes: typeof candidate.notes === "string" ? candidate.notes : "",
  };
}

export function loadProjectDraft() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return mergeProjectDraft(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveProjectDraft(draft: ProjectDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function clearProjectDraft() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
