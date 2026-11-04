import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { RecipeGrid } from '../components/recipe/RecipeGrid';
import { Search, X, Sparkles } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { recipes, searchQueryParam, navigate, t } = useApp();
  const [searchTerm, setSearchTerm] = useState(searchQueryParam || '');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    if (searchQueryParam) {
      setSearchTerm(searchQueryParam);
    }
  }, [searchQueryParam]);

  const popularTags = [
    '#Vegetarian',
    '#HighProtein',
    '#Under30Mins',
    '#Italian',
    '#KetoFriendly',
    '#GlutenFree',
    '#Vegan',
    '#ComfortFood',
  ];

  const results = recipes.filter((r) => {
    // If tag filter is selected
    if (selectedTag && !r.tags.includes(selectedTag)) {
      return false;
    }

    if (!searchTerm.trim()) {
      return true;
    }

    const q = searchTerm.toLowerCase();
    const inTitle = r.title.toLowerCase().includes(q);
    const inDesc = r.description.toLowerCase().includes(q);
    const inCuisine = r.cuisine.toLowerCase().includes(q);
    const inTags = r.tags.some((t) => t.toLowerCase().includes(q));
    const inIngredients = r.ingredients.some((i) => i.name.toLowerCase().includes(q));
    const inDietary = r.dietary.some((d) => d.toLowerCase().includes(q));

    return inTitle || inDesc || inCuisine || inTags || inIngredients || inDietary;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Big Search Input */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          {t('nav_search')}
        </h1>
        <p className="text-xs text-stone-500">
          {t('explore_subtitle')}
        </p>

        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('explore_search_placeholder')}
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 shadow-xs transition-all placeholder:text-stone-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Popular Tag Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs">
          <span className="text-stone-400 font-medium mr-1">Trending:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-stone-400 hover:text-stone-700 underline ml-2 cursor-pointer"
            >
              {t('explore_clear_filters')}
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
        <span>
          {t('explore_showing_recipes')} <strong className="text-stone-900 font-semibold">{results.length}</strong> {t('explore_curated_recipes')}
        </span>
        {searchTerm && (
          <span className="text-stone-400">
            Filtering by: <span className="text-stone-700 font-medium">"{searchTerm}"</span>
          </span>
        )}
      </div>

      {/* Results Grid */}
      <RecipeGrid
        recipes={results}
        emptyTitle={t('explore_empty_title')}
        emptyMessage={t('explore_empty_msg')}
        emptyActionLabel={t('explore_empty_action')}
        onEmptyAction={() => navigate('/create')}
      />
    </div>
  );
};
