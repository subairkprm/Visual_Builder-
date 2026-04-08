import type { VisualElement } from "@/types/project";

interface TechnicalMirrorProps {
  elements: VisualElement[];
}

export function TechnicalMirror({ elements }: TechnicalMirrorProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
          Technical mirror
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Every visual object mapped to a software meaning
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <div className="grid grid-cols-1 bg-slate-950/70 text-sm font-semibold text-slate-200 md:grid-cols-[1.2fr_1fr_1.6fr]">
          <div className="border-b border-slate-800 px-4 py-3 md:border-b-0 md:border-r">
            Visual element
          </div>
          <div className="border-b border-slate-800 px-4 py-3 md:border-b-0 md:border-r">
            Technical meaning
          </div>
          <div className="px-4 py-3">Why it matters</div>
        </div>

        {elements.map((element) => (
          <div
            key={element.name}
            className="grid grid-cols-1 border-t border-slate-800 bg-slate-900/60 text-sm text-slate-300 md:grid-cols-[1.2fr_1fr_1.6fr]"
          >
            <div className="px-4 py-4 font-medium text-white md:border-r md:border-slate-800">
              {element.name}
            </div>
            <div className="px-4 py-4 text-cyan-200 md:border-r md:border-slate-800">
              {element.technicalLabel}
            </div>
            <div className="px-4 py-4 leading-6">{element.explanation}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
