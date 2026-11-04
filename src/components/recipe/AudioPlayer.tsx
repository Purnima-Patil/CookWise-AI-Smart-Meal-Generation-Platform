import React, { useState, useEffect, useRef } from 'react';
import { RecipeNarrator, TTSPlayerState } from '../../lib/tts';
import { useApp } from '../../context/AppContext';
import { Play, Pause, RotateCcw, Volume2, Lightbulb } from 'lucide-react';

export interface AudioPlayerInstruction {
  stepNumber: number;
  instruction: string;
  tip?: string;
  durationMinutes?: number;
}

interface AudioPlayerProps {
  instructions: AudioPlayerInstruction[];
  recipeTitle: string;
  onActiveStepChange?: (stepIndex: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  instructions,
  recipeTitle,
  onActiveStepChange,
}) => {
  const { currentLanguageOption, t } = useApp();
  const [playerState, setPlayerState] = useState<TTSPlayerState>({
    isPlaying: false,
    isPaused: false,
    currentStepIndex: 0,
    progress: 0,
    rate: 1.0,
    error: null,
  });

  const narratorRef = useRef<RecipeNarrator | null>(null);

  useEffect(() => {
    const narratorSteps = instructions.map((i) => ({
      stepNumber: i.stepNumber,
      instruction: i.instruction,
      tip: i.tip,
    }));

    narratorRef.current = new RecipeNarrator(
      narratorSteps,
      (state) => {
        setPlayerState(state);
        if (onActiveStepChange) {
          onActiveStepChange(state.currentStepIndex);
        }
      },
      currentLanguageOption.speechLocale,
      t('recipe_step'),
      t('recipe_chef_tip')
    );

    return () => {
      if (narratorRef.current) {
        narratorRef.current.stop();
      }
    };
  }, [instructions, onActiveStepChange, currentLanguageOption.speechLocale, t]);

  const togglePlayPause = () => {
    if (!narratorRef.current) return;
    if (playerState.isPlaying && !playerState.isPaused) {
      narratorRef.current.pause();
    } else if (playerState.isPaused) {
      narratorRef.current.resume();
    } else {
      narratorRef.current.play(playerState.currentStepIndex);
    }
  };

  const handleReset = () => {
    if (!narratorRef.current) return;
    narratorRef.current.stop();
    narratorRef.current.play(0);
  };

  const cycleSpeed = () => {
    if (!narratorRef.current) return;
    const speeds = [0.8, 1.0, 1.25];
    const nextIdx = (speeds.indexOf(playerState.rate) + 1) % speeds.length;
    narratorRef.current.setRate(speeds[nextIdx]);
  };

  const currentStep = instructions[playerState.currentStepIndex];

  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-lg border border-stone-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        
        {/* Title and active status */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            playerState.isPlaying && !playerState.isPaused
              ? 'bg-amber-500 text-stone-950 animate-pulse'
              : 'bg-stone-800 text-stone-300'
          }`}>
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white tracking-wide">
                {t('recipe_voice_guide_title')}
              </h4>
              {playerState.isPlaying && !playerState.isPaused && (
                <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded-sm">
                  {t('recipe_voice_active')}
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400">
              {t('recipe_voice_subtitle').replace('{title}', recipeTitle)}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Speed Toggle */}
          <button
            onClick={cycleSpeed}
            title={t('recipe_voice_speed')}
            className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono font-medium text-stone-300 cursor-pointer transition-colors"
          >
            {playerState.rate}x
          </button>

          {/* Reset button */}
          <button
            onClick={handleReset}
            title={t('recipe_voice_restart')}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Primary Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-transform active:scale-95 cursor-pointer shadow-md"
          >
            {playerState.isPlaying && !playerState.isPaused ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>{t('recipe_voice_pause')}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>{playerState.isPaused ? t('recipe_voice_resume') : t('recipe_voice_start')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress & Current step snippet */}
      <div className="pt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span className="font-medium text-stone-300">
            {t('recipe_step')} {playerState.currentStepIndex + 1} / {instructions.length}
          </span>
          <span className="tabular-nums">{playerState.progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${playerState.progress}%` }}
          />
        </div>

        {/* Currently Narrated Step Preview */}
        {currentStep && (
          <div className="pt-2 space-y-2">
            <div className="text-xs text-stone-300 bg-stone-800/60 p-3 rounded-xl border border-stone-800/80 leading-relaxed flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-stone-700 text-[10px] font-bold text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                {currentStep.stepNumber}
              </span>
              <span className="line-clamp-2">{currentStep.instruction}</span>
            </div>

            {/* Chef Tip snippet */}
            {currentStep.tip && (
              <div className="text-xs text-amber-200/95 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/50 flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-semibold text-amber-300">{t('recipe_chef_tip')}: </span>
                  <span>{currentStep.tip}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
