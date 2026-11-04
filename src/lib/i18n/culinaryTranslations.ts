import { SupportedLanguage } from './translations';
import { Recipe, InstructionStep } from '../../types';

export const CULINARY_DICTIONARY: Record<
  SupportedLanguage,
  {
    categories: Record<string, string>;
    ingredients: Record<string, string>;
    dietary: Record<string, string>;
    cuisine: Record<string, string>;
    mealTypes: Record<string, string>;
    spiceLevels: Record<string, string>;
    difficulties: Record<string, string>;
    units: Record<string, string>;
  }
> = {
  en: {
    categories: {
      'Vegetables & Greens': 'Vegetables & Greens',
      'Proteins & Seafood': 'Proteins & Seafood',
      'Dairy & Plant Alternatives': 'Dairy & Plant Alternatives',
      'Grains, Pasta & Carbs': 'Grains, Pasta & Carbs',
      'Pantry, Herbs & Spices': 'Pantry, Herbs & Spices',
    },
    ingredients: {},
    dietary: {
      Vegetarian: 'Vegetarian',
      Vegan: 'Vegan',
      'Gluten-Free': 'Gluten-Free',
      Keto: 'Keto',
      'Dairy-Free': 'Dairy-Free',
      Pescatarian: 'Pescatarian',
      'Low-Carb': 'Low-Carb',
      'High-Protein': 'High-Protein',
      Paleo: 'Paleo',
    },
    cuisine: {
      'Any Cuisine': 'Any Cuisine',
      Italian: 'Italian',
      Mediterranean: 'Mediterranean',
      Thai: 'Thai',
      Mexican: 'Mexican',
      Japanese: 'Japanese',
      Indian: 'Indian',
      French: 'French',
      'Middle Eastern': 'Middle Eastern',
      American: 'American',
    },
    mealTypes: {
      'Any Meal': 'Any Meal',
      Breakfast: 'Breakfast',
      Lunch: 'Lunch',
      Dinner: 'Dinner',
      Snack: 'Snack',
      Dessert: 'Dessert',
    },
    spiceLevels: {
      Mild: 'Mild',
      Medium: 'Medium',
      Hot: 'Hot',
      'Extra Hot': 'Extra Hot',
    },
    difficulties: {
      Easy: 'Easy',
      Medium: 'Medium',
      Advanced: 'Advanced',
    },
    units: {
      g: 'g',
      ml: 'ml',
      tbsp: 'tbsp',
      tsp: 'tsp',
      cloves: 'cloves',
      cup: 'cup',
      pinch: 'pinch',
    },
  },

  hi: {
    categories: {
      'Vegetables & Greens': 'सब्जियां और हरी पत्तियां',
      'Proteins & Seafood': 'प्रोटीन और समुद्री भोजन',
      'Dairy & Plant Alternatives': 'डेयरी और पादप विकल्प',
      'Grains, Pasta & Carbs': 'अनाज, पास्ता और कार्ब्स',
      'Pantry, Herbs & Spices': 'मसाले, जड़ी-बूटियाँ और तेल',
    },
    ingredients: {
      Tomatoes: 'टमाटर',
      'Baby Spinach': 'पालक',
      Garlic: 'लहसुन',
      'Yellow Onion': 'प्याज',
      'Bell Peppers': 'शिमला मिर्च',
      Asparagus: 'शतावरी',
      Broccoli: 'ब्रोकोली',
      Mushrooms: 'मशरूम',
      Zucchini: 'तोरई (ज़ुकिनी)',
      Carrots: 'गाजर',
      Potatoes: 'आलू',
      Avocado: 'एवोकाडो',
      Eggs: 'अंडे',
      'Salmon Fillets': 'सैल्मन मछली',
      'Extra-Firm Tofu': 'टोफू / पनीर',
      'Chicken Breast': 'चिकन',
      'Ground Turkey': 'टर्की कीमा',
      Chickpeas: 'छोले / काबुली चना',
      'Black Beans': 'काले राजमा',
      Shrimp: 'झींगा (Shrimp)',
      Lentils: 'दाल',
      'Heavy Cream': 'गाढ़ी मलाई / क्रीम',
      'Parmigiano-Reggiano': 'परमेसन चीज़',
      'Feta Cheese': 'फेटा चीज़',
      'Unsalted Butter': 'बिना नमक का मक्खन',
      'Greek Yogurt': 'गाढ़ा दही',
      'Coconut Milk': 'नारियल का दूध',
      'Cheddar Cheese': 'चेडर चीज़',
      'Oat Milk': 'ओट मिल्क',
      Mozzarella: 'मोज़ेरेला चीज़',
      'Rigatoni Pasta': 'रिगाटोनी पास्ता',
      'Jasmine Rice': 'सुगंधित चावल',
      Spaghetti: 'स्पेगेटी',
      Quinoa: 'क्विनोआ',
      'Sourdough Bread': 'खमीरयुक्त ब्रेड / रोटी',
      'Rolled Oats': 'ओट्स',
      Tortillas: 'टॉर्टिला / रोटी',
      Couscous: 'कुसकुस',
      'Extra Virgin Olive Oil': 'जैतून का तेल (Olive Oil)',
      Lemon: 'नींबू',
      'Fresh Basil': 'ताज़ा तुलसी पत्ती',
      'Fresh Dill': 'सोया पत्ती (Dill)',
      'Fresh Cilantro': 'ताज़ा हरा धनिया',
      Cumin: 'जीरा',
      'Smoked Paprika': 'कश्मीरी लाल मिर्च पाउडर',
      'Soy Sauce': 'सोया सॉस',
      Honey: 'शहद',
      'Balsamic Vinegar': 'सिरका (Vinegar)',
      'Dijon Mustard': 'राई पेस्ट (Mustard)',
      'Curry Paste': 'करी पेस्ट',
    },
    dietary: {
      Vegetarian: 'शाकाहारी (Vegetarian)',
      Vegan: 'वीगन (Vegan)',
      'Gluten-Free': 'ग्लूटेन-मुक्त',
      Keto: 'कीटो (Keto)',
      'Dairy-Free': 'डेयरी-मुक्त',
      Pescatarian: 'पेस्केटेरियन (मछली युक्त)',
      'Low-Carb': 'कम कार्ब्स',
      'High-Protein': 'उच्च प्रोटीन',
      Paleo: 'पैलियो',
    },
    cuisine: {
      'Any Cuisine': 'कोई भी व्यंजन शैली',
      Italian: 'इटैलियन (Italian)',
      Mediterranean: 'भूमध्यसागरीय (Mediterranean)',
      Thai: 'थाई (Thai)',
      Mexican: 'मैक्सिकन (Mexican)',
      Japanese: 'जापानी (Japanese)',
      Indian: 'भारतीय (Indian)',
      French: 'फ्रेंच (French)',
      'Middle Eastern': 'मध्य-पूर्वी (Middle Eastern)',
      American: 'अमेरिकन (American)',
    },
    mealTypes: {
      'Any Meal': 'कोई भी समय',
      Breakfast: 'नाश्ता (Breakfast)',
      Lunch: 'दोपहर का भोजन (Lunch)',
      Dinner: 'रात का खाना (Dinner)',
      Snack: 'स्नैक / नाश्ता (Snack)',
      Dessert: 'मीठा (Dessert)',
    },
    spiceLevels: {
      Mild: 'हल्का (Mild)',
      Medium: 'मध्यम (Medium)',
      Hot: 'तीखा (Hot)',
      'Extra Hot': 'बहुत तीखा (Extra Hot)',
    },
    difficulties: {
      Easy: 'सरल / आसान',
      Medium: 'मध्यम',
      Advanced: 'कठिन / कुशल',
    },
    units: {
      g: 'ग्राम',
      ml: 'मिली',
      tbsp: 'चम्मच (tbsp)',
      tsp: 'छोटा चम्मच (tsp)',
      cloves: 'कलियाँ',
      cup: 'कप',
      pinch: 'चुटकी',
    },
  },

  mr: {
    categories: {
      'Vegetables & Greens': 'भाज्या आणि पालेभाज्या',
      'Proteins & Seafood': 'प्रथिने आणि सीफूड',
      'Dairy & Plant Alternatives': 'दुग्धजन्य व वनस्पती पदार्थ',
      'Grains, Pasta & Carbs': 'धान्य, पास्ता आणि तृणधान्ये',
      'Pantry, Herbs & Spices': 'मसाले, औषधी वनस्पती आणि तेल',
    },
    ingredients: {
      Tomatoes: 'टोमॅटो',
      'Baby Spinach': 'पालक',
      Garlic: 'लसूण',
      'Yellow Onion': 'कांदा',
      'Bell Peppers': 'शिमला मिरची',
      Asparagus: 'शतावरी',
      Broccoli: 'ब्रोकोली',
      Mushrooms: 'मशरूम (अळंबी)',
      Zucchini: 'झुकिनी (तोरई)',
      Carrots: 'गाजर',
      Potatoes: 'बटाटे',
      Avocado: 'अ‍ॅव्होकॅडो',
      Eggs: 'अंडी',
      'Salmon Fillets': 'सॅल्मन मासा',
      'Extra-Firm Tofu': 'टोफू / पनीर',
      'Chicken Breast': 'चिकन (कोंबडीचे मांस)',
      'Ground Turkey': 'टर्की कीमा',
      Chickpeas: 'छोले / काबुली चणे',
      'Black Beans': 'काळी बीन्स',
      Shrimp: 'कोळंबी (झींगा)',
      Lentils: 'डाळ / मसूर',
      'Heavy Cream': 'घट्ट साय / मलाई',
      'Parmigiano-Reggiano': 'परमेसन चीज',
      'Feta Cheese': 'फेटा चीज',
      'Unsalted Butter': 'लोणी / बटर',
      'Greek Yogurt': 'घट्ट दही',
      'Coconut Milk': 'खोबऱ्याचे दूध',
      'Cheddar Cheese': 'चेडर चीज',
      'Oat Milk': 'ओट मिल्क',
      Mozzarella: 'मोझरेला चीज',
      'Rigatoni Pasta': 'रिगाटोनी पास्ता',
      'Jasmine Rice': 'सुवासिक भात / तांदूळ',
      Spaghetti: 'स्पॅगेटी',
      Quinoa: 'क्विनोआ',
      'Sourdough Bread': 'ब्रेड / पाव',
      'Rolled Oats': 'ओट्स',
      Tortillas: 'रोटी / टॉर्टिला',
      Couscous: 'कुसकुस',
      'Extra Virgin Olive Oil': 'ऑलिव्ह तेल',
      Lemon: 'लिंबू',
      'Fresh Basil': 'तुळस (बेसिल)',
      'Fresh Dill': 'शेपू',
      'Fresh Cilantro': 'ताजी कोथिंबीर',
      Cumin: 'जिरे',
      'Smoked Paprika': 'लाल मिरची पावडर',
      'Soy Sauce': 'सोया सॉस',
      Honey: 'मध',
      'Balsamic Vinegar': 'व्हिनेगर',
      'Dijon Mustard': 'मोहरी पेस्ट',
      'Curry Paste': 'मसाला पेस्ट',
    },
    dietary: {
      Vegetarian: 'शाकाहारी (Vegetarian)',
      Vegan: 'व्हेगन (Vegan)',
      'Gluten-Free': 'ग्लूटेन-मुक्त',
      Keto: 'कीटो (Keto)',
      'Dairy-Free': 'दुग्ध-मुक्त',
      Pescatarian: 'पेस्केटेरियन (मत्स्यहारी)',
      'Low-Carb': 'कमी कार्ब्स',
      'High-Protein': 'जास्त प्रोटीन',
      Paleo: 'पॅलिओ',
    },
    cuisine: {
      'Any Cuisine': 'कोणतीही पाककला शैली',
      Italian: 'इटालियन (Italian)',
      Mediterranean: 'भूमध्यसागरीय (Mediterranean)',
      Thai: 'थाई (Thai)',
      Mexican: 'मेक्सिकन (Mexican)',
      Japanese: 'जपानी (Japanese)',
      Indian: 'भारतीय (Indian)',
      French: 'फ्रेंच (French)',
      'Middle Eastern': 'मध्य-पूर्वेकडील (Middle Eastern)',
      American: 'अमेरिकन (American)',
    },
    mealTypes: {
      'Any Meal': 'कोणतीही वेळ',
      Breakfast: 'सकाळचा नाश्ता (Breakfast)',
      Lunch: 'दुपारचे जेवण (Lunch)',
      Dinner: 'रात्रीचे जेवण (Dinner)',
      Snack: 'दुपारचा नाश्ता (Snack)',
      Dessert: 'गोड पदार्थ (Dessert)',
    },
    spiceLevels: {
      Mild: 'सौम्य / कमी तिखट (Mild)',
      Medium: 'मध्यम तिखट (Medium)',
      Hot: 'तिखट (Hot)',
      'Extra Hot': 'अतिशय तिखट (Extra Hot)',
    },
    difficulties: {
      Easy: 'सोपे / सहज',
      Medium: 'मध्यम',
      Advanced: 'प्रगत / कठीण',
    },
    units: {
      g: 'ग्रॅम',
      ml: 'मिली',
      tbsp: 'मोठा चमचा',
      tsp: 'लहान चमचा',
      cloves: 'पाकळ्या',
      cup: 'कप',
      pinch: 'चिमूटभर',
    },
  },

  gu: {
    categories: {
      'Vegetables & Greens': 'શાકભાજી અને લીલોતરી',
      'Proteins & Seafood': 'પ્રોટીન અને સીફૂડ',
      'Dairy & Plant Alternatives': 'ડેરી અને વનસ્પતિ વિકલ્પો',
      'Grains, Pasta & Carbs': 'અનાજ, પાસ્તા અને કાર્બ્સ',
      'Pantry, Herbs & Spices': 'મસાલા, તેલ અને જડીબુટ્ટીઓ',
    },
    ingredients: {
      Tomatoes: 'ટામેટાં',
      'Baby Spinach': 'પાલક',
      Garlic: 'લસણ',
      'Yellow Onion': 'ડુંગળી',
      'Bell Peppers': 'કેપ્સિકમ / સિમલા મરચાં',
      Asparagus: 'શતાવરી',
      Broccoli: 'બ્રોકોલી',
      Mushrooms: 'મશરૂમ',
      Zucchini: 'તુરીયા જેવું શાક (Zucchini)',
      Carrots: 'ગાજર',
      Potatoes: 'બટાટા',
      Avocado: 'એવોકાડો',
      Eggs: 'ઈંડા',
      'Salmon Fillets': 'સેલ્મોન માછલી',
      'Extra-Firm Tofu': 'ટોફુ / પનીર',
      'Chicken Breast': 'ચિકન',
      'Ground Turkey': 'ટર્કી કીમો',
      Chickpeas: 'કાબુલી ચણા / છોલે',
      'Black Beans': 'કાળા બીન્સ',
      Shrimp: 'ઝીંગા',
      Lentils: 'દાળ / કઠોળ',
      'Heavy Cream': 'મલાઈ / ક્રીમ',
      'Parmigiano-Reggiano': 'પરમેસન ચીઝ',
      'Feta Cheese': 'ફેટા ચીઝ',
      'Unsalted Butter': 'માખણ / બટર',
      'Greek Yogurt': 'ઘાટું દહીં',
      'Coconut Milk': 'નાળિયેરનું દૂધ',
      'Cheddar Cheese': 'ચેડર ચીઝ',
      'Oat Milk': 'ઓટ મિલ્ક',
      Mozzarella: 'મોઝેરેલા ચીઝ',
      'Rigatoni Pasta': 'રિગાટોની પાસ્તા',
      'Jasmine Rice': 'સુગંધિત ચોખા',
      Spaghetti: 'સ્પેગેટી',
      Quinoa: 'ક્વિનોઆ',
      'Sourdough Bread': 'બ્રેડ / રોટલી',
      'Rolled Oats': 'ઓટ્સ',
      Tortillas: 'ટોર્ટિલા / રોટલી',
      Couscous: 'કુસકુસ',
      'Extra Virgin Olive Oil': 'ઓલિવ ઓઇલ',
      Lemon: 'લીંબુ',
      'Fresh Basil': 'તુલસીના પાન',
      'Fresh Dill': 'સૂવા ભાજી',
      'Fresh Cilantro': 'તાજા લીલા ધાણા',
      Cumin: 'જીરું',
      'Smoked Paprika': 'લાલ મરચું પાવડર',
      'Soy Sauce': 'સોયા સોસ',
      Honey: 'મધ',
      'Balsamic Vinegar': 'સરકો (વિનેગર)',
      'Dijon Mustard': 'રાઈ પેસ્ટ',
      'Curry Paste': 'કરી પેસ્ટ',
    },
    dietary: {
      Vegetarian: 'શાકાહારી (Vegetarian)',
      Vegan: 'વીગન (Vegan)',
      'Gluten-Free': 'ગ્લુટેન મુક્ત',
      Keto: 'કીટો (Keto)',
      'Dairy-Free': 'ડેરી મુક્ત',
      Pescatarian: 'પેસ્કેટેરિયન',
      'Low-Carb': 'ઓછું કાર્બ્સ',
      'High-Protein': 'વધુ પ્રોટીન',
      Paleo: 'પેલેઓ',
    },
    cuisine: {
      'Any Cuisine': 'કોઈપણ રસોઈ શૈલી',
      Italian: 'ઇટાલિયન',
      Mediterranean: 'મેડિટેરેનિયન',
      Thai: 'થાઈ',
      Mexican: 'મેક્સિકન',
      Japanese: 'જાપાની',
      Indian: 'ભારતીય (Indian)',
      French: 'ફ્રેન્ચ',
      'Middle Eastern': 'મિડલ ઇસ્ટર્ન',
      American: 'અમેરિકન',
    },
    mealTypes: {
      'Any Meal': 'કોઈપણ સમય',
      Breakfast: 'સવારનો નાસ્તો (Breakfast)',
      Lunch: 'બપોરનું ભોજન (Lunch)',
      Dinner: 'રાત્રિ ભોજન (Dinner)',
      Snack: 'નાસ્તો (Snack)',
      Dessert: 'મીઠાઈ (Dessert)',
    },
    spiceLevels: {
      Mild: 'ઓછું તીખું (Mild)',
      Medium: 'મધ્યમ (Medium)',
      Hot: 'તીખું (Hot)',
      'Extra Hot': 'ખૂબ તીખું (Extra Hot)',
    },
    difficulties: {
      Easy: 'સરળ',
      Medium: 'મધ્યમ',
      Advanced: 'નિષ્ણાત',
    },
    units: {
      g: 'ગ્રામ',
      ml: 'મિલી',
      tbsp: 'મોટી ચમચી',
      tsp: 'નાની ચમચી',
      cloves: 'કળીઓ',
      cup: 'કપ',
      pinch: 'ચપટી',
    },
  },

  es: {
    categories: {
      'Vegetables & Greens': 'Verduras y Hortalizas',
      'Proteins & Seafood': 'Proteínas y Mariscos',
      'Dairy & Plant Alternatives': 'Lácteos y Alternativas Vegetales',
      'Grains, Pasta & Carbs': 'Cereales, Pastas y Carbohidratos',
      'Pantry, Herbs & Spices': 'Despensa, Hierbas y Especias',
    },
    ingredients: {
      Tomatoes: 'Tomates',
      'Baby Spinach': 'Espinacas tiernas',
      Garlic: 'Ajo',
      'Yellow Onion': 'Cebolla amarilla',
      'Bell Peppers': 'Pimientos',
      Asparagus: 'Espárragos',
      Broccoli: 'Brócoli',
      Mushrooms: 'Champiñones / Setas',
      Zucchini: 'Calabacín',
      Carrots: 'Zanahorias',
      Potatoes: 'Patatas / Papas',
      Avocado: 'Aguacate / Palta',
      Eggs: 'Huevos',
      'Salmon Fillets': 'Filetes de Salmón',
      'Extra-Firm Tofu': 'Tofu firme',
      'Chicken Breast': 'Pechuga de pollo',
      'Ground Turkey': 'Pavo molido',
      Chickpeas: 'Garbanzos',
      'Black Beans': 'Frijoles negros',
      Shrimp: 'Camarones / Gambas',
      Lentils: 'Lentejas',
      'Heavy Cream': 'Crema de leche / Nata',
      'Parmigiano-Reggiano': 'Parmesano Reggiano',
      'Feta Cheese': 'Queso Feta',
      'Unsalted Butter': 'Mantequilla sin sal',
      'Greek Yogurt': 'Yogur griego',
      'Coconut Milk': 'Leche de coco',
      'Cheddar Cheese': 'Queso Cheddar',
      'Oat Milk': 'Leche de avena',
      Mozzarella: 'Queso Mozzarella',
      'Rigatoni Pasta': 'Pasta Rigatoni',
      'Jasmine Rice': 'Arroz Jazmín',
      Spaghetti: 'Espaguetis',
      Quinoa: 'Quinua',
      'Sourdough Bread': 'Pan de masa madre',
      'Rolled Oats': 'Copos de avena',
      Tortillas: 'Tortillas',
      Couscous: 'Cuscús',
      'Extra Virgin Olive Oil': 'Aceite de oliva virgen extra',
      Lemon: 'Limón',
      'Fresh Basil': 'Albahaca fresca',
      'Fresh Dill': 'Eneldo fresco',
      'Fresh Cilantro': 'Cilantro fresco',
      Cumin: 'Comino',
      'Smoked Paprika': 'Pimentón ahumado',
      'Soy Sauce': 'Salsa de soja',
      Honey: 'Miel',
      'Balsamic Vinegar': 'Vinagre balsámico',
      'Dijon Mustard': 'Mostaza de Dijon',
      'Curry Paste': 'Pasta de curry',
    },
    dietary: {
      Vegetarian: 'Vegetariano',
      Vegan: 'Vegano',
      'Gluten-Free': 'Sin Gluten',
      Keto: 'Keto',
      'Dairy-Free': 'Sin Lácteos',
      Pescatarian: 'Pescetariano',
      'Low-Carb': 'Bajo en Carbohidratos',
      'High-Protein': 'Alto en Proteína',
      Paleo: 'Paleo',
    },
    cuisine: {
      'Any Cuisine': 'Cualquier Cocina',
      Italian: 'Italiana',
      Mediterranean: 'Mediterránea',
      Thai: 'Tailandesa',
      Mexican: 'Mexicana',
      Japanese: 'Japonesa',
      Indian: 'India',
      French: 'Francesa',
      'Middle Eastern': 'Medio Oriente',
      American: 'Americana',
    },
    mealTypes: {
      'Any Meal': 'Cualquier Comida',
      Breakfast: 'Desayuno',
      Lunch: 'Almuerzo',
      Dinner: 'Cena',
      Snack: 'Merienda',
      Dessert: 'Postre',
    },
    spiceLevels: {
      Mild: 'Suave',
      Medium: 'Medio',
      Hot: 'Picante',
      'Extra Hot': 'Muy Picante',
    },
    difficulties: {
      Easy: 'Fácil',
      Medium: 'Medio',
      Advanced: 'Avanzado',
    },
    units: {
      g: 'g',
      ml: 'ml',
      tbsp: 'cda',
      tsp: 'cdta',
      cloves: 'dientes',
      cup: 'taza',
      pinch: 'pizca',
    },
  },

  fr: {
    categories: {
      'Vegetables & Greens': 'Légumes & Feuilles',
      'Proteins & Seafood': 'Protéines & Fruits de Mer',
      'Dairy & Plant Alternatives': 'Produits Laitiers & Végétaux',
      'Grains, Pasta & Carbs': 'Céréales, Pâtes & Féculents',
      'Pantry, Herbs & Spices': 'Épicerie, Herbes & Épices',
    },
    ingredients: {
      Tomatoes: 'Tomates',
      'Baby Spinach': 'Pousses d’épinards',
      Garlic: 'Ail',
      'Yellow Onion': 'Oignon jaune',
      'Bell Peppers': 'Poivrons',
      Asparagus: 'Asperges',
      Broccoli: 'Brocoli',
      Mushrooms: 'Champignons',
      Zucchini: 'Courgettes',
      Carrots: 'Carottes',
      Potatoes: 'Pommes de terre',
      Avocado: 'Avocat',
      Eggs: 'Œufs',
      'Salmon Fillets': 'Pavés de saumon',
      'Extra-Firm Tofu': 'Tofu ferme',
      'Chicken Breast': 'Blancs de poulet',
      'Ground Turkey': 'Dinde hachée',
      Chickpeas: 'Pois chiches',
      'Black Beans': 'Haricots noirs',
      Shrimp: 'Crevettes',
      Lentils: 'Lentilles',
      'Heavy Cream': 'Crème fraîche épaisse',
      'Parmigiano-Reggiano': 'Parmigiano-Reggiano',
      'Feta Cheese': 'Féta',
      'Unsalted Butter': 'Beurre doux',
      'Greek Yogurt': 'Yaourt grec',
      'Coconut Milk': 'Lait de coco',
      'Cheddar Cheese': 'Fromage Cheddar',
      'Oat Milk': 'Lait d’avoine',
      Mozzarella: 'Mozzarella',
      'Rigatoni Pasta': 'Pâtes Rigatoni',
      'Jasmine Rice': 'Riz Jasmin',
      Spaghetti: 'Spaghetti',
      Quinoa: 'Quinoa',
      'Sourdough Bread': 'Pain au levain',
      'Rolled Oats': 'Flocons d’avoine',
      Tortillas: 'Tortillas',
      Couscous: 'Couscous',
      'Extra Virgin Olive Oil': 'Huile d’olive extra vierge',
      Lemon: 'Citron',
      'Fresh Basil': 'Basilic frais',
      'Fresh Dill': 'Aneth frais',
      'Fresh Cilantro': 'Coriandre fraîche',
      Cumin: 'Cumin',
      'Smoked Paprika': 'Paprika fumé',
      'Soy Sauce': 'Sauce soja',
      Honey: 'Miel',
      'Balsamic Vinegar': 'Vinaigre balsamique',
      'Dijon Mustard': 'Moutarde de Dijon',
      'Curry Paste': 'Pâte de curry',
    },
    dietary: {
      Vegetarian: 'Végétarien',
      Vegan: 'Végétalien',
      'Gluten-Free': 'Sans Gluten',
      Keto: 'Cétogène (Keto)',
      'Dairy-Free': 'Sans Produits Laitiers',
      Pescatarian: 'Pescétarien',
      'Low-Carb': 'Faible en Glucides',
      'High-Protein': 'Riche en Protéines',
      Paleo: 'Paléo',
    },
    cuisine: {
      'Any Cuisine': 'Toutes Cuisines',
      Italian: 'Italienne',
      Mediterranean: 'Méditerranéenne',
      Thai: 'Thaïlandaise',
      Mexican: 'Mexicaine',
      Japanese: 'Japonaise',
      Indian: 'Indienne',
      French: 'Française',
      'Middle Eastern': 'Moyen-Orient',
      American: 'Américaine',
    },
    mealTypes: {
      'Any Meal': 'Tout Repas',
      Breakfast: 'Petit-déjeuner',
      Lunch: 'Déjeuner',
      Dinner: 'Dîner',
      Snack: 'Collation',
      Dessert: 'Dessert',
    },
    spiceLevels: {
      Mild: 'Doux',
      Medium: 'Moyen',
      Hot: 'Épicé',
      'Extra Hot': 'Très Épicé',
    },
    difficulties: {
      Easy: 'Facile',
      Medium: 'Moyen',
      Advanced: 'Avancé',
    },
    units: {
      g: 'g',
      ml: 'ml',
      tbsp: 'c. à soupe',
      tsp: 'c. à café',
      cloves: 'gousses',
      cup: 'tasse',
      pinch: 'pincée',
    },
  },

  de: {
    categories: {
      'Vegetables & Greens': 'Gemüse & Kräuter',
      'Proteins & Seafood': 'Proteine & Meeresfrüchte',
      'Dairy & Plant Alternatives': 'Milchprodukte & Alternativen',
      'Grains, Pasta & Carbs': 'Getreide, Pasta & Kohlenhydrate',
      'Pantry, Herbs & Spices': 'Vorrat, Gewürze & Öle',
    },
    ingredients: {
      Tomatoes: 'Tomaten',
      'Baby Spinach': 'Babyspinat',
      Garlic: 'Knoblauch',
      'Yellow Onion': 'Zwiebeln',
      'Bell Peppers': 'Paprika',
      Asparagus: 'Spargel',
      Broccoli: 'Brokkoli',
      Mushrooms: 'Pilze / Champignons',
      Zucchini: 'Zucchini',
      Carrots: 'Karotten / Möhren',
      Potatoes: 'Kartoffeln',
      Avocado: 'Avocado',
      Eggs: 'Eier',
      'Salmon Fillets': 'Lachsfilets',
      'Extra-Firm Tofu': 'Fester Tofu',
      'Chicken Breast': 'Hähnchenbrust',
      'Ground Turkey': 'Putenhackfleisch',
      Chickpeas: 'Kichererbsen',
      'Black Beans': 'Schwarze Bohnen',
      Shrimp: 'Garnelen',
      Lentils: 'Linsen',
      'Heavy Cream': 'Schlagsahne / Sahne',
      'Parmigiano-Reggiano': 'Parmigiano-Reggiano',
      'Feta Cheese': 'Feta-Käse',
      'Unsalted Butter': 'Ungesalzene Butter',
      'Greek Yogurt': 'Griechischer Joghurt',
      'Coconut Milk': 'Kokosmilch',
      'Cheddar Cheese': 'Cheddar-Käse',
      'Oat Milk': 'Hafermilch',
      Mozzarella: 'Mozzarella',
      'Rigatoni Pasta': 'Rigatoni-Nudeln',
      'Jasmine Rice': 'Jasminreis',
      Spaghetti: 'Spaghetti',
      Quinoa: 'Quinoa',
      'Sourdough Bread': 'Sauerteigbrot',
      'Rolled Oats': 'Haferflocken',
      Tortillas: 'Tortillas',
      Couscous: 'Couscous',
      'Extra Virgin Olive Oil': 'Natives Olivenöl extra',
      Lemon: 'Zitrone',
      'Fresh Basil': 'Frisches Basilikum',
      'Fresh Dill': 'Frischer Dill',
      'Fresh Cilantro': 'Frischer Koriander',
      Cumin: 'Kreuzkümmel',
      'Smoked Paprika': 'Geräuchertes Paprikapulver',
      'Soy Sauce': 'Sojasauce',
      Honey: 'Honig',
      'Balsamic Vinegar': 'Balsamico-Essig',
      'Dijon Mustard': 'Dijon-Senf',
      'Curry Paste': 'Currypaste',
    },
    dietary: {
      Vegetarian: 'Vegetarisch',
      Vegan: 'Vegan',
      'Gluten-Free': 'Glutenfrei',
      Keto: 'Keto',
      'Dairy-Free': 'Laktosefrei',
      Pescatarian: 'Pescetarisch',
      'Low-Carb': 'Kohlenhydratarm',
      'High-Protein': 'Proteinreich',
      Paleo: 'Paleo',
    },
    cuisine: {
      'Any Cuisine': 'Jede Küche',
      Italian: 'Italienisch',
      Mediterranean: 'Mediterran',
      Thai: 'Thailändisch',
      Mexican: 'Mexikanisch',
      Japanese: 'Japanisch',
      Indian: 'Indisch',
      French: 'Französisch',
      'Middle Eastern': 'Nahöstlich',
      American: 'Amerikanisch',
    },
    mealTypes: {
      'Any Meal': 'Jede Mahlzeit',
      Breakfast: 'Frühstück',
      Lunch: 'Mittagessen',
      Dinner: 'Abendessen',
      Snack: 'Snack',
      Dessert: 'Dessert',
    },
    spiceLevels: {
      Mild: 'Mild',
      Medium: 'Mittel',
      Hot: 'Scharf',
      'Extra Hot': 'Sehr Scharf',
    },
    difficulties: {
      Easy: 'Einfach',
      Medium: 'Mittel',
      Advanced: 'Fortgeschritten',
    },
    units: {
      g: 'g',
      ml: 'ml',
      tbsp: 'EL',
      tsp: 'TL',
      cloves: 'Zehen',
      cup: 'Tasse',
      pinch: 'Prise',
    },
  },
};

