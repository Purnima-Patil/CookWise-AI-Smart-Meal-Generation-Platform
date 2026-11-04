import React, { useState } from 'react';
import { InstructionStep } from '../../types';
import { useApp } from '../../context/AppContext';
import { Clock, Lightbulb, CheckCircle } from 'lucide-react';

interface InstructionsTimelineProps {
  instructions: InstructionStep[];
  activeStepIndex?: number;
  onSelectStep?: (index: number) => void;
}

export const InstructionsTimeline: React.FC<InstructionsTimelineProps> = ({
  instructions,
  activeStepIndex = -1,
  onSelectStep,
}) => {
  const { t } = useApp();
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStepCompleted = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-5 border-b border-stone-100 mb-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            {t('recipe_instructions_title')}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {instructions.length} {t('recipe_step')}s
          </p>
        </div>

        <div className="text-xs text-stone-400 font-medium font-mono">
          {Object.values(completedSteps).filter(Boolean).length} / {instructions.length}
        </div>
      </div>

      <div className="space-y-6">
        {instructions.map((step, idx) => {
          const isActive = activeStepIndex === idx;
          const isDone = Boolean(completedSteps[step.stepNumber]);

          return (
            <div
              key={step.stepNumber}
              onClick={() => onSelectStep?.(idx)}
              className={`p-5 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                isActive
                  ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20 shadow-md'
                  : isDone
                  ? 'bg-stone-50/70 border-stone-200/60 opacity-80'
                  : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-xs'
              }`}
            >
              {/* Step Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold font-mono flex items-center justify-center transition-colors ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {String(step.stepNumber).padStart(2, '0')}
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    {t('recipe_step')} {step.stepNumber}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {step.durationMinutes && (
                    <div className="flex items-center gap-1 text-xs text-stone-500 font-medium bg-stone-100/80 px-2.5 py-1 rounded-md font-mono">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{step.durationMinutes} min</span>
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStepCompleted(step.stepNumber);
                    }}
                    title={isDone ? 'Mark uncompleted' : 'Mark completed'}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isDone ? 'text-emerald-600 hover:text-emerald-700' : 'text-stone-300 hover:text-stone-500'
                    }`}
                  >
                    <CheckCircle className={`w-5 h-5 ${isDone ? 'fill-emerald-100' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Instruction text */}
              <p className={`text-sm leading-relaxed ${isDone ? 'text-stone-500' : 'text-stone-800 font-normal'}`}>
                {step.instruction}
              </p>

              {/* Chef Tip if available */}
              {step.tip && (
                <div className="mt-3.5 pt-3 border-t border-amber-200/50 flex items-start gap-2.5 text-xs text-amber-900 bg-amber-100/40 p-3 rounded-xl">
                  <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-950">{t('recipe_chef_tip')}: </span>
                    <span>{step.tip}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
