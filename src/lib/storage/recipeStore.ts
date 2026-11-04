import { Recipe, NotificationItem, User } from '../../types';
import { ASSET_IMAGES } from '../../assets/images';
import { imageStore } from './imageStore';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec_tuscan_pasta_01',
    title: 'Creamy Tuscan Rigatoni with Sun-Dried Tomatoes & Spinach',
    description: 'Silky garlic-infused cream sauce coating al dente rigatoni, punctuated by tart sun-dried tomatoes, tender baby spinach, and aged parmesan crisps.',
    prepTime: 10,
    cookTime: 18,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Italian',
    mealType: 'Dinner',
    dietary: ['Vegetarian'],
    matchedIngredients: ['Pasta', 'Garlic', 'Heavy Cream', 'Spinach', 'Parmesan', 'Olive Oil'],
    missingIngredients: ['Sun-dried tomatoes', 'Black pepper'],
    ingredients: [
      { name: 'Rigatoni pasta', amount: '350', unit: 'g' },
      { name: 'Garlic cloves, minced', amount: '4', unit: 'cloves' },
      { name: 'Sun-dried tomatoes in oil, sliced', amount: '80', unit: 'g' },
      { name: 'Fresh baby spinach', amount: '120', unit: 'g' },
      { name: 'Heavy cream (or coconut cream)', amount: '200', unit: 'ml' },
      { name: 'Parmigiano-Reggiano, freshly grated', amount: '60', unit: 'g' },
      { name: 'Extra virgin olive oil', amount: '2', unit: 'tbsp' },
      { name: 'Sea salt & freshly cracked pepper', amount: 'to taste' },
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Bring a large pot of salted water to a rolling boil. Cook the rigatoni until 1 minute shy of al dente (about 9 minutes). Reserve 1/2 cup of starchy pasta water before draining.',
        durationMinutes: 10,
        tip: 'Salting your pasta water until it tastes like the sea is essential for seasoning pasta from the inside out.',
      },
      {
        stepNumber: 2,
        instruction: 'In a wide skillet over medium heat, warm the olive oil. Add minced garlic and sliced sun-dried tomatoes. Sauté gently for 90 seconds until fragrant and golden, taking care not to scorch the garlic.',
        durationMinutes: 2,
        tip: 'Lower the flame if the garlic starts browning too rapidly.',
      },
      {
        stepNumber: 3,
        instruction: 'Pour in the heavy cream and bring to a gentle simmer for 3 minutes until slightly thickened. Whisk in grated parmesan cheese until smoothly incorporated into a velvety sauce.',
        durationMinutes: 3,
        tip: 'Turn off the direct flame when melting hard aged cheeses to prevent sauce separation.',
      },
      {
        stepNumber: 4,
        instruction: 'Fold in the fresh baby spinach by handfuls until just wilted into the warm sauce (about 1 minute). Add a splash of the reserved pasta cooking water.',
        durationMinutes: 2,
      },
      {
        stepNumber: 5,
        instruction: 'Toss the drained rigatoni into the sauce. Simmer together for 1-2 minutes until each noodle is luxuriously glazed. Finish with cracked black pepper and extra parmesan flakes.',
        durationMinutes: 2,
        tip: 'Let sit for 2 minutes before serving so the sauce clings perfectly to the rigatoni ridges.',
      },
    ],
    tags: ['#Italian', '#Vegetarian', '#QuickMeal', '#ComfortFood', '#Under30Mins'],
    imageUrl: ASSET_IMAGES.tuscanPasta,
    likesCount: 248,
    savesCount: 182,
    isLiked: false,
    isSaved: false,
    author: {
      id: 'chef_elena',
      name: 'Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    },
    nutrition: {
      calories: 520,
      protein: 16,
      carbs: 64,
      fat: 22,
    },
    createdAt: '2026-09-20T14:30:00Z',
  },
  {
    id: 'rec_seared_salmon_02',
    title: 'Crispy Skin Wild Salmon with Lemon-Dill Emulsion & Charred Asparagus',
    description: 'Sustainably sourced salmon fillet seared to a golden shattering crisp, served over tender charred asparagus spears in a warm lemon-butter dill pan sauce.',
    prepTime: 12,
    cookTime: 14,
    servings: 2,
    difficulty: 'Medium',
    cuisine: 'Mediterranean',
    mealType: 'Dinner',
    dietary: ['Gluten-Free', 'Keto', 'Pescatarian'],
    matchedIngredients: ['Salmon Fillets', 'Asparagus', 'Lemon', 'Butter', 'Garlic', 'Olive Oil'],
    missingIngredients: ['Fresh dill'],
    ingredients: [
      { name: 'Fresh salmon fillets, skin-on', amount: '2', unit: 'fillets (180g each)' },
      { name: 'Fresh green asparagus, woody ends trimmed', amount: '300', unit: 'g' },
      { name: 'Unsalted butter', amount: '40', unit: 'g' },
      { name: 'Juice and zest of fresh lemon', amount: '1', unit: 'lemon' },
      { name: 'Fresh dill fronds, chopped', amount: '2', unit: 'tbsp' },
      { name: 'Garlic cloves, crushed', amount: '2', unit: 'cloves' },
      { name: 'Extra virgin olive oil', amount: '1.5', unit: 'tbsp' },
      { name: 'Flaky Maldon sea salt', amount: 'to taste' },
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Pat salmon skin thoroughly dry with paper towels. Score skin lightly with 3 shallow slashes. Season both sides with sea salt and black pepper.',
        durationMinutes: 3,
        tip: 'Moisture is the enemy of crispy skin. Dry paper towels ensure a restaurant-grade sear.',
      },
      {
        stepNumber: 2,
        instruction: 'Heat a heavy stainless steel or cast-iron skillet over medium-high heat with olive oil until shimmering. Place salmon skin-side down; press gently with a spatula for 10 seconds.',
        durationMinutes: 5,
        tip: 'Hold the fillet down initially to prevent the skin from curling up away from the hot pan.',
      },
      {
        stepNumber: 3,
        instruction: 'Cook 75% of the way through on skin side (about 5-6 minutes) until skin is deep golden and releases freely. Flip gently and sear flesh side for just 1-2 minutes.',
        durationMinutes: 2,
      },
      {
        stepNumber: 4,
        instruction: 'Transfer salmon to a warm resting plate. In the same skillet, toss asparagus spears with minced garlic for 3 minutes until blistered yet crisp-tender.',
        durationMinutes: 3,
      },
      {
        stepNumber: 5,
        instruction: 'Remove asparagus to plating dish. Turn off heat, melt cold butter into the pan juices, whisking rapidly with lemon juice and chopped dill to create an emulsion. Spoon over fish.',
        durationMinutes: 2,
        tip: 'Cold butter melts slowly, forming a naturally glossy emulsion without separating.',
      },
    ],
    tags: ['#HighProtein', '#KetoFriendly', '#GlutenFree', '#Pescatarian', '#Under30Mins'],
    imageUrl: ASSET_IMAGES.searedSalmon,
    likesCount: 394,
    savesCount: 310,
    isLiked: true,
    isSaved: true,
    author: {
      id: 'chef_marcus',
      name: 'Chef Marcus Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    nutrition: {
      calories: 460,
      protein: 42,
      carbs: 6,
      fat: 30,
    },
    createdAt: '2026-09-22T18:15:00Z',
  },
  {
    id: 'rec_thai_curry_03',
    title: 'Aromatic Golden Thai Coconut Curry with Crisp Tofu & Bamboo',
    description: 'A fragrant lemongrass and turmeric coconut broth stewed with golden pan-fried tofu, red bell peppers, snap peas, and sweet basil over steaming jasmine rice.',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Thai',
    mealType: 'Dinner',
    dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
    matchedIngredients: ['Coconut Milk', 'Tofu', 'Bell Peppers', 'Rice', 'Garlic', 'Lime'],
    missingIngredients: ['Yellow curry paste', 'Thai sweet basil'],
    ingredients: [
      { name: 'Extra-firm tofu, pressed and cubed', amount: '400', unit: 'g' },
      { name: 'Full-fat coconut milk', amount: '400', unit: 'ml' },
      { name: 'Yellow or red Thai curry paste', amount: '3', unit: 'tbsp' },
      { name: 'Red bell pepper, sliced into strips', amount: '1', unit: 'large' },
      { name: 'Sugar snap peas or green beans', amount: '150', unit: 'g' },
      { name: 'Fresh ginger root, grated', amount: '1', unit: 'tbsp' },
      { name: 'Fresh lime juice', amount: '2', unit: 'tbsp' },
      { name: 'Steamed jasmine rice', amount: 'for serving' },
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Press tofu between clean kitchen towels to remove excess water. Toss with 1 tbsp neutral oil and brown in a wide wok until edges are golden and crisp.',
        durationMinutes: 7,
      },
      {
        stepNumber: 2,
        instruction: 'Push tofu to the side. Spoon 3 tbsp of the thick coconut cream from the top of the can into the wok. Fry the curry paste in the fat until aromatic and oils split.',
        durationMinutes: 3,
        tip: 'Cracking coconut cream by frying paste in its top fat unleashes authentic Thai restaurant depth.',
      },
      {
        stepNumber: 3,
        instruction: 'Pour in the remaining coconut milk and 1/2 cup vegetable broth. Bring to a gentle boil, then add bell peppers and snap peas. Simmer for 5 minutes.',
        durationMinutes: 5,
      },
      {
        stepNumber: 4,
        instruction: 'Stir in the browned tofu, fresh lime juice, and a pinch of brown sugar. Let flavors marry for 2 minutes before turning off the heat.',
        durationMinutes: 2,
      },
      {
        stepNumber: 5,
        instruction: 'Ladle into deep bowls beside fluffy jasmine rice. Garnish generously with fresh cilantro and fresh lime wedges.',
        durationMinutes: 1,
      },
    ],
    tags: ['#ThaiCurry', '#Vegan', '#DairyFree', '#PlantBased', '#ComfortFood'],
    imageUrl: ASSET_IMAGES.thaiCurry,
    likesCount: 188,
    savesCount: 145,
    isLiked: false,
    isSaved: false,
    author: {
      id: 'chef_sumalee',
      name: 'Sumalee Kaew',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    nutrition: {
      calories: 410,
      protein: 19,
      carbs: 38,
      fat: 24,
    },
    createdAt: '2026-09-24T11:00:00Z',
  },
  {
    id: 'rec_shakshuka_04',
    title: 'Artisan Moroccan Shakshuka with Poached Eggs & Sourdough',
    description: 'Smoky roasted tomato and sweet pepper stew spiced with cumin and smoked paprika, cradling gently poached eggs, crumbled Greek feta, and fresh herbs.',
    prepTime: 10,
    cookTime: 18,
    servings: 3,
    difficulty: 'Easy',
    cuisine: 'Mediterranean',
    mealType: 'Breakfast',
    dietary: ['Vegetarian'],
    matchedIngredients: ['Eggs', 'Tomatoes', 'Bell Peppers', 'Onion', 'Garlic', 'Olive Oil', 'Feta'],
    missingIngredients: ['Smoked paprika', 'Sourdough bread'],
    ingredients: [
      { name: 'Organic large eggs', amount: '4', unit: 'eggs' },
      { name: 'Whole peeled San Marzano tomatoes, crushed', amount: '1', unit: 'can (400g)' },
      { name: 'Red bell pepper, diced', amount: '1', unit: 'medium' },
      { name: 'Yellow onion, finely chopped', amount: '1', unit: 'medium' },
      { name: 'Garlic cloves, sliced', amount: '3', unit: 'cloves' },
      { name: 'Ground cumin & smoked Spanish paprika', amount: '1', unit: 'tsp each' },
      { name: 'Feta cheese, crumbled', amount: '60', unit: 'g' },
      { name: 'Crusty artisan sourdough slices', amount: 'for dipping' },
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: 'Heat olive oil in an oven-safe cast iron skillet over medium heat. Sauté chopped onions and bell peppers for 6 minutes until soft and caramelized at the edges.',
        durationMinutes: 6,
      },
      {
        stepNumber: 2,
        instruction: 'Add garlic, cumin, smoked paprika, and red pepper flakes. Toast the spices for 1 minute until fragrant.',
        durationMinutes: 1,
        tip: 'Blooming ground spices in warm oil unlocks fat-soluble aromatics.',
      },
      {
        stepNumber: 3,
        instruction: 'Pour in crushed tomatoes with their juices. Season with salt and simmer for 8 minutes until the sauce reduces into a thick, glossy consistency.',
        durationMinutes: 8,
      },
      {
        stepNumber: 4,
        instruction: 'Make 4 shallow wells in the sauce with the back of a spoon. Crack an egg into each well. Cover with lid and cook on low heat for 5-7 minutes until whites are set and yolks are gently runny.',
        durationMinutes: 6,
        tip: 'Watch closely: you want the egg whites opaque while the yellow yolk jiggles.',
      },
      {
        stepNumber: 5,
        instruction: 'Scatter crumbled feta, fresh parsley, and cilantro over top. Serve immediately in the skillet with toasted thick slices of sourdough bread.',
        durationMinutes: 2,
      },
    ],
    tags: ['#Mediterranean', '#Vegetarian', '#BrunchFavorite', '#HighProtein', '#OnePanMeal'],
    imageUrl: ASSET_IMAGES.shakshuka,
    likesCount: 512,
    savesCount: 429,
    isLiked: true,
    isSaved: false,
    author: {
      id: 'chef_elena',
      name: 'Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    },
    nutrition: {
      calories: 340,
      protein: 18,
      carbs: 22,
      fat: 20,
    },
    createdAt: '2026-09-25T09:20:00Z',
  },
];