export function localizeIngredientName(name: string, lang: SupportedLanguage): string {
  if (lang === 'en' || !name) return name;
  const dict = CULINARY_DICTIONARY[lang]?.ingredients;
  if (!dict) return name;

  // 1. Direct match
  if (dict[name]) return dict[name];

  const lowerName = name.toLowerCase().trim();

  // 2. Case-insensitive exact match
  for (const [key, val] of Object.entries(dict)) {
    if (key.toLowerCase() === lowerName) return val;
  }

  // 3. Substring containment match (e.g. 'Rigatoni pasta' -> 'Rigatoni Pasta')
  for (const [key, val] of Object.entries(dict)) {
    const keyLower = key.toLowerCase();
    if (lowerName.includes(keyLower) || keyLower.includes(lowerName)) {
      return val;
    }
  }

  // 4. Keyword heuristics for commonly used recipe ingredients
  if (lang === 'gu') {
    if (lowerName.includes('pasta') || lowerName.includes('rigatoni') || lowerName.includes('spaghetti')) return 'પાસ્તા';
    if (lowerName.includes('garlic')) return 'લસણ';
    if (lowerName.includes('spinach')) return 'તાજી પાલક';
    if (lowerName.includes('tomato')) return 'ટામેટાં';
    if (lowerName.includes('cream')) return 'ક્રીમ / મલાઈ';
    if (lowerName.includes('cheese') || lowerName.includes('parmigiano') || lowerName.includes('parmesan') || lowerName.includes('feta')) return 'ચીઝ';
    if (lowerName.includes('olive oil') || lowerName.includes('oil')) return 'ઓલિવ ઓઇલ';
    if (lowerName.includes('salt')) return 'મીઠું';
    if (lowerName.includes('pepper')) return 'કાળા મરી પાવડર';
    if (lowerName.includes('salmon') || lowerName.includes('fish')) return 'સેલ્મોન માછલી';
    if (lowerName.includes('asparagus')) return 'શતાવરી';
    if (lowerName.includes('butter')) return 'માખણ (બટર)';
    if (lowerName.includes('lemon') || lowerName.includes('lime')) return 'લીંબુ';
    if (lowerName.includes('dill')) return 'સૂવા ભાજી';
    if (lowerName.includes('tofu')) return 'ટોફુ / પનીર';
    if (lowerName.includes('coconut')) return 'નાળિયેરનું દૂધ';
    if (lowerName.includes('curry')) return 'કરી પેસ્ટ';
    if (lowerName.includes('rice')) return 'ચોખા / રાઇસ';
    if (lowerName.includes('egg')) return 'ઈંડા';
    if (lowerName.includes('onion')) return 'ડુંગળી';
    if (lowerName.includes('cumin')) return 'જીરું';
    if (lowerName.includes('bread') || lowerName.includes('sourdough')) return 'બ્રેડ / રોટલી';
    if (lowerName.includes('paprika')) return 'લાલ મરચું પાવડર';
  } else if (lang === 'hi') {
    if (lowerName.includes('pasta') || lowerName.includes('rigatoni')) return 'पास्ता';
    if (lowerName.includes('garlic')) return 'लहसुन';
    if (lowerName.includes('spinach')) return 'पालक';
    if (lowerName.includes('tomato')) return 'टमाटर';
    if (lowerName.includes('cream')) return 'मलाई / क्रीम';
    if (lowerName.includes('cheese') || lowerName.includes('parmesan') || lowerName.includes('feta')) return 'चीज़';
    if (lowerName.includes('olive oil') || lowerName.includes('oil')) return 'जैतून का तेल';
    if (lowerName.includes('salt')) return 'नमक';
    if (lowerName.includes('pepper')) return 'काली मिर्च';
    if (lowerName.includes('salmon') || lowerName.includes('fish')) return 'सैल्मन मछली';
    if (lowerName.includes('asparagus')) return 'शतावरी';
    if (lowerName.includes('butter')) return 'मक्खन';
    if (lowerName.includes('lemon')) return 'नींबू';
    if (lowerName.includes('egg')) return 'अंडे';
    if (lowerName.includes('onion')) return 'प्याज';
  } else if (lang === 'mr') {
    if (lowerName.includes('pasta') || lowerName.includes('rigatoni')) return 'पास्ता';
    if (lowerName.includes('garlic')) return 'लसूण';
    if (lowerName.includes('spinach')) return 'पालक';
    if (lowerName.includes('tomato')) return 'टोमॅटो';
    if (lowerName.includes('cream')) return 'मलई';
    if (lowerName.includes('cheese') || lowerName.includes('parmesan') || lowerName.includes('feta')) return 'चीज';
    if (lowerName.includes('olive oil') || lowerName.includes('oil')) return 'ऑलिव्ह ऑइल';
    if (lowerName.includes('salt')) return 'मीठ';
    if (lowerName.includes('pepper')) return 'काळी मिरी';
    if (lowerName.includes('salmon') || lowerName.includes('fish')) return 'सॅल्मन मासा';
    if (lowerName.includes('asparagus')) return 'शतावरी';
    if (lowerName.includes('butter')) return 'बटर / लोणी';
    if (lowerName.includes('lemon')) return 'लिंबू';
    if (lowerName.includes('egg')) return 'अंडी';
    if (lowerName.includes('onion')) return 'कांदा';
  }

  return name;
}

