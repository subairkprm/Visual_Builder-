"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ProgressOverview } from "@/components/progress-overview";
import { StoryMap } from "@/components/story-map";
import { TechnicalMirror } from "@/components/technical-mirror";
import { TemplateCard } from "@/components/template-card";
import { buildStageTimeline, calculateProgress, getProgressSummary } from "@/lib/project-helpers";
import { analogyTemplates, defaultProjectDraft, getTemplateByKey } from "@/lib/templates";
import { clearProjectDraft, loadProjectDraft, saveProjectDraft } from "@/lib/storage";
import type { ProjectDraft } from "@/types/project";

const fieldClassName = "mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400";
const labelClassName = "text-sm font-medium text-slate-200";

export function ProjectBuilderDashboard() {
  const [draft, setDraft] = useState<ProjectDraft>(defaultProjectDraft);
  const [statusMessage, setStatusMessage] = useState("No local draft loaded yet.");

  useEffect(() => {
    const savedDraft = loadProjectDraft();
    if (savedDraft) {
      setDraft(savedDraft);
      setStatusMessage("Loaded saved local draft from this browser.");
    }
  }, []);

  const selectedTemplate = useMemo(() => getTemplateByKey(draft.analogyKey), [draft.analogyKey]);
  const progress = useMemo(() => calculateProgress(draft.currentStage, selectedTemplate.stages.length), [draft.currentStage, selectedTemplate.stages.length]);
  const stageTimeline = useMemo(() => buildStageTimeline(selectedTemplate, draft.currentStage), [draft.currentStage, selectedTemplate]);
  const progressSummary = useMemo(() => getProgressSummary(selectedTemplate, draft.currentStage), [draft.currentStage, selectedTemplate]);

  function updateField<Key extends keyof ProjectDraft>(key: Key, value: ProjectDraft[Key]) {
    setDraft((currentDraft) => ({ ...currentDraft, [key]: value }));
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.projectName.trim() || !draft.objective.trim() || !draft.targetUsers.trim() || !draft.desiredEnvironment.trim()) {
      setStatusMessage("Project name, objective, target users, and desired environment are required.");
      return;
    }
    saveProjectDraft(draft);
    setStatusMessage(`Draft saved locally for \"${draft.projectName}\".`);
  }

  function handleReset() {
    clearProjectDraft();
    setDraft(defaultProjectDraft);
    setStatusMessage("Local draft cleared and reset.");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Visual Builder</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Layman-friendly software planning through visual analogies</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">Turn a plain-language software idea into a visible story map, technical mirror, and progress board.</p>
      </section>

      <section className="grid gap-8 xl:grid-cols-[26rem_minmax(0,1fr)]">
        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
            <div className="mb-5">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Project intake</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Capture the product in plain language</h2>
            </div>
            <form className="space-y-5" onSubmit={handleSave}>
              <div>
                <label className={labelClassName} htmlFor="projectName">Project name</label>
                <input id="projectName" value={draft.projectName} onChange={(event) => updateField("projectName", event.target.value)} className={fieldClassName} placeholder="Visual Builder" />
              </div>
              <div>
                <label className={labelClassName} htmlFor="objective">Objective</label>
                <textarea id="objective" value={draft.objective} onChange={(event) => updateField("objective", event.target.value)} className={`${fieldClassName} min-h-28 resize-y`} placeholder="Explain the software idea clearly." />
              </div>
              <div>
                <label className={labelClassName} htmlFor="targetUsers">Target users</label>
                <input id="targetUsers" value={draft.targetUsers} onChange={(event) => updateField("targetUsers", event.target.value)} className={fieldClassName} placeholder="Founders and AI-assisted builders" />
              </div>
              <div>
                <label className={labelClassName} htmlFor="desiredEnvironment">Desired environment</label>
                <input id="desiredEnvironment" value={draft.desiredEnvironment} onChange={(event) => updateField("desiredEnvironment", event.target.value)} className={fieldClassName} placeholder="VS Code + Codex + browser" />
              </div>
              <div>
                <label className={labelClassName} htmlFor="technicalFocus">Technical focus</label>
                <input id="technicalFocus" value={draft.technicalFocus} onChange={(event) => updateField("technicalFocus", event.target.value)} className={fieldClassName} placeholder="Intake, mapping, quality gates" />
              </div>
              <div>
                <label className={labelClassName} htmlFor="currentStage">Current stage</label>
                <select id="currentStage" value={draft.currentStage} onChange={(event) => updateField("currentStage", Number(event.target.value))} className={fieldClassName}>
                  {selectedTemplate.stages.map((stage, index) => (
                    <option key={stage.id} value={index}>{index + 1}. {stage.technicalLabel}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClassName} htmlFor="notes">Notes</label>
                <textarea id="notes" value={draft.notes} onChange={(event) => updateField("notes", event.target.value)} className={`${fieldClassName} min-h-24 resize-y`} placeholder="Add assumptions or open questions." />
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button type="submit" className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Save local draft</button>
                <button type="button" onClick={handleReset} className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500">Reset</button>
              </div>
            </form>
            <p className="mt-4 text-sm leading-6 text-slate-400">{statusMessage}</p>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
            <div className="mb-5">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">Analogy templates</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Choose the visual language</h2>
            </div>
            <div className="space-y-3">
              {analogyTemplates.map((template) => (
                <TemplateCard key={template.key} template={template} selected={template.key === draft.analogyKey} onSelect={() => updateField("analogyKey", template.key)} />
              ))}
            </div>
          </section>
        </aside>

        <div className="space-y-6">
          <ProgressOverview
            projectName={draft.projectName}
            objective={draft.objective}
            targetUsers={draft.targetUsers}
            desiredEnvironment={draft.desiredEnvironment}
            technicalFocus={draft.technicalFocus}
            activeStage={progressSummary.activeStage}
            completedCount={progressSummary.completedCount}
            upcomingCount={progressSummary.upcomingCount}
            progress={progress}
            qualitySignals={selectedTemplate.qualitySignals}
          />
          <StoryMap story={selectedTemplate.story} stages={stageTimeline} progress={progress} />
          <TechnicalMirror elements={selectedTemplate.visualElements} />
        </div>
      </section>
    </main>
  );
}