export const CURRENT_USER: User = {
  id: 'user_alex_dev',
  name: 'Alex Rivera',
  email: 'alex.rivera@cs.edu',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  bio: 'Computer Engineering Senior · AI Culinary Experimenter & Home Cook.',
  dietaryPreferences: ['Low-Sodium', 'High-Protein'],
  savedRecipeIds: ['rec_seared_salmon_02'],
  likedRecipeIds: ['rec_seared_salmon_02', 'rec_shakshuka_04'],
  createdRecipeIds: [],
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    type: 'like',
    title: 'Recipe Liked',
    message: 'Chef Marcus Vance liked your recipe idea "Creamy Tuscan Rigatoni".',
    recipeId: 'rec_tuscan_pasta_01',
    timestamp: '15 minutes ago',
    read: false,
    titleKey: 'notif_like_title',
    messageKey: 'notif_01_msg',
  },
  {
    id: 'notif_02',
    type: 'generated',
    title: 'AI Generation Completed',
    message: 'Your custom recipe based on Salmon, Asparagus & Lemon is ready to cook!',
    recipeId: 'rec_seared_salmon_02',
    timestamp: '2 hours ago',
    read: false,
    titleKey: 'notif_gen_title',
    messageKey: 'notif_02_msg',
  },
  {
    id: 'notif_03',
    type: 'recommendation',
    title: 'New Culinary Match',
    message: 'We noticed you have Eggs and Tomatoes. Check out the Artisan Moroccan Shakshuka!',
    recipeId: 'rec_shakshuka_04',
    timestamp: '1 day ago',
    read: true,
    titleKey: 'notif_rec_title',
    messageKey: 'notif_03_msg',
  },
  {
    id: 'notif_04',
    type: 'save',
    title: 'Recipe Saved',
    message: 'Elena Rostova saved your custom recipe to her Culinary Favorites.',
    timestamp: '2 days ago',
    read: true,
    titleKey: 'notif_save_title',
    messageKey: 'notif_04_msg',
  },
];

