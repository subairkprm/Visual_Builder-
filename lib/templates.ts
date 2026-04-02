import type { AnalogyTemplate, ProjectDraft } from "@/types/project";

export const analogyTemplates: AnalogyTemplate[] = [
  {
    key: "irrigation",
    title: "Irrigation System",
    shortDescription: "Map software flow like water moving through a planned delivery network.",
    story:
      "This template turns abstract delivery into a visible water-flow journey: survey, source, connect, test, and release.",
    stages: [
      {
        id: "need-definition",
        visualLabel: "Land Survey",
        technicalLabel: "Need Definition",
        description: "Clarify the problem, route, and expected output before anything is built.",
      },
      {
        id: "system-planning",
        visualLabel: "Material Sourcing",
        technicalLabel: "System Planning",
        description: "Choose core tools, modules, data inputs, and delivery approach.",
      },
      {
        id: "structure-setup",
        visualLabel: "Main Line Installation",
        technicalLabel: "Structure Setup",
        description: "Lay down the main architecture and shared project foundation.",
      },
      {
        id: "flow-connection",
        visualLabel: "Valve Connection",
        technicalLabel: "Flow Connection",
        description: "Connect permissions, workflows, and key interactions between modules.",
      },
      {
        id: "core-build",
        visualLabel: "Pump and Tank Activation",
        technicalLabel: "Core Build",
        description: "Bring the main logic online so the system starts moving real value.",
      },
      {
        id: "testing-quality",
        visualLabel: "Pressure Test",
        technicalLabel: "Testing & Quality",
        description: "Check for leaks, instability, missing rules, and weak user flow.",
      },
      {
        id: "live-delivery",
        visualLabel: "Live Water Delivery",
        technicalLabel: "Live Delivery",
        description: "Release the completed flow to real users with confidence.",
      },
    ],
    visualElements: [
      {
        name: "Water Source",
        technicalLabel: "Input Sources",
        explanation: "Where data, requests, or user intent first enter the product.",
      },
      {
        name: "Main Pipeline",
        technicalLabel: "Core Application Flow",
        explanation: "The main path that carries the product’s primary business value.",
      },
      {
        name: "Valves",
        technicalLabel: "Rules and Permissions",
        explanation: "Controls that decide when, how, and for whom actions are allowed.",
      },
      {
        name: "Storage Tank",
        technicalLabel: "Database or Persistent Store",
        explanation: "The place where operational state and long-term information are kept.",
      },
    ],
    qualitySignals: ["Flow clarity", "Leak-free logic", "Pressure-safe testing"],
  },
  {
    key: "kitchen",
    title: "Restaurant Kitchen",
    shortDescription: "Explain delivery as orders moving from intake to plated service.",
    story:
      "This template treats the product like a kitchen line: take the order, prep the station, cook, inspect, and serve.",
    stages: [
      {
        id: "need-definition",
        visualLabel: "Menu Intent",
        technicalLabel: "Need Definition",
        description: "Define what should be served, for whom, and why it matters.",
      },
      {
        id: "system-planning",
        visualLabel: "Ingredient Prep",
        technicalLabel: "System Planning",
        description: "Choose ingredients, tools, dependencies, and service constraints.",
      },
      {
        id: "structure-setup",
        visualLabel: "Station Setup",
        technicalLabel: "Structure Setup",
        description: "Prepare the kitchen stations and shared operational layout.",
      },
      {
        id: "flow-connection",
        visualLabel: "Line Coordination",
        technicalLabel: "Flow Connection",
        description: "Coordinate timing and handoffs between kitchen functions.",
      },
      {
        id: "core-build",
        visualLabel: "Cooking in Service",
        technicalLabel: "Core Build",
        description: "Build the working experience and key user-facing interactions.",
      },
      {
        id: "testing-quality",
        visualLabel: "Taste and Pass",
        technicalLabel: "Testing & Quality",
        description: "Check consistency, timing, and quality before going to the table.",
      },
      {
        id: "live-delivery",
        visualLabel: "Table Service",
        technicalLabel: "Live Delivery",
        description: "Serve the finished experience to the end user.",
      },
    ],
    visualElements: [
      {
        name: "Order Ticket",
        technicalLabel: "User Request",
        explanation: "The trigger that starts the product workflow.",
      },
      {
        name: "Prep Station",
        technicalLabel: "Shared Services Layer",
        explanation: "Reusable logic and preparation steps used by many features.",
      },
      {
        name: "Kitchen Line",
        technicalLabel: "Feature Pipeline",
        explanation: "The flow that moves work from request to usable output.",
      },
      {
        name: "Pass Counter",
        technicalLabel: "Quality Review Layer",
        explanation: "The checkpoint before users receive the final result.",
      },
    ],
    qualitySignals: ["Service speed", "Consistent output", "Clear handoff timing"],
  },
  {
    key: "construction",
    title: "Building Construction",
    shortDescription: "Represent software maturity as a site moving from survey to handover.",
    story:
      "This template makes architecture feel tangible: foundation, framing, connections, inspection, and occupancy.",
    stages: [
      {
        id: "need-definition",
        visualLabel: "Site Survey",
        technicalLabel: "Need Definition",
        description: "Understand the site conditions, purpose, and target occupants.",
      },
      {
        id: "system-planning",
        visualLabel: "Blueprint Planning",
        technicalLabel: "System Planning",
        description: "Define plans, materials, constraints, and major dependencies.",
      },
      {
        id: "structure-setup",
        visualLabel: "Foundation Work",
        technicalLabel: "Structure Setup",
        description: "Build the stable technical foundation the rest depends on.",
      },
      {
        id: "flow-connection",
        visualLabel: "Utilities Connection",
        technicalLabel: "Flow Connection",
        description: "Wire together services, access, and cross-system interactions.",
      },
      {
        id: "core-build",
        visualLabel: "Framing and Fit-Out",
        technicalLabel: "Core Build",
        description: "Complete the main rooms, surfaces, and core experience.",
      },
      {
        id: "testing-quality",
        visualLabel: "Safety Inspection",
        technicalLabel: "Testing & Quality",
        description: "Validate safety, stability, and readiness before handover.",
      },
      {
        id: "live-delivery",
        visualLabel: "Building Handover",
        technicalLabel: "Live Delivery",
        description: "Open the final product to its intended users.",
      },
    ],
    visualElements: [
      {
        name: "Blueprint",
        technicalLabel: "Architecture Definition",
        explanation: "The high-level structure that guides implementation decisions.",
      },
      {
        name: "Foundation",
        technicalLabel: "Core Platform Layer",
        explanation: "The stable technical base that everything else relies on.",
      },
      {
        name: "Utilities",
        technicalLabel: "Integrations and Services",
        explanation: "External connections that make the full system usable.",
      },
      {
        name: "Inspection Checklist",
        technicalLabel: "Quality Gate",
        explanation: "Formal checks before the system is considered safe to release.",
      },
    ],
    qualitySignals: ["Structural stability", "Inspection readiness", "Occupancy confidence"],
  },
];

export const defaultProjectDraft: ProjectDraft = {
  projectName: "",
  objective: "",
  targetUsers: "",
  desiredEnvironment: "VS Code + Codex + local browser",
  analogyKey: "irrigation",
  currentStage: 2,
  technicalFocus: "Project intake and visual planning",
  notes: "",
};

export function getTemplateByKey(key: ProjectDraft["analogyKey"]) {
  return analogyTemplates.find((template) => template.key === key) ?? analogyTemplates[0];
}
