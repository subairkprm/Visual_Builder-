import { describe, expect, it } from "vitest";
import { generateBrief, formatBriefAsMarkdown, formatBriefAsPlainText } from "@/lib/brief-generator";
import { analogyTemplates, defaultProjectDraft } from "@/lib/templates";
import type { ProjectDraft } from "@/types/project";

describe("generateBrief", () => {
  it("generates a complete brief from draft and template", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      projectName: "Test Project",
      objective: "Build a test application",
      targetUsers: "Developers",
      currentStage: 2,
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);

    expect(brief.metadata.projectName).toBe("Test Project");
    expect(brief.metadata.objective).toBe("Build a test application");
    expect(brief.metadata.targetUsers).toBe("Developers");
    expect(brief.analogyContext.templateTitle).toBe(template.title);
    expect(brief.progress.activeStage).toBe(template.stages[2]?.technicalLabel);
    expect(brief.progress.completedStages).toBe(2);
  });

  it("handles empty project name with fallback", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      projectName: "",
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);

    expect(brief.metadata.projectName).toBe("Untitled Project");
  });

  it("handles empty fields with fallback values", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      objective: "",
      targetUsers: "",
      desiredEnvironment: "",
      technicalFocus: "",
      notes: "",
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);

    expect(brief.metadata.objective).toBe("No objective specified");
    expect(brief.metadata.targetUsers).toBe("No target users specified");
    expect(brief.metadata.environment).toBe("Not specified");
    expect(brief.technicalMapping.focus).toBe("General development");
    expect(brief.notes).toBe("No additional notes");
  });

  it("calculates progress correctly", () => {
    const template = analogyTemplates[0]!;
    const totalStages = template.stages.length;

    for (let i = 0; i < totalStages; i++) {
      const draft: ProjectDraft = {
        ...defaultProjectDraft,
        currentStage: i,
      };

      const brief = generateBrief(draft, template);
      const expectedPercent = Math.round(((i + 1) / totalStages) * 100);

      expect(brief.progress.percentComplete).toBe(expectedPercent);
      expect(brief.progress.completedStages).toBe(i);
      expect(brief.progress.upcomingStages).toBe(totalStages - i - 1);
    }
  });

  it("includes all template data", () => {
    const draft = defaultProjectDraft;
    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);

    expect(brief.technicalMapping.stages).toEqual(template.stages);
    expect(brief.technicalMapping.visualElements).toEqual(template.visualElements);
    expect(brief.qualitySignals).toEqual(template.qualitySignals);
    expect(brief.analogyContext.visualDescription).toBe(template.story);
  });

  it("generates valid ISO timestamp", () => {
    const draft = defaultProjectDraft;
    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);

    const timestamp = new Date(brief.metadata.generatedAt);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.getTime()).toBeGreaterThan(0);
    expect(isNaN(timestamp.getTime())).toBe(false);
  });
});

describe("formatBriefAsMarkdown", () => {
  it("generates valid markdown with all sections", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      projectName: "Test Project",
      objective: "Test objective",
      currentStage: 1,
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const markdown = formatBriefAsMarkdown(brief);

    expect(markdown).toContain("# Test Project");
    expect(markdown).toContain("## Project Overview");
    expect(markdown).toContain("## Visual Planning Model");
    expect(markdown).toContain("## Current Progress");
    expect(markdown).toContain("## Development Stages");
    expect(markdown).toContain("## Technical Architecture Mapping");
    expect(markdown).toContain("## Quality Signals");
    expect(markdown).toContain("## Developer Handoff");
  });

  it("includes stage status indicators", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      currentStage: 2,
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const markdown = formatBriefAsMarkdown(brief);

    expect(markdown).toContain("✅"); // Completed
    expect(markdown).toContain("🔄"); // Active
    expect(markdown).toContain("⏳"); // Upcoming
  });

  it("includes all stages with visual and technical labels", () => {
    const draft = defaultProjectDraft;
    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const markdown = formatBriefAsMarkdown(brief);

    template.stages.forEach((stage) => {
      expect(markdown).toContain(stage.technicalLabel);
      expect(markdown).toContain(stage.visualLabel);
      expect(markdown).toContain(stage.description);
    });
  });

  it("includes all visual elements", () => {
    const draft = defaultProjectDraft;
    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const markdown = formatBriefAsMarkdown(brief);

    template.visualElements.forEach((element) => {
      expect(markdown).toContain(element.name);
      expect(markdown).toContain(element.technicalLabel);
      expect(markdown).toContain(element.explanation);
    });
  });

  it("includes notes section when notes present", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      notes: "Important project notes",
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const markdown = formatBriefAsMarkdown(brief);

    expect(markdown).toContain("## Notes");
    expect(markdown).toContain("Important project notes");
  });

  it("omits notes section when no notes", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      notes: "",
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const markdown = formatBriefAsMarkdown(brief);

    expect(markdown).not.toContain("## Notes");
  });

  it("includes developer handoff checklist", () => {
    const draft = defaultProjectDraft;
    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const markdown = formatBriefAsMarkdown(brief);

    expect(markdown).toContain("Technical Requirements Checklist");
    expect(markdown).toContain("- [ ] Core functionality implemented");
    expect(markdown).toContain("- [ ] Tests written and passing");
    expect(markdown).toContain("- [ ] Documentation updated");
  });
});

