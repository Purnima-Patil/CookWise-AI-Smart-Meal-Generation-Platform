import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { RecipeGrid } from '../components/recipe/RecipeGrid';
import { RecipeFilters } from '../components/recipe/RecipeFilters';
import { RecipeFiltersState } from '../types';
import { Sparkles } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const { recipes, navigate, t } = useApp();

  const [filters, setFilters] = useState<RecipeFiltersState>({
    searchQuery: '',
    selectedIngredients: [],
    selectedDietary: [],
    selectedCuisine: '',
    selectedMealType: '',
    selectedDifficulty: '',
    sortBy: 'newest',
  });

  const [visibleCount, setVisibleCount] = useState(8);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedIngredients: [],
      selectedDietary: [],
      selectedCuisine: '',
      selectedMealType: '',
      selectedDifficulty: '',
      sortBy: 'newest',
    });
  };

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((r) => {
        // Search query
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchDesc = r.description.toLowerCase().includes(q);
          const matchTags = r.tags.some((t) => t.toLowerCase().includes(q));
          const matchIng = r.ingredients.some((i) => i.name.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTags && !matchIng) return false;
        }

        // Dietary
        if (filters.selectedDietary.length > 0) {
          const hasAllDiet = filters.selectedDietary.every((d) => r.dietary.includes(d));
          if (!hasAllDiet) return false;
        }

        // Cuisine
        if (filters.selectedCuisine && r.cuisine !== filters.selectedCuisine) {
          return false;
        }

        // Meal Type
        if (filters.selectedMealType && r.mealType !== filters.selectedMealType) {
          return false;
        }

        // Difficulty
        if (filters.selectedDifficulty && r.difficulty !== filters.selectedDifficulty) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'popular') {
          return b.likesCount - a.likesCount;
        }
        if (filters.sortBy === 'quickest') {
          return a.prepTime + a.cookTime - (b.prepTime + b.cookTime);
        }
        // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [recipes, filters]);

  const displayedRecipes = filteredRecipes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecipes.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
            {t('explore_title')}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {t('explore_subtitle')}
          </p>
        </div>

        <button
          onClick={() => navigate('/create')}
          className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{t('explore_generate_btn')}</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <RecipeFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
        totalResults={filteredRecipes.length}
      />

      {/* Recipe Grid */}
      <RecipeGrid
        recipes={displayedRecipes}
        emptyTitle={t('explore_empty_title')}
        emptyMessage={t('explore_empty_msg')}
        emptyActionLabel={t('explore_empty_action')}
        onEmptyAction={() => navigate('/create')}
      />

      {/* Infinite scrolling / Load more */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="px-6 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 text-xs font-semibold transition-all cursor-pointer shadow-xs"
          >
            {t('explore_load_more')} ({filteredRecipes.length - visibleCount})
          </button>
        </div>
      )}
    </div>
  );
};