const STORAGE_KEYS = {
  RECIPES: 'smart_recipes_v2',
  USER: 'smart_user_v2',
  NOTIFS: 'smart_notifs_v2',
  AUTH: 'smart_auth_v2',
  LANG: 'smart_lang_v2',
};

// In-memory cache for ultra-fast, zero-quota memory retention
const inMemoryRecipeCache = new Map<string, Recipe>();

/**
 * Returns a high-definition curated archetype image for any dish
 * used when stripping multi-megabyte base64 payloads to preserve localStorage quota.
 */
export function getSafeFallbackImage(recipe: Partial<Recipe>): string {
  const text = `${recipe.title || ''} ${(recipe.matchedIngredients || []).join(' ')} ${recipe.cuisine || ''} ${recipe.mealType || ''}`.toLowerCase();
  
  if (text.includes('egg') || text.includes('scramble') || text.includes('omelet') || text.includes('frittata')) {
    return ASSET_IMAGES.eggScramble;
  }
  if (text.includes('salmon') || text.includes('fish') || text.includes('shrimp') || text.includes('seafood') || text.includes('tuna')) {
    return ASSET_IMAGES.searedSalmon;
  }
  if (text.includes('curry') || text.includes('thai') || text.includes('coconut milk') || text.includes('masala') || text.includes('tikka')) {
    return ASSET_IMAGES.thaiCurry;
  }
  if (text.includes('pasta') || text.includes('spaghetti') || text.includes('rigatoni') || text.includes('fettuccine') || text.includes('noodle')) {
    return ASSET_IMAGES.tuscanPasta;
  }
  if (text.includes('soup') || text.includes('dal') || text.includes('daal') || text.includes('stew') || text.includes('lentil') || text.includes('broth')) {
    return ASSET_IMAGES.heartySoup;
  }
  if (text.includes('salad') || text.includes('greens') || text.includes('lettuce') || text.includes('kale') || text.includes('avocado')) {
    return ASSET_IMAGES.crispSalad;
  }
  if (text.includes('bowl') || text.includes('grain') || text.includes('rice') || text.includes('quinoa') || text.includes('chickpea')) {
    return ASSET_IMAGES.grainBowl;
  }
  if (text.includes('sandwich') || text.includes('toast') || text.includes('burger') || text.includes('melt') || text.includes('sourdough')) {
    return ASSET_IMAGES.grilledSandwich;
  }
  if (text.includes('shakshuka') || text.includes('tomato') || text.includes('bell pepper')) {
    return ASSET_IMAGES.shakshuka;
  }
  return ASSET_IMAGES.goldenChicken;
}

