import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChefHat, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="w-full bg-[#18181B] text-[#A1A1AA] pt-16 pb-24 md:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand & Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-stone-800 text-amber-400 flex items-center justify-center">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Cookwise AI
              </span>
            </div>
            <p className="text-xs leading-relaxed text-stone-400 max-w-sm">
              AI-powered culinary platform transforming ingredients you already have into personalized, restaurant-grade recipes with voice narration and contextual kitchen guidance.
            </p>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('/explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Recipe Discovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/create')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-amber-400/90"
                >
                  <Sparkles className="w-3 h-3" />
                  Create with AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/saved')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Saved Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/my-recipes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Kitchen Creations
                </button>
              </li>
            </ul>
          </div>

          {/* Culinary Features */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-4">
              Key Capabilities
            </h4>
            <p className="text-xs leading-relaxed text-stone-400 mb-3">
              Input ingredients already available in your refrigerator to generate instant culinary formulas with step-by-step audio instructions.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-stone-400">
              <span>Personalized Recipes</span>
              <span aria-hidden="true">·</span>
              <span>Voice Narration</span>
              <span aria-hidden="true">·</span>
              <span>Cooking Assistant</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Cookwise AI. All rights reserved.</p>
          <div className="flex items-center gap-6 text-stone-400">
            <button onClick={() => navigate('/settings')} className="hover:text-stone-300 cursor-pointer">
              Privacy & Settings
            </button>
            <button onClick={() => navigate('/explore')} className="hover:text-stone-300 cursor-pointer">
              Browse All
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