export function localizeCategoryName(catName: string, lang: SupportedLanguage): string {
  if (lang === 'en') return catName;
  const dict = CULINARY_DICTIONARY[lang]?.categories;
  return dict?.[catName] || catName;
}

export function localizeDietaryName(diet: string, lang: SupportedLanguage): string {
  if (lang === 'en') return diet;
  return CULINARY_DICTIONARY[lang]?.dietary?.[diet] || diet;
}

export function localizeCuisineName(cuisine: string, lang: SupportedLanguage): string {
  if (lang === 'en') return cuisine;
  return CULINARY_DICTIONARY[lang]?.cuisine?.[cuisine] || cuisine;
}

export function localizeMealTypeName(meal: string, lang: SupportedLanguage): string {
  if (lang === 'en') return meal;
  return CULINARY_DICTIONARY[lang]?.mealTypes?.[meal] || meal;
}

export function localizeSpiceLevel(spice: string, lang: SupportedLanguage): string {
  if (lang === 'en') return spice;
  return CULINARY_DICTIONARY[lang]?.spiceLevels?.[spice] || spice;
}

export function localizeDifficultyName(diff: string, lang: SupportedLanguage): string {
  if (lang === 'en') return diff;
  return CULINARY_DICTIONARY[lang]?.difficulties?.[diff] || diff;
}

export function localizeUnitName(unit: string | undefined, lang: SupportedLanguage): string {
  if (!unit) return '';
  if (lang === 'en') return unit;
  return CULINARY_DICTIONARY[lang]?.units?.[unit] || unit;
}

/**
 * Localizes default mock recipes if user is viewing in another language
 */
export interface RecipeTranslationItem {
  title: string;
  description: string;
  instructions: InstructionStep[];
}

export const DEFAULT_RECIPE_TRANSLATIONS: Record<
  string,
  Record<SupportedLanguage, RecipeTranslationItem>
