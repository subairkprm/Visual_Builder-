"use client";

import { useState } from "react";
import { generateBrief, formatBriefAsMarkdown, formatBriefAsPlainText } from "@/lib/brief-generator";
import { copyToClipboard, downloadAsMarkdown, downloadAsPlainText, downloadBriefAsJSON } from "@/lib/export";
import type { AnalogyTemplate, ProjectDraft } from "@/types/project";

interface OutputPanelProps {
  draft: ProjectDraft;
  template: AnalogyTemplate;
}

type TabType = "preview" | "markdown" | "plaintext" | "json";

export function OutputPanel({ draft, template }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("preview");
  const [copyStatus, setCopyStatus] = useState<string>("");

  const brief = generateBrief(draft, template);
  const markdownContent = formatBriefAsMarkdown(brief);
  const plaintextContent = formatBriefAsPlainText(brief);
  const jsonContent = JSON.stringify(brief, null, 2);

  async function handleCopy(content: string, format: string) {
    const success = await copyToClipboard(content);
    if (success) {
      setCopyStatus(`${format} copied!`);
      setTimeout(() => setCopyStatus(""), 2000);
    } else {
      setCopyStatus("Copy failed");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  }

  function handleDownload(type: "markdown" | "plaintext" | "json") {
    const projectName = draft.projectName || "project";
    switch (type) {
      case "markdown":
        downloadAsMarkdown(markdownContent, projectName);
        break;
      case "plaintext":
        downloadAsPlainText(plaintextContent, projectName);
        break;
      case "json":
        downloadBriefAsJSON(brief, projectName);
        break;
    }
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: "preview", label: "Preview" },
    { id: "markdown", label: "Markdown" },
    { id: "plaintext", label: "Plain Text" },
    { id: "json", label: "JSON" },
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Project Brief</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Export your structured plan</h2>
        </div>
        {copyStatus && (
          <div className="rounded-xl bg-emerald-500/20 px-4 py-2 text-sm text-emerald-300">
            {copyStatus}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-2 border-b border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "border-b-2 border-emerald-400 text-emerald-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Preview Tab */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
            <h3 className="text-xl font-semibold text-white">{brief.metadata.projectName}</h3>
            <p className="mt-2 text-sm text-slate-400">
              Generated: {new Date(brief.metadata.generatedAt).toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Overview</h4>
            <div className="mt-3 space-y-2 text-sm">
              <p><span className="text-slate-400">Objective:</span> <span className="text-slate-200">{brief.metadata.objective}</span></p>
              <p><span className="text-slate-400">Target Users:</span> <span className="text-slate-200">{brief.metadata.targetUsers}</span></p>
              <p><span className="text-slate-400">Environment:</span> <span className="text-slate-200">{brief.metadata.environment}</span></p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Progress</h4>
            <div className="mt-3 space-y-2 text-sm">
              <p><span className="text-slate-400">Completion:</span> <span className="text-emerald-400 font-semibold">{brief.progress.percentComplete}%</span></p>
              <p><span className="text-slate-400">Active Stage:</span> <span className="text-slate-200">{brief.progress.activeStage}</span></p>
              <p><span className="text-slate-400">Stages:</span> <span className="text-slate-200">{brief.progress.completedStages} completed, {brief.progress.upcomingStages} remaining</span></p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Analogy Model</h4>
            <p className="mt-2 text-lg font-medium text-white">{brief.analogyContext.templateTitle}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{brief.analogyContext.visualDescription}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCopy(markdownContent, "Markdown")}
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Copy Markdown
            </button>
            <button
              onClick={() => handleDownload("markdown")}
              className="rounded-2xl border border-emerald-400/50 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
            >
              Download MD
            </button>
            <button
              onClick={() => handleDownload("plaintext")}
              className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Download TXT
            </button>
            <button
              onClick={() => handleDownload("json")}
              className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Download JSON
            </button>
          </div>
        </div>
      )}

      {/* Markdown Tab */}
      {activeTab === "markdown" && (
        <div className="space-y-4">
          <pre className="max-h-96 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-xs leading-6 text-slate-300">
            {markdownContent}
          </pre>
          <div className="flex gap-3">
            <button
              onClick={() => handleCopy(markdownContent, "Markdown")}
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => handleDownload("markdown")}
              className="rounded-2xl border border-emerald-400/50 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
            >
              Download File
            </button>
          </div>
        </div>
      )}

      {/* Plain Text Tab */}
      {activeTab === "plaintext" && (
        <div className="space-y-4">
          <pre className="max-h-96 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-xs leading-6 text-slate-300">
            {plaintextContent}
          </pre>
          <div className="flex gap-3">
            <button
              onClick={() => handleCopy(plaintextContent, "Plain text")}
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => handleDownload("plaintext")}
              className="rounded-2xl border border-emerald-400/50 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
            >
              Download File
            </button>
          </div>
        </div>
      )}

      {/* JSON Tab */}
      {activeTab === "json" && (
        <div className="space-y-4">
          <pre className="max-h-96 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-xs leading-6 text-slate-300">
            {jsonContent}
          </pre>
          <div className="flex gap-3">
            <button
              onClick={() => handleCopy(jsonContent, "JSON")}
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => handleDownload("json")}
              className="rounded-2xl border border-emerald-400/50 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
            >
              Download File
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
