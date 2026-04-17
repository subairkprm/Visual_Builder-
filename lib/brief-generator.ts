import type { AnalogyTemplate, ProjectDraft, StageDefinition, VisualElement } from "@/types/project";

export interface ProjectBrief {
  metadata: {
    projectName: string;
    objective: string;
    targetUsers: string;
    environment: string;
    generatedAt: string;
  };
  analogyContext: {
    templateTitle: string;
    templateKey: string;
    currentStage: string;
    currentStageIndex: number;
    totalStages: number;
    visualDescription: string;
  };
  technicalMapping: {
    stages: StageDefinition[];
    visualElements: VisualElement[];
    focus: string;
  };
  progress: {
    completedStages: number;
    activeStage: string;
    upcomingStages: number;
    percentComplete: number;
  };
  qualitySignals: string[];
  notes: string;
}

export function generateBrief(
  draft: ProjectDraft,
  template: AnalogyTemplate
): ProjectBrief {
  const currentStageIndex = Math.min(
    Math.max(0, draft.currentStage),
    template.stages.length - 1
  );
  const currentStage = template.stages[currentStageIndex];
  const percentComplete = Math.round(
    ((currentStageIndex + 1) / template.stages.length) * 100
  );

  return {
    metadata: {
      projectName: draft.projectName || "Untitled Project",
      objective: draft.objective || "No objective specified",
      targetUsers: draft.targetUsers || "No target users specified",
      environment: draft.desiredEnvironment || "Not specified",
      generatedAt: new Date().toISOString(),
    },
    analogyContext: {
      templateTitle: template.title,
      templateKey: template.key,
      currentStage: currentStage?.technicalLabel || "Not started",
      currentStageIndex,
      totalStages: template.stages.length,
      visualDescription: template.story,
    },
    technicalMapping: {
      stages: template.stages,
      visualElements: template.visualElements,
      focus: draft.technicalFocus || "General development",
    },
    progress: {
      completedStages: currentStageIndex,
      activeStage: currentStage?.technicalLabel || "Not started",
      upcomingStages: Math.max(0, template.stages.length - currentStageIndex - 1),
      percentComplete,
    },
    qualitySignals: template.qualitySignals,
    notes: draft.notes || "No additional notes",
  };
}