> = {
  rec_tuscan_pasta_01: {
    en: {
      title: 'Creamy Tuscan Rigatoni with Sun-Dried Tomatoes & Spinach',
      description:
        'Silky garlic-infused cream sauce coating al dente rigatoni, punctuated by tart sun-dried tomatoes, tender baby spinach, and aged parmesan crisps.',
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
    },
    hi: {
      title: 'क्रीमी टस्कन रिगाटोनी (टमाटर और पालक के साथ)',
      description:
        'लहसुन-मलाईदार सॉस में लिपटी स्वादिष्ट रिगाटोनी पास्ता, धूप में सूखे टमाटर, ताज़ा पालक और परमेसन चीज़ के साथ तैयार।',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'एक बड़े बर्तन में पर्याप्त नमक डालकर पानी को अच्छी तरह उबालें। रिगाटोनी पास्ता को अल डेंटे (लगभग 9 मिनट) होने तक पकाएं। छानने से पहले आधा कप पास्ता का पानी बचा कर रखें।',
          durationMinutes: 10,
          tip: 'पानी में सही मात्रा में नमक डालने से पास्ता अंदर तक स्वादिष्ट और खुशबूदार बनता है।',
        },
        {
          stepNumber: 2,
          instruction: 'मध्यम आंच पर एक चौड़ी कड़ाही में जैतून का तेल गरम करें। बारीक कटा लहसुन और कटे हुए सूखे टमाटर डालें। 90 सेकंड तक हल्का सुनहरा और खुशबूदार होने तक भूनें।',
          durationMinutes: 2,
          tip: 'अगर लहसुन जल्दी भूरा होने लगे तो आंच तुरंत धीमी कर दें।',
        },
        {
          stepNumber: 3,
          instruction: 'कड़ाही में गाढ़ी मलाई (क्रीम) डालें और 3 मिनट तक धीमी आंच पर उबलने दें जब तक यह थोड़ी गाढ़ी न हो जाए। कद्दूकस किया हुआ परमेसन चीज़ डालकर चिकनी सॉस बनाएं।',
          durationMinutes: 3,
          tip: 'चीज़ मिलाते समय आंच बहुत धीमी रखें ताकि सॉस फटे नहीं।',
        },
        {
          stepNumber: 4,
          instruction: 'ताज़ा पालक के पत्ते डालें और सॉस में 1 मिनट तक नरम होने दें। बचा हुआ थोड़ा पास्ता का पानी मिलाएं।',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'उबले हुए रिगाटोनी पास्ता को सॉस में अच्छी तरह मिलाएं। 1-2 मिनट तक पकाएं ताकि सॉस पास्ता पर अच्छे से लिपट जाए। ऊपर से ताज़ी कुटी काली मिर्च और चीज़ छिड़कें।',
          durationMinutes: 2,
          tip: 'परोसने से पहले 2 मिनट रुकें ताकि सॉस पास्ता के खांचों में अच्छे से समा जाए।',
        },
      ],
    },
    mr: {
      title: 'क्रीमी टस्कन रिगाटोनी (टॉमेटो व पालक सोबत)',
      description:
        'लसूणयुक्त मलाईदार क्रीमी सॉसमध्ये तयार केलेला रुचकर रिगाटोनी पास्ता, वाळवलेले टॉमेटो, ताजी पालक व परमेसन चीजचा खास स्वाद.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'मोठ्या पातेल्यात पुरेसे मीठ घालून पाणी खळखळून उकळवा. रिगाटोनी पास्ता अल डेंटे (सुमारे ९ मिनिटे) होईपर्यंत शिजवा. पाणी गाळण्यापूर्वी अर्धा कप पाणी बाजूला काढून ठेवा.',
          durationMinutes: 10,
          tip: 'पाण्यात व्यवस्थित मीठ घातल्याने पास्ता आतून रुचकर आणि चवदार होतो.',
        },
        {
          stepNumber: 2,
          instruction: 'मध्यम आचेवर पसरट पॅनमध्ये ऑलिव्ह ऑइल गरम करा. बारीक चिरलेला लसूण आणि सुके टॉमेटो घाला. ९० सेकंद हलका सुवास येईपर्यंत परता, लसूण करपणार नाही याची काळजी घ्या.',
          durationMinutes: 2,
          tip: 'लसूण जास्त लाल होऊ नये म्हणून आच मंद ठेवा.',
        },
        {
          stepNumber: 3,
          instruction: 'पॅनमध्ये मलई (हेव्ही क्रीम) घाला आणि ३ मिनिटे मंद आचेवर शिजू द्या. किसलेले परमेसन चीज घालून गुळगुळीत आणि मलाईदार सॉस तयार करा.',
          durationMinutes: 3,
          tip: 'चीज वितळवताना गॅस मंद करा जेणेकरून सॉस फाटणार नाही.',
        },
        {
          stepNumber: 4,
          instruction: 'ताजी पालकची पाने घाला आणि १ मिनिट सॉसमध्ये मऊ होईपर्यंत परता. बाजूला ठेवलेले थोडे पास्ताचे पाणी मिसळा.',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'गाळलेला रिगाटोनी पास्ता सॉसमध्ये व्यवस्थित एकत्र करा. १-२ मिनिटे मंद आचेवर शिजवा. वरून ताजी कुटलेली काळी मिरी व थोडे चीज घालून गरमागरम वाढा.',
          durationMinutes: 2,
          tip: 'सर्व्ह करण्यापूर्वी २ मिनिटे झाकून ठेवा म्हणजे सॉस पास्त्यावर उत्तम चढतो.',
        },
      ],
    },
    gu: {
      title: 'ક્રીમી ટસ્કન રિગાટોની પાસ્તા',
      description:
        'લસણ અને ક્રીમી સોસમાં બનેલી સ્વાદિષ્ટ પાસ્તા વાનગી, ટામેટા અને પાલકના અદભૂત સ્વાદ સાથે.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'મોટા વાસણમાં મીઠું ઉમેરીને પાણીને બરાબર ઉકાળો. પાસ્તાને આશરે ૯ મિનિટ માટે રાંધો. પાણી નિતારતા પહેલા અડધો કપ પાણી બાજુ પર રાખો.',
          durationMinutes: 10,
          tip: 'પાણીમાં મીઠું ઉમેરવાથી પાસ્તા અંદરથી સ્વાદિષ્ટ બને છે.',
        },
        {
          stepNumber: 2,
          instruction: 'એક પેનમાં ઓલિવ ઓઈલ ગરમ કરો. ઝીણું સમારેલું લસણ અને ટામેટા ઉમેરો. ૯૦ સેકન્ડ સુધી સુગંધ આવે ત્યાં સુધી સાંતળો.',
          durationMinutes: 2,
          tip: 'લસણ બળી ન જાય તે માટે આંચ ધીમી રાખો.',
        },
        {
          stepNumber: 3,
          instruction: 'તેમાં ક્રીમ ઉમેરો અને ૩ મિનિટ માટે ધીમી આંચે ઉકાળો. છીણેલું ચીઝ ઉમેરીને મલાઈદાર સોસ બનાવો.',
          durationMinutes: 3,
          tip: 'ચીઝ ઉમેરતી વખતે ગેસ ધીમો રાખો જેથી સોસ ફાટી ન જાય.',
        },
        {
          stepNumber: 4,
          instruction: 'તાજી પાલક ઉમેરો અને ૧ મિનિટ સોસમાં નરમ થવા દો. બાજુ પર રાખેલું થોડું પાણી ઉમેરો.',
          durationMinutes: 2,
          tip: 'પાલકને વધારે પડતી ન પકાવો, ગરમ સોસમાં ૧ મિનિટમાં જ તે સોફ્ટ થઈ જશે અને તેનો લીલો રંગ જળવાઈ રહેશે.',
        },
        {
          stepNumber: 5,
          instruction: 'બાફેલા પાસ્તાને સોસમાં બરાબર મિક્સ કરો. ૧-૨ મિનિટ રાંધીને ઉપર કાળા મરી અને ચીઝ છાંટીને ગરમાગરમ પીરસો.',
          durationMinutes: 2,
          tip: 'પીરસતાં પહેલાં ૨ મિનિટ રહેવા દો જેથી સોસ પાસ્તામાં સરખી રીતે ભળી જાય.',
        },
      ],
    },
    es: {
      title: 'Rigatoni Toscano Cremoso con Tomates Secos y Espinacas',
      description:
        'Salsa sedosa de crema con infusión de ajo que envuelve rigatoni al dente, espinacas frescas y parmesano curado.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Lleve una olla grande con agua salada a ebullición. Cocine el rigatoni hasta que esté al dente (unos 9 minutos). Reserve 1/2 taza de agua de cocción antes de escurrir.',
          durationMinutes: 10,
          tip: 'Salar bien el agua es clave para sazonar la pasta desde el interior.',
        },
        {
          stepNumber: 2,
          instruction: 'En una sartén amplia a fuego medio, caliente el aceite de oliva. Agregue el ajo picado y los tomates secos. Saltee 90 segundos hasta que esté fragante sin quemar el ajo.',
          durationMinutes: 2,
          tip: 'Baje el fuego si el ajo comienza a dorarse demasiado rápido.',
        },
        {
          stepNumber: 3,
          instruction: 'Vierta la crema espesa y cocine a fuego lento durante 3 minutos. Añada el queso parmesano rallado y bata hasta obtener una salsa suave y aterciopelada.',
          durationMinutes: 3,
          tip: 'Apague el fuego directo al incorporar queso curado para evitar que se corte.',
        },
        {
          stepNumber: 4,
          instruction: 'Incorpore las espinacas frescas en puñados hasta que se marchiten en la salsa tibia (1 minuto). Agregue un chorrito del agua de cocción reservada.',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'Mezcle la pasta escurrida con la salsa durante 1-2 minutos hasta que quede bien impregnada. Termine con pimienta negra recién molida y parmesano.',
          durationMinutes: 2,
          tip: 'Deje reposar 2 minutos para que la salsa se adhiera perfectamente a los rigatoni.',
        },
      ],
    },
    fr: {
      title: 'Rigatoni Crémeux à la Toscane, Tomates Séchées & Épinards',
      description:
        'Sauce soyeuse infusée à l’ail enrobant des rigatoni al dente, avec jeunes pousses d’épinards et parmesan affiné.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Portez une grande casserole d\'eau salée à ébullition. Cuisez les rigatoni al dente (environ 9 minutes). Réservez 1/2 tasse d\'eau de cuisson avant d\'égoutter.',
          durationMinutes: 10,
          tip: 'Bien saler l\'eau permet d\'assaisonner les pâtes de l\'intérieur.',
        },
        {
          stepNumber: 2,
          instruction: 'Dans une poêle à feu moyen, chauffez l\'huile d\'olive. Ajoutez l\'ail haché et les tomates séchées. Faites revenir doucement 90 secondes.',
          durationMinutes: 2,
          tip: 'Baissez le feu si l\'ail commence à dorer trop vite.',
        },
        {
          stepNumber: 3,
          instruction: 'Versez la crème liquide et laissez frémir 3 minutes. Incorporez le parmesan râpé en fouettant jusqu\'à obtenir une sauce onctueuse.',
          durationMinutes: 3,
          tip: 'Éteignez le feu pour incorporer le parmesan sans faire trancher la crème.',
        },
        {
          stepNumber: 4,
          instruction: 'Ajoutez les jeunes pousses d\'épinards et laissez-les fondre 1 minute dans la sauce chaude. Versez un trait d\'eau de cuisson réservée.',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'Enrobez les rigatoni de sauce pendant 1 à 2 minutes. Parsemez de poivre noir moulu et de copeaux de parmesan avant de servir.',
          durationMinutes: 2,
          tip: 'Laissez reposer 2 minutes pour que la sauce nappe idéalement les pâtes.',
        },
      ],
    },
    de: {
      title: 'Cremige Toskanische Rigatoni mit Getrockneten Tomaten & Spinat',
      description:
        'Seidige Knoblauch-Sahnesauce umhüllt al dente gekochte Rigatoni mit Babyspinat und gereiftem Parmesan.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Bringen Sie einen großen Topf Salzwasser zum Kochen. Kochen Sie die Rigatoni al dente (ca. 9 Minuten). Fangen Sie 1/2 Tasse Nudelwasser vor dem Abgießen auf.',
          durationMinutes: 10,
          tip: 'Gut gesalzenes Wasser ist das Geheimnis für aromatische Pasta.',
        },
        {
          stepNumber: 2,
          instruction: 'In einer weiten Pfanne bei mittlerer Hitze Olivenöl erwärmen. Gehackten Knoblauch und getrocknete Tomaten 90 Sekunden sanft anbraten.',
          durationMinutes: 2,
          tip: 'Hitze reduzieren, damit der Knoblauch nicht bitter wird.',
        },
        {
          stepNumber: 3,
          instruction: 'Sahne hineingießen und 3 Minuten sanft köcheln lassen. Geriebenen Parmesan unterrühren, bis eine samtige Sauce entsteht.',
          durationMinutes: 3,
          tip: 'Hitze ausschalten, bevor der Käse schmilzt, damit die Sauce nicht trennt.',
        },
        {
          stepNumber: 4,
          instruction: 'Babyspinat handvollweise unterheben, bis er zusammenfällt (ca. 1 Minute). Einen Schuss Nudelwasser hinzufügen.',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'Abgetropfte Rigatoni in die Sauce geben und 1-2 Minuten durchschwenken. Mit frisch gemahlenem Pfeffer und Parmesan servieren.',
          durationMinutes: 2,
          tip: '2 Minuten ruhen lassen, damit die Sauce perfekt an den Nudeln haftet.',
        },
      ],
    },
  },

  rec_seared_salmon_02: {
    en: {
      title: 'Crispy Skin Wild Salmon with Lemon-Dill Emulsion & Charred Asparagus',
      description:
        'Sustainably sourced salmon fillet seared to a golden crisp, served over charred asparagus in a warm lemon-butter dill sauce.',
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
    },
    hi: {
      title: 'कुरकुरी सैल्मन मछली (नींबू-सोया सॉस और शतावरी के साथ)',
      description:
        'गोल्डन क्रिस्पी सैल्मन फिश फिलेट, भुनी हुई हरी शतावरी और गरमागरम लेमन-बटर सॉस के साथ परोसी गई।',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'सैल्मन मछली की त्वचा को पेपर टॉवल से अच्छी तरह सुखाएं। त्वचा पर 3 हल्के कट लगाएं। दोनों तरफ समुद्री नमक और काली मिर्च लगाएं।',
          durationMinutes: 3,
          tip: 'कुरकुरी त्वचा के लिए नमी को पूरी तरह सुखाना सबसे जरूरी है।',
        },
        {
          stepNumber: 2,
          instruction: 'मध्यम-तेज आंच पर एक भारी कड़ाही में जैतून का तेल गरम करें। सैल्मन को त्वचा की तरफ से नीचे रखें और 10 सेकंड तक स्पैटुला से हल्के से दबाएं।',
          durationMinutes: 5,
          tip: 'शुरुआत में दबाने से त्वचा किनारों से मुड़ती नहीं है और समान रूप से सिकती है।',
        },
        {
          stepNumber: 3,
          instruction: 'त्वचा वाली तरफ से 5-6 मिनट (लगभग 75%) तक पकाएं जब तक वह गहरी सुनहरी और कुरकुरी न हो जाए। फिर पलटकर दूसरी तरफ सिर्फ 1-2 मिनट पकाएं।',
          durationMinutes: 2,
        },
        {
          stepNumber: 4,
          instruction: 'सैल्मन को एक गर्म प्लेट में निकालें। उसी कड़ाही में कटी शतावरी और लहसुन को 3 मिनट तक हल्का कुरकुरा भूनें।',
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'शतावरी निकालें। गैस बंद कर दें, पैन के रस में ठंडा मक्खन, नींबू का रस और कटी सोया पत्ती डालकर फेंटें। इस स्वादिष्ट सॉस को मछली पर डालें।',
          durationMinutes: 2,
          tip: 'ठंडा मक्खन धीरे पिघलकर एक प्राकृतिक चमकदार गाढ़ी सॉस बनाता है।',
        },
      ],
    },
    mr: {
      title: 'कुरकुरीत सॅल्मन मासा (लिंबू-बटर सॉस व शतावरी सोबत)',
      description:
        'सोनेरी कुरकुरीत फ्राय केलेला सॅल्मन मासा, भाजलेली शतावरी आणि स्वादिष्ट लेमन-बटर सॉससह सजवलेला.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'सॅल्मन माशाची त्वचा पेपर टॉवेलने पूर्ण कोरडी करा. त्वचेवर ३ हलके चिरे द्या. दोन्ही बाजूंनी मीठ आणि काळी मिरी लावा.',
          durationMinutes: 3,
          tip: 'कुरकुरीत त्वचेसाठी माशावरील ओलावा पूर्णपणे पुसून घेणे अत्यंत आवश्यक आहे.',
        },
        {
          stepNumber: 2,
          instruction: 'मध्यम-मोठ्या आचेवर लोखंडी पॅनमध्ये ऑलिव्ह ऑइल गरम करा. मासा त्वचेच्या बाजूने खाली ठेवा आणि १० सेकंद चमच्याने हलके दाबा.',
          durationMinutes: 5,
          tip: 'सुरुवातीला दाबल्याने त्वचा आकसून वाकडी होत नाही व एकसारखी कुरकुरीत होते.',
        },
        {
          stepNumber: 3,
          instruction: 'त्वचेच्या बाजूने ५-६ मिनिटे (सुमारे ७५%) सोनेरी आणि कुरकुरीत होईपर्यंत शिजवा. नंतर हलकेच उलटून मांसाच्या बाजूने फक्त १-२ मिनिटे शेका.',
          durationMinutes: 2,
        },
        {
          stepNumber: 4,
          instruction: 'मासा गरम प्लेटमध्ये काढा. त्याच पॅनमध्ये शतावरी आणि बारीक लसूण ३ मिनिटे हलकी कुरकुरीत परतून घ्या.',
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'शतावरी प्लेटमध्ये काढा. गॅस बंद करा, पॅनमध्ये थंड बटर, लिंबाचा रस आणि बारीक चिरलेली कोथिंबीर/डिल घालून फेटून सॉस बनवा आणि माशावर टाका.',
          durationMinutes: 2,
          tip: 'थंड बटर हळूहळू वितळून चमकदार व स्वादिष्ट मऊ सॉस तयार होतो.',
        },
      ],
    },
    gu: {
      title: 'ક્રિસ્પી સેલ્મોન ફિશ (લીંબુ-બટર સોસ સાથે)',
      description:
        'સોનેરી શેકેલી સેલ્મોન માછલી, શતાવરી અને સુગંધિત લેમન બટર સોસ સાથે પીરસવામાં આવેલ.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'માછલીની ત્વચાને પેપર ટોવેલથી સંપૂર્ણ સુકવી લો. તેના પર ૩ હળવા કાપા મૂકો. મીઠું અને મરી પાવડર લગાવો.',
          durationMinutes: 3,
          tip: 'ક્રિસ્પી ત્વચા માટે ભેજ સાફ કરવો જરૂરી છે.',
        },
        {
          stepNumber: 2,
          instruction: 'એક પેનમાં તેલ ગરમ કરો. માછલીને ત્વચાની બાજુ નીચે રાખીને ૧૦ સેકન્ડ હળવેથી દબાવો.',
          durationMinutes: 5,
          tip: 'શરૂઆતમાં દબાવવાથી ત્વચા વળી જતી નથી.',
        },
        {
          stepNumber: 3,
          instruction: 'ત્વચાની તરફ ૫-૬ મિનિટ સોનેરી થાય ત્યાં સુધી પકાવો. પછી પલટીને બીજી તરફ ૧-૨ મિનિટ જ શેકો.',
          durationMinutes: 2,
          tip: 'મોટાભાગનો સમય ત્વચાની બાજુ શેકવાથી માછલી અંદરથી રસદાર અને બહારથી એકદમ ક્રિસ્પી બને છે.',
        },
        {
          stepNumber: 4,
          instruction: 'માછલીને પ્લેટમાં કાઢો. તે જ પેનમાં શતાવરી અને લસણને ૩ મિનિટ સાંતળો.',
          durationMinutes: 3,
          tip: 'શતાવરીને વધારે પડતી ન રાંધો જેથી તેનો તાજો ક્રિસ્પી સ્વાદ જળવાઈ રહે.',
        },
        {
          stepNumber: 5,
          instruction: 'ગેસ બંધ કરી પેનમાં ઠંડુ બટર, લીંબુનો રસ અને મસાલા મિક્સ કરીને સોસ બનાવો અને માછલી પર રેડો.',
          durationMinutes: 2,
          tip: 'ઠંડુ બટર સુંદર ચળકતી સોસ બનાવે છે.',
        },
      ],
    },
    es: {
      title: 'Salmón Salvaje Crujiente con Emulsión de Limón y Espárragos',
      description:
        'Filete de salmón dorado a la plancha sobre espárragos tiernos con salsa caliente de mantequilla de limón.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Seque bien la piel del salmón con toallas de papel. Haga 3 cortes superficiales en la piel. Sazone ambos lados con sal marina y pimienta.',
          durationMinutes: 3,
          tip: 'La humedad es enemiga de la piel crujiente. Secar bien garantiza un sellado perfecto.',
        },
        {
          stepNumber: 2,
          instruction: 'Caliente una sartén a fuego medio-alto con aceite de oliva. Coloque el salmón con la piel hacia abajo; presione suavemente 10 segundos.',
          durationMinutes: 5,
          tip: 'Sujete el filete al inicio para evitar que la piel se enrosque.',
        },
        {
          stepNumber: 3,
          instruction: 'Cocine el 75% del tiempo del lado de la piel (5-6 minutos) hasta que esté dorada y crujiente. Voltee con cuidado y dore la pulpa 1-2 minutos.',
          durationMinutes: 2,
        },
        {
          stepNumber: 4,
          instruction: 'Pase el salmón a un plato templado. En la misma sartén, saltee los espárragos con ajo picado durante 3 minutos hasta que estén tiernos.',
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'Retire los espárragos. Apague el fuego, derrita mantequilla fría en los jugos batiendo con zumo de limón y eneldo para crear una emulsión. Vierta sobre el pescado.',
          durationMinutes: 2,
          tip: 'La mantequilla fría se derrite lentamente formando una salsa brillante y sedosa.',
        },
      ],
    },
    fr: {
      title: 'Saumon Sauvage Croustillant, Sauce Citron-Aneth & Asperges',
      description:
        'Pavé de saumon poêlé à la perfection, servi sur des asperges rôties et un beurre blanc citronné.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Séchez soigneusement la peau du saumon au papier absorbant. Incisez légèrement la peau. Assaisonnez de sel et de poivre.',
          durationMinutes: 3,
          tip: 'L\'humidité empêche la peau de croustiller. Bien sécher est la clé d\'une cuisson parfaite.',
        },
        {
          stepNumber: 2,
          instruction: 'Chauffez une poêle à feu moyen-vif avec de l\'huile d\'olive. Déposez le saumon côté peau ; pressez délicatement pendant 10 secondes.',
          durationMinutes: 5,
          tip: 'Maintenez le pavé au début pour éviter que la peau ne se rétracte.',
        },
        {
          stepNumber: 3,
          instruction: 'Cuisez à 75% côté peau (5 à 6 minutes) jusqu\'à ce qu\'elle soit bien croustillante. Retournez et cuisez côté chair 1 à 2 minutes.',
          durationMinutes: 2,
        },
        {
          stepNumber: 4,
          instruction: 'Réservez le saumon. Dans la même poêle, faites sauter les asperges avec l\'ail haché 3 minutes jusqu\'à ce qu\'elles soient tendres.',
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'Dressez les asperges. Hors du feu, montez le jus au beurre froid avec le jus de citron et l\'aneth haché. Nappez le saumon.',
          durationMinutes: 2,
          tip: 'Le beurre froid émulsionne la sauce pour lui donner un brillant parfait.',
        },
      ],
    },
    de: {
      title: 'Wildlachs mit Knuspriger Haut, Zitronen-Dill-Sauce & Spargel',
      description:
        'Goldbraun gebratenes Lachsfilet auf geröstetem Spargel in feiner Zitronen-Butter-Sauce.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Lachshaut gründlich mit Küchenpapier trocken tupfen. Haut 3 Mal leicht einschneiden. Mit Meersalz und Pfeffer würzen.',
          durationMinutes: 3,
          tip: 'Feuchtigkeit verhindert eine krosse Haut. Gründliches Trocknen ist das Geheimnis.',
        },
        {
          stepNumber: 2,
          instruction: 'Pfanne bei mittlerer bis hoher Hitze mit Olivenöl erhitzen. Lachs mit der Hautseite nach unten einlegen; 10 Sekunden sanft andrücken.',
          durationMinutes: 5,
          tip: 'Zu Beginn andrücken, damit sich die Haut nicht wölbt.',
        },
        {
          stepNumber: 3,
          instruction: 'Zu 75% auf der Hautseite braten (ca. 5-6 Minuten), bis sie goldbraun und kross ist. Vorsichtig wenden und Fleischseite 1-2 Minuten braten.',
          durationMinutes: 2,
        },
        {
          stepNumber: 4,
          instruction: 'Lachs auf einen warmen Teller heben. In derselben Pfanne Spargel mit gehacktem Knoblauch 3 Minuten bissfest anbraten.',
          durationMinutes: 3,
        },
        {
          stepNumber: 5,
          instruction: 'Spargel anrichten. Pfanne vom Herd nehmen, kalte Butter mit Zitronensaft und Dill in den Bratensaft einrühren und über den Fisch träufeln.',
          durationMinutes: 2,
          tip: 'Kalte Butter schmilzt langsam zu einer wunderbar sämigen Emulsion.',
        },
      ],
    },
  },

  rec_thai_curry_03: {
    en: {
      title: 'Aromatic Golden Thai Coconut Curry with Crisp Tofu & Bamboo',
      description:
        'A fragrant lemongrass and turmeric coconut broth stewed with golden pan-fried tofu, red bell peppers, snap peas, and sweet basil over steaming jasmine rice.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Press tofu between clean kitchen towels to remove excess water. Toss with 1 tbsp neutral oil and brown in a wide wok until edges are golden and crisp.',
          durationMinutes: 7,
          tip: 'Crisping tofu edges first seals in moisture and absorbs the curry broth deeply.',
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
    },
    hi: {
      title: 'सुगंधित थाई नारियल करी (कुरकुरे तोफू और सब्जियों के साथ)',
      description:
        'लेमनग्रास और नारियल के दूध में पकी सुनहरी थाई करी, तले हुए तोफू, शिमला मिर्च और बासमती चावल के साथ।',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'तोफू को साफ कपड़े से दबाकर अतिरिक्त पानी निकाल लें। 1 चम्मच तेल के साथ कड़ाही में सुनहरा और कुरकुरा होने तक भूनें।',
          durationMinutes: 7,
          tip: 'तोफू को पहले कुरकुरा करने से वह करी में घुलता नहीं और सारा स्वाद सोख लेता है।',
        },
        {
          stepNumber: 2,
          instruction: 'तोफू को किनारे करें। नारियल के दूध के डिब्बे के ऊपर की गाढ़ी मलाई 3 चम्मच कड़ाही में डालें। करी पेस्ट को इस तेल में तब तक भूनें जब तक तेल अलग न हो जाए।',
          durationMinutes: 3,
          tip: 'नारियल की मलाई में करी पेस्ट भूनने से पारंपरिक थाई खुशबू और स्वाद आता है।',
        },
        {
          stepNumber: 3,
          instruction: 'बचा हुआ नारियल का दूध और आधा कप सब्जियों का सूप डालें। उबाल आने पर शिमला मिर्च और फलियां (मटर) डालें। 5 मिनट तक धीमी आंच पर पकाएं।',
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: 'तले हुए तोफू, ताज़ा नींबू का रस और चुटकी भर चीनी मिलाएं। 2 मिनट तक धीमी आंच पर स्वाद को आपस में मिलने दें।',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'गरमागरम थाई करी को बासमती चावल के साथ गहरे कटोरे में परोसें। ऊपर से हरा धनिया और नींबू का टुकड़ा रखें।',
          durationMinutes: 1,
        },
      ],
    },
    mr: {
      title: 'सुवासिक थाई नारळ करी (तळलेला तोफू व भाज्यांसह)',
      description:
        'नारळाचे दूध आणि सुवासिक मसाल्यांमध्ये तयार केलेली थाई करी, क्रिस्पी तोफू व तांदळाच्या भातासह उत्तम चव.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'तोफू स्वच्छ कापडाने दाबून त्यातील जास्तीचे पाणी काढून टाका. १ चमचा तेलात पसरट कढईत तोफू सोनेरी व कुरकुरीत होईपर्यंत तळून घ्या.',
          durationMinutes: 7,
          tip: 'तोफू आधी कुरकुरीत केल्याने तो करीमध्ये फुटत नाही आणि रस व्यवस्थित शोषून घेतो.',
        },
        {
          stepNumber: 2,
          instruction: 'तोफू बाजूला करा. नारळाच्या दुधाच्या डब्यावरील घट्ट साय (३ चमचे) कढईत टाका. करी पेस्ट सुवास येईपर्यंत व तेल सुटेपर्यंत चांगली परतून घ्या.',
          durationMinutes: 3,
          tip: 'नारळाच्या घट्ट सायीमध्ये पेस्ट परतल्याने अस्सल थाई चव व सुगंध येतो.',
        },
        {
          stepNumber: 3,
          instruction: 'उरलेले नारळाचे दूध व अर्धा कप पाणी/भाज्यांचा रस घाला. उकळी आल्यावर सिमला मिरची व मटारच्या शेंगा घाला. ५ मिनिटे मंद आचेवर शिजू द्या.',
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: 'तळलेला तोफू, लिंबाचा रस व चिमूटभर गूळ/साखर घाला. २ मिनिटे मंद आचेवर चव एकजीव होऊ द्या.',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'सुवासिक तांदळाच्या भातासोबत खोल वाटीत थाई करी वाढा. वरून ताजी कोथिंबीर व लिंबाची फोड ठेवून सर्व्ह करा.',
          durationMinutes: 1,
        },
      ],
    },
    gu: {
      title: 'સુગંધિત થાઈ નાળિયેર કરી (ટોફુ અને શાકભાજી સાથે)',
      description:
        'નાળિયેરના દૂધ અને મસાલામાં બનેલી સ્વાદિષ્ટ થાઈ કરી, શેકેલા ટોફુ અને સ્ટીમ્ડ રાઇસ સાથે.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'ટોફુમાંથી વધારાનું પાણી સાફ કપડાથી કાઢી લો. પેનમાં સોનેરી અને ક્રિસ્પી થાય ત્યાં સુધી તળી લો.',
          durationMinutes: 7,
          tip: 'ટોફુને ક્રિસ્પી કરવાથી તે કરીમાં તૂટતું નથી.',
        },
        {
          stepNumber: 2,
          instruction: 'ટોફુ બાજુ પર મૂકો. નાળિયેરના દૂધની ઘાટી ક્રીમ ૩ ચમચી પેનમાં ઉમેરો. કરી પેસ્ટને સુગંધ આવે ત્યાં સુધી સાંતળો.',
          durationMinutes: 3,
          tip: 'ક્રીમમાં પેસ્ટ સાંતળવાથી અસલી થાઈ સ્વાદ આવે છે.',
        },
        {
          stepNumber: 3,
          instruction: 'બાકીનું નાળિયેરનું દૂધ અને થોડું પાણી ઉમેરો. ઉકાળો આવે ત્યારે કેપ્સિકમ અને વટાણા ઉમેરી ૫ મિનિટ પકાવો.',
          durationMinutes: 5,
          tip: 'શાકભાજીને ક્રિસ્પી રાખવા માટે તેને અંતિમ મિનિટોમાં જ ઉમેરો.',
        },
        {
          stepNumber: 4,
          instruction: 'તળેલું ટોફુ, લીંબુનો રસ અને ચપટી ખાંડ ઉમેરો. ૨ મિનિટ સુધી સ્વાદ ભળવા દો.',
          durationMinutes: 2,
          tip: 'તાજો લીંબુનો રસ નાળિયેરના દૂધની મીઠાશ અને મસાલા વચ્ચે અદભૂત સંતુલન બનાવે છે.',
        },
        {
          stepNumber: 5,
          instruction: 'ગરમાગરમ સ્ટીમ્ડ રાઇસ સાથે બાઉલમાં થાઈ કરી પીરસો. ઉપર લીલી કોથમીર અને લીંબુ મૂકો.',
          durationMinutes: 1,
          tip: 'પીરસતાં પહેલાં કરી ૨ મિનિટ રહેવા દો જેથી તમામ સુગંધિત મસાલા સરસ ભળી જાય.',
        },
      ],
    },
    es: {
      title: 'Curry Tailandés Dorado con Tofu Crujiente y Coco',
      description:
        'Caldo aromático de coco y limoncillo cocinado con tofu dorado, pimientos rojos y arroz jazmín al vapor.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Prensa el tofu con paños limpios para retirar el exceso de agua. Saltea con 1 cucharada de aceite en un wok hasta que esté dorado y crujiente.',
          durationMinutes: 7,
          tip: 'Dorar el tofu primero sella la humedad y ayuda a absorber el caldo del curry.',
        },
        {
          stepNumber: 2,
          instruction: 'Aparta el tofu a un lado. Añade 3 cucharadas de la capa espesa de crema de coco al wok. Sofríe la pasta de curry hasta que desprenda aroma y libere aceites.',
          durationMinutes: 3,
          tip: 'Freír la pasta en la grasa del coco libera la auténtica profundidad del curry tailandés.',
        },
        {
          stepNumber: 3,
          instruction: 'Vierte el resto de la leche de coco y 1/2 taza de caldo de verduras. Lleva a ebullición suave, incorpora los pimientos rojos y los tirabeques. Cocina a fuego lento 5 minutos.',
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: 'Añade el tofu dorado, el zumo de lima fresco y una pizca de azúcar. Deja infusionar los sabores 2 minutos.',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'Sirve en cuencos hondos acompañado de arroz jazmín al vapor. Decora con cilantro fresco y rodajas de lima.',
          durationMinutes: 1,
        },
      ],
    },
    fr: {
      title: 'Curry Thaï Doré au Lait de Coco & Tofu Croustillant',
      description:
        'Bouillon parfumé à la citronnelle et au lait de coco, garni de tofu doré et poivrons avec riz jasmin.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Pressez le tofu dans un linge propre pour ôter l\'eau. Dorez-le au wok dans 1 c. à soupe d\'huile neutre jusqu\'à ce qu\'il soit bien croustillant.',
          durationMinutes: 7,
          tip: 'Dorer le tofu évite qu\'il ne se défasse et lui permet d\'absorber le curry.',
        },
        {
          stepNumber: 2,
          instruction: 'Poussez le tofu sur le côté. Ajoutez 3 c. à soupe de crème épaisse du lait de coco. Faites frire la pâte de curry jusqu\'à ce que les arômes se libèrent.',
          durationMinutes: 3,
          tip: 'Faire rissoler la pâte dans la graisse du coco est le secret des chefs thaïlandais.',
        },
        {
          stepNumber: 3,
          instruction: 'Versez le restant de lait de coco et un demi-verre de bouillon. Portez à frémissement, puis ajoutez poivrons et pois gourmands pour 5 minutes.',
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: 'Incorporez le tofu doré, le jus de citron vert et une pincée de sucre. Laissez mijoter 2 minutes.',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'Servez dans des bols avec du riz jasmin fumant. Décorez de coriandre fraîche et d\'un quartier de citron vert.',
          durationMinutes: 1,
        },
      ],
    },
    de: {
      title: 'Aromatisches Thailändisches Kokoscurry mit Knusprigem Tofu',
      description:
        'Duftendes Kokos-Zitronengras-Curry mit goldbraunem Tofu, knackigem Gemüse und Jasminreis.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Tofu in sauberen Küchentüchern auspressen. Mit 1 EL Öl im Wok von allen Seiten goldbraun und kross anbraten.',
          durationMinutes: 7,
          tip: 'Krosses Anbraten verhindert, dass der Tofu zerfällt, und lässt ihn die Sauce aufsaugen.',
        },
        {
          stepNumber: 2,
          instruction: 'Tofu an den Rand schieben. 3 EL dicke Kokoscreme von der Dosenoberseite in den Wok geben. Currypaste anbraten, bis das Öl austritt und es duftet.',
          durationMinutes: 3,
          tip: 'Das Anbraten in Kokosfett verleiht dem Curry authentische Restaurant-Tiefe.',
        },
        {
          stepNumber: 3,
          instruction: 'Restliche Kokosmilch und 1/2 Tasse Gemüsebrühe angießen. Sanft aufkochen, Paprika und Zuckerschoten 5 Minuten köcheln lassen.',
          durationMinutes: 5,
        },
        {
          stepNumber: 4,
          instruction: 'Gebratenen Tofu, frischen Limettensaft und eine Prise Zucker unterrühren. 2 Minuten ziehen lassen.',
          durationMinutes: 2,
        },
        {
          stepNumber: 5,
          instruction: 'In tiefen Schalen neben dampfendem Jasminreis anrichten. Mit frischem Koriander und Limettenspalten garnieren.',
          durationMinutes: 1,
        },
      ],
    },
  },

  rec_shakshuka_04: {
    en: {
      title: 'Artisan Moroccan Shakshuka with Poached Eggs & Sourdough',
      description:
        'Smoky roasted tomato and sweet pepper stew spiced with cumin and smoked paprika, cradling gently poached eggs, crumbled Greek feta, and fresh herbs.',
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
    },
    hi: {
      title: 'मोरक्कन शकशुका (अंडे, टमाटर और सौर्डो ब्रेड के साथ)',
      description:
        'जीरा, लाल शिमला मिर्च और टमाटर की गाढ़ी ग्रेवी में पकाए गए अंडे, फेटा चीज़ और ताज़े धनिये से सजाए गए।',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'मध्यम आंच पर एक कड़ाही में जैतून का तेल गरम करें। कटे हुए प्याज और शिमला मिर्च को 6 मिनट तक नरम और हल्के भूरे होने तक भूनें।',
          durationMinutes: 6,
        },
        {
          stepNumber: 2,
          instruction: 'लहसुन, जीरा, लाल मिर्च और कश्मीरी मिर्च पाउडर डालें। 1 मिनट तक खुशबू आने तक मसालों को भूनें।',
          durationMinutes: 1,
          tip: 'गरम तेल में मसाले भूनने से उनका प्राकृतिक स्वाद और तेल खुलकर बाहर आता है।',
        },
        {
          stepNumber: 3,
          instruction: 'मसले हुए टमाटर डालें। नमक मिलाएं और 8 मिनट तक धीमी आंच पर पकाएं जब तक कि गाढ़ी और चमकदार ग्रेवी न बन जाए।',
          durationMinutes: 8,
        },
        {
          stepNumber: 4,
          instruction: 'चम्मच से ग्रेवी में 4 छोटे गड्ढे बनाएं। प्रत्येक में एक अंडा फोड़कर डालें। ढककर धीमी आंच पर 5-7 मिनट तक पकाएं जब तक सफेदी पक न जाए और जर्दी मुलायम रहे।',
          durationMinutes: 6,
          tip: 'ध्यान रखें: अंडे की सफेदी जम जानी चाहिए जबकि पीली जर्दी हल्की नरम रहनी चाहिए।',
        },
        {
          stepNumber: 5,
          instruction: 'ऊपर से फेटा चीज़, ताज़ा धनिया और अजमोद छिड़कें। टोस्ट की हुई ब्रेड के साथ गरमागरम कड़ाही में ही परोसें।',
          durationMinutes: 2,
        },
      ],
    },
    mr: {
      title: 'मोरोक्कन शकशुका (उकडलेली अंडी, टॉमेटो व सॉरडो ब्रेड)',
      description:
        'मसालेदार टॉमेटो आणि सिमला मिरचीच्या ग्रेव्हीत शिजवलेली अंडी, फेटा चीज आणि ताज्या कोथिंबिरीसह परिपूर्ण डिश.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'मध्यम आचेवर पॅनमध्ये ऑलिव्ह ऑइल गरम करा. बारीक चिरलेला कांदा आणि सिमला मिरची ६ मिनिटे मऊ व हलकी तांबूस होईपर्यंत परता.',
          durationMinutes: 6,
        },
        {
          stepNumber: 2,
          instruction: 'बारीक लसूण, जिरे पूड, मिरची पूड आणि सुके मसाले घाला. १ मिनिट सुवास येईपर्यंत चांगले परता.',
          durationMinutes: 1,
          tip: 'गरम तेलात मसाले परतल्याने त्यांचा उत्तम सुगंध बाहेर पडतो.',
        },
        {
          stepNumber: 3,
          instruction: 'चिरलेले टॉमेटो घाला. चवीनुसार मीठ टाकून ८ मिनिटे मंद आचेवर शिजवा, जोपर्यंत घट्ट व चकचकीत ग्रेव्ही तयार होत नाही.',
          durationMinutes: 8,
        },
        {
          stepNumber: 4,
          instruction: 'चमच्याच्या मागच्या भागाने ग्रेव्हीत ४ खोलगट जागा करा. प्रत्येक जागेत एक-एक अंडे फोडून घाला. झाकण ठेवून ५-७ मिनिटे मंद आचेवर अंड्याचा पांढरा भाग शिजेपर्यंत शिजवा.',
          durationMinutes: 6,
          tip: 'अंड्याचा पांढरा भाग पूर्ण पांढरा झाला पाहिजे आणि पिवळा बलक मऊ हलणारा असावा.',
        },
        {
          stepNumber: 5,
          instruction: 'वरून किसलेले चीज, बारीक चिरलेली कोथिंबीर भुरभुरा. भाजलेल्या कुरकुरीत ब्रेडसोबत पॅनमध्येच गरमागरम सर्व्ह करा.',
          durationMinutes: 2,
        },
      ],
    },
    gu: {
      title: 'મોરોક્કન શકશુકા (ઈંડા, ટામેટા અને સોરડો સાથે)',
      description:
        'મસાલેદાર ટામેટા અને કેપ્સિકમ ગ્રેવીમાં પોચ કરેલા ઈંડા, ફેટા ચીઝ અને તાજા મસાલા સાથે.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'પેનમાં ઓલિવ ઓઈલ ગરમ કરો. ડુંગળી અને કેપ્સિકમને ૬ મિનિટ નરમ થાય ત્યાં સુધી સાંતળો.',
          durationMinutes: 6,
          tip: 'ડુંગળી અને કેપ્સિકમને ધીમી આંચે સાંતળવાથી ગ્રેવીમાં કુદરતી મીઠાશ આવે છે.',
        },
        {
          stepNumber: 2,
          instruction: 'લસણ, જીરું અને મરચું પાવડર ઉમેરી ૧ મિનિટ સાંતળો.',
          durationMinutes: 1,
          tip: 'તેલમાં મસાલા સાંતળવાથી સારો સ્વાદ આવે છે.',
        },
        {
          stepNumber: 3,
          instruction: 'ટામેટા ઉમેરો અને મીઠું નાખીને ૮ મિનિટ ઘાટી ગ્રેવી બને ત્યાં સુધી ઉકાળો.',
          durationMinutes: 8,
          tip: 'ટામેટાની ગ્રેવી બરાબર ઘાટી થાય ત્યાં સુધી ઉકાળવી જેથી ઈંડા સરખી રીતે પોચ થાય.',
        },
        {
          stepNumber: 4,
          instruction: 'ગ્રેવીમાં ૪ ખાડા બનાવી દરેકમાં એક ઈંડું ફોડીને મૂકો. ઢાંકીને ૫-૭ મિનિટ ધીમી આંચે પકાવો.',
          durationMinutes: 6,
          tip: 'ઈંડાનો સફેદ ભાગ પાકી જવો જોઈએ અને પીળો ભાગ નરમ રહેવો જોઈએ.',
        },
        {
          stepNumber: 5,
          instruction: 'ઉપર ચીઝ અને કોથમીર છાંટીને ટોસ્ટેડ બ્રેડ સાથે ગરમાગરમ પીરસો.',
          durationMinutes: 2,
          tip: 'ગરમ ગ્રેવી પર છીણેલું ચીઝ નાખવાથી તે હળવેથી પીગળીને અદભુત સ્વાદ આપે છે.',
        },
      ],
    },
    es: {
      title: 'Shakshuka Marroquí Artesanal con Huevos Escalfados',
      description:
        'Guiso ahumado de tomate y pimientos dulces con comino y pimentón, con huevos escalfados y queso feta.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Caliente aceite de oliva en una sartén a fuego medio. Saltee las cebollas y pimientos picados 6 minutos hasta que caramelicen.',
          durationMinutes: 6,
        },
        {
          stepNumber: 2,
          instruction: 'Agregue ajo, comino, pimentón dulce y copos de chile. Tueste las especias 1 minuto.',
          durationMinutes: 1,
          tip: 'Tostar las especias en aceite tibio despierta todos sus aromas.',
        },
        {
          stepNumber: 3,
          instruction: 'Incorpore los tomates triturados y sal. Cocine a fuego lento 8 minutos hasta obtener una salsa espesa y brillante.',
          durationMinutes: 8,
        },
        {
          stepNumber: 4,
          instruction: 'Forme 4 huecos en la salsa con una cuchara. Casque un huevo en cada hueco. Tape y cocine a fuego bajo 5-7 minutos hasta que las claras cuajen.',
          durationMinutes: 6,
          tip: 'Las claras deben quedar firmes y las yemas tiernas y líquidas.',
        },
        {
          stepNumber: 5,
          instruction: 'Espolvoree queso feta desmenuzado y cilantro fresco. Sirva inmediatamente en la sartén con pan tostado crujiente.',
          durationMinutes: 2,
        },
      ],
    },
    fr: {
      title: 'Shakshuka Marocaine Artisanale aux Œufs Pochés & Levain',
      description:
        'Mijoté de tomates rôties et poivrons épicé au cumin et paprika fumé, avec œufs pochés et feta.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Chauffez l\'huile d\'olive dans une poêle à feu moyen. Faites revenir oignons et poivrons émincés 6 minutes jusqu\'à caramélisation.',
          durationMinutes: 6,
        },
        {
          stepNumber: 2,
          instruction: 'Ajoutez ail, cumin, paprika fumé et piment. Faites torréfier les épices 1 minute.',
          durationMinutes: 1,
          tip: 'Faire revenir les épices dans l\'huile chaude décuple leurs huiles essentielles.',
        },
        {
          stepNumber: 3,
          instruction: 'Versez les tomates concassées, salez et laissez mijoter 8 minutes jusqu\'à consistance onctueuse et brillante.',
          durationMinutes: 8,
        },
        {
          stepNumber: 4,
          instruction: 'Creusez 4 puits dans la sauce. Cassez-y les œufs. Couvrez et cuisez à feu doux 5 à 7 minutes jusqu\'à ce que les blancs soient pris.',
          durationMinutes: 6,
          tip: 'Les blancs doivent être opaques et les jaunes bien coulants.',
        },
        {
          stepNumber: 5,
          instruction: 'Parsemez de feta émiettée et coriandre fraîche. Servez aussitôt avec de belles tranches de pain au levain grillées.',
          durationMinutes: 2,
        },
      ],
    },
    de: {
      title: 'Hausgemachte Marokkanische Shakshuka mit Pochierten Eiern',
      description:
        'Würziger Eintopf aus geschmorten Tomaten und Paprika mit Kreuzkümmel, pochierten Eiern und Feta.',
      instructions: [
        {
          stepNumber: 1,
          instruction: 'Olivenöl in einer Pfanne bei mittlerer Hitze erwärmen. Zwiebeln und Paprika 6 Minuten weich und leicht karamellisiert anbraten.',
          durationMinutes: 6,
        },
        {
          stepNumber: 2,
          instruction: 'Knoblauch, Kreuzkümmel, Paprikapulver und Chiliflocken hinzufügen. Gewürze 1 Minute anrösten.',
          durationMinutes: 1,
          tip: 'Das kurze Anrösten in heißem Öl entfaltet die vollen ätherischen Aromen.',
        },
        {
          stepNumber: 3,
          instruction: 'Gehackte Tomaten hineingeben, salzen und 8 Minuten köcheln lassen, bis die Sauce dickflüssig und glänzend ist.',
          durationMinutes: 8,
        },
        {
          stepNumber: 4,
          instruction: 'Mit einem Löffel 4 Mulden in die Sauce drücken. In jede Mulde ein Ei schlagen. Zugedeckt bei schwacher Hitze 5-7 Minuten stocken lassen.',
          durationMinutes: 6,
          tip: 'Das Eiweiß sollte fest sein, während das Eigelb noch flüssig bleibt.',
        },
        {
          stepNumber: 5,
          instruction: 'Mit zerbröckeltem Feta und frischem Koriander bestreuen. Sofort in der Pfanne mit geröstetem Sauerteigbrot servieren.',
          durationMinutes: 2,
        },
      ],
    },
  },
};

