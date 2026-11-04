import React, { useState } from 'react';
import { Recipe } from '../../types';
import { X, Check, Copy, Share2 } from 'lucide-react';

interface RecipeShareModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeShareModal: React.FC<RecipeShareModalProps> = ({
  recipe,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://cookwise.ai/recipes/${recipe.id}`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe.title,
          text: `Check out this delicious recipe: "${recipe.title}"!`,
          url: currentUrl,
        })
        .catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Share Recipe</h3>
            <p className="text-xs text-stone-500">Send this recipe link to friends or fellow home cooks</p>
          </div>
        </div>

        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 mb-5">
          <p className="font-semibold text-xs text-stone-900 truncate mb-1">{recipe.title}</p>
          <p className="text-[11px] text-stone-500 line-clamp-1">{recipe.description}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-600 font-mono select-all focus:outline-hidden"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-stone-500" />
            <span>Open System Share Menu</span>
          </button>
        )}
      </div>
    </div>
  );
};
