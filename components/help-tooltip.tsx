"use client";

import { useState } from "react";

interface HelpTooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

export function HelpTooltip({ content, position = "top" }: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-xs text-slate-300 transition hover:bg-slate-600 hover:text-white"
        aria-label="Help"
      >
        ?
      </button>
      {isVisible && (
        <div
          className={`absolute z-50 w-64 rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm leading-6 text-slate-300 shadow-xl ${positionClasses[position]}`}
          role="tooltip"
        >
          <div className="relative">
            {content}
            <div
              className={`absolute h-2 w-2 rotate-45 border-slate-700 bg-slate-900 ${
                position === "top"
                  ? "bottom-[-5px] left-1/2 -translate-x-1/2 border-b border-r"
                  : position === "bottom"
                  ? "top-[-5px] left-1/2 -translate-x-1/2 border-l border-t"
                  : position === "left"
                  ? "right-[-5px] top-1/2 -translate-y-1/2 border-r border-t"
                  : "left-[-5px] top-1/2 -translate-y-1/2 border-b border-l"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