export function formatBriefAsMarkdown(brief: ProjectBrief): string {
  const lines: string[] = [];

  // Header
  lines.push(`# ${brief.metadata.projectName}`);
  lines.push("");
  lines.push(`**Generated:** ${new Date(brief.metadata.generatedAt).toLocaleString()}`);
  lines.push("");

  // Project Overview
  lines.push("## Project Overview");
  lines.push("");
  lines.push(`**Objective:** ${brief.metadata.objective}`);
  lines.push("");
  lines.push(`**Target Users:** ${brief.metadata.targetUsers}`);
  lines.push("");
  lines.push(`**Development Environment:** ${brief.metadata.environment}`);
  lines.push("");
  lines.push(`**Technical Focus:** ${brief.technicalMapping.focus}`);
  lines.push("");

  // Visual Planning Model
  lines.push("## Visual Planning Model");
  lines.push("");
  lines.push(`**Analogy:** ${brief.analogyContext.templateTitle}`);
  lines.push("");
  lines.push(brief.analogyContext.visualDescription);
  lines.push("");

  // Current Progress
  lines.push("## Current Progress");
  lines.push("");
  lines.push(`**Completion:** ${brief.progress.percentComplete}%`);
  lines.push("");
  lines.push(`**Active Stage:** ${brief.progress.activeStage} (Stage ${brief.analogyContext.currentStageIndex + 1} of ${brief.analogyContext.totalStages})`);
  lines.push("");
  lines.push(`- Completed: ${brief.progress.completedStages} stages`);
  lines.push(`- Remaining: ${brief.progress.upcomingStages} stages`);
  lines.push("");

  // Development Stages
  lines.push("## Development Stages");
  lines.push("");
  brief.technicalMapping.stages.forEach((stage, index) => {
    const status = index < brief.analogyContext.currentStageIndex
      ? "✅"
      : index === brief.analogyContext.currentStageIndex
      ? "🔄"
      : "⏳";
    lines.push(`### ${status} Stage ${index + 1}: ${stage.technicalLabel}`);
    lines.push("");
    lines.push(`**Visual Metaphor:** ${stage.visualLabel}`);
    lines.push("");
    lines.push(stage.description);
    lines.push("");
  });

  // Technical Architecture Mapping
  lines.push("## Technical Architecture Mapping");
  lines.push("");
  lines.push("The following visual concepts translate to technical components:");
  lines.push("");
  brief.technicalMapping.visualElements.forEach((element) => {
    lines.push(`### ${element.name} → ${element.technicalLabel}`);
    lines.push("");
    lines.push(element.explanation);
    lines.push("");
  });

  // Quality Signals
  lines.push("## Quality Signals");
  lines.push("");
  lines.push("Key indicators of project health:");
  lines.push("");
  brief.qualitySignals.forEach((signal) => {
    lines.push(`- ${signal}`);
  });
  lines.push("");

  // Notes
  if (brief.notes && brief.notes !== "No additional notes") {
    lines.push("## Notes");
    lines.push("");
    lines.push(brief.notes);
    lines.push("");
  }

  // Developer Handoff
  lines.push("## Developer Handoff");
  lines.push("");
  lines.push("### Recommended Next Steps");
  lines.push("");
  const nextStage = brief.technicalMapping.stages[brief.analogyContext.currentStageIndex + 1];
  if (nextStage) {
    lines.push(`1. Complete current stage: **${brief.progress.activeStage}**`);
    lines.push(`2. Prepare for next stage: **${nextStage.technicalLabel}** (${nextStage.visualLabel})`);
    lines.push(`3. Review quality signals to ensure readiness`);
  } else {
    lines.push(`1. Complete final stage: **${brief.progress.activeStage}**`);
    lines.push(`2. Conduct final quality review`);
    lines.push(`3. Prepare for production deployment`);
  }
  lines.push("");

  lines.push("### Technical Requirements Checklist");
  lines.push("");
  lines.push("- [ ] Core functionality implemented");
  lines.push("- [ ] Tests written and passing");
  lines.push("- [ ] Documentation updated");
  lines.push("- [ ] Code reviewed");
  lines.push("- [ ] Quality signals validated");
  lines.push("- [ ] Performance benchmarked");
  lines.push("- [ ] Security reviewed");
  lines.push("- [ ] Deployment readiness confirmed");
  lines.push("");

  lines.push("---");
  lines.push("");
  lines.push("*Generated by Visual Builder - Turn your software ideas into structured plans through familiar analogies.*");
  lines.push("");

  return lines.join("\n");
}

