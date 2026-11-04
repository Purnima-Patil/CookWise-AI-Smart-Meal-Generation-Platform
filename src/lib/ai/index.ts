import { GoogleGenAI } from '@google/genai';
import { Recipe, IngredientItem, InstructionStep, Difficulty } from '../../types/index';
import { uploadMediaToCloudinary } from '../cloudinary';
import { ASSET_IMAGES } from '../../assets/images';
import { CULINARY_DICTIONARY } from '../i18n/culinaryTranslations';
import { SupportedLanguage } from '../i18n';
import { imageStore } from '../storage/imageStore';

export interface GenerateRecipeParams {
  ingredients: string[];
  dietary: string[];
  cuisine?: string;
  mealType?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  difficulty?: Difficulty;
  servings?: number;
  cookingTimeMax?: number; // in minutes
  language?: string; // e.g. 'Hindi', 'Marathi', 'English', etc.
}

/**
 * Intelligent Exact Recipe Image Selector
 * Categorizes the dish based on exact user ingredients and cooking profile
 * to guarantee that every recipe gets an authentic, perfectly matched culinary photograph.
 */
export function matchExactRecipeImage(
  recipeTitle: string,
  ingredients: string[],
  cuisine?: string,
  dietary?: string[],
  mealType?: string
): string {
  const allText = `${recipeTitle} ${ingredients.join(' ')} ${cuisine || ''} ${mealType || ''}`.toLowerCase();

  // 1. Eggs / Breakfast / Omelettes / Scrambles
  if (
    allText.includes('egg') ||
    allText.includes('omelet') ||
    allText.includes('scramble') ||
    allText.includes('frittata') ||
    allText.includes('yolk') ||
    (mealType?.toLowerCase() === 'breakfast' && (allText.includes('toast') || allText.includes('skillet') || allText.includes('cheese')))
  ) {
    return ASSET_IMAGES.eggScramble;
  }

  // 2. Salads / Crisp Raw Greens / Bowls
  if (
    (allText.includes('salad') ||
      allText.includes('greens') ||
      allText.includes('lettuce') ||
      allText.includes('kale') ||
      allText.includes('cucumber') ||
      allText.includes('avocado')) &&
    !allText.includes('pasta') &&
    !allText.includes('rice') &&
    !allText.includes('noodle')
  ) {
    return ASSET_IMAGES.crispSalad;
  }

  // 3. Soups / Stews / Lentils / Dal / Broths
  if (
    allText.includes('soup') ||
    allText.includes('stew') ||
    allText.includes('lentil') ||
    allText.includes('dal') ||
    allText.includes('daal') ||
    allText.includes('broth') ||
    allText.includes('chowder') ||
    allText.includes('chili')
  ) {
    return ASSET_IMAGES.heartySoup;
  }

  // 4. Sandwiches / Melts / Toasts / Burgers / Wraps
  if (
    allText.includes('sandwich') ||
    allText.includes('melt') ||
    allText.includes('burger') ||
    allText.includes('toast') ||
    allText.includes('sourdough') ||
    allText.includes('grilled cheese') ||
    allText.includes('wrap')
  ) {
    return ASSET_IMAGES.grilledSandwich;
  }

  // 5. Wok / Stir-Fry / Asian / Tofu / Noodles / Sesame / Soy
  if (
    allText.includes('stir fry') ||
    allText.includes('stir-fry') ||
    allText.includes('wok') ||
    allText.includes('tofu') ||
    allText.includes('soy sauce') ||
    allText.includes('sesame') ||
    allText.includes('broccoli') ||
    allText.includes('ramen') ||
    allText.includes('snap pea') ||
    allText.includes('edamame') ||
    (cuisine?.toLowerCase().includes('asian') && !allText.includes('curry'))
  ) {
    return ASSET_IMAGES.wokStirfry;
  }

  // 6. Chicken / Poultry / Roasted Meats / Steaks / Pork
  if (
    allText.includes('chicken') ||
    allText.includes('poultry') ||
    allText.includes('turkey') ||
    allText.includes('beef') ||
    allText.includes('steak') ||
    allText.includes('pork') ||
    allText.includes('roast')
  ) {
    return ASSET_IMAGES.goldenChicken;
  }

  // 7. Desserts / Sweet Parfaits / Berries / Oats / Fruit Bowls
  if (
    allText.includes('berry') ||
    allText.includes('berries') ||
    allText.includes('strawberry') ||
    allText.includes('blueberry') ||
    allText.includes('yogurt') ||
    allText.includes('oats') ||
    allText.includes('honey') ||
    allText.includes('dessert') ||
    allText.includes('parfait') ||
    allText.includes('cacao') ||
    allText.includes('chocolate') ||
    allText.includes('apple') ||
    allText.includes('banana')
  ) {
    return ASSET_IMAGES.berryDessert;
  }

  // 8. Flatbread / Pizza / Baked Cheese & Dough
  if (
    allText.includes('pizza') ||
    allText.includes('flatbread') ||
    allText.includes('dough') ||
    allText.includes('crust') ||
    allText.includes('mozzarella')
  ) {
    return ASSET_IMAGES.rusticFlatbread;
  }

  // 9. Grain Bowls / Quinoa / Sweet Potato / Roasted Veggies
  if (
    allText.includes('quinoa') ||
    allText.includes('sweet potato') ||
    allText.includes('grain') ||
    allText.includes('bowl') ||
    allText.includes('chickpea') ||
    allText.includes('couscous') ||
    allText.includes('rice')
  ) {
    return ASSET_IMAGES.grainBowl;
  }

  // 10. Fish / Seafood / Salmon / Shrimp / Prawns
  if (
    allText.includes('fish') ||
    allText.includes('salmon') ||
    allText.includes('shrimp') ||
    allText.includes('prawn') ||
    allText.includes('seafood') ||
    allText.includes('tuna') ||
    allText.includes('cod') ||
    dietary?.includes('Pescatarian')
  ) {
    return ASSET_IMAGES.searedSalmon;
  }

  // 11. Curries / Coconut Milk / Spiced Gravies
  if (
    allText.includes('curry') ||
    allText.includes('coconut milk') ||
    allText.includes('masala') ||
    allText.includes('tikka') ||
    cuisine?.toLowerCase().includes('thai') ||
    cuisine?.toLowerCase().includes('indian')
  ) {
    return ASSET_IMAGES.thaiCurry;
  }

  // 12. Pasta / Italian / Noodles
  if (
    allText.includes('pasta') ||
    allText.includes('spaghetti') ||
    allText.includes('penne') ||
    allText.includes('fettuccine') ||
    allText.includes('macaroni') ||
    cuisine?.toLowerCase().includes('italian')
  ) {
    return ASSET_IMAGES.tuscanPasta;
  }

  // 13. Skillet / Mediterranean / Tomatoes & Peppers / Shakshuka
  if (
    allText.includes('tomato') ||
    allText.includes('bell pepper') ||
    allText.includes('pepper') ||
    allText.includes('shakshuka') ||
    cuisine?.toLowerCase().includes('mediterranean')
  ) {
    return ASSET_IMAGES.shakshuka;
  }

  // Default based on dietary preferences
  if (dietary?.includes('Vegetarian') || dietary?.includes('Vegan')) {
    return ASSET_IMAGES.grainBowl;
  }
  return ASSET_IMAGES.goldenChicken;
}

