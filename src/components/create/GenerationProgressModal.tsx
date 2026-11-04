import React, { useEffect, useState } from 'react';
import { ChefHat, Check, Sparkles } from 'lucide-react';

interface GenerationProgressModalProps {
  isOpen: boolean;
  ingredientsCount: number;
}

const GENERATION_STAGES = [
  { label: 'Auditing pantry inventory & nutrient profiles...', time: 800 },
  { label: 'Harmonizing flavor compounds & culinary pairings...', time: 1400 },
  { label: 'Crafting precision step-by-step cooking techniques...', time: 2000 },
  { label: 'Generating high-resolution culinary photography...', time: 2600 },
  { label: 'Finalizing voice narration & kitchen assistant context...', time: 3200 },
];

export const GenerationProgressModal: React.FC<GenerationProgressModalProps> = ({
  isOpen,
  ingredientsCount,
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStageIdx(0);
      return;
    }

    const timers = GENERATION_STAGES.map((stage, idx) => {
      return setTimeout(() => {
        setCurrentStageIdx(idx);
      }, stage.time);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xl max-w-lg w-full p-8 relative overflow-hidden text-center">
        
        {/* Subtle accent backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Chef Icon */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-stone-900 animate-ping opacity-15" />
          <div className="relative w-18 h-18 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-xl">
            <ChefHat className="w-9 h-9" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Main Title */}
        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
          Generating Your Custom Recipe
        </h3>
        <p className="text-xs text-stone-500 mb-8 max-w-sm mx-auto leading-relaxed">
          Transforming your {ingredientsCount} selected ingredients into an artisan culinary formula.
        </p>

        {/* Stage List */}
        <div className="space-y-3.5 text-left mb-8 max-w-md mx-auto">
          {GENERATION_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-amber-50 border border-amber-300 text-stone-900 font-medium shadow-xs scale-[1.01]'
                    : isCompleted
                    ? 'text-stone-400 opacity-80'
                    : 'text-stone-300 opacity-40'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span className="font-mono text-[10px]">{idx + 1}</span>
                  )}
                </div>

                <span className="text-xs flex-1">{stage.label}</span>
              </div>
            );
          })}
        </div>

        {/* Pulsing indicator */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-stone-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
          <span className="ml-1 text-[11px] font-mono uppercase tracking-wider text-amber-700">
            AI Engine Working
          </span>
        </div>
      </div>
    </div>
  );
};
