import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IngredientSelector } from '../components/create/IngredientSelector';
import { RecipeCustomizer, RecipeCustomizerState } from '../components/create/RecipeCustomizer';
import { GenerationProgressModal } from '../components/create/GenerationProgressModal';
import { generateRecipeWithAI } from '../lib/ai';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const CreateRecipePage: React.FC = () => {
  const { navigate, addNewRecipe, showToast, currentLanguageOption, t } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Rigatoni Pasta',
    'Garlic',
    'Baby Spinach',
    'Heavy Cream',
  ]);

  const [preferences, setPreferences] = useState<RecipeCustomizerState>({
    dietary: ['Vegetarian'],
    cuisine: 'Italian',
    mealType: 'Dinner',
    spiceLevel: 'Medium',
    difficulty: 'Easy',
    servings: 4,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleNextStep = () => {
    if (selectedIngredients.length === 0) {
      showToast('Please select at least 1 ingredient from your kitchen.', 'error');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerate = async () => {
    if (selectedIngredients.length === 0) {
      showToast('Please choose at least 1 ingredient.', 'error');
      return;
    }

    setIsGenerating(true);
    const startTime = Date.now();

    try {
      const generated = await generateRecipeWithAI({
        ingredients: selectedIngredients,
        dietary: preferences.dietary,
        cuisine: preferences.cuisine,
        mealType: preferences.mealType,
        spiceLevel: preferences.spiceLevel,
        difficulty: preferences.difficulty,
        servings: preferences.servings,
        language: currentLanguageOption.name,
      });

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(800, 3200 - elapsed);

      setTimeout(() => {
        addNewRecipe(generated);
        setIsGenerating(false);
        showToast('Your custom AI recipe has been generated!', 'success');
        navigate(`/recipes/${generated.id}`);
      }, remainingTime);
    } catch {
      setIsGenerating(false);
      showToast('Could not complete AI generation. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Wizard Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{t('create_title')}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          {t('create_title')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {t('create_subtitle')}
        </p>
      </div>

      {/* Step Tracker Indicator */}
      <div className="flex items-center justify-center max-w-md mx-auto">
        <div className="flex items-center w-full">
          {/* Step 1 Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= 1
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-200 text-stone-600'
              }`}
            >
              {step > 1 ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : '1'}
            </div>
            <span className="text-[11px] font-semibold text-stone-700 mt-1.5">
              {t('recipe_ingredients_title')}
            </span>
          </div>

          {/* Connecting Line */}
          <div
            className={`flex-1 h-0.5 mx-3 transition-colors ${
              step >= 2 ? 'bg-stone-900' : 'bg-stone-200'
            }`}
          />

          {/* Step 2 Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === 2
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-400 border border-stone-200'
              }`}
            >
              2
            </div>
            <span className="text-[11px] font-semibold text-stone-700 mt-1.5">
              {t('create_preferences_heading')}
            </span>
          </div>
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-xs space-y-8">
        {step === 1 ? (
          <div>
            <div className="border-b border-stone-100 pb-4 mb-6">
              <h2 className="font-serif text-xl font-bold text-stone-900">
                {t('create_ingredients_heading')}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {t('create_subtitle')}
              </p>
            </div>

            <IngredientSelector
              selectedIngredients={selectedIngredients}
              onChange={setSelectedIngredients}
            />

            {/* Step 1 Actions */}
            <div className="pt-8 border-t border-stone-100 flex items-center justify-between">
              <div className="text-xs text-stone-500">
                <span className="font-semibold text-stone-900 font-mono">
                  {selectedIngredients.length}
                </span>{' '}
                {t('recipe_ingredients_title')}
              </div>

              <button
                onClick={handleNextStep}
                disabled={selectedIngredients.length === 0}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>{t('create_preferences_heading')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-b border-stone-100 pb-4 mb-6">
              <h2 className="font-serif text-xl font-bold text-stone-900">
                {t('create_preferences_heading')}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {t('create_subtitle')}
              </p>
            </div>

            <RecipeCustomizer state={preferences} onChange={setPreferences} />

            {/* Step 2 Actions */}
            <div className="pt-8 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={handlePrevStep}
                className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('recipe_ingredients_title')}</span>
              </button>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 transition-all hover:scale-102 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>{t('create_generate_btn')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Generation Pipeline Modal */}
      <GenerationProgressModal
        isOpen={isGenerating}
        ingredientsCount={selectedIngredients.length}
      />
    </div>
  );
};