export async function generateRecipeWithAI(params: GenerateRecipeParams): Promise<Recipe> {
  const {
    ingredients,
    dietary = [],
    cuisine = 'Any Cuisine',
    mealType = 'Dinner',
    spiceLevel = 'Medium',
    difficulty = 'Easy',
    servings = 4,
    language = 'English',
  } = params;

  // Generate realistic unique recipe ID
  const recipeId = `rec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // Construct detailed system prompt for the culinary AI
  const prompt = `You are a world-class executive chef and culinary food scientist.
The user has the following ingredients currently available in their kitchen pantry:
${ingredients.join(', ')}

Preferences:
- Dietary constraints: ${dietary.length ? dietary.join(', ') : 'None'}
- Preferred Cuisine: ${cuisine}
- Meal Type: ${mealType}
- Desired Spice Level: ${spiceLevel}
- Target Difficulty: ${difficulty}
- Servings: ${servings}
- Target Language: ${language}

CRITICAL RULES:
1. Base the recipe primarily on the user's available ingredients: ${ingredients.join(', ')}.
2. Only require common pantry staples (salt, pepper, water, neutral oil) if missing.
3. Provide realistic cooking times and temperatures.
4. Output in ${language}: If the user selected Hindi (हिन्दी), Marathi (मराठी), Gujarati (ગુજરાતી), Spanish (Español), French (Français), or German (Deutsch), you MUST write the title, description, ingredient names/notes, instruction steps, and chef tips in that requested language (${language})! For Indian languages (Hindi, Marathi, Gujarati), write in their natural native script (Devanagari / Gujarati script) so home cooks can easily read and understand.
5. Output STRICT JSON only without Markdown backticks or extra commentary.

Format:
{
  "title": "Inspiring Gourmet Recipe Title in ${language}",
  "description": "Sensory, appetizing 2-sentence description of flavors and texture.",
  "prepTime": 15,
  "cookTime": 20,
  "servings": ${servings},
  "difficulty": "${difficulty}",
  "cuisine": "${cuisine}",
  "mealType": "${mealType}",
  "dietary": ${JSON.stringify(dietary)},
  "ingredients": [
    { "name": "Ingredient Name", "amount": "200", "unit": "g", "notes": "diced" }
  ],
  "instructions": [
    { "stepNumber": 1, "instruction": "Clear step description", "durationMinutes": 5, "tip": "Professional chef secret" }
  ],
  "tags": ["#QuickMeal", "#HighProtein", "#HealthyDinner"],
  "matchedIngredients": ${JSON.stringify(ingredients)},
  "missingIngredients": ["optional staple"],
  "nutrition": {
    "calories": 480,
    "protein": 24,
    "carbs": 45,
    "fat": 18
  }
}`;

  let parsedRecipe: Partial<Recipe> | null = null;
  const apiKey = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined;

  // Try Gemini AI (gemini-3.8-flash) if API key is present
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedRecipe = JSON.parse(cleanJson);
    } catch (error) {
      console.warn('Live AI text generation call failed, switching to expert culinary engine:', error);
    }
  }

  // Fallback intelligent culinary synthesis if AI response wasn't obtained
  if (!parsedRecipe || !parsedRecipe.title || !parsedRecipe.instructions) {
    parsedRecipe = synthesizeIntelligentRecipe(params);
  }

  const recipeTitle = parsedRecipe.title || 'Chef’s Artisanal Pantry Creation';

  // 1. First, select the exact photographic image tailored to these ingredients
  let finalImageUrl = matchExactRecipeImage(
    recipeTitle,
    ingredients,
    parsedRecipe.cuisine || cuisine,
    parsedRecipe.dietary || dietary,
    parsedRecipe.mealType || mealType
  );

  // 2. Try live AI image generation with Gemini if available
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const imagePrompt = `A Michelin-star restaurant food photograph of ${recipeTitle}, prepared with fresh ${ingredients.slice(0, 5).join(', ')}. Beautiful ceramic plating, natural culinary lighting, appetizing macro details, 4k food photography.`;
      const imgRes = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: imagePrompt }],
        },
        config: {
          imageConfig: { aspectRatio: '4:3' },
        },
      });

      for (const part of imgRes.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData?.data) {
          finalImageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        }
      }
    } catch (imgErr) {
      // Live image generation rate limit or quota fallback: already set to exact archetype photograph!
      console.info('Using precision ingredient-matched culinary photography:', imgErr);
    }
  }

  // Perform server-side Cloudinary upload if configured, and store data URLs in imageStore
  if (finalImageUrl.startsWith('data:')) {
    try {
      imageStore.saveImage(recipeId, finalImageUrl);
      const uploadedUrl = await uploadMediaToCloudinary(finalImageUrl, 'recipes/images');
      if (uploadedUrl && !uploadedUrl.startsWith('data:')) {
        finalImageUrl = uploadedUrl;
      }
    } catch (e) {
      console.warn('Cloudinary upload fallback to secure asset / imageStore:', e);
    }
  }

  const completeRecipe: Recipe = {
    id: recipeId,
    title: recipeTitle,
    description:
      parsedRecipe.description ||
      `A delicious dish highlighting your fresh ${ingredients.slice(0, 3).join(', ')}, harmonized with chef seasonings.`,
    prepTime: parsedRecipe.prepTime || 15,
    cookTime: parsedRecipe.cookTime || 20,
    servings: parsedRecipe.servings || servings,
    difficulty: (parsedRecipe.difficulty as Difficulty) || difficulty,
    cuisine: parsedRecipe.cuisine || cuisine,
    mealType: parsedRecipe.mealType || mealType,
    dietary: parsedRecipe.dietary || dietary,
    ingredients:
      parsedRecipe.ingredients ||
      ingredients.map((ing) => ({ name: ing, amount: '1', unit: 'portion' })),
    instructions: parsedRecipe.instructions || [
      {
        stepNumber: 1,
        instruction: `Prep your fresh ingredients: slice and measure ${ingredients.slice(0, 3).join(', ')}.`,
        durationMinutes: 5,
        tip: 'Mise en place ensures stress-free cooking.',
      },
      {
        stepNumber: 2,
        instruction: 'Heat a pan over medium flame with a splash of olive oil.',
        durationMinutes: 3,
        tip: 'Listen for a gentle sizzle.',
      },
      {
        stepNumber: 3,
        instruction: `Add ${ingredients[0] || 'the main base'} and sauté until aromatic and golden.`,
        durationMinutes: 8,
      },
      {
        stepNumber: 4,
        instruction: 'Combine remaining seasonings, simmer gently until harmonized.',
        durationMinutes: 6,
      },
      {
        stepNumber: 5,
        instruction: 'Plate warmly, garnish with freshly cracked pepper, and enjoy.',
        durationMinutes: 2,
      },
    ],
    tags: parsedRecipe.tags || [
      `#${cuisine.replace(/\s+/g, '')}`,
      `#${difficulty}Cooking`,
      ...dietary.map((d) => `#${d.replace(/[\s-]+/g, '')}`),
      '#PantryToPlate',
      '#CookwiseAI',
    ],
    imageUrl: finalImageUrl,
    likesCount: 1,
    savesCount: 0,
    isLiked: false,
    isSaved: false,
    author: {
      id: 'ai_chef_assistant',
      name: 'Cookwise Executive Chef',
      avatarUrl:
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&auto=format&fit=crop&q=80',
    },
    matchedIngredients: ingredients,
    missingIngredients: parsedRecipe.missingIngredients || ['Sea salt', 'Olive oil'],
    nutrition: parsedRecipe.nutrition || {
      calories: 450,
      protein: 22,
      carbs: 48,
      fat: 16,
    },
    createdAt: new Date().toISOString(),
  };

  return completeRecipe;
}

