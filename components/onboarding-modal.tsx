"use client";

import { useState } from "react";

interface OnboardingModalProps {
  onComplete: () => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    {
      title: "Welcome to Visual Builder",
      content: "Turn your software ideas into structured plans through familiar visual analogies. Let's take a quick tour!",
    },
    {
      title: "Choose Your Analogy",
      content: "Select a visual analogy that resonates with how you think about building software. Each template breaks development into familiar stages.",
    },
    {
      title: "Enter Project Details",
      content: "Fill in your project information on the left side. Don't worry about perfection—you can always come back and refine it.",
    },
    {
      title: "Track Your Progress",
      content: "The dashboard shows your project's current stage, progress, and what comes next. Update your stage as you make progress.",
    },
    {
      title: "Export Your Plan",
      content: "When ready, export your project brief in Markdown, Plain Text, or JSON format. Share it with your team or use it as documentation.",
    },
  ];

  const currentStepData = steps[currentStep];

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  }

  function handleSkip() {
    handleComplete();
  }

  function handleComplete() {
    setIsVisible(false);
    onComplete();
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleSkip}
              className="text-sm text-slate-400 transition hover:text-slate-200"
            >
              Skip tour
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-white">{currentStepData?.title}</h2>
        </div>

        <p className="mb-8 leading-7 text-slate-300">{currentStepData?.content}</p>

        <div className="mb-6 flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition ${
                index === currentStep ? "bg-cyan-400" : index < currentStep ? "bg-cyan-600" : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="rounded-2xl px-6 py-3 text-sm font-semibold text-slate-400 transition hover:text-slate-200 disabled:opacity-50 disabled:hover:text-slate-400"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
