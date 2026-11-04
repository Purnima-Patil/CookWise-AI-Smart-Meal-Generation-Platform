import React, { useState } from 'react';
import { Recipe } from '../../types';
import { useApp } from '../../context/AppContext';
import { localizeRecipeContent } from '../../lib/i18n';
import { Heart, Bookmark, Clock, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { navigate, toggleLikeRecipe, toggleSaveRecipe, user, language, t } = useApp();
  const [imageError, setImageError] = useState(false);

  const localized = localizeRecipeContent(recipe, language);
  const isLiked = recipe.isLiked || user.likedRecipeIds.includes(recipe.id);
  const isSaved = recipe.isSaved || user.savedRecipeIds.includes(recipe.id);

  const handleCardClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikeRecipe(recipe.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveRecipe(recipe.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Recipe Image Container with 4:3 Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {!imageError ? (
          <img
            src={localized.imageUrl}
            alt={localized.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <ChefHat className="w-10 h-10 mb-2 stroke-1" />
            <span className="text-xs font-medium text-stone-500">{localized.title}</span>
          </div>
        )}

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleSave}
            title={isSaved ? 'Remove from saved' : 'Save recipe'}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer ${
              isSaved
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Time & Difficulty pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] font-medium text-white/90 bg-stone-950/70 backdrop-blur-md px-2.5 py-1 rounded-md">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{localized.prepTime + localized.cookTime} {t('recipe_mins')}</span>
          </div>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>{localized.difficulty}</span>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Metadata Header */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <span className="font-semibold text-amber-800 tracking-wide uppercase text-[11px]">
            {localized.cuisine}
          </span>
          <span aria-hidden="true">·</span>
          <span>{localized.mealType}</span>
          {localized.dietary.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-stone-600 font-medium">{localized.dietary[0]}</span>
            </>
          )}
        </div>

        {/* Recipe Title */}
        <h3 className="font-serif text-lg font-bold text-stone-900 line-clamp-2 mb-2 leading-snug group-hover:text-amber-800 transition-colors">
          {localized.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4 flex-1">
          {localized.description}
        </p>

        {/* AI Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500 mb-4">
          {localized.tags.slice(0, 3).map((tag, idx) => (
            <React.Fragment key={tag}>
              <span className="hover:text-stone-900 transition-colors">{tag}</span>
              {idx < Math.min(localized.tags.length, 3) - 1 && (
                <span aria-hidden="true" className="text-stone-300">·</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card Footer: Author + Like Counter */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {localized.author?.avatarUrl ? (
              <img
                src={localized.author.avatarUrl}
                alt={localized.author.name}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-600">
                {localized.author?.name ? localized.author.name[0] : 'C'}
              </div>
            )}
            <span className="text-xs text-stone-500 truncate max-w-[120px]">
              {localized.author?.name || 'Chef'}
            </span>
          </div>

          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
              isLiked ? 'text-rose-600' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="tabular-nums">{localized.likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