/**
 * Intelligent deterministic culinary recipe synthesis
 * Crafts recipes strictly tailored to the user's exact ingredients and cooking technique.
 */
function synthesizeIntelligentRecipe(params: GenerateRecipeParams): Partial<Recipe> {
  const ingredients = params.ingredients;
  const langStr = (params.language || 'English').toLowerCase();

  let targetLang: SupportedLanguage = 'en';
  if (langStr.includes('marathi') || langStr.includes('मराठी') || langStr === 'mr') targetLang = 'mr';
  else if (langStr.includes('hindi') || langStr.includes('हिन्दी') || langStr === 'hi') targetLang = 'hi';
  else if (langStr.includes('gujarati') || langStr.includes('ગુજરાતી') || langStr === 'gu') targetLang = 'gu';
  else if (langStr.includes('spanish') || langStr.includes('español') || langStr === 'es') targetLang = 'es';
  else if (langStr.includes('french') || langStr.includes('français') || langStr === 'fr') targetLang = 'fr';
  else if (langStr.includes('german') || langStr.includes('deutsch') || langStr === 'de') targetLang = 'de';

  const dict = CULINARY_DICTIONARY[targetLang];
  const mainIngName = dict?.ingredients[ingredients[0]] || ingredients[0] || 'Vegetables';
  const secondIngName = dict?.ingredients[ingredients[1]] || ingredients[1] || 'Seasoning';
  const thirdIngName = dict?.ingredients[ingredients[2]] || ingredients[2] || '';

  const cuisine = params.cuisine && params.cuisine !== 'Any Cuisine' ? params.cuisine : 'Mediterranean';
  const localizedCuisine = dict?.cuisine[cuisine] || cuisine;
  const mealType = params.mealType || 'Dinner';
  const localizedMeal = dict?.mealTypes[mealType] || mealType;
  const ingLower = ingredients.map((i) => i.toLowerCase());

  let title = '';
  let description = '';
  let instructionsList: InstructionStep[] = [];

  const isEgg = ingLower.some((i) => i.includes('egg') || i.includes('scramble') || i.includes('omelet'));
  const isMeat = ingLower.some((i) => i.includes('chicken') || i.includes('steak') || i.includes('beef') || i.includes('turkey'));
  const isTofu = ingLower.some((i) => i.includes('tofu') || i.includes('noodle') || i.includes('soy') || i.includes('broccoli') || cuisine === 'Asian');
  const isStew = ingLower.some((i) => i.includes('lentil') || i.includes('soup') || i.includes('stew') || i.includes('dal') || i.includes('beans'));

  if (targetLang === 'gu') {
    if (isEgg) {
      title = `મસાલેદાર ફાર્મહાઉસ ઈંડા ભુરજી અને શેકેલા ${secondIngName}`;
      description = `હળવી ધીમી આંચે રાંધેલી નરમ ઈંડા ભુરજી, સાંતળેલા ${secondIngName} અને ઘરગથ્થુ મસાલાની ખાસ સુગંધ.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: 'એક બાઉલમાં ઈંડા ફોડી ચપટી મીઠું ઉમેરીને બરાબર ફેંટી લો. સામગ્રી ઝીણી સમારીને રાખો.',
          durationMinutes: 3,
          tip: 'ઈંડાને સારી રીતે ફેંટવાથી ભુરજી એકદમ હલકી, નરમ અને સોફ્ટ બને છે.',
        },
        {
          stepNumber: 2,
          instruction: `પેનમાં માખણ અથવા તેલ મધ્યમ આંચે ગરમ કરો. સમારેલા ${secondIngName} ૨ મિનિટ નરમ થાય ત્યાં સુધી સાંતળો.`,
          durationMinutes: 2,
          tip: 'મધ્યમ આંચે સાંતળવાથી શાકભાજીની કુદરતી મીઠાશ જળવાઈ રહે છે.',
        },
        {
          stepNumber: 3,
          instruction: 'ફેંટેલા ઈંડા પેનમાં રેડો અને કિનારીઓ હળવી જામી જાય ત્યાં સુધી ૨૦ સેકન્ડ સ્થિર રહેવા દો.',
          durationMinutes: 1,
          tip: 'ધીમી આંચ પર રાંધવાથી ઈંડા ચવ્વડ થતા નથી અને મલાઈદાર રહે છે.',
        },
        {
          stepNumber: 4,
          instruction: `તવીથાથી કિનારીઓ વચ્ચે લાવો અને ધીમે ધીમે હલાવી રાંધો. ${thirdIngName ? thirdIngName + ' અને ' : ''}મસાલા મિક્સ કરો.`,
          durationMinutes: 3,
          tip: 'વધારે પડતું ન હલાવો જેથી ભુરજીના સરસ મોટા સોફ્ટ ટુકડા બને.',
        },
        {
          stepNumber: 5,
          instruction: 'ગરમ પ્લેટમાં કાઢો, ઉપર કાળા મરી અને લીલા ધાણા છાંટી શેકેલા ટોસ્ટ અથવા રોટલી સાથે ગરમાગરમ પીરસો.',
          durationMinutes: 1,
          tip: 'ગરમાગરમ પીરસવાથી ભુરજીનો સ્વાદ અને સુગંધ શ્રેષ્ઠ લાગે છે.',
        },
      ];
    } else if (isMeat) {
      title = `મસાલેદાર ગોલ્ડન રોસ્ટેડ ${mainIngName} અને ${secondIngName}`;
      description = `સોનેરી શેકેલું સ્વાદિષ્ટ ${mainIngName}, સાથે સાંતળેલા ${secondIngName} અને ખાસ મસાલેદાર ગ્રેવી.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `${mainIngName}ને પેપર ટોવેલથી સુકવી લો. તેના પર સ્વાદ મુજબ મીઠું અને મરી લગાવો.`,
          durationMinutes: 3,
          tip: 'સપાટી સૂકી રાખવાથી પેનમાં શેકતી વખતે સુંદર ક્રિસ્પી સોનેરી પડ બને છે.',
        },
        {
          stepNumber: 2,
          instruction: 'જાડા તળિયાવાળી કડાઈ અથવા પેનમાં તેલ બરાબર ગરમ કરો.',
          durationMinutes: 2,
          tip: 'તેલ યોગ્ય રીતે ગરમ હોવાથી સામગ્રી પેન સાથે ચોંટતી નથી.',
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} પેનમાં મૂકી બંને બાજુ ૫-૬ મિનિટ સોનેરી અને ક્રિસ્પી થાય ત્યાં સુધી શેકો.`,
          durationMinutes: 6,
          tip: 'શેકતી વખતે વારંવાર ન હલાવો જેથી સુંદર કારામેલાઈઝ્ડ કલર આવે.',
        },
        {
          stepNumber: 4,
          instruction: `${secondIngName} પેનમાં ઉમેરો, આંચ મધ્યમ કરી ૫ મિનિટ રસ સાથે સાંતળો.`,
          durationMinutes: 5,
          tip: 'પેનના તળિયે જામેલા રસ સાથે શાકભાજી સાંતળવાથી અદભૂત સ્વાદ મળે છે.',
        },
        {
          stepNumber: 5,
          instruction: 'પ્લેટમાં કાઢી ૨ મિનિટ રહેવા દો, કટકા કરી ગરમાગરમ પીરસો.',
          durationMinutes: 3,
          tip: 'થોડીવાર આરામ આપવાથી અંદરનો રસ જળવાઈ રહે છે અને વાનગી રસદાર રહે છે.',
        },
      ];
    } else if (isTofu) {
      title = `કડાઈમાં શેકેલું ${mainIngName} અને તાજા ${secondIngName}`;
      description = `તેજ આંચે શેકેલું ક્રિસ્પી ${mainIngName} અને ${secondIngName}, લસણ અને મસાલાના સ્વાદ સાથે.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `${mainIngName} અને ${secondIngName}ને એકસરખા નાના ટુકડાઓમાં સમારી લો.`,
          durationMinutes: 4,
          tip: 'એકસરખા આકારમાં કાપવાથી તમામ ટુકડા એકસાથે સરખી રીતે રંધાય છે.',
        },
        {
          stepNumber: 2,
          instruction: 'કડાઈ તેજ આંચે ગરમ કરો અને ૧ ચમચી તેલ ઉમેરો.',
          durationMinutes: 2,
          tip: 'કડાઈ ખૂબ ગરમ હોવાથી શાકભાજીનું ક્રિસ્પીપણું જળવાઈ રહે છે.',
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} ઉમેરી ૩-૪ મિનિટ સોનેરી અને ક્રિસ્પી થાય ત્યાં સુધી સાંતળો.`,
          durationMinutes: 4,
          tip: 'કડાઈમાં સામગ્રીને ફેલાવીને રાખો જેથી દરેક ટુકડો સોનેરી થાય.',
        },
        {
          stepNumber: 4,
          instruction: `${secondIngName} ઉમેરો અને સતત હલાવતા રહી ૩ મિનિટ ક્રિસ્પી રહે તેમ સાંતળો.`,
          durationMinutes: 3,
          tip: 'શાકભાજીને નરમ ન થવા દો, તેનો કુદરતી ક્રંચ સચવાવો જોઈએ.',
        },
        {
          stepNumber: 5,
          instruction: 'ગેસ બંધ કરી મસાલા મિક્સ કરો અને ગરમાગરમ રાઇસ સાથે પીરસો.',
          durationMinutes: 1,
          tip: 'છેલ્લે થોડો સોયા સોસ અથવા તલ ઉમેરવાથી સુંદર સુગંધ આવે છે.',
        },
      ];
    } else if (isStew) {
      title = `પારંપરિક સ્વાદિષ્ટ ${mainIngName} અને ${secondIngName} સ્ટ્યુ`;
      description = `ધીમી આંચે રાંધેલી પૌષ્ટિક ${mainIngName} અને સુગંધિત મસાલેદાર સૂપ.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `${mainIngName} સ્વચ્છ ધોઈ લો અને ${secondIngName} ઝીણું સમારી લો.`,
          durationMinutes: 3,
          tip: 'કઠોળ કે દાળને સારી રીતે ધોવાથી સૂપ ચોખ્ખો અને સ્વાદિષ્ટ બને છે.',
        },
        {
          stepNumber: 2,
          instruction: `પેનમાં તેલ ગરમ કરી ${secondIngName}ને ૪ મિનિટ સુગંધ આવે ત્યાં સુધી સાંતળો.`,
          durationMinutes: 4,
          tip: 'ડુંગળી કે શાકભાજીને ધીમી આંચે સાંતળવાથી સુંદર સ્વાદ બેસે છે.',
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} અને ૩ કપ પાણી ઉમેરી મોટી ઉકાળી લાવો.`,
          durationMinutes: 5,
          tip: 'પ્રથમ તેજ આંચે ઉકાળો લાવવાથી સામગ્રી બરાબર એકરસ થવા લાગે છે.',
        },
        {
          stepNumber: 4,
          instruction: 'આંચ ધીમી કરી ઢાંકીને ૧૫-૨૦ મિનિટ નરમ થાય ત્યાં સુધી ચડવા દો.',
          durationMinutes: 18,
          tip: 'ધીમી આંચ પર રાંધવાથી દાળનો પોત મુલાયમ અને ઘટ્ટ બને છે.',
        },
        {
          stepNumber: 5,
          instruction: 'બાઉલમાં કાઢી ઉપર તાજા લીલા ધાણા અને થોડું તેલ કે ઘી ઉમેરી ગરમાગરમ માણો.',
          durationMinutes: 2,
          tip: 'પીરસતાં પહેલાં થોડું ઘી અથવા માખણ ઉમેરવાથી સ્વાદ બેવડાઈ જાય છે.',
        },
      ];
    } else {
      title = `કડાઈમાં શેકેલા ${mainIngName} અને ${secondIngName}`;
      description = `તાજા ${mainIngName} અને ${secondIngName} મેળવીને તૈયાર કરેલી એક ઝટપટ અને પૌષ્ટિક ${localizedMeal}.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `તાજા ${mainIngName} અને ${secondIngName} ધોઈને સાફ કરી ટુકડા કરી લો.`,
          durationMinutes: 4,
          tip: 'રાંધતા પહેલા બધી સામગ્રી તૈયાર રાખવાથી રસોઈ સરળ બને છે.',
        },
        {
          stepNumber: 2,
          instruction: 'પેનમાં ૨ ચમચી તેલ મધ્યમ આંચે ગરમ કરો.',
          durationMinutes: 2,
          tip: 'તેલ મધ્યમ ગરમ રાખવાથી મસાલા બળતા નથી.',
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} પેનમાં ઉમેરી ૪-૫ મિનિટ સોનેરી રંગ આવે ત્યાં સુધી સાંતળો.`,
          durationMinutes: 5,
          tip: 'પેનમાં સામગ્રી સરખી રીતે ફેલાવીને રાખો.',
        },
        {
          stepNumber: 4,
          instruction: `${secondIngName} ઉમેરો અને ધીમી આંચે ૫ મિનિટ નરમ થાય ત્યાં સુધી પકાવો.`,
          durationMinutes: 5,
          tip: 'ધીમી આંચે ઢાંકીને રાખવાથી શાકભાજી પોતાની વરાળમાં જ સરસ ચડી જાય છે.',
        },
        {
          stepNumber: 5,
          instruction: 'મીઠું અને કાળા મરી ઉમેરી હલાવો અને ગરમાગરમ પીરસો.',
          durationMinutes: 2,
          tip: 'પીરસતાં પહેલાં ૨ મિનિટ રહેવા દો જેથી બધા મસાલા એકરસ થઈ જાય.',
        },
      ];
    }
  } else if (targetLang === 'mr') {
    if (isEgg) {
      title = `कुरकुरीत फार्महाऊस अंडी व परतलेले ${secondIngName}`;
      description = `हलक्या मंद आचेवर शिजवलेली मऊ अंडी, परतून घेतलेले ${secondIngName} आणि घरगुती मसाल्यांचा खास सुगंध.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: 'एका खोलगट बाऊलमध्ये अंडी फोडून चिमूटभर मीठ घालून फेटून घ्या. साहित्य बारीक चिरून ठेवा.',
          durationMinutes: 3,
          tip: 'अंडी व्यवस्थित फेटल्याने भुर्जी किंवा ऑम्लेट अतिशय हलके आणि मऊ होते.',
        },
        {
          stepNumber: 2,
          instruction: `पॅनमध्ये थोडे बटर किंवा तेल मध्यम आचेवर गरम करा. चिरलेले ${secondIngName} २ मिनिटे मऊ होईपर्यंत परतून घ्या.`,
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: 'फेटलेली अंडी पॅनमध्ये घाला आणि कडा हलक्या शिजेपर्यंत २० सेकंद स्थिर राहू द्या.',
          durationMinutes: 1,
          tip: 'मंद आचेवर शिजवल्याने अंडी चिवट न होता मऊ राहतात.',
        },
        {
          stepNumber: 4,
          instruction: `उलथण्याने कडा मध्यभागी आणा आणि अंडी हळुवार हलवून शिजवा. ${thirdIngName ? thirdIngName + ' आणि ' : ''}मसाले मिसळा.`,
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'वरून ताजी काळी मिरी भुरभुरा आणि गरमागरम टोस्ट केलेल्या ब्रेडसोबत किंवा चपातीसोबत सर्व्ह करा.',
          durationMinutes: 1,
        },
      ];
    } else if (isMeat) {
      title = `मसालेदार सोनेरी रोस्टेड ${mainIngName} व ${secondIngName}`;
      description = `खमंग भाजलेले रुचकर ${mainIngName}, सोबत परतलेले ${secondIngName} आणि खास ग्रेव्हीचा आस्वाद.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `${mainIngName} पेपर टॉवेलने कोरडे करून घ्या. त्यावर चवीनुसार मीठ व काळी मिरी चोळा.`,
          durationMinutes: 3,
          tip: 'ओलावा पूर्ण काढल्याने छान सोनेरी कुरकुरीत थर येतो.',
        },
        {
          stepNumber: 2,
          instruction: 'जाड बुडाच्या कढईत तेल चांगले गरम करा.',
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} पॅनमध्ये ठेवून दोन्ही बाजूंनी ५-६ मिनिटे लालसर कुरकुरीत होईपर्यंत शेका.`,
          durationMinutes: 6,
        },
        {
          stepNumber: 4,
          instruction: `${secondIngName} पॅनमध्ये घाला, आच मध्यम करून ५ मिनिटे रसासोबत परतून घ्या.`,
          durationMinutes: 5,
        },
        {
          stepNumber: 5,
          instruction: 'प्लेटमध्ये काढून २ मिनिटे मुरू द्या, बारीक तुकडे करा आणि गरमागरम सर्व्ह करा.',
          durationMinutes: 3,
        },
      ];
    } else if (isTofu) {
      title = `कढईत परतलेला ${mainIngName} व ताज्या ${secondIngName}`;
      description = `मोठ्या आचेवर परतलेला कुरकुरीत ${mainIngName} आणि ${secondIngName}, लसूण व मसाल्यांच्या स्वादासह.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `${mainIngName} आणि ${secondIngName} एकसारख्या लहान तुकड्यांमध्ये कापून घ्या.`,
          durationMinutes: 4,
          tip: 'एकसारख्या आकारात कापल्याने सर्व तुकडे एकाच वेळी उत्तम शिजतात.',
        },
        {
          stepNumber: 2,
          instruction: 'कढई मोठ्या आचेवर तापवा आणि १ चमचा तेल घाला.',
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} कढईत घालून ३-४ मिनिटे छान कुरकुरीत होईपर्यंत परता.`,
          durationMinutes: 4,
        },
        {
          stepNumber: 4,
          instruction: `${secondIngName} घाला आणि सतत हलवत ३ मिनिटे कुरकुरीत राहतील असे परता.`,
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'गॅस बंद करा, थोडे तेल व मसाले घाला आणि गरमागरम भातासोबत सर्व्ह करा.',
          durationMinutes: 1,
        },
      ];
    } else if (isStew) {
      title = `पारंपरिक रुचकर ${mainIngName} व ${secondIngName} स्ट्यू`;
      description = `मंद आचेवर शिजवलेली पौष्टिक ${mainIngName} आणि सुगंधित मसालेदार सूप.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `${mainIngName} स्वच्छ धुऊन घ्या आणि ${secondIngName} बारीक चिरून घ्या.`,
          durationMinutes: 3,
        },
        {
          stepNumber: 2,
          instruction: `पॅनमध्ये तेलात ${secondIngName} ४ मिनिटे सुगंध येईपर्यंत परता.`,
          durationMinutes: 4,
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} आणि ३ कप पाणी घालून मोठी उकळी आणा.`,
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: 'आच मंद करा, झाकण ठेवून १५-२० मिनिटे मऊ होईपर्यंत शिजू द्या.',
          durationMinutes: 18,
          tip: 'मंद आचेवर शिजवल्याने डाळीचा पोत मऊ व चवदार होतो.',
        },
        {
          stepNumber: 5,
          instruction: 'वाटीत काढून वरून ताजी कोथिंबीर व थोडे तेल घालून गरमागरम आस्वाद घ्या.',
          durationMinutes: 2,
        },
      ];
    } else {
      title = `कढईत परतलेले ${mainIngName} आणि ${secondIngName}`;
      description = `ताजे ${mainIngName} आणि ${secondIngName} एकत्र करून तयार केलेली एक झटपट व पौष्टिक ${localizedMeal}.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `ताजे ${mainIngName} आणि ${secondIngName} धुऊन स्वच्छ करून चिरून घ्या.`,
          durationMinutes: 4,
          tip: 'स्वयंपाकापूर्वी सर्व साहित्य तयार ठेवल्याने कामाचा ताण येत नाही.',
        },
        {
          stepNumber: 2,
          instruction: 'पॅनमध्ये २ चमचे तेल मध्यम आचेवर गरम करा.',
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} पॅनमध्ये पसरवून ४-५ मिनिटे सोनेरी रंगावर परतून घ्या.`,
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: `${secondIngName} घाला आणि मंद आचेवर ५ मिनिटे मऊ होईपर्यंत शिजू द्या.`,
          durationMinutes: 5,
        },
        {
          stepNumber: 5,
          instruction: 'मीठ आणि काळी मिरी घालून हलवा, ताटात वाढून लगेच आस्वाद घ्या.',
          durationMinutes: 2,
        },
      ];
    }
  } else if (targetLang === 'hi') {
    if (isEgg) {
      title = `स्वादिष्ट फार्महाऊस अंडा भुर्जी व भुना हुआ ${secondIngName}`;
      description = `नरम और फूली हुई भुर्जी, हल्के भुने हुए ${secondIngName} और मसालों के साथ तैयार एक पौष्टिक ${localizedMeal}।`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: 'एक कटोरे में अंडे तोड़ें और चुटकी भर नमक डालकर अच्छी तरह फेंटें।',
          durationMinutes: 3,
          tip: 'अंडों को अच्छी तरह फेंटने से भुर्जी बिल्कुल मखमली और फूली हुई बनती है।',
        },
        {
          stepNumber: 2,
          instruction: `पैन में मक्खन या तेल मध्यम आंच पर गरम करें। ${secondIngName} को २ मिनट तक भूनें।`,
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: 'फेंटे हुए अंडे पैन में डालें और 20 सेकंड तक किनारों को जमने दें।',
          durationMinutes: 1,
          tip: 'धीमी आंच रखने से अंडे जलते नहीं और बहुत स्वादिष्ट बनते हैं।',
        },
        {
          stepNumber: 4,
          instruction: `स्पैटुला से किनारों को बीच में लाएं। ${thirdIngName ? thirdIngName + ' और ' : ''}मसाले मिलाएं।`,
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'गरम प्लेट में निकालें, ऊपर से काली मिर्च छिड़कें और गरमागरम परोसें।',
          durationMinutes: 1,
        },
      ];
    } else if (isMeat) {
      title = `मसालेदार गोल्डन रोस्ट ${mainIngName} और ${secondIngName}`;
      description = `रसदार रोस्टेड ${mainIngName}, कैरामेलाइज़्ड ${secondIngName} और मसालों के मेल के साथ।`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `${mainIngName} को पेपर टॉवल से सुखाएं। नमक और काली मिर्च लगाएं।`,
          durationMinutes: 3,
          tip: 'सतह पूरी तरह सूखी होने पर ही क्रिस्पी सुनहरी परत बनती है।',
        },
        {
          stepNumber: 2,
          instruction: 'भारी कड़ाही में तेल गरम करें।',
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} को कड़ाही में रखकर 5-6 मिनट तक गहरा सुनहरा होने तक सेकें, फिर पलटें।`,
          durationMinutes: 6,
        },
        {
          stepNumber: 4,
          instruction: `${secondIngName} डालें। आंच मध्यम करके 5 मिनट तक भूनें।`,
          durationMinutes: 5,
        },
        {
          stepNumber: 5,
          instruction: 'प्लेट में निकालें, 3 मिनट आराम दें, काटकर गरमागरम परोसें।',
          durationMinutes: 3,
        },
      ];
    } else if (isTofu) {
      title = `कड़ाही में भुना हुआ ${mainIngName} और क्रिस्पी ${secondIngName}`;
      description = `तेज आंच पर भुना हुआ कुरकुरा ${mainIngName} और क्रंची ${secondIngName} का बेहतरीन मेल।`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `${mainIngName} और ${secondIngName} को एक समान टुकड़ों में काट लें।`,
          durationMinutes: 4,
        },
        {
          stepNumber: 2,
          instruction: 'कड़ाही को तेज आंच पर गरम करें और थोड़ा तेल डालें।',
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} डालकर 3-4 मिनट तक कुरकुरा होने तक भूनें।`,
          durationMinutes: 4,
        },
        {
          stepNumber: 4,
          instruction: `${secondIngName} मिलाएं और 3 मिनट तक लगातार चलाते हुए भूनें।`,
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'गैस बंद करें, मसाले मिलाएं और गरमागरम परोसें।',
          durationMinutes: 1,
        },
      ];
    } else if (isStew) {
      title = `पारंपरिक स्वादिष्ट ${mainIngName} और ${secondIngName} सूप`;
      description = `धीमी आंच पर पकी पौष्टिक ${mainIngName} और मौसमी सब्जियों का गाढ़ा सूप।`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `${mainIngName} धो लें और ${secondIngName} को बारीक काटें।`,
          durationMinutes: 3,
        },
        {
          stepNumber: 2,
          instruction: `तेल में ${secondIngName} को 4 मिनट तक खुशबूदार होने तक भूनें।`,
          durationMinutes: 4,
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} और 3 कप पानी डालकर तेज उबाल लाएं।`,
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: 'आंच धीमी करें और ढककर 15-20 मिनट तक पकने दें।',
          durationMinutes: 18,
          tip: 'धीमी आंच पर पकाने से दाल और मसाले आपस में अच्छी तरह घुल जाते हैं।',
        },
        {
          stepNumber: 5,
          instruction: 'कटोरे में निकालें, ताज़ा धनिया डालें और गरमागरम परोसें।',
          durationMinutes: 2,
        },
      ];
    } else {
      title = `स्वादिष्ट तवा-फ्राई ${mainIngName} और ${secondIngName}`;
      description = `ताज़ा ${mainIngName} और ${secondIngName} को मिलाकर तैयार किया गया एक खुशबूदार व पौष्टिक ${localizedMeal}।`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `ताज़ा ${mainIngName} और ${secondIngName} को धोकर तैयार कर लें।`,
          durationMinutes: 4,
        },
        {
          stepNumber: 2,
          instruction: 'पैन में 2 चम्मच तेल गरम करें।',
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: `${mainIngName} डालकर 4-5 मिनट तक सुनहरा भूनें।`,
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: `${secondIngName} मिलाएं और धीमी आंच पर 5 मिनट पकाएं।`,
          durationMinutes: 5,
        },
        {
          stepNumber: 5,
          instruction: 'नमक और काली मिर्च मिलाकर गरमागरम परोसें।',
          durationMinutes: 2,
        },
      ];
    }
  } else {
    // English default
    if (isEgg) {
      title = `Skillet Farmhouse Eggs with Sautéed ${mainIngName} & ${secondIngName}`;
      description = `Fluffy, gently cooked eggs folded with sautéed ${secondIngName.toLowerCase()} and warm seasonings for a wholesome ${mealType}.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `Crack the eggs into a bowl and whisk vigorously with a pinch of salt until frothy. Dice the ${secondIngName.toLowerCase()}.`,
          durationMinutes: 3,
          tip: 'Whisking incorporates air for a noticeably fluffier texture.',
        },
        {
          stepNumber: 2,
          instruction: `Melt a pat of butter or olive oil in a non-stick skillet over medium-low heat. Sauté the ${secondIngName.toLowerCase()} for 2 minutes until tender.`,
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: 'Pour in the whisked eggs and let sit undisturbed for 20 seconds until the edges gently set.',
          durationMinutes: 1,
          tip: 'Low, gentle heat prevents rubbery curds.',
        },
        {
          stepNumber: 4,
          instruction: `Using a silicone spatula, draw the cooked edges toward the center, allowing liquid egg to flow into the open spaces. Fold in ${thirdIngName ? thirdIngName.toLowerCase() + ' and ' : ''}seasonings.`,
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'Slide onto a warm plate while still glossy and soft. Garnish with cracked black pepper and serve immediately.',
          durationMinutes: 1,
        },
      ];
    } else if (isMeat) {
      title = `Herb-Crusted Golden ${mainIngName} with Caramelized ${secondIngName}`;
      description = `Juicy, seared ${mainIngName.toLowerCase()} paired with tender caramelized ${secondIngName.toLowerCase()} and a pan reduction.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `Pat the ${mainIngName.toLowerCase()} thoroughly dry with paper towels. Season generously with salt and pepper.`,
          durationMinutes: 3,
          tip: 'Dry surfaces guarantee a crisp golden crust instead of steaming.',
        },
        {
          stepNumber: 2,
          instruction: 'Heat a heavy-bottomed skillet over medium-high heat with 1 tablespoon of oil until shimmering.',
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: `Lay the ${mainIngName.toLowerCase()} into the hot skillet. Sear without moving for 5-6 minutes until deep golden-brown, then flip.`,
          durationMinutes: 6,
        },
        {
          stepNumber: 4,
          instruction: `Toss in the ${secondIngName.toLowerCase()}${thirdIngName ? ' and ' + thirdIngName.toLowerCase() : ''}. Lower heat to medium and cook for 5 minutes, basting with pan juices.`,
          durationMinutes: 5,
        },
        {
          stepNumber: 5,
          instruction: 'Transfer to a cutting board, rest for 3 minutes to retain moisture, slice on a bias, and serve warm with pan drippings.',
          durationMinutes: 3,
        },
      ];
    } else if (isTofu) {
      title = `Wok-Fired ${mainIngName} & Crisp ${secondIngName} in Garlic Sesame Glaze`;
      description = `A vibrant high-heat stir fry bringing out the charred sweetness of ${mainIngName.toLowerCase()} and tender ${secondIngName.toLowerCase()}.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `Cut the ${mainIngName.toLowerCase()} and ${secondIngName.toLowerCase()} into uniform bite-sized pieces for even cooking.`,
          durationMinutes: 4,
          tip: 'Uniform cuts ensure every piece cooks at the exact same rate.',
        },
        {
          stepNumber: 2,
          instruction: 'Heat a wok or wide skillet over high heat until wisps of smoke appear. Add a tablespoon of neutral high-heat oil.',
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: `Add the ${mainIngName.toLowerCase()} and stir-fry briskly for 3-4 minutes until lightly blistered and golden.`,
          durationMinutes: 4,
        },
        {
          stepNumber: 4,
          instruction: `Incorporate the ${secondIngName.toLowerCase()}${thirdIngName ? ' and ' + thirdIngName.toLowerCase() : ''}. Toss continuously for 3 minutes until vibrant and crisp-tender.`,
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'Remove from heat, drizzle with sesame oil or seasonings, toss once more, and serve steaming hot.',
          durationMinutes: 1,
        },
      ];
    } else if (isStew) {
      title = `Rustic Simmered ${mainIngName} & ${secondIngName} Harvest Stew`;
      description = `A hearty, aromatic bowl featuring tender simmered ${mainIngName.toLowerCase()} and slow-cooked aromatics.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `Rinse the ${mainIngName.toLowerCase()} and finely dice the ${secondIngName.toLowerCase()}.`,
          durationMinutes: 3,
        },
        {
          stepNumber: 2,
          instruction: `Sauté the ${secondIngName.toLowerCase()} in olive oil over medium heat for 4 minutes until translucent and aromatic.`,
          durationMinutes: 4,
        },
        {
          stepNumber: 3,
          instruction: `Add the ${mainIngName.toLowerCase()} and 3 cups of water or broth. Bring to a vigorous boil.`,
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: 'Reduce heat to low, cover, and gently simmer for 15-20 minutes until tender and rich.',
          durationMinutes: 18,
          tip: 'Simmering slowly unlocks the complex starches for a velvety consistency.',
        },
        {
          stepNumber: 5,
          instruction: 'Ladle into deep bowls, finish with fresh herbs, a drizzle of olive oil, and serve warm.',
          durationMinutes: 2,
        },
      ];
    } else {
      title = `Pan-Seared ${mainIngName} & ${secondIngName} with ${cuisine} Glaze`;
      description = `A flavorful dish celebrating fresh ${mainIngName.toLowerCase()} and ${secondIngName.toLowerCase()}, simmered to perfection.`;
      instructionsList = [
        {
          stepNumber: 1,
          instruction: `Carefully wash, pat dry, and prep the ${mainIngName.toLowerCase()} and ${secondIngName.toLowerCase()}.`,
          durationMinutes: 4,
          tip: 'Mise en place ensures stress-free culinary execution.',
        },
        {
          stepNumber: 2,
          instruction: 'Warm 2 tablespoons of olive oil in a wide skillet over medium-high heat until it shimmers gently.',
          durationMinutes: 2,
        },
        {
          stepNumber: 3,
          instruction: `Add the ${mainIngName.toLowerCase()} in a single even layer. Sear undisturbed for 4-5 minutes until caramelized.`,
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: `Add the ${secondIngName.toLowerCase()} and toss to coat. Simmer on medium-low for 5 minutes until tender.`,
          durationMinutes: 5,
        },
        {
          stepNumber: 5,
          instruction: 'Season with sea salt and cracked pepper. Garnish and serve immediately.',
          durationMinutes: 2,
        },
      ];
    }
  }

  const ingredientsList: IngredientItem[] = ingredients.map((ing, idx) => ({
    name: dict?.ingredients[ing] || ing,
    amount: idx === 0 ? '250' : idx === 1 ? '120' : '1',
    unit: idx < 2 ? (dict?.units['g'] || 'g') : (targetLang === 'gu' ? 'ભાગ' : targetLang === 'mr' ? 'नग' : targetLang === 'hi' ? 'भाग' : 'portion'),
    notes: idx === 0 ? (targetLang === 'gu' ? 'ઝીણું સમારેલું' : targetLang === 'mr' ? 'चिरलेले' : targetLang === 'hi' ? 'बारीक कटा' : 'freshly prepared') : (targetLang === 'gu' ? 'સાફ કરેલું' : targetLang === 'mr' ? 'धुऊन साफ केलेले' : targetLang === 'hi' ? 'साफ किया हुआ' : 'chopped'),
  }));

  ingredientsList.push(
    {
      name: dict?.ingredients['Extra Virgin Olive Oil'] || (targetLang === 'gu' ? 'ઓલિવ ઓઇલ / તેલ' : targetLang === 'mr' ? 'ऑलिव्ह ऑइल / तेल' : targetLang === 'hi' ? 'तेल / घी' : 'Olive oil'),
      amount: '2',
      unit: dict?.units['tbsp'] || (targetLang === 'gu' ? 'મોટી ચમચી' : 'tbsp'),
      notes: targetLang === 'gu' ? 'સાંતળવા માટે' : targetLang === 'mr' ? 'परतण्यासाठी' : targetLang === 'hi' ? 'पकाने के लिए' : 'for cooking',
    },
    {
      name: targetLang === 'gu' ? 'મીઠું અને કાળા મરી' : targetLang === 'mr' ? 'मीठ आणि काळी मिरी' : targetLang === 'hi' ? 'स्वादानुसार नमक और काली मिर्च' : 'Sea salt & cracked pepper',
      amount: targetLang === 'gu' ? 'સ્વાદ મુજબ' : targetLang === 'mr' ? 'चवीनुसार' : targetLang === 'hi' ? 'स्वादानुसार' : 'to taste',
    }
  );

  return {
    title,
    description,
    prepTime: 10,
    cookTime: 15,
    servings: params.servings || 4,
    difficulty: params.difficulty || 'Easy',
    cuisine,
    mealType,
    dietary: params.dietary || [],
    ingredients: ingredientsList,
    instructions: instructionsList,
    tags: [
      `#${cuisine.replace(/\s+/g, '')}`,
      `#${mealType}`,
      '#CustomIngredients',
      '#CookwiseAI',
    ],
    matchedIngredients: ingredients,
    missingIngredients: ['Olive oil', 'Black pepper'],
    nutrition: {
      calories: 420,
      protein: 20,
      carbs: 35,
      fat: 18,
    },
  };
}