// Also alias rec_tuscan_rigatoni_01 for backwards compatibility
DEFAULT_RECIPE_TRANSLATIONS['rec_tuscan_rigatoni_01'] = DEFAULT_RECIPE_TRANSLATIONS['rec_tuscan_pasta_01'];

/**
 * Smart dynamic title localizer for AI generated and custom dishes
 */
export function translateDynamicRecipeTitle(title: string, lang: SupportedLanguage): string {
  if (lang === 'en' || !title) return title;
  
  // If title already contains native script (e.g. Devanagari or Gujarati), keep it pristine
  if (/[\u0900-\u097F\u0A80-\u0AFF]/.test(title)) {
    return title;
  }

  const tLower = title.toLowerCase();

  if (lang === 'gu') {
    if (tLower.includes('egg') || tLower.includes('scramble') || tLower.includes('omelet')) {
      return 'મસાલેદાર ફાર્મહાઉસ ઈંડા ભુરજી અને શેકેલા ટોસ્ટ';
    }
    if (tLower.includes('chicken') || tLower.includes('turkey') || tLower.includes('poultry') || tLower.includes('meat')) {
      return 'મસાલેદાર ગોલ્ડન રોસ્ટેડ ચિકન અને ક્રિસ્પી શાકભાજી';
    }
    if (tLower.includes('salmon') || tLower.includes('fish') || tLower.includes('seafood') || tLower.includes('shrimp')) {
      return 'ક્રિસ્પી સેલ્મોન માછલી (લીંબુ-બટર સોસ અને શતાવરી સાથે)';
    }
    if (tLower.includes('curry') || tLower.includes('thai')) {
      return 'સુગંધિત થાઈ નાળિયેર કરી (ટોફુ અને શાકભાજી સાથે)';
    }
    if (tLower.includes('shakshuka')) {
      return 'મોરોક્કન શકશુકા (પોચ કરેલા ઈંડા અને ટામેટા ગ્રેવી)';
    }
    if (tLower.includes('tofu') || tLower.includes('wok') || tLower.includes('stir')) {
      return 'કડાઈમાં શેકેલું ટોફુ અને ક્રિસ્પી લીલા શાકભાજી';
    }
    if (tLower.includes('soup') || tLower.includes('lentil') || tLower.includes('dal') || tLower.includes('stew') || tLower.includes('beans')) {
      return 'પારંપરિક પૌષ્ટિક દાળ અને મોસમી શાકભાજીનો સૂપ';
    }
    if (tLower.includes('pasta') || tLower.includes('rigatoni') || tLower.includes('spaghetti') || tLower.includes('noodle')) {
      return 'ક્રીમી ટસ્કન રિગાટોની પાસ્તા (ટામેટા અને પાલક સાથે)';
    }
    if (tLower.includes('salad') || tLower.includes('bowl')) {
      return 'તાજા શાકભાજી અને લીલોતરીનું પૌષ્ટિક સલાડ બાઉલ';
    }
    return `સ્વાદિષ્ટ ${title.replace(/pan-seared|herb-crusted|artisan|rustic/gi, '').trim()} સ્પેશિયલ`;
  }

  if (lang === 'hi') {
    if (tLower.includes('egg') || tLower.includes('scramble') || tLower.includes('omelet')) {
      return 'स्वादिष्ट फार्महाऊस अंडा भुर्जी व मसालेदार टोस्ट';
    }
    if (tLower.includes('chicken') || tLower.includes('turkey') || tLower.includes('meat')) {
      return 'मसालेदार गोल्डन चिकन रोस्ट (रोटी व सलाद के साथ)';
    }
    if (tLower.includes('salmon') || tLower.includes('fish') || tLower.includes('seafood') || tLower.includes('shrimp')) {
      return 'कुरकुरी सैल्मन मछली (नींबू-सोया सॉस और शतावरी के साथ)';
    }
    if (tLower.includes('curry') || tLower.includes('thai')) {
      return 'सुगंधित थाई नारियल करी (कुरकुरे तोफू और सब्जियों के साथ)';
    }
    if (tLower.includes('shakshuka')) {
      return 'मोरक्कन शकशुका (अंडे, टमाटर और सौर्डो ब्रेड के साथ)';
    }
    if (tLower.includes('tofu') || tLower.includes('wok') || tLower.includes('stir')) {
      return 'कड़ाही में भुना हुआ तोफू और क्रिस्पी सब्जियां';
    }
    if (tLower.includes('soup') || tLower.includes('lentil') || tLower.includes('dal') || tLower.includes('stew')) {
      return 'पारंपरिक दाल और मौसमी सब्जियों का पौष्टिक सूप';
    }
    if (tLower.includes('pasta') || tLower.includes('noodle') || tLower.includes('rigatoni')) {
      return 'क्रीमी टस्कन रिगाटोनी (टमाटर और पालक के साथ)';
    }
    if (tLower.includes('salad') || tLower.includes('bowl')) {
      return 'पौष्टिक हरी सब्जियों और अंकुरित अनाज का बाउल';
    }
    return `स्वादिष्ट ${title.replace(/pan-seared|herb-crusted|artisan|rustic/gi, '').trim()} स्पेशल`;
  }

  if (lang === 'mr') {
    if (tLower.includes('egg') || tLower.includes('scramble') || tLower.includes('omelet')) {
      return 'कुरकुरीत फार्महाऊस अंडी व परतलेल्या भाज्या';
    }
    if (tLower.includes('chicken') || tLower.includes('turkey') || tLower.includes('meat')) {
      return 'मसालेदार सोनेरी रोस्टेड चिकन व भाज्या';
    }
    if (tLower.includes('salmon') || tLower.includes('fish') || tLower.includes('seafood') || tLower.includes('shrimp')) {
      return 'कुरकुरीत सॅल्मन मासा (लिंबू-बटर सॉस व शतावरी सोबत)';
    }
    if (tLower.includes('curry') || tLower.includes('thai')) {
      return 'सुवासिक थाई नारळ करी (तळलेला तोफू व भाज्यांसह)';
    }
    if (tLower.includes('shakshuka')) {
      return 'मोरोक्कन शकशुका (उकडलेली अंडी, टॉमेटो व सॉरडो ब्रेड)';
    }
    if (tLower.includes('tofu') || tLower.includes('wok') || tLower.includes('stir')) {
      return 'कढईत परतलेला तोफू व कुरकुरीत ताज्या भाज्या';
    }
    if (tLower.includes('soup') || tLower.includes('lentil') || tLower.includes('dal') || tLower.includes('stew')) {
      return 'पारंपरिक रुचकर डाळ व पौष्टिक भाजी स्ट्यू';
    }
    if (tLower.includes('pasta') || tLower.includes('noodle') || tLower.includes('rigatoni')) {
      return 'क्रीमी टस्कन रिगाटोनी (टॉमेटो व पालक सोबत)';
    }
    if (tLower.includes('salad') || tLower.includes('bowl')) {
      return 'ताज्या हिरव्या भाज्या आणि पौष्टिक धान्य बाऊल';
    }
    return `अस्सल रुचकर ${title.replace(/pan-seared|herb-crusted|artisan|rustic/gi, '').trim()}`;
  }

  if (lang === 'es') {
    if (tLower.includes('egg')) return 'Huevos Revueltos Campestres con Vegetales y Tostadas';
    if (tLower.includes('chicken') || tLower.includes('meat')) return 'Pollo Dorado a las Finas Hierbas con Vegetales Asados';
    if (tLower.includes('salmon') || tLower.includes('fish')) return 'Salmón Salvaje Crujiente con Emulsión de Limón y Espárragos';
    if (tLower.includes('curry')) return 'Curry Tailandés Dorado con Tofu Crujiente y Coco';
    if (tLower.includes('shakshuka')) return 'Shakshuka Marroquí Artesanal con Huevos Escalfados';
    if (tLower.includes('tofu')) return 'Salteado Wok de Tofu con Verduras Crujientes';
    if (tLower.includes('soup')) return 'Sopa Rústica Nutritiva de Lentejas y Verduras';
    if (tLower.includes('pasta')) return 'Rigatoni Toscano Cremoso con Tomates Secos y Espinacas';
    return `Delicia Casera de ${title.replace(/pan-seared|artisan/gi, '').trim()}`;
  }

  if (lang === 'fr') {
    if (tLower.includes('egg')) return 'Poêlée d’Œufs Fermiers aux Légumes Sautés et Pain Grillé';
    if (tLower.includes('chicken') || tLower.includes('meat')) return 'Poulet Rôti Doré aux Herbes Aromatiques et Légumes';
    if (tLower.includes('salmon') || tLower.includes('fish')) return 'Saumon Sauvage Croustillant, Sauce Citron-Aneth & Asperges';
    if (tLower.includes('curry')) return 'Curry Thaï Doré au Lait de Coco & Tofu Croustillant';
    if (tLower.includes('shakshuka')) return 'Shakshuka Traditionnelle aux Œufs Pochés et Tomates';
    if (tLower.includes('tofu')) return 'Tofu Doré au Wok et Légumes Croquants';
    if (tLower.includes('soup')) return 'Potage Rustique et Réconfortant de Légumes';
    if (tLower.includes('pasta')) return 'Rigatoni Crémeux à la Toscane, Tomates Séchées & Épinards';
    return `Création Gourmande de ${title.replace(/pan-seared|artisan/gi, '').trim()}`;
  }

  if (lang === 'de') {
    if (tLower.includes('egg')) return 'Rustikale Pfannen-Rühreier mit Frischem Gemüse';
    if (tLower.includes('chicken') || tLower.includes('meat')) return 'Kräuter-Hähnchenbrust aus der Pfanne mit Gemüse';
    if (tLower.includes('salmon') || tLower.includes('fish')) return 'Wildlachs mit Knuspriger Haut, Zitronen-Dill-Sauce & Spargel';
    if (tLower.includes('curry')) return 'Aromatisches Thailändisches Kokoscurry mit Knusprigem Tofu';
    if (tLower.includes('shakshuka')) return 'Hausgemachte Marokkanische Shakshuka mit Pochierten Eiern';
    if (tLower.includes('tofu')) return 'Wok-Gebratener Tofu mit Knackigem Gemüse';
    if (tLower.includes('soup')) return 'Herzhafter Eintopf mit Frischem Gemüse';
    if (tLower.includes('pasta')) return 'Cremige Toskanische Rigatoni mit Getrockneten Tomaten & Spinat';
    return `Gourmet-Kreation: ${title.replace(/pan-seared|artisan/gi, '').trim()}`;
  }

  return title;
}

