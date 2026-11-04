import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../assets/images';
import { RecipeCard } from '../components/recipe/RecipeCard';
import {
  Sparkles,
  ArrowRight,
  ChefHat,
  Compass,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, recipes, t } = useApp();

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Quiet Kicker (Zero-Pill Discipline: unboxed text with separator) */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
                <span>{t('app_title')}</span>
                <span aria-hidden="true">·</span>
                <span>{t('hero_feat_smart')}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
                {t('hero_title')}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl text-pretty">
                {t('hero_subtitle')}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/create')}
                  className="px-7 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t('hero_start_btn')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => navigate('/explore')}
                  className="px-7 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:border-stone-300 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-stone-500" />
                  <span>{t('hero_explore_btn')}</span>
                </button>
              </div>

              {/* Ingredient Quick Tags */}
              <div className="pt-4 border-t border-stone-200/80">
                <p className="text-xs text-stone-500 mb-2 font-medium">Common pantry starters right now:</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-700">
                  <span className="px-2.5 py-1 bg-stone-100 rounded-md">🍅 Heirloom Tomatoes</span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded-md">🧄 Garlic</span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded-md">🥬 Baby Spinach</span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded-md">🥚 Farm Eggs</span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded-md">🧀 Parmigiano</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Container */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-stone-200/80 shadow-2xl bg-stone-100 group">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Artisanal culinary kitchen table with fresh pantry ingredients"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />

                {/* Subtle scrim for card contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Preview Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-stone-900 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <ChefHat className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                        <span>Pantry Match: 95%</span>
                        <span aria-hidden="true">·</span>
                        <span>25 mins</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-1">
                        Creamy Tuscan Garlic Rigatoni
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/recipes/rec_tuscan_pasta_01')}
                    className="px-3.5 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. POPULAR RECIPES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-stone-200">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Community Favorites
            </p>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
              Popular AI-Crafted Recipes
            </h2>
          </div>

          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-semibold text-stone-800 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Browse All Recipes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.slice(0, 4).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* 4. STRONG FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-10 sm:p-16 text-center space-y-6 relative overflow-hidden shadow-xl border border-stone-800">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to Cook What You Already Have?
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed">
              Open your refrigerator, pick 3 to 5 ingredients, and watch your personalized gourmet dinner come to life.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/create')}
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm inline-flex items-center gap-2 transition-all hover:scale-105 shadow-xl cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Your First Recipe</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
