import type { AnalogyTemplate } from "@/types/project";

interface TemplateCardProps {
  template: AnalogyTemplate;
  selected: boolean;
  onSelect: () => void;
}

export function TemplateCard({
  template,
  selected,
  onSelect,
}: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-950/40"
          : "border-slate-800 bg-slate-900/70 hover:border-slate-700"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-white">{template.title}</h3>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            selected
              ? "bg-cyan-400/20 text-cyan-200"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          {selected ? "Selected" : "Available"}
        </span>
      </div>
      <p className="text-sm text-slate-300">{template.shortDescription}</p>
    </button>
  );
}
