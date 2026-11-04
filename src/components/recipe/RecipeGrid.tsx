import React from 'react';
import { Recipe } from '../../types';
import { RecipeCard } from './RecipeCard';
import { ChefHat } from 'lucide-react';

interface RecipeGridProps {
  recipes: Recipe[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  isLoading = false,
  emptyTitle = 'No recipes found',
  emptyMessage = 'Try adjusting your search criteria or add new ingredients.',
  emptyActionLabel = 'Create a Recipe',
  onEmptyAction,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs animate-pulse"
          >
            <div className="aspect-[4/3] w-full bg-stone-200" />
            <div className="p-5 space-y-3">
              <div className="h-3 w-1/3 bg-stone-200 rounded-sm" />
              <div className="h-5 w-4/5 bg-stone-200 rounded-sm" />
              <div className="h-3 w-full bg-stone-100 rounded-sm" />
              <div className="h-3 w-2/3 bg-stone-100 rounded-sm" />
              <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                <div className="h-4 w-20 bg-stone-200 rounded-sm" />
                <div className="h-4 w-10 bg-stone-200 rounded-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200/80 max-w-xl mx-auto shadow-xs my-8">
        <div className="w-14 h-14 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <ChefHat className="w-7 h-7 stroke-1" />
        </div>
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{emptyTitle}</h3>
        <p className="text-sm text-stone-500 mb-6 max-w-md mx-auto leading-relaxed">
          {emptyMessage}
        </p>
        {onEmptyAction && (
          <button
            onClick={onEmptyAction}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-all cursor-pointer shadow-sm"
          >
            {emptyActionLabel}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