export function formatBriefAsPlainText(brief: ProjectBrief): string {
  const lines: string[] = [];

  // Header
  lines.push("=".repeat(60));
  lines.push(brief.metadata.projectName.toUpperCase());
  lines.push("=".repeat(60));
  lines.push("");
  lines.push(`Generated: ${new Date(brief.metadata.generatedAt).toLocaleString()}`);
  lines.push("");

  // Project Overview
  lines.push("-".repeat(60));
  lines.push("PROJECT OVERVIEW");
  lines.push("-".repeat(60));
  lines.push("");
  lines.push(`Objective: ${brief.metadata.objective}`);
  lines.push("");
  lines.push(`Target Users: ${brief.metadata.targetUsers}`);
  lines.push("");
  lines.push(`Development Environment: ${brief.metadata.environment}`);
  lines.push("");
  lines.push(`Technical Focus: ${brief.technicalMapping.focus}`);
  lines.push("");

  // Visual Planning Model
  lines.push("-".repeat(60));
  lines.push("VISUAL PLANNING MODEL");
  lines.push("-".repeat(60));
  lines.push("");
  lines.push(`Analogy: ${brief.analogyContext.templateTitle}`);
  lines.push("");
  lines.push(brief.analogyContext.visualDescription);
  lines.push("");

  // Current Progress
  lines.push("-".repeat(60));
  lines.push("CURRENT PROGRESS");
  lines.push("-".repeat(60));
  lines.push("");
  lines.push(`Completion: ${brief.progress.percentComplete}%`);
  lines.push(`Active Stage: ${brief.progress.activeStage} (Stage ${brief.analogyContext.currentStageIndex + 1} of ${brief.analogyContext.totalStages})`);
  lines.push(`Completed: ${brief.progress.completedStages} stages`);
  lines.push(`Remaining: ${brief.progress.upcomingStages} stages`);
  lines.push("");

  // Development Stages
  lines.push("-".repeat(60));
  lines.push("DEVELOPMENT STAGES");
  lines.push("-".repeat(60));
  lines.push("");
  brief.technicalMapping.stages.forEach((stage, index) => {
    const status = index < brief.analogyContext.currentStageIndex
      ? "[DONE]"
      : index === brief.analogyContext.currentStageIndex
      ? "[ACTIVE]"
      : "[UPCOMING]";
    lines.push(`${status} Stage ${index + 1}: ${stage.technicalLabel}`);
    lines.push(`         Visual: ${stage.visualLabel}`);
    lines.push(`         ${stage.description}`);
    lines.push("");
  });

  // Technical Architecture Mapping
  lines.push("-".repeat(60));
  lines.push("TECHNICAL ARCHITECTURE MAPPING");
  lines.push("-".repeat(60));
  lines.push("");
  brief.technicalMapping.visualElements.forEach((element) => {
    lines.push(`${element.name} -> ${element.technicalLabel}`);
    lines.push(`  ${element.explanation}`);
    lines.push("");
  });

  // Quality Signals
  lines.push("-".repeat(60));
  lines.push("QUALITY SIGNALS");
  lines.push("-".repeat(60));
  lines.push("");
  brief.qualitySignals.forEach((signal) => {
    lines.push(`* ${signal}`);
  });
  lines.push("");

  // Notes
  if (brief.notes && brief.notes !== "No additional notes") {
    lines.push("-".repeat(60));
    lines.push("NOTES");
    lines.push("-".repeat(60));
    lines.push("");
    lines.push(brief.notes);
    lines.push("");
  }

  // Developer Handoff
  lines.push("-".repeat(60));
  lines.push("DEVELOPER HANDOFF");
  lines.push("-".repeat(60));
  lines.push("");
  lines.push("RECOMMENDED NEXT STEPS:");
  lines.push("");
  const nextStage = brief.technicalMapping.stages[brief.analogyContext.currentStageIndex + 1];
  if (nextStage) {
    lines.push(`1. Complete current stage: ${brief.progress.activeStage}`);
    lines.push(`2. Prepare for next stage: ${nextStage.technicalLabel} (${nextStage.visualLabel})`);
    lines.push(`3. Review quality signals to ensure readiness`);
  } else {
    lines.push(`1. Complete final stage: ${brief.progress.activeStage}`);
    lines.push(`2. Conduct final quality review`);
    lines.push(`3. Prepare for production deployment`);
  }
  lines.push("");

  lines.push("TECHNICAL REQUIREMENTS CHECKLIST:");
  lines.push("  [ ] Core functionality implemented");
  lines.push("  [ ] Tests written and passing");
  lines.push("  [ ] Documentation updated");
  lines.push("  [ ] Code reviewed");
  lines.push("  [ ] Quality signals validated");
  lines.push("  [ ] Performance benchmarked");
  lines.push("  [ ] Security reviewed");
  lines.push("  [ ] Deployment readiness confirmed");
  lines.push("");

  lines.push("=".repeat(60));
  lines.push("Generated by Visual Builder");
  lines.push("Turn your software ideas into structured plans");
  lines.push("through familiar analogies.");
  lines.push("=".repeat(60));
  lines.push("");

  return lines.join("\n");
}
