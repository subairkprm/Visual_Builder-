"use client";

import { getStageGuidance } from "@/lib/stage-guidance";
import type { AnalogyTemplate } from "@/types/project";

interface StageGuidancePanelProps {
  template: AnalogyTemplate;
  currentStageIndex: number;
}

export function StageGuidancePanel({ template, currentStageIndex }: StageGuidancePanelProps) {
  const guidance = getStageGuidance(template, currentStageIndex);
  const currentStage = template.stages[currentStageIndex];

  if (!currentStage) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-300">Stage Guidance</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          {currentStage.technicalLabel}
        </h2>
        <p className="mt-1 text-sm text-slate-400">{currentStage.visualLabel}</p>
      </div>

      <div className="space-y-6">
        {/* Current Stage Advice */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-300">
            Focus Now
          </h3>
          <p className="text-sm leading-6 text-slate-300">{guidance.currentStageAdvice}</p>
        </div>

        {/* Success Criteria */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-300">
            Success Criteria
          </h3>
          <ul className="space-y-2">
            {guidance.successCriteria.map((criterion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1 text-emerald-400">✓</span>
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-300">
            Common Pitfalls
          </h3>
          <ul className="space-y-2">
            {guidance.commonPitfalls.map((pitfall, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1 text-red-400">⚠</span>
                <span>{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Steps */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-300">
            Next Steps
          </h3>
          <ul className="space-y-2">
            {guidance.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1 text-cyan-400">→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
