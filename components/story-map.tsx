import type { StageWithStatus } from "@/types/project";

interface StoryMapProps {
  story: string;
  stages: StageWithStatus[];
  progress: number;
}

const statusClasses: Record<StageWithStatus["status"], string> = {
  done: "border-emerald-500/40 bg-emerald-500/10",
  active: "border-cyan-400/60 bg-cyan-500/10",
  upcoming: "border-slate-800 bg-slate-950/70",
};

export function StoryMap({ story, stages, progress }: StoryMapProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Visual story map
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Project progression in a layman-friendly view
          </h2>
        </div>
        <div className="min-w-40">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full bg-cyan-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <p className="mb-6 max-w-3xl text-sm leading-6 text-slate-300">{story}</p>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {stages.map((stage) => (
          <article
            key={stage.id}
            className={`rounded-2xl border p-4 ${statusClasses[stage.status]}`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="rounded-full bg-slate-950/70 px-2 py-1 text-xs text-slate-300">
                Step {stage.sequence}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                {stage.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">{stage.visualLabel}</h3>
            <p className="mt-1 text-sm font-medium text-cyan-200">
              {stage.technicalLabel}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {stage.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
