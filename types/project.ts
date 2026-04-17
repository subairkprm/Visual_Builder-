export const ANALOGY_KEYS = ["irrigation", "kitchen", "construction", "greenhouse"] as const;
export type AnalogyKey = typeof ANALOGY_KEYS[number];

export function isAnalogyKey(value: unknown): value is AnalogyKey {
  return typeof value === "string" && ANALOGY_KEYS.includes(value as AnalogyKey);
}

export type StageStatus = "done" | "active" | "upcoming";

export interface StageDefinition {
  id: string;
  visualLabel: string;
  technicalLabel: string;
  description: string;
}

export interface StageWithStatus extends StageDefinition {
  sequence: number;
  status: StageStatus;
}

export interface VisualElement {
  name: string;
  technicalLabel: string;
  explanation: string;
}

export interface AnalogyTemplate {
  key: AnalogyKey;
  title: string;
  shortDescription: string;
  story: string;
  stages: StageDefinition[];
  visualElements: VisualElement[];
  qualitySignals: string[];
}

export interface ProjectDraft {
  projectName: string;
  objective: string;
  targetUsers: string;
  desiredEnvironment: string;
  analogyKey: AnalogyKey;
  currentStage: number;
  technicalFocus: string;
  notes: string;
}
