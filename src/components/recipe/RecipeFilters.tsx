import React from 'react';
import { CUISINE_OPTIONS, DIETARY_OPTIONS, DIFFICULTY_OPTIONS, MEAL_TYPES } from '../../lib/constants/ingredients';
import { RecipeFiltersState } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  localizeDietaryName,
  localizeCuisineName,
  localizeMealTypeName,
  localizeDifficultyName,
} from '../../lib/i18n';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface RecipeFiltersProps {
  filters: RecipeFiltersState;
  onChange: (updated: RecipeFiltersState) => void;
  onReset: () => void;
  totalResults: number;
}

export const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const { t, language } = useApp();
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleDietaryToggle = (diet: string) => {
    const exists = filters.selectedDietary.includes(diet);
    const updated = exists
      ? filters.selectedDietary.filter((d) => d !== diet)
      : [...filters.selectedDietary, diet];
    onChange({ ...filters, selectedDietary: updated });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.selectedDietary.length > 0 ||
    filters.selectedCuisine !== '' ||
    filters.selectedMealType !== '' ||
    filters.selectedDifficulty !== '' ||
    filters.sortBy !== 'newest';

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs space-y-4 mb-8">
      {/* Top Search & Primary Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder={t('explore_search_placeholder')}
            className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 transition-all placeholder:text-stone-400"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ ...filters, searchQuery: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Filter Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-600">
            <span className="text-stone-400">{t('explore_sort_label')}</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
              className="bg-transparent border-none text-stone-800 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="newest">{t('explore_sort_newest')}</option>
              <option value="popular">{t('explore_sort_popular')}</option>
              <option value="quickest">{t('explore_sort_quickest')}</option>
            </select>
          </div>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              showAdvanced || hasActiveFilters
                ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t('explore_filters_btn')}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-600 inline-block ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Dietary Filter Segmented Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
        <span className="text-stone-400 font-medium shrink-0 mr-1">{t('explore_diet_label')}</span>
        {DIETARY_OPTIONS.slice(0, 6).map((diet) => {
          const isSelected = filters.selectedDietary.includes(diet);
          return (
            <button
              key={diet}
              onClick={() => handleDietaryToggle(diet)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              {localizeDietaryName(diet, language)}
            </button>
          );
        })}
      </div>

      {/* Advanced Expandable Filter Drawer */}
      {showAdvanced && (
        <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
          {/* Cuisine Filter */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('explore_cuisine_label')}
            </label>
            <select
              value={filters.selectedCuisine}
              onChange={(e) => onChange({ ...filters, selectedCuisine: e.target.value })}
              className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              <option value="">{t('explore_all_cuisines')}</option>
              {CUISINE_OPTIONS.filter((c) => c !== 'Any Cuisine').map((c) => (
                <option key={c} value={c}>
                  {localizeCuisineName(c, language)}
                </option>
              ))}
            </select>
          </div>

          {/* Meal Type Filter */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('explore_meal_label')}
            </label>
            <select
              value={filters.selectedMealType}
              onChange={(e) => onChange({ ...filters, selectedMealType: e.target.value })}
              className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              <option value="">{t('explore_all_meals')}</option>
              {MEAL_TYPES.filter((m) => m !== 'Any Meal').map((m) => (
                <option key={m} value={m}>
                  {localizeMealTypeName(m, language)}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('explore_difficulty_label')}
            </label>
            <select
              value={filters.selectedDifficulty}
              onChange={(e) => onChange({ ...filters, selectedDifficulty: e.target.value })}
              className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              <option value="">{t('explore_all_difficulties')}</option>
              {DIFFICULTY_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {localizeDifficultyName(d, language)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Active filter count and reset button */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
        <span>
          {t('explore_showing_recipes')} <strong className="text-stone-900 font-semibold">{totalResults}</strong> {t('explore_curated_recipes')}
        </span>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-amber-800 hover:text-amber-900 font-medium underline underline-offset-2 cursor-pointer"
          >
            {t('explore_clear_filters')}
          </button>
        )}
      </div>
    </div>
  );
};
