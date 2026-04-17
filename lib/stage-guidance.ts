import type { AnalogyTemplate } from "@/types/project";

interface StageGuidance {
  currentStageAdvice: string;
  successCriteria: string[];
  commonPitfalls: string[];
  nextSteps: string[];
}

export function getStageGuidance(
  template: AnalogyTemplate,
  currentStageIndex: number
): StageGuidance {
  const currentStage = template.stages[currentStageIndex];
  const nextStage = template.stages[currentStageIndex + 1];
  const isFirstStage = currentStageIndex === 0;
  const isLastStage = currentStageIndex === template.stages.length - 1;

  const baseAdvice: Record<string, Partial<StageGuidance>> = {
    "need-definition": {
      successCriteria: [
        "Problem is clearly defined",
        "Target users are identified",
        "Success metrics are established",
        "Constraints are documented",
      ],
      commonPitfalls: [
        "Starting implementation too early",
        "Skipping user research",
        "Unclear success criteria",
      ],
    },
    "system-planning": {
      successCriteria: [
        "Technology stack is chosen",
        "Architecture is outlined",
        "Dependencies are identified",
        "Development approach is clear",
      ],
      commonPitfalls: [
        "Over-engineering early decisions",
        "Ignoring technical constraints",
        "Missing critical dependencies",
      ],
    },
    "structure-setup": {
      successCriteria: [
        "Project scaffold is complete",
        "Core dependencies are installed",
        "Development environment works",
        "Basic CI/CD is configured",
      ],
      commonPitfalls: [
        "Weak foundation choices",
        "Skipping automation setup",
        "Poor project organization",
      ],
    },
    "flow-connection": {
      successCriteria: [
        "Components communicate correctly",
        "Data flows are validated",
        "Integration points work",
        "Security is considered",
      ],
      commonPitfalls: [
        "Tight coupling between modules",
        "Missing error handling",
        "Ignoring security early",
      ],
    },
    "core-build": {
      successCriteria: [
        "Main features are functional",
        "User workflows complete end-to-end",
        "Core business logic is tested",
        "Performance is acceptable",
      ],
      commonPitfalls: [
        "Building too many features",
        "Skipping tests for speed",
        "Ignoring technical debt",
      ],
    },
    "testing-quality": {
      successCriteria: [
        "Test coverage is adequate",
        "Known bugs are fixed",
        "Performance is measured",
        "Security is reviewed",
      ],
      commonPitfalls: [
        "Insufficient test coverage",
        "Only testing happy paths",
        "Ignoring edge cases",
      ],
    },
    "live-delivery": {
      successCriteria: [
        "Deployment is automated",
        "Monitoring is active",
        "Rollback plan exists",
        "Documentation is complete",
      ],
      commonPitfalls: [
        "Manual deployment steps",
        "No rollback strategy",
        "Missing observability",
      ],
    },
  };

  const stageAdvice = baseAdvice[currentStage?.id || ""] || {};

  let currentStageAdvice = currentStage?.description || "";
  if (isFirstStage) {
    currentStageAdvice += " Take time to understand the problem deeply before jumping into solutions.";
  } else if (isLastStage) {
    currentStageAdvice += " Ensure everything is tested and ready before shipping to users.";
  }

  const nextSteps: string[] = [];
  if (nextStage) {
    nextSteps.push(`Prepare for: ${nextStage.technicalLabel}`);
    nextSteps.push(`Review ${template.qualitySignals[0] || "quality signals"}`);
    nextSteps.push("Document decisions made in this stage");
  } else {
    nextSteps.push("Conduct final quality review");
    nextSteps.push("Prepare deployment checklist");
    nextSteps.push("Plan post-launch monitoring");
  }

  return {
    currentStageAdvice,
    successCriteria: stageAdvice.successCriteria || [
      "Stage objectives are clear",
      "Required work is identified",
      "Dependencies are managed",
      "Quality is maintained",
    ],
    commonPitfalls: stageAdvice.commonPitfalls || [
      "Rushing through important steps",
      "Skipping documentation",
      "Ignoring feedback",
    ],
    nextSteps,
  };
}
