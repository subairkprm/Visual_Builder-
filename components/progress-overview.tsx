interface ProgressOverviewProps {
  projectName: string;
  objective: string;
  targetUsers: string;
  desiredEnvironment: string;
  technicalFocus: string;
  activeStage: string;
  completedCount: number;
  upcomingCount: number;
  progress: number;
  qualitySignals: string[];
}

export function ProgressOverview({
  projectName,
  objective,
  targetUsers,
  desiredEnvironment,
  technicalFocus,
  activeStage,
  completedCount,
  upcomingCount,
  progress,
  qualitySignals,
}: ProgressOverviewProps) {
  const cards = [
    { label: "Current stage", value: activeStage },
    { label: "Completion", value: `${progress}%` },
    { label: "Completed steps", value: `${completedCount}` },
    { label: "Upcoming steps", value: `${upcomingCount}` },
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
            Product briefing
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            {projectName || "Untitled visual software project"}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            {objective || "Describe the product goal to generate a stronger technical mirror."}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
          <span className="text-slate-400">Target users:</span> {targetUsers || "Not set"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
          >
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-2 text-lg font-semibold text-white">{card.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            Environment and focus
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Desired environment</dt>
              <dd className="mt-1 text-white">{desiredEnvironment || "Not set"}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Technical focus</dt>
              <dd className="mt-1 text-white">{technicalFocus || "Not set"}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            Quality signals
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            {qualitySignals.map((signal) => (
              <li
                key={signal}
                className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2"
              >
                {signal}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