/**
 * Bulletproof setItem with proactive quota recovery and self-healing.
 * Catches QuotaExceededError and prunes redundant/oversized data automatically.
 */
function safeLocalStorageSet(key: string, value: string): boolean {
  if (typeof window === 'undefined') return true;

  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err: unknown) {
    console.warn(`[Storage] localStorage write failed for key "${key}". Running quota recovery...`, err);

    try {
      // Step 1: Strip any giant base64 images currently lingering in smart_recipes_v2
      const rawRecipes = localStorage.getItem(STORAGE_KEYS.RECIPES);
      if (rawRecipes) {
        try {
          const parsed = JSON.parse(rawRecipes) as Recipe[];
          let cleanedAny = false;
          const cleaned = parsed.map((r) => {
            if (r.imageUrl && (r.imageUrl.startsWith('data:') || r.imageUrl.length > 1500)) {
              cleanedAny = true;
              return { ...r, imageUrl: getSafeFallbackImage(r) };
            }
            return r;
          });
          if (cleanedAny) {
            localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(cleaned));
          }
        } catch {
          localStorage.removeItem(STORAGE_KEYS.RECIPES);
        }
      }

      // Step 2: Prune notifications to max 5 items
      try {
        const rawNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFS);
        if (rawNotifs) {
          const notifs = JSON.parse(rawNotifs);
          if (Array.isArray(notifs) && notifs.length > 5) {
            localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifs.slice(0, 5)));
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEYS.NOTIFS);
      }

      // Step 3: Sanitize user avatar if it's bloated
      try {
        const rawUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (rawUser) {
          const u = JSON.parse(rawUser);
          if (u.avatar && (u.avatar.startsWith('data:') || u.avatar.length > 1500)) {
            u.avatar = CURRENT_USER.avatar;
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u));
          }
        }
      } catch {
        // ignore
      }

      // Step 4: If still failing and setting recipes, trim to recent 15 recipes
      if (key === STORAGE_KEYS.RECIPES) {
        try {
          const toSave = JSON.parse(value) as Recipe[];
          if (Array.isArray(toSave) && toSave.length > 15) {
            const trimmed = toSave.slice(0, 15).map((r) => {
              if (r.imageUrl && (r.imageUrl.startsWith('data:') || r.imageUrl.length > 1500)) {
                return { ...r, imageUrl: getSafeFallbackImage(r) };
              }
              return r;
            });
            localStorage.setItem(key, JSON.stringify(trimmed));
            return true;
          }
        } catch {
          // ignore
        }
      }

      // Step 5: Retry setting original item
      localStorage.setItem(key, value);
      return true;
    } catch (secondErr) {
      console.warn(`[Storage] Storage quota recovery failed for "${key}". Retaining state in memory:`, secondErr);
      return false;
    }
  }
}

