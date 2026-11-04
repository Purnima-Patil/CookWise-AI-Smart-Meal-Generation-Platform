export interface IngredientCategory {
  name: string;
  items: string[];
}

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  {
    name: 'Vegetables & Greens',
    items: [
      'Tomatoes',
      'Baby Spinach',
      'Garlic',
      'Yellow Onion',
      'Bell Peppers',
      'Asparagus',
      'Broccoli',
      'Mushrooms',
      'Zucchini',
      'Carrots',
      'Potatoes',
      'Avocado',
    ],
  },
  {
    name: 'Proteins & Seafood',
    items: [
      'Eggs',
      'Salmon Fillets',
      'Extra-Firm Tofu',
      'Chicken Breast',
      'Ground Turkey',
      'Chickpeas',
      'Black Beans',
      'Shrimp',
      'Lentils',
    ],
  },
  {
    name: 'Dairy & Plant Alternatives',
    items: [
      'Heavy Cream',
      'Parmigiano-Reggiano',
      'Feta Cheese',
      'Unsalted Butter',
      'Greek Yogurt',
      'Coconut Milk',
      'Cheddar Cheese',
      'Oat Milk',
      'Mozzarella',
    ],
  },
  {
    name: 'Grains, Pasta & Carbs',
    items: [
      'Rigatoni Pasta',
      'Jasmine Rice',
      'Spaghetti',
      'Quinoa',
      'Sourdough Bread',
      'Rolled Oats',
      'Tortillas',
      'Couscous',
    ],
  },
  {
    name: 'Pantry, Herbs & Spices',
    items: [
      'Extra Virgin Olive Oil',
      'Lemon',
      'Fresh Basil',
      'Fresh Dill',
      'Fresh Cilantro',
      'Cumin',
      'Smoked Paprika',
      'Soy Sauce',
      'Honey',
      'Balsamic Vinegar',
      'Dijon Mustard',
      'Curry Paste',
    ],
  },
];

export const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Keto',
  'Dairy-Free',
  'Pescatarian',
  'Low-Carb',
  'High-Protein',
  'Paleo',
];

export const CUISINE_OPTIONS = [
  'Any Cuisine',
  'Italian',
  'Mediterranean',
  'Thai',
  'Mexican',
  'Japanese',
  'Indian',
  'French',
  'Middle Eastern',
  'American',
];

export const MEAL_TYPES = ['Any Meal', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

export const SPICE_LEVELS = ['Mild', 'Medium', 'Hot', 'Extra Hot'] as const;

export const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Advanced'] as const;
