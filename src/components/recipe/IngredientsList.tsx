import React, { useState } from 'react';
import { IngredientItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { localizeIngredientName, localizeUnitName } from '../../lib/i18n';
import { Users, Check } from 'lucide-react';

interface IngredientsListProps {
  ingredients: IngredientItem[];
  baseServings: number;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
  baseServings,
}) => {
  const { language, t } = useApp();
  const [currentServings, setCurrentServings] = useState(baseServings);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const scaleFactor = currentServings / (baseServings || 1);

  const toggleCheck = (name: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Helper to scale numeric amounts safely
  const formatAmount = (amountStr: string) => {
    const num = parseFloat(amountStr);
    if (isNaN(num)) return amountStr;
    const scaled = num * scaleFactor;
    return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs">
      {/* Header with Serving Scaler */}
      <div className="flex items-center justify-between pb-5 border-b border-stone-100 mb-5">
        <div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            {t('recipe_ingredients_title')}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {ingredients.length} items
          </p>
        </div>

        {/* Servings stepper */}
        <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1">
          <Users className="w-3.5 h-3.5 text-stone-500" />
          <button
            onClick={() => setCurrentServings((s) => Math.max(1, s - 1))}
            className="w-6 h-6 rounded-md hover:bg-stone-200/80 text-xs font-bold text-stone-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            -
          </button>
          <span className="text-xs font-semibold text-stone-900 min-w-[50px] text-center font-mono">
            {currentServings}
          </span>
          <button
            onClick={() => setCurrentServings((s) => Math.min(16, s + 1))}
            className="w-6 h-6 rounded-md hover:bg-stone-200/80 text-xs font-bold text-stone-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Ingredient Items with Checklist */}
      <ul className="divide-y divide-stone-100">
        {ingredients.map((item, idx) => {
          const isChecked = Boolean(checkedItems[item.name]);
          const scaledAmount = formatAmount(item.amount);
          const localizedName = localizeIngredientName(item.name, language);
          const localizedUnit = localizeUnitName(item.unit, language);

          return (
            <li
              key={idx}
              onClick={() => toggleCheck(item.name)}
              className={`py-3 flex items-center justify-between gap-3 text-sm cursor-pointer group transition-colors ${
                isChecked ? 'text-stone-400 line-through' : 'text-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-stone-300 group-hover:border-amber-600'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium ${isChecked ? 'text-stone-400' : 'text-stone-900'}`}>
                    {localizedName}
                  </span>
                  {item.notes && (
                    <span className="text-xs text-stone-400 italic">
                      {item.notes}
                    </span>
                  )}
                </div>
              </div>

              {/* Amount and Unit */}
              <div className="text-xs font-semibold text-stone-700 font-mono text-right shrink-0">
                {scaledAmount} {localizedUnit}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
