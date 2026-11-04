import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RecipeGrid } from '../components/recipe/RecipeGrid';
import { Sparkles, Bookmark, Heart, ChefHat } from 'lucide-react';

export const MyRecipesPage: React.FC = () => {
  const { recipes, user, navigate, t } = useApp();
  const [activeTab, setActiveTab] = useState<'created' | 'saved' | 'liked'>('created');

  const createdRecipes = recipes.filter(
    (r) => user.createdRecipeIds.includes(r.id) || r.author.id === user.id
  );

  const savedRecipes = recipes.filter((r) => user.savedRecipeIds.includes(r.id));
  const likedRecipes = recipes.filter((r) => user.likedRecipeIds.includes(r.id));

  const currentList =
    activeTab === 'created'
      ? createdRecipes
      : activeTab === 'saved'
      ? savedRecipes
      : likedRecipes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
            {t('my_recipes_title')}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {t('my_recipes_subtitle')}
          </p>
        </div>

        <button
          onClick={() => navigate('/create')}
          className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{t('my_create_new_btn')}</span>
        </button>
      </div>

      {/* Segmented Control Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab('created')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'created'
              ? 'bg-stone-900 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>{t('my_creations_tab')}</span>
          <span className="font-mono text-[11px] opacity-75">({createdRecipes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-stone-900 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>{t('my_saved_tab')}</span>
          <span className="font-mono text-[11px] opacity-75">({savedRecipes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'liked'
              ? 'bg-stone-900 text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{t('my_liked_tab')}</span>
          <span className="font-mono text-[11px] opacity-75">({likedRecipes.length})</span>
        </button>
      </div>

      {/* Grid Display */}
      <RecipeGrid
        recipes={currentList}
        emptyTitle={
          activeTab === 'created'
            ? t('my_empty_created_title')
            : activeTab === 'saved'
            ? t('my_empty_saved_title')
            : t('my_empty_liked_title')
        }
        emptyMessage={
          activeTab === 'created'
            ? t('my_empty_created_msg')
            : activeTab === 'saved'
            ? t('my_empty_saved_msg')
            : t('my_empty_liked_msg')
        }
        emptyActionLabel={
          activeTab === 'created'
            ? t('my_empty_create_action')
            : t('my_empty_explore_action')
        }
        onEmptyAction={() => navigate(activeTab === 'created' ? '/create' : '/explore')}
      />
    </div>
  );
};