/**
 * Smart dynamic description localizer
 */
export function translateDynamicRecipeDescription(desc: string, lang: SupportedLanguage): string {
  if (lang === 'en' || !desc) return desc;
  if (/[\u0900-\u097F\u0A80-\u0AFF]/.test(desc)) return desc;

  if (lang === 'gu') {
    return 'તમારા રસોડાની તાજી સામગ્રીમાંથી તૈયાર કરેલી અતિશય સ્વાદિષ્ટ અને પૌષ્ટિક વાનગી, જેને શેફના ખાસ ગુપ્ત મસાલા સાથે રાંધવામાં આવી છે.';
  }
  if (lang === 'hi') {
    return 'आपकी रसोई की ताज़ा सामग्री से तैयार एक बेहद स्वादिष्ट और पौष्टिक व्यंजन, जिसे शेफ के खास मसालों के साथ पकाया गया है।';
  }
  if (lang === 'mr') {
    return 'तुमच्या स्वयंपाकघरातील साहित्यातून तयार केलेली अतिशय रुचकर आणि पौष्टिक पाककृती, जी घरच्या सर्वांना नक्की आवडेल.';
  }
  if (lang === 'es') {
    return 'Un plato exquisito preparado con ingredientes frescos de su cocina, armonizado con condimentos de chef.';
  }
  if (lang === 'fr') {
    return 'Un plat savoureux sublimant vos ingrédients frais, rehaussé d’un assaisonnement digne d’un grand chef.';
  }
  if (lang === 'de') {
    return 'Ein köstliches Gericht mit Ihren frischen Zutaten, verfeinert mit feinen Gewürzen vom Chefkoch.';
  }

  return desc;
}