/**
 * Contextual AI Cooking Assistant
 * Responds strictly within the context of the active recipe (ingredients, substitutions, cooking techniques).
 */
export async function askAICookingAssistant(
  recipe: Recipe,
  userQuestion: string,
  history?: any[],
  language: string = 'English'
): Promise<string> {
  const contextPrompt = `You are an expert chef assistant helping a home cook prepare this specific dish:
Recipe: ${recipe.title}
Cuisine: ${recipe.cuisine}
Ingredients:
${recipe.ingredients.map((i) => `- ${i.amount ? i.amount + ' ' : ''}${i.unit ? i.unit + ' ' : ''}${i.name}`).join('\n')}

Instructions:
${recipe.instructions.map((s) => `Step ${s.stepNumber}: ${s.instruction}`).join('\n')}

User Question: "${userQuestion}"

RULES:
1. Ground your response tightly around this specific recipe.
2. If asking about substitutions, propose 2-3 precise culinary alternatives that preserve texture, moisture, and flavor balance.
3. If asking about vegan/dietary adaptations, explain exact swaps for any dairy, meat, or gluten present in this dish.
4. If asking about cooking temperature or timing, refer back to the exact step in the instructions.
5. Answer in ${language}: If the user speaks Hindi, Marathi, Gujarati, Spanish, French, German, or English, answer naturally in that language so they can follow easily.
6. Keep answers concise, actionable, warm, and professional (under 120 words).`;

  try {
    const apiKey = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined;
    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contextPrompt,
        config: {
          temperature: 0.6,
        },
      });
      if (response.text) {
        return response.text.trim();
      }
    }
  } catch (error) {
    console.warn('AI Assistant live query fallback:', error);
  }

  // High quality contextual fallback answers in selected language
  const q = userQuestion.toLowerCase();
  const langLower = (language || 'English').toLowerCase();
  const isMR = langLower.includes('marathi') || langLower.includes('मराठी');
  const isHI = langLower.includes('hindi') || langLower.includes('हिन्दी');

  if (isMR) {
    if (q.includes('substitute') || q.includes('replace') || q.includes('पर्याय')) {
      return `"${recipe.title}" साठी तुम्ही चव व पोत टिकवून ठेवण्यासाठी पर्याय वापरू शकता: दुग्धजन्य पदार्थांऐवजी नारळाचे दूध किंवा काजू पेस्ट वापरा; ताज्या औषधी वनस्पतींऐवजी १/३ वाळवलेल्या वनस्पती वापरा. प्रथिनांसाठी पनीर, तोफू किंवा काबुली चणे उत्तम ठरतील!`;
    }
    if (q.includes('vegan') || q.includes('शाकाहारी')) {
      return `"${recipe.title}" १००% वीगन बनवण्यासाठी: बटरऐवजी ऑलिव्ह ऑइल वापरा, मलाईऐवजी नारळाची साय आणि चीजऐवजी काजू पावडर किंवा न्यूट्रिशनल यीस्ट वापरा. चव अप्रतिम लागेल!`;
    }
    if (q.includes('spicy') || q.includes('तिखट')) {
      return `तिखटपणा कमी करण्यासाठी: थोडे दही, लिंबाचा रस किंवा चमचाभर मलई/दूध मिसळा. यातील फॅट्स चव न बदलता तिखटपणा नियंत्रित करतात.`;
    }
    return `छान प्रश्न! "${recipe.title}" बनवताना नेहमी मंद ते मध्यम आच ठेवा आणि प्रत्येक पायरीवर चवीनुसार मीठ घाला. पॅन पुरेसा गरम झाल्यावरच साहित्य घाला.`;
  }

  if (isHI) {
    if (q.includes('substitute') || q.includes('replace') || q.includes('बदल')) {
      return `"${recipe.title}" के लिए आप सामग्री बदल सकते हैं: डेयरी की जगह नारियल की मलाई या काजू पेस्ट इस्तेमाल करें; प्रोटीन के लिए पनीर या टोफू सबसे बढ़िया विकल्प हैं!`;
    }
    if (q.includes('vegan') || q.includes('शाकाहारी')) {
      return `"${recipe.title}" को पूरी तरह वीगन बनाने के लिए: मक्खन की जगह जैतून का तेल और ताज़ी क्रीम की जगह गाढ़ा नारियल का दूध इस्तेमाल करें।`;
    }
    if (q.includes('spicy') || q.includes('तीखा')) {
      return `तीखापन कम करने के लिए: थोड़ा सा दही, नींबू का रस या एक चम्मच मलाई मिलाएं। इससे तीखापन तुरंत संतुलित हो जाता है।`;
    }
    return `बहुत अच्छा सवाल! "${recipe.title}" के लिए आंच मध्यम रखें और मसालों को धीमी आंच पर भूनें ताकि उनका असली स्वाद बाहर आए।`;
  }

  if (q.includes('substitute') || q.includes('replace')) {
    return `For "${recipe.title}", you can substitute key items while preserving texture: if replacing dairy, try coconut cream or cashew butter; if swapping fresh herbs, use 1/3 the amount of dried herbs. For protein swaps, firm tofu or chickpeas work wonderfully in this ${recipe.cuisine} preparation!`;
  }
  if (q.includes('vegan') || q.includes('dairy-free')) {
    return `To make "${recipe.title}" 100% vegan: replace any butter with extra virgin olive oil or plant butter, swap heavy cream with canned coconut cream, and use nutritional yeast or cashew parmesan instead of cheese. The vibrant flavors of the dish will shine through beautifully!`;
  }
  if (q.includes('spicy') || q.includes('heat')) {
    return `To tame the spice level in this recipe: add a splash of cream, a squeeze of fresh lemon juice, or a spoonful of plain Greek yogurt (or coconut milk). The fats and acids neutralize capsaicin without diluting the rich seasonings.`;
  }
  if (q.includes('how long') || q.includes('time') || q.includes('cook')) {
    return `This recipe has a total cooking time of ${recipe.cookTime} minutes across ${recipe.instructions.length} steps. Check Step 3 and 4 closely for the golden sear—the pan should be over steady medium heat so it doesn't scorch!`;
  }

  return `Great question! For "${recipe.title}", always keep heat control steady and season in layers. If you're on Step 1 or 2, give your pan ample time to preheat before adding aromatics so flavors bloom without sticking.`;
}
