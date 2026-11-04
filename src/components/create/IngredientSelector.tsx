import React, { useState } from 'react';
import { INGREDIENT_CATEGORIES } from '../../lib/constants/ingredients';
import { useApp } from '../../context/AppContext';
import { localizeCategoryName, localizeIngredientName } from '../../lib/i18n';
import { Search, Plus, X, Sparkles, Check } from 'lucide-react';

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onChange: (ingredients: string[]) => void;
}

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  selectedIngredients,
  onChange,
}) => {
  const { language, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [activeCategory, setActiveCategory] = useState(INGREDIENT_CATEGORIES[0].name);

  const handleToggle = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      onChange(selectedIngredients.filter((i) => i.toLowerCase() !== ingredient.toLowerCase()));
    } else {
      onChange([...selectedIngredients, ingredient]);
    }
  };

  const handleAddCustom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;
    if (!selectedIngredients.some((i) => i.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...selectedIngredients, trimmed]);
    }
    setCustomInput('');
  };

  const handleApplyPreset = (presetItems: string[]) => {
    const combined = Array.from(new Set([...selectedIngredients, ...presetItems]));
    onChange(combined);
  };

  // Flattened for search
  const allKnownIngredients = INGREDIENT_CATEGORIES.flatMap((c) => c.items);
  const filteredSearch = searchTerm
    ? allKnownIngredients.filter((item) => {
        const localized = localizeIngredientName(item, language).toLowerCase();
        const raw = item.toLowerCase();
        const search = searchTerm.toLowerCase();
        return localized.includes(search) || raw.includes(search);
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Search and Custom Add bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`${t('nav_search')} (${localizeIngredientName('Garlic', language)}, ${localizeIngredientName('Tomatoes', language)})...`}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Add custom item */}
        <form onSubmit={handleAddCustom} className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={t('create_custom_ing_placeholder')}
            className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all placeholder:text-stone-400"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+</span>
          </button>
        </form>
      </div>

      {/* Selected Ingredients Pill Box */}
      <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('create_ingredients_heading')}</span> ({selectedIngredients.length})
          </span>
          {selectedIngredients.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {selectedIngredients.length === 0 ? (
          <p className="text-xs text-amber-900/70 italic">
            Select ingredients below to start formulating your recipe.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-stone-800 text-xs font-medium shadow-2xs group animate-in fade-in"
              >
                <span>{localizeIngredientName(item, language)}</span>
                <button
                  onClick={() => handleToggle(item)}
                  className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Quick Inspiration Presets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
        <span className="text-stone-400 font-medium shrink-0">Inspiration:</span>
        <button
          onClick={() => handleApplyPreset(['Rigatoni Pasta', 'Heavy Cream', 'Garlic', 'Baby Spinach', 'Parmigiano-Reggiano'])}
          className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors shrink-0 cursor-pointer"
        >
          🍝 {localizeIngredientName('Rigatoni Pasta', language)} + {localizeIngredientName('Baby Spinach', language)}
        </button>
        <button
          onClick={() => handleApplyPreset(['Salmon Fillets', 'Asparagus', 'Lemon', 'Unsalted Butter', 'Garlic'])}
          className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors shrink-0 cursor-pointer"
        >
          🐟 {localizeIngredientName('Salmon Fillets', language)} + {localizeIngredientName('Asparagus', language)}
        </button>
        <button
          onClick={() => handleApplyPreset(['Eggs', 'Tomatoes', 'Bell Peppers', 'Yellow Onion', 'Feta Cheese'])}
          className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors shrink-0 cursor-pointer"
        >
          🍳 {localizeIngredientName('Eggs', language)} + {localizeIngredientName('Tomatoes', language)}
        </button>
      </div>

      {/* If Searching, show search results */}
      {searchTerm ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-stone-600">Matching ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {filteredSearch.map((item) => {
              const isSelected = selectedIngredients.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => handleToggle(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-stone-900 border-stone-900 text-white'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-amber-600 hover:text-amber-900'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                  <span>{localizeIngredientName(item, language)}</span>
                </button>
              );
            })}
            {filteredSearch.length === 0 && (
              <p className="text-xs text-stone-400">
                Click "+" above to add "{searchTerm}" as a custom item!
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Categorized Selector */
        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-stone-200 pb-2 scrollbar-none text-xs">
            {INGREDIENT_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.name
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {localizeCategoryName(cat.name, language)}
              </button>
            ))}
          </div>

          {/* Category Items */}
          <div className="flex flex-wrap gap-2 pt-1">
            {INGREDIENT_CATEGORIES.find((c) => c.name === activeCategory)?.items.map((item) => {
              const isSelected = selectedIngredients.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => handleToggle(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-stone-900 border-stone-900 text-white shadow-2xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                  <span>{localizeIngredientName(item, language)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