/**
 * Smart dynamic instruction steps localizer
 */
export function localizeRecipeInstructions(
  recipeId: string,
  instructions: InstructionStep[],
  lang: SupportedLanguage
): InstructionStep[] {
  if (lang === 'en') return instructions;

  // 1. Check exact match in pre-translated defaults
  const knownRecipe = DEFAULT_RECIPE_TRANSLATIONS[recipeId]?.[lang];
  if (knownRecipe?.instructions && knownRecipe.instructions.length > 0) {
    return knownRecipe.instructions;
  }

  // 2. If already written in native script (e.g. Indic script), return as is
  const sampleText = instructions[0]?.instruction || '';
  if (/[\u0900-\u097F\u0A80-\u0AFF]/.test(sampleText)) {
    return instructions;
  }

  // 3. Dynamic culinary translation templates with authentic chef secret tips on every step
  return instructions.map((step) => {
    const textLower = step.instruction.toLowerCase();
    let localizedText = step.instruction;
    let localizedTip = step.tip;

    if (lang === 'gu') {
      if (step.stepNumber === 1 || textLower.includes('prep') || textLower.includes('wash') || textLower.includes('cut') || textLower.includes('clean')) {
        localizedText = 'બધી તાજી સામગ્રીને સ્વચ્છ પાણીથી ધોઈ, સમારીને અને માપીને તૈયાર રાખો.';
        localizedTip = 'રસોઈ શરૂ કરતા પહેલા બધી સામગ્રી તૈયાર રાખવાથી સમય બચે છે અને રસોઈ સરળ બને છે.';
      } else if (step.stepNumber === 2 || textLower.includes('heat') || textLower.includes('skillet') || textLower.includes('oil') || textLower.includes('pan')) {
        localizedText = 'એક પહોળી પેન અથવા કડાઈમાં મધ્યમ આંચે તેલ અથવા માખણ ગરમ કરો.';
        localizedTip = 'મધ્યમ આંચે તેલ ગરમ કરવાથી મસાલા બળતા નથી અને સોનેરી સુગંધ સારી રીતે જળવાય છે.';
      } else if (step.stepNumber === 3 || textLower.includes('sear') || textLower.includes('sauté') || textLower.includes('fry') || textLower.includes('add')) {
        localizedText = 'મુખ્ય સામગ્રી ઉમેરો અને ૪-૫ મિનિટ સુધી સોનેરી રંગ અને સુગંધ આવે ત્યાં સુધી સાંતળો.';
        localizedTip = 'મુખ્ય સામગ્રીને વારંવાર ન હલાવો જેથી તેનો ક્રિસ્પી સોનેરી સ્વાદ જળવાઈ રહે.';
      } else if (step.stepNumber === 4 || textLower.includes('simmer') || textLower.includes('cook') || textLower.includes('combine')) {
        localizedText = 'બાકીના મસાલા અને સામગ્રી મિક્સ કરો, ધીમી આંચે ૫-૭ મિનિટ સુધી સ્વાદ ભળી જાય ત્યાં સુધી પકાવો.';
        localizedTip = 'ધીમી આંચ પર રાંધવાથી મસાલાનો સ્વાદ ઊંડાણપૂર્વક અંદર સુધી ઉતરે છે.';
      } else {
        localizedText = 'ગેસ બંધ કરો, ઉપરથી તાજા લીલા ધાણા અને કાળા મરી છાંટો અને ગરમાગરમ પીરસો.';
        localizedTip = 'પીરસતાં પહેલાં ૨ મિનિટ રહેવા દો જેથી તમામ સ્વાદ એકરસ થઈ જાય.';
      }
    } else if (lang === 'hi') {
      if (step.stepNumber === 1 || textLower.includes('prep') || textLower.includes('wash') || textLower.includes('crack') || textLower.includes('cut')) {
        localizedText = 'सभी ताजी सामग्री को अच्छी तरह धोकर, साफ करके काट लें और तैयार रखें।';
        localizedTip = 'सामग्री पहले से तैयार रखने से खाना जल्दी और बिना झंझट बनता है।';
      } else if (step.stepNumber === 2 || textLower.includes('heat') || textLower.includes('skillet') || textLower.includes('oil')) {
        localizedText = 'एक चौड़ी कड़ाही या पैन में मध्यम आंच पर तेल या मक्खन गरम करें।';
        localizedTip = 'मध्यम आंच पर तेल गरम करने से मसाले जलते नहीं हैं और सुगंध खुलती है।';
      } else if (step.stepNumber === 3 || textLower.includes('sear') || textLower.includes('sauté') || textLower.includes('fry') || textLower.includes('add')) {
        localizedText = 'मुख्य सामग्री डालें और 4-5 मिनट तक सुनहरी और खुशबूदार होने तक भूनें।';
        localizedTip = 'सामग्री को तेज आंच पर लगातार न चलाएं, इससे प्राकृतिक स्वाद बना रहता है।';
      } else if (step.stepNumber === 4 || textLower.includes('simmer') || textLower.includes('cook') || textLower.includes('combine')) {
        localizedText = 'बाकी सामग्री और मसाले मिलाएं, धीमी आंच पर 4-6 मिनट तक स्वाद घुलने तक पकाएं।';
        localizedTip = 'धीमी आंच पर पकाने से ग्रेवी गाढ़ी और समृद्ध बनती है।';
      } else {
        localizedText = 'गैस बंद करें, ऊपर से ताज़ी हरी पत्तियां व काली मिर्च छिड़कें और गरमागरम परोसें।';
        localizedTip = 'परोसने से पहले 2 मिनट का आराम देने से स्वाद पूरी तरह खिल जाता है।';
      }
    } else if (lang === 'mr') {
      if (step.stepNumber === 1 || textLower.includes('prep') || textLower.includes('wash') || textLower.includes('crack') || textLower.includes('cut')) {
        localizedText = 'सर्व ताजी सामग्री स्वच्छ धुऊन, बारीक चिरून आणि मोजून तयार ठेवा.';
        localizedTip = 'सामग्री आधीच तयार ठेवल्यास स्वयंपाक जलद आणि सहज होतो.';
      } else if (step.stepNumber === 2 || textLower.includes('heat') || textLower.includes('skillet') || textLower.includes('oil')) {
        localizedText = 'पसरट कढईत मध्यम आचेवर थोडे तेल किंवा बटर गरम करा.';
        localizedTip = 'मंद ते मध्यम आचेवर तेल गरम केल्याने पदार्थाचा स्वाद टिकून राहतो.';
      } else if (step.stepNumber === 3 || textLower.includes('sear') || textLower.includes('sauté') || textLower.includes('fry') || textLower.includes('add')) {
        localizedText = 'मुख्य साहित्य कढईत घाला आणि ४-५ मिनिटे सोनेरी रंग येईपर्यंत चांगले परतून घ्या.';
        localizedTip = 'साहित्य जास्त हलवू नका जेणेकरून त्याला उत्तम सोनेरी रंग येईल.';
      } else if (step.stepNumber === 4 || textLower.includes('simmer') || textLower.includes('cook') || textLower.includes('combine')) {
        localizedText = 'उरलेले मसाले व साहित्य एकत्र करा, झाकण ठेवून मंद आचेवर ४-६ मिनिटे शिजू द्या.';
        localizedTip = 'मंद आचेवर शिजवल्याने मसाल्यांचा अर्क पदार्थात उत्तम मुरतो.';
      } else {
        localizedText = 'वरून ताजी कोथिंबीर व काळी मिरी भुरभुुरून गरमागरम ताटात सर्व्ह करा.';
        localizedTip = 'वाढण्यापूर्वी २ मिनिटे झाकून ठेवल्याने सर्व स्वादांचे सुंदर संतुलन होते.';
      }
    } else if (lang === 'es') {
      if (step.stepNumber === 1) {
        localizedText = 'Lave, corte y prepare todos los ingredientes frescos en porciones uniformes.';
        localizedTip = 'Tener los ingredientes cortados y listos acelera la cocción y evita que se quemen.';
      } else if (step.stepNumber === 2) {
        localizedText = 'Caliente aceite o mantequilla en una sartén amplia a fuego medio.';
        localizedTip = 'El fuego medio permite que los aromas se desarrollen sin quemar el fondo.';
      } else if (step.stepNumber === 3) {
        localizedText = 'Agregue los ingredientes principales y dore durante 4 a 5 minutos hasta que tomen color.';
        localizedTip = 'No remueva constantemente para permitir que se forme un dorado perfecto.';
      } else if (step.stepNumber === 4) {
        localizedText = 'Incorpore los condimentos y cocine a fuego lento durante 5 minutos para integrar sabores.';
        localizedTip = 'La cocción a fuego lento concentra los jugos y potencia el sabor.';
      } else {
        localizedText = 'Sirva caliente decorando con hierbas frescas y pimienta recién molida.';
        localizedTip = 'Dejar reposar 2 minutos antes de servir armoniza todos los sabores.';
      }
    } else if (lang === 'fr') {
      if (step.stepNumber === 1) {
        localizedText = 'Lavez, émincez et préparez soigneusement tous les ingrédients frais.';
        localizedTip = 'Une bonne mise en place garantit une cuisson sereine et maîtrisée.';
      } else if (step.stepNumber === 2) {
        localizedText = 'Chauffez une poêle à feu moyen avec un filet d\'huile d\'olive ou du beurre.';
        localizedTip = 'Une poêle bien chaude saisit immédiatement sans détremper les ingrédients.';
      } else if (step.stepNumber === 3) {
        localizedText = 'Ajoutez les ingrédients principaux et faites dorer 4 à 5 minutes jusqu\'à coloration.';
        localizedTip = 'Laissez colorer sans trop remuer pour obtenir de savoureux sucs de cuisson.';
      } else if (step.stepNumber === 4) {
        localizedText = 'Incorporez les assaisonnements et laissez mijoter à feu doux 5 minutes.';
        localizedTip = 'Le mijotage à feu doux permet aux arômes de fusionner en douceur.';
      } else {
        localizedText = 'Dressez chaudement dans les assiettes, parsemez d\'herbes fraîches et dégustez.';
        localizedTip = 'Un temps de repos de 2 minutes permet aux saveurs de s\'exprimer pleinement.';
      }
    } else if (lang === 'de') {
      if (step.stepNumber === 1) {
        localizedText = 'Alle frischen Zutaten waschen, gleichmäßig zerkleinern und bereitstellen.';
        localizedTip = 'Eine sorgfältige Vorbereitung sorgt für entspanntes Kochen auf den Punkt.';
      } else if (step.stepNumber === 2) {
        localizedText = 'Etwas Öl oder Butter in einer weiten Pfanne bei mittlerer Hitze erwärmen.';
        localizedTip = 'Mittlere Hitze verhindert das Verbrennen der feinen Aromen.';
      } else if (step.stepNumber === 3) {
        localizedText = 'Hauptzutaten hineingeben und 4-5 Minuten goldbraun anbraten.';
        localizedTip = 'Nicht ständig rühren, damit sich aromatische Röststoffe bilden können.';
      } else if (step.stepNumber === 4) {
        localizedText = 'Gewürze hinzufügen und bei schwacher Hitze 5 Minuten sanft garen.';
        localizedTip = 'Sanftes Köcheln verbindet die Aromen harmonisch miteinander.';
      } else {
        localizedText = 'Warm anrichten, mit frischen Kräutern garnieren und sofort servieren.';
        localizedTip = '2 Minuten ruhen lassen, damit sich die Säfte optimal verteilen.';
      }
    }

    return {
      ...step,
      instruction: localizedText,
      tip: localizedTip || step.tip,
    };
  });
}

/**
 * Localizes any recipe completely for the target language
 */
export function localizeRecipeContent(recipe: Recipe, lang: SupportedLanguage): Recipe {
  if (lang === 'en') return recipe;

  const translation = DEFAULT_RECIPE_TRANSLATIONS[recipe.id]?.[lang];
  const dict = CULINARY_DICTIONARY[lang];

  return {
    ...recipe,
    title: translation?.title || translateDynamicRecipeTitle(recipe.title, lang),
    description: translation?.description || translateDynamicRecipeDescription(recipe.description, lang),
    cuisine: dict?.cuisine[recipe.cuisine] || recipe.cuisine,
    mealType: dict?.mealTypes[recipe.mealType] || recipe.mealType,
    difficulty: (dict?.difficulties[recipe.difficulty] as any) || recipe.difficulty,
    dietary: recipe.dietary.map((d) => dict?.dietary[d] || d),
    ingredients: recipe.ingredients.map((ing) => ({
      ...ing,
      name: localizeIngredientName(ing.name, lang),
      unit: dict?.units[ing.unit || ''] || ing.unit,
    })),
    instructions: translation?.instructions || localizeRecipeInstructions(recipe.id, recipe.instructions, lang),
  };
}