describe("formatBriefAsPlainText", () => {
  it("generates valid plain text with all sections", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      projectName: "Test Project",
      objective: "Test objective",
      currentStage: 1,
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const plainText = formatBriefAsPlainText(brief);

    expect(plainText).toContain("PROJECT OVERVIEW");
    expect(plainText).toContain("VISUAL PLANNING MODEL");
    expect(plainText).toContain("CURRENT PROGRESS");
    expect(plainText).toContain("DEVELOPMENT STAGES");
    expect(plainText).toContain("TECHNICAL ARCHITECTURE MAPPING");
    expect(plainText).toContain("QUALITY SIGNALS");
    expect(plainText).toContain("DEVELOPER HANDOFF");
  });

  it("includes stage status indicators", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      currentStage: 2,
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const plainText = formatBriefAsPlainText(brief);

    expect(plainText).toContain("[DONE]");
    expect(plainText).toContain("[ACTIVE]");
    expect(plainText).toContain("[UPCOMING]");
  });

  it("uses consistent formatting with separators", () => {
    const draft = defaultProjectDraft;
    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const plainText = formatBriefAsPlainText(brief);

    expect(plainText).toContain("=".repeat(60));
    expect(plainText).toContain("-".repeat(60));
  });

  it("includes all key information", () => {
    const draft: ProjectDraft = {
      ...defaultProjectDraft,
      projectName: "Test Project",
      objective: "Build something great",
      targetUsers: "End users",
    };

    const template = analogyTemplates[0]!;
    const brief = generateBrief(draft, template);
    const plainText = formatBriefAsPlainText(brief);

    expect(plainText).toContain("TEST PROJECT"); // Uppercased in plain text format
    expect(plainText).toContain("Build something great");
    expect(plainText).toContain("End users");
  });
});

describe("Brief generation with different templates", () => {
  it("works with irrigation template", () => {
    const template = analogyTemplates.find(t => t.key === "irrigation")!;
    const draft = defaultProjectDraft;
    const brief = generateBrief(draft, template);

    expect(brief.analogyContext.templateKey).toBe("irrigation");
    expect(brief.analogyContext.templateTitle).toBe("Irrigation System");
  });

  it("works with kitchen template", () => {
    const template = analogyTemplates.find(t => t.key === "kitchen")!;
    const draft = defaultProjectDraft;
    const brief = generateBrief(draft, template);

    expect(brief.analogyContext.templateKey).toBe("kitchen");
    expect(brief.analogyContext.templateTitle).toBe("Restaurant Kitchen");
  });

  it("works with construction template", () => {
    const template = analogyTemplates.find(t => t.key === "construction")!;
    const draft = defaultProjectDraft;
    const brief = generateBrief(draft, template);

    expect(brief.analogyContext.templateKey).toBe("construction");
    expect(brief.analogyContext.templateTitle).toBe("Building Construction");
  });

  it("works with greenhouse template", () => {
    const template = analogyTemplates.find(t => t.key === "greenhouse")!;
    const draft = defaultProjectDraft;
    const brief = generateBrief(draft, template);

    expect(brief.analogyContext.templateKey).toBe("greenhouse");
    expect(brief.analogyContext.templateTitle).toBe("Greenhouse Growing");
    expect(brief.technicalMapping.stages.length).toBe(5);
  });
});