// Safe LocalStorage Helper with IndexedDB and In-Memory Fallback
export const recipeStore = {
  getRecipes(): Recipe[] {
    if (typeof window === 'undefined') return INITIAL_RECIPES;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECIPES);
      if (!stored) {
        safeLocalStorageSet(STORAGE_KEYS.RECIPES, JSON.stringify(INITIAL_RECIPES));
        return INITIAL_RECIPES;
      }
      
      const parsed: Recipe[] = JSON.parse(stored);
      let needsResave = false;

      // Self-healing check: automatically strip any legacy base64 data URLs exceeding 1.5KB
      const sanitized = parsed.map((r) => {
        // Check if we have a high-res image cached in memory or IndexedDB
        const memoryImage = inMemoryRecipeCache.get(r.id)?.imageUrl || imageStore.getImageSync(r.id);
        
        if (r.imageUrl && (r.imageUrl.startsWith('data:') || r.imageUrl.length > 1500)) {
          // Offload to imageStore asynchronously
          imageStore.saveImage(r.id, r.imageUrl);
          needsResave = true;
          return {
            ...r,
            imageUrl: memoryImage || getSafeFallbackImage(r),
          };
        }

        if (memoryImage) {
          return { ...r, imageUrl: memoryImage };
        }

        return r;
      });

      if (needsResave) {
        safeLocalStorageSet(STORAGE_KEYS.RECIPES, JSON.stringify(sanitized));
      }

      // Also merge any recipes held exclusively in-memory
      for (const [id, recipe] of inMemoryRecipeCache.entries()) {
        if (!sanitized.some((r) => r.id === id)) {
          sanitized.unshift(recipe);
        }
      }

      return sanitized;
    } catch (err) {
      console.warn('[Storage] Failed to parse stored recipes, returning initial collection:', err);
      return INITIAL_RECIPES;
    }
  },

  getRecipeById(id: string): Recipe | undefined {
    if (inMemoryRecipeCache.has(id)) {
      return inMemoryRecipeCache.get(id);
    }
    const recipes = this.getRecipes();
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return undefined;

    // Enhance with stored image if available
    const cachedImage = imageStore.getImageSync(id);
    if (cachedImage) {
      return { ...recipe, imageUrl: cachedImage };
    }
    return recipe;
  },

  saveRecipe(recipe: Recipe): Recipe {
    // 1. Always retain full fidelity (including AI-generated data URLs) in fast memory cache
    inMemoryRecipeCache.set(recipe.id, recipe);

    // 2. If recipe has a large data URL, offload it to IndexedDB
    if (recipe.imageUrl && (recipe.imageUrl.startsWith('data:') || recipe.imageUrl.length > 1500)) {
      imageStore.saveImage(recipe.id, recipe.imageUrl);
    }

    const recipes = this.getRecipes();
    const existingIndex = recipes.findIndex((r) => r.id === recipe.id);
    let updated: Recipe[];
    if (existingIndex >= 0) {
      updated = [...recipes];
      updated[existingIndex] = recipe;
    } else {
      updated = [recipe, ...recipes];
    }

    // 3. For localStorage, sanitize any oversized base64 strings to guarantee quota safety
    const sanitizedForStorage = updated.slice(0, 30).map((r) => {
      if (r.imageUrl && (r.imageUrl.startsWith('data:') || r.imageUrl.length > 1500)) {
        return {
          ...r,
          imageUrl: getSafeFallbackImage(r),
        };
      }
      return r;
    });

    safeLocalStorageSet(STORAGE_KEYS.RECIPES, JSON.stringify(sanitizedForStorage));
    return recipe;
  },

  toggleLike(recipeId: string): { isLiked: boolean; count: number } {
    const recipes = this.getRecipes();
    const user = this.getUser();
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return { isLiked: false, count: 0 };

    const wasLiked = recipe.isLiked || user.likedRecipeIds.includes(recipeId);
    recipe.isLiked = !wasLiked;
    recipe.likesCount = wasLiked ? Math.max(0, recipe.likesCount - 1) : recipe.likesCount + 1;

    if (wasLiked) {
      user.likedRecipeIds = user.likedRecipeIds.filter((id) => id !== recipeId);
    } else {
      user.likedRecipeIds = [...user.likedRecipeIds, recipeId];
    }

    this.saveRecipe(recipe);
    this.saveUser(user);
    return { isLiked: recipe.isLiked, count: recipe.likesCount };
  },

  toggleSave(recipeId: string): { isSaved: boolean; count: number } {
    const recipes = this.getRecipes();
    const user = this.getUser();
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return { isSaved: false, count: 0 };

    const wasSaved = recipe.isSaved || user.savedRecipeIds.includes(recipeId);
    recipe.isSaved = !wasSaved;
    recipe.savesCount = wasSaved ? Math.max(0, recipe.savesCount - 1) : recipe.savesCount + 1;

    if (wasSaved) {
      user.savedRecipeIds = user.savedRecipeIds.filter((id) => id !== recipeId);
    } else {
      user.savedRecipeIds = [...user.savedRecipeIds, recipeId];
    }

    this.saveRecipe(recipe);
    this.saveUser(user);
    return { isSaved: recipe.isSaved, count: recipe.savesCount };
  },

  getUser(): User {
    if (typeof window === 'undefined') return CURRENT_USER;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (!stored) {
        safeLocalStorageSet(STORAGE_KEYS.USER, JSON.stringify(CURRENT_USER));
        return CURRENT_USER;
      }
      const parsed: User = JSON.parse(stored);
      // Enhance avatar if stored in imageStore
      const cachedAvatar = imageStore.getImageSync(`avatar_${parsed.id}`);
      if (cachedAvatar) {
        parsed.avatar = cachedAvatar;
      }
      return parsed;
    } catch {
      return CURRENT_USER;
    }
  },

  saveUser(user: User): User {
    // If avatar is a large data URL, offload to imageStore
    if (user.avatar && (user.avatar.startsWith('data:') || user.avatar.length > 1500)) {
      imageStore.saveImage(`avatar_${user.id}`, user.avatar);
      const sanitizedUser: User = {
        ...user,
        avatar: CURRENT_USER.avatar, // safe compact URL for localStorage
      };
      safeLocalStorageSet(STORAGE_KEYS.USER, JSON.stringify(sanitizedUser));
      return user;
    }

    safeLocalStorageSet(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return true;
    try {
      const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (auth === null) {
        // On very first launch, require signup/login as requested by user
        return false;
      }
      return auth === 'true';
    } catch {
      return false;
    }
  },

  setAuthenticated(isAuth: boolean): void {
    safeLocalStorageSet(STORAGE_KEYS.AUTH, isAuth ? 'true' : 'false');
  },

  signUpUser(name: string, email: string, avatar?: string): User {
    const existing = this.getUser();
    const newUser: User = {
      ...existing,
      id: `user_${Date.now()}`,
      name: name.trim() || 'Chef Guest',
      email: email.trim().toLowerCase(),
      avatar: avatar || existing.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80',
    };
    this.saveUser(newUser);
    this.setAuthenticated(true);
    return newUser;
  },

  loginUser(email: string, name?: string): User {
    const user = this.getUser();
    if (email && email.trim()) {
      user.email = email.trim().toLowerCase();
    }
    if (name && name.trim()) {
      user.name = name.trim();
    }
    this.saveUser(user);
    this.setAuthenticated(true);
    return user;
  },

  signOut(): void {
    this.setAuthenticated(false);
  },

  getLanguage(): string {
    if (typeof window === 'undefined') return 'en';
    try {
      return localStorage.getItem(STORAGE_KEYS.LANG) || 'en';
    } catch {
      return 'en';
    }
  },

  setLanguage(lang: string): void {
    safeLocalStorageSet(STORAGE_KEYS.LANG, lang);
  },

  getNotifications(): NotificationItem[] {
    if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTIFS);
      if (!stored) {
        safeLocalStorageSet(STORAGE_KEYS.NOTIFS, JSON.stringify(INITIAL_NOTIFICATIONS));
        return INITIAL_NOTIFICATIONS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  },

  markNotificationRead(id: string): void {
    const notifs = this.getNotifications().map((n) => (n.id === id ? { ...n, read: true } : n));
    safeLocalStorageSet(STORAGE_KEYS.NOTIFS, JSON.stringify(notifs));
  },

  markAllNotificationsRead(): void {
    const notifs = this.getNotifications().map((n) => ({ ...n, read: true }));
    safeLocalStorageSet(STORAGE_KEYS.NOTIFS, JSON.stringify(notifs));
  },

  addNotification(notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>): NotificationItem {
    const full: NotificationItem = {
      ...notif,
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    // Keep top 15 notifications max
    const notifs = [full, ...this.getNotifications()].slice(0, 15);
    safeLocalStorageSet(STORAGE_KEYS.NOTIFS, JSON.stringify(notifs));
    return full;
  },
};
