import React from 'react';
import {
  CUISINE_OPTIONS,
  DIETARY_OPTIONS,
  DIFFICULTY_OPTIONS,
  MEAL_TYPES,
  SPICE_LEVELS,
} from '../../lib/constants/ingredients';
import { Difficulty } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  localizeDietaryName,
  localizeCuisineName,
  localizeMealTypeName,
  localizeSpiceLevel,
  localizeDifficultyName,
} from '../../lib/i18n';
import { Users, Flame } from 'lucide-react';

export interface RecipeCustomizerState {
  dietary: string[];
  cuisine: string;
  mealType: string;
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  difficulty: Difficulty;
  servings: number;
}

interface RecipeCustomizerProps {
  state: RecipeCustomizerState;
  onChange: (state: RecipeCustomizerState) => void;
}

export const RecipeCustomizer: React.FC<RecipeCustomizerProps> = ({ state, onChange }) => {
  const { language, t } = useApp();

  const toggleDietary = (diet: string) => {
    const exists = state.dietary.includes(diet);
    const updated = exists ? state.dietary.filter((d) => d !== diet) : [...state.dietary, diet];
    onChange({ ...state, dietary: updated });
  };

  return (
    <div className="space-y-8">
      {/* 1. Dietary Preferences */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
          {t('create_dietary_label')}
        </label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((diet) => {
            const isSelected = state.dietary.includes(diet);
            return (
              <button
                key={diet}
                type="button"
                onClick={() => toggleDietary(diet)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-white shadow-2xs'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                {localizeDietaryName(diet, language)}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Cuisine and Meal Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
            {t('create_cuisine_label')}
          </label>
          <select
            value={state.cuisine}
            onChange={(e) => onChange({ ...state, cuisine: e.target.value })}
            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
          >
            {CUISINE_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {localizeCuisineName(c, language)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
            {t('create_meal_label')}
          </label>
          <select
            value={state.mealType}
            onChange={(e) => onChange({ ...state, mealType: e.target.value })}
            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
          >
            {MEAL_TYPES.map((m) => (
              <option key={m} value={m}>
                {localizeMealTypeName(m, language)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Spice Level, Difficulty, Servings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
        {/* Spice Level */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('create_spice_label')}</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5 bg-stone-100 p-1 rounded-xl">
            {SPICE_LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onChange({ ...state, spiceLevel: lvl })}
                className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center ${
                  state.spiceLevel === lvl
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {localizeSpiceLevel(lvl, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
            {t('recipe_difficulty')}
          </label>
          <div className="flex bg-stone-100 p-1 rounded-xl">
            {DIFFICULTY_OPTIONS.map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => onChange({ ...state, difficulty: diff })}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center ${
                  state.difficulty === diff
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {localizeDifficultyName(diff, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Servings */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-stone-500" />
            <span>{t('create_servings_label')}</span>
          </label>
          <div className="flex items-center justify-between bg-stone-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => onChange({ ...state, servings: Math.max(1, state.servings - 1) })}
              className="w-8 h-8 rounded-lg bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm flex items-center justify-center shadow-2xs cursor-pointer"
            >
              -
            </button>
            <span className="text-xs font-bold text-stone-900 font-mono">
              {state.servings}
            </span>
            <button
              type="button"
              onClick={() => onChange({ ...state, servings: Math.min(12, state.servings + 1) })}
              className="w-8 h-8 rounded-lg bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm flex items-center justify-center shadow-2xs cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
