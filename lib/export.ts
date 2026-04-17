import type { ProjectBrief } from "@/lib/brief-generator";
import type { ProjectDraft } from "@/types/project";

/**
 * Triggers a download of content as a file
 */
function triggerDownload(content: string, filename: string, mimeType: string) {
  if (typeof window === "undefined") {
    return;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate a safe filename from project name
 */
function generateFilename(projectName: string, extension: string): string {
  const safeName = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "project";

  const timestamp = new Date().toISOString().split("T")[0];
  return `${safeName}-${timestamp}.${extension}`;
}

/**
 * Download project brief as Markdown file
 */
export function downloadAsMarkdown(
  content: string,
  projectName: string
): void {
  const filename = generateFilename(projectName, "md");
  triggerDownload(content, filename, "text/markdown;charset=utf-8");
}

/**
 * Download project brief as plain text file
 */
export function downloadAsPlainText(
  content: string,
  projectName: string
): void {
  const filename = generateFilename(projectName, "txt");
  triggerDownload(content, filename, "text/plain;charset=utf-8");
}

/**
 * Download project draft as JSON file
 */
export function downloadAsJSON(
  draft: ProjectDraft,
  projectName?: string
): void {
  const name = projectName || draft.projectName || "project";
  const filename = generateFilename(name, "json");
  const content = JSON.stringify(draft, null, 2);
  triggerDownload(content, filename, "application/json;charset=utf-8");
}

/**
 * Download project brief as JSON file
 */
export function downloadBriefAsJSON(
  brief: ProjectBrief,
  projectName?: string
): void {
  const name = projectName || brief.metadata.projectName || "project";
  const filename = generateFilename(name, "json");
  const content = JSON.stringify(brief, null, 2);
  triggerDownload(content, filename, "application/json;charset=utf-8");
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined" || !navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers that don't support clipboard API
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch {
      return false;
    }
  }
}
