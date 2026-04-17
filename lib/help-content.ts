export const helpContent = {
  projectName: "A short, memorable name for your project. This will be used in exports and file names.",
  objective: "Describe what you want to build and why. Focus on the problem you're solving and the value you'll deliver.",
  targetUsers: "Who will use this software? Be specific about your audience (e.g., developers, designers, end users, administrators).",
  desiredEnvironment: "Where will development happen? Include your tools, IDEs, frameworks, or deployment platforms.",
  technicalFocus: "What aspects of development are you prioritizing? (e.g., backend API, frontend UI, testing, deployment)",
  currentStage: "Where are you in the development process? Select the stage that best matches your current progress.",
  notes: "Add any additional context, assumptions, open questions, or important details about your project.",
  analogyTemplate: "Choose a visual analogy that helps you think about your project. Each template breaks development into familiar stages with visual and technical perspectives.",
  irrigation: "The Irrigation System analogy treats software delivery like water flowing through planned channels. Good for projects focused on data flow, pipelines, and systematic delivery.",
  kitchen: "The Restaurant Kitchen analogy models development as orders moving from intake to plated service. Good for request-response systems and service-oriented architectures.",
  construction: "The Building Construction analogy represents software as a building going from foundation to occupancy. Good for platform projects and layered architectures.",
  greenhouse: "The Greenhouse Growing analogy views software as cultivating growth from seed to harvest. Good for iterative development and organic growth projects.",
  outputPanel: "Export your project plan in multiple formats. Use Markdown for documentation, Plain Text for sharing, or JSON for programmatic use.",
  stageGuidance: "Focus on completing the current stage before moving forward. Each stage builds on the previous one to ensure solid progress.",
} as const;

export type HelpContentKey = keyof typeof helpContent;

export function getHelpContent(key: HelpContentKey): string {
  return helpContent[key];
}
