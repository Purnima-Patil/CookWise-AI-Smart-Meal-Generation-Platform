import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IngredientsList } from '../components/recipe/IngredientsList';
import { InstructionsTimeline } from '../components/recipe/InstructionsTimeline';
import { AudioPlayer } from '../components/recipe/AudioPlayer';
import { AICookingAssistant } from '../components/ai/AICookingAssistant';
import { RecipeShareModal } from '../components/recipe/RecipeShareModal';
import {
  localizeRecipeContent,
  localizeDifficultyName,
  localizeCuisineName,
  localizeMealTypeName,
  localizeDietaryName,
} from '../lib/i18n';
import {
  Clock,
  Flame,
  Users,
  ChefHat,
  Bookmark,
  Heart,
  Share2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface RecipeDetailPageProps {
  recipeId: string;
}

export const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({ recipeId }) => {
  const { recipes, navigate, toggleLikeRecipe, toggleSaveRecipe, user, language, t } = useApp();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const rawRecipe = recipes.find((r) => r.id === recipeId) || recipes[0];
  const recipe = rawRecipe ? localizeRecipeContent(rawRecipe, language) : null;

  if (!recipe) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">Recipe Not Found</h2>
        <p className="text-sm text-stone-500 mb-6">The requested recipe could not be located.</p>
        <button
          onClick={() => navigate('/explore')}
          className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-medium text-xs cursor-pointer"
        >
          {t('nav_explore')}
        </button>
      </div>
    );
  }

  const isLiked = recipe.isLiked || user.likedRecipeIds.includes(recipe.id);
  const isSaved = recipe.isSaved || user.savedRecipeIds.includes(recipe.id);

  const localizedCuisine = localizeCuisineName(recipe.cuisine, language);
  const localizedMeal = localizeMealTypeName(recipe.mealType, language);
  const localizedDifficulty = localizeDifficultyName(recipe.difficulty, language);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/explore')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>{t('nav_explore')}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span>{localizedCuisine}</span>
          <span aria-hidden="true">/</span>
          <span>{localizedMeal}</span>
          <span aria-hidden="true">/</span>
          <span className="text-stone-700 font-medium truncate max-w-[150px]">{recipe.title}</span>
        </div>
      </div>

      {/* Top Hero Section: Large Recipe Image & Metadata Header */}
      <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs">
        
        {/* Large Image Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-stone-100">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent pointer-events-none" />

          {/* Floating Actions on Top Right */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => toggleLikeRecipe(recipe.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                isLiked
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-white/80 text-stone-700 hover:bg-white'
              }`}
              title={t('nav_liked')}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => toggleSaveRecipe(recipe.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                isSaved
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-white/80 text-stone-700 hover:bg-white'
              }`}
              title={t('nav_saved')}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setIsShareOpen(true)}
              className="p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 backdrop-blur-md transition-all shadow-md cursor-pointer"
              title={t('recipe_share')}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Overlay Details (Title, Description, Tags) */}
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-medium mb-2">
              <span className="bg-stone-900/60 backdrop-blur-md px-2.5 py-0.5 rounded-md text-amber-400 font-semibold uppercase tracking-wider text-[10px]">
                {localizedCuisine}
              </span>
              <span aria-hidden="true" className="text-white/60">·</span>
              <span>{localizedMeal}</span>
              {recipe.dietary.map((d) => (
                <React.Fragment key={d}>
                  <span aria-hidden="true" className="text-white/60">·</span>
                  <span>{localizeDietaryName(d, language)}</span>
                </React.Fragment>
              ))}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
              {recipe.title}
            </h1>

            <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 leading-relaxed">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Content Below Image: Recipe Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-100 bg-stone-50/60 border-t border-stone-100 text-xs">
          
          <div className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-stone-400 font-medium text-[11px]">{t('recipe_cook_time')}</p>
              <p className="text-stone-900 font-bold font-mono">
                {recipe.prepTime + recipe.cookTime} {t('recipe_mins')} <span className="text-[10px] text-stone-400 font-normal">({recipe.prepTime}m {t('recipe_prep_time')})</span>
              </p>
            </div>
          </div>

          <div className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-stone-400 font-medium text-[11px]">{t('recipe_servings')}</p>
              <p className="text-stone-900 font-bold font-mono">
                {recipe.servings} {t('create_servings_label')}
              </p>
            </div>
          </div>

          <div className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
              <ChefHat className="w-4 h-4" />
            </div>
            <div>
              <p className="text-stone-400 font-medium text-[11px]">{t('recipe_difficulty')}</p>
              <p className="text-stone-900 font-bold">
                {localizedDifficulty}
              </p>
            </div>
          </div>

          <div className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-stone-400 font-medium text-[11px]">{t('recipe_calories')}</p>
              <p className="text-stone-900 font-bold font-mono">
                {recipe.nutrition?.calories || 450} kcal
              </p>
            </div>
          </div>

        </div>

        {/* Nutritional Breakdown strip below the image */}
        {recipe.nutrition && (
          <div className="px-6 py-3 bg-white border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('recipe_nutrition_title')}:</span>
            </div>
            <div className="flex items-center gap-4 text-stone-700 font-mono text-[11px]">
              <span>{t('recipe_protein')}: <strong className="text-stone-900">{recipe.nutrition.protein}g</strong></span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{t('recipe_carbs')}: <strong className="text-stone-900">{recipe.nutrition.carbs}g</strong></span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{t('recipe_fat')}: <strong className="text-stone-900">{recipe.nutrition.fat}g</strong></span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {recipe.tags.map((tag) => (
                <span key={tag} className="text-stone-400 hover:text-stone-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Audio Voice Narration Player (Reads in selected language) */}
      <AudioPlayer
        instructions={recipe.instructions}
        recipeTitle={recipe.title}
        onActiveStepChange={setActiveStepIndex}
      />

      {/* Main Two-Column Layout: Ingredients (Left) & Instructions Timeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Ingredients Column */}
        <div className="lg:col-span-5 space-y-6">
          <IngredientsList
            ingredients={recipe.ingredients}
            baseServings={recipe.servings}
          />
        </div>

        {/* Instructions Column */}
        <div className="lg:col-span-7 space-y-8">
          <InstructionsTimeline
            instructions={recipe.instructions}
            activeStepIndex={activeStepIndex}
            onSelectStep={setActiveStepIndex}
          />

          {/* Dedicated AI Cooking Assistant Chatbot Card */}
          <div className="pt-2">
            <AICookingAssistant recipe={recipe} />
          </div>
        </div>

      </div>

      {/* Share Modal */}
      <RecipeShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        recipe={recipe}
      />
    </div>
  );
};
