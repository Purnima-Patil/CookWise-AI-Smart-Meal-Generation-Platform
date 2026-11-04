import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RecipeGrid } from '../components/recipe/RecipeGrid';
import { Heart, Search, X } from 'lucide-react';

export const LikedRecipesPage: React.FC = () => {
  const { recipes, user, navigate, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const likedRecipes = recipes.filter((r) => user.likedRecipeIds.includes(r.id));

  const filtered = likedRecipes.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
              {t('liked_title')}
            </h1>
          </div>
          <p className="text-xs text-stone-500">
            {t('liked_subtitle')}
          </p>
        </div>

        {/* Quick search inside liked */}
        {likedRecipes.length > 0 && (
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('liked_search_placeholder')}
              className="w-full pl-9 pr-9 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Grid */}
      <RecipeGrid
        recipes={filtered}
        emptyTitle={t('my_empty_liked_title')}
        emptyMessage={t('my_empty_liked_msg')}
        emptyActionLabel={t('liked_empty_action')}
        onEmptyAction={() => navigate('/explore')}
      />
    </div>
  );
};
