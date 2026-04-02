export type AnalogyKey = "irrigation" | "kitchen" | "construction";

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
