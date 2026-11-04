export type Difficulty = 'Easy' | 'Medium' | 'Advanced';

export interface IngredientItem {
  name: string;
  amount: string;
  unit?: string;
  notes?: string;
}

export interface InstructionStep {
  stepNumber: number;
  instruction: string;
  durationMinutes?: number;
  tip?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: Difficulty;
  cuisine: string;
  mealType: string;
  dietary: string[];
  ingredients: IngredientItem[];
  instructions: InstructionStep[];
  tags: string[];
  imageUrl: string;
  audioUrl?: string;
  likesCount: number;
  savesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  matchedIngredients: string[];
  missingIngredients?: string[];
  nutrition?: NutritionInfo;
  createdAt: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'gu' | 'es' | 'fr' | 'de';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  dietaryPreferences: string[];
  savedRecipeIds: string[];
  likedRecipeIds: string[];
  createdRecipeIds: string[];
  language?: SupportedLanguage;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'save' | 'generated' | 'comment' | 'recommendation';
  title: string;
  message: string;
  recipeId?: string;
  timestamp: string;
  read: boolean;
  titleKey?: string;
  messageKey?: string;
  params?: Record<string, string>;
}

export interface RecipeFiltersState {
  searchQuery: string;
  selectedIngredients: string[];
  selectedDietary: string[];
  selectedCuisine: string;
  selectedMealType: string;
  selectedDifficulty: string;
  sortBy: 'newest' | 'popular' | 'quickest';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedAction?: {
    type: 'step' | 'substitution';
    label: string;
    target?: number | string;
  };
}
