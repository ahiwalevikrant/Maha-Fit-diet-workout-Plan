// ──────────────────────────────────────────────
// MAHARASHTRIAN FOOD DATABASE
// ──────────────────────────────────────────────

export const FOODS = {
  breakfast: {
    highProtein: [
      { name: "Moong Dal Chilla", items: "3 chilla + green chutney", protein: 18, carbs: 28, kcal: 220, note: "Add grated carrot inside" },
      { name: "Egg Bhurji + Bhakri", items: "2 eggs + 1 jowar bhakri", protein: 22, carbs: 30, kcal: 280, note: "Use 1 tsp ghee only" },
      { name: "Sprouted Moong Salad", items: "1 cup sprouted moong + lemon + onion", protein: 14, carbs: 22, kcal: 160, note: "Add rock salt + jeera" },
      { name: "Poha with Peanuts", items: "1 bowl thick poha + peanuts + lemon", protein: 10, carbs: 45, kcal: 280, note: "Peanuts = protein boost" },
      { name: "Sabudana Khichdi (light)", items: "Small bowl + peanuts + curd", protein: 8, carbs: 50, kcal: 300, note: "Only on workout days" },
      { name: "Upma + Buttermilk", items: "1 bowl rava upma + 1 glass chaas", protein: 10, carbs: 40, kcal: 260, note: "Add lots of veggies" },
    ],
    veg: [
      { name: "Dhirde (Besan Chilla)", items: "3 dhirde + green chutney", protein: 14, carbs: 32, kcal: 240 },
      { name: "Thalipeeth", items: "2 small thalipeeth + curd", protein: 12, carbs: 38, kcal: 280, note: "Multi-grain, best Maharashtrian breakfast" },
      { name: "Methi Thepla + Curd", items: "2 thepla + small curd bowl", protein: 10, carbs: 35, kcal: 260 },
    ],
  },
  lunch: [
    { name: "Jowar Bhakri Thali", items: "2 jowar bhakri + tur dal + dry sabzi + sol kadhi + salad", protein: 28, carbs: 65, kcal: 420, note: "The gold standard Maharashtrian meal" },
    { name: "Bajra Bhakri Thali", items: "2 bajra bhakri + masoor dal + methi bhaji + chaas", protein: 24, carbs: 60, kcal: 390, note: "Best for PCOD + weight loss" },
    { name: "Varan Bhaat (Controlled)", items: "½ cup rice + varan + one sabzi + papad", protein: 18, carbs: 70, kcal: 380, note: "Limit rice portion strictly" },
    { name: "Mixed Dal + Bhakri", items: "Thick mixed dal (tur+masoor+moong) + 2 bhakri + bhaji", protein: 26, carbs: 62, kcal: 400 },
    { name: "Rajma + Bhakri", items: "1 bowl rajma + 2 bhakri + salad", protein: 22, carbs: 68, kcal: 410, note: "High fibre — great for weight loss" },
  ],
  dinner: [
    { name: "Light Dal + Roti", items: "1 bowl thin dal + 2 roti + 1 sabzi", protein: 18, carbs: 50, kcal: 320, note: "No rice at dinner — golden rule" },
    { name: "Bhakri + Sabzi", items: "1 bhakri + green sabzi + sol kadhi", protein: 12, carbs: 40, kcal: 260 },
    { name: "Moong Dal Khichdi", items: "Small bowl khichdi + curd + papad", protein: 16, carbs: 48, kcal: 310, note: "Easy digest, great for recovery" },
    { name: "Veg Soup + Roti", items: "1 bowl thick veg soup + 1-2 roti", protein: 10, carbs: 38, kcal: 240, note: "Light — best for weight loss days" },
    { name: "Curd Rice (light)", items: "Small bowl curd rice + pickle + salad", protein: 8, carbs: 44, kcal: 260, note: "Only if stomach upset" },
  ],
  snacks: [
    { name: "Roasted Chana", items: "1 handful + lemon + spices", protein: 10, carbs: 15, kcal: 120 },
    { name: "Curd + Cucumber", items: "1 bowl dahi + cucumber + jeera", protein: 8, carbs: 8, kcal: 90 },
    { name: "Murmura Chivda", items: "Homemade, dry roasted, no oil", protein: 4, carbs: 20, kcal: 100, note: "Maharashtra's best snack" },
    { name: "Nuts Mix", items: "5 almonds + 2 walnuts + 1 fig", protein: 6, carbs: 10, kcal: 130 },
    { name: "Guava / Apple", items: "1 medium fruit", protein: 1, carbs: 22, kcal: 80 },
    { name: "Buttermilk (Chaas)", items: "1 glass, no sugar, jeera + pudina", protein: 4, carbs: 6, kcal: 60 },
    { name: "Sol Kadhi", items: "1 glass — kokam + coconut milk", protein: 2, carbs: 8, kcal: 70, note: "Digestive + anti-inflammatory" },
  ],
  preWorkout: [
    { name: "Banana + Almonds", items: "1 banana + 4 almonds", protein: 4, carbs: 28, kcal: 160 },
    { name: "Dates + Warm Water", items: "2 dates + 1 glass warm water", protein: 2, carbs: 22, kcal: 100 },
    { name: "Poha (small)", items: "Half bowl light poha", protein: 4, carbs: 20, kcal: 120 },
  ],
  postWorkout: [
    { name: "Egg White Omelette", items: "3 egg whites + 1 yolk + veggies", protein: 20, carbs: 4, kcal: 140 },
    { name: "Sprouted Moong", items: "1 cup + lemon + rock salt", protein: 14, carbs: 20, kcal: 150 },
    { name: "Curd + Banana", items: "1 bowl curd + 1 banana", protein: 10, carbs: 30, kcal: 200 },
    { name: "Protein Chaas", items: "Thick buttermilk with jeera + black pepper", protein: 8, carbs: 8, kcal: 100 },
  ],
};

// ──────────────────────────────────────────────
// WORKOUT DATABASE
// ──────────────────────────────────────────────

export const WORKOUTS = {
  cardio: {
    withRope: [
      { name: "Basic Jump (2 feet)", sets: "3×1 min", note: "Start here in Month 1" },
      { name: "Alternate Foot Skip", sets: "3×45s", note: "Mimics running" },
      { name: "High Knees Skip", sets: "3×30s", note: "Intense — Month 2+" },
      { name: "HIIT Skip (30s on/15s off)", sets: "8 rounds", note: "Fat burner — Month 3" },
      { name: "Double Unders (try)", sets: "3×20 reps", note: "Advanced" },
    ],
    withoutRope: [
      { name: "Brisk Walk", sets: "30-45 min", note: "Foundation — keep doing this" },
      { name: "Spot Jogging", sets: "3×2 min", note: "Indoor cardio" },
      { name: "Jumping Jacks", sets: "3×30", note: "Warmup + cardio" },
      { name: "Mountain Climbers", sets: "3×20", note: "Cardio + core" },
      { name: "Burpees", sets: "3×10", note: "Full body cardio — tough" },
      { name: "High Knees", sets: "3×30s", note: "No equipment needed" },
    ],
  },
  strength: {
    withBands: {
      upper: [
        { name: "Band Pull-Apart", sets: "3×15", muscle: "Back / Posture" },
        { name: "Bicep Curls", sets: "3×15", muscle: "Biceps" },
        { name: "Tricep Overhead Extension", sets: "3×12", muscle: "Triceps" },
        { name: "Shoulder Press", sets: "3×12", muscle: "Shoulders" },
        { name: "Bent-Over Rows", sets: "3×15", muscle: "Back" },
        { name: "Chest Press (band)", sets: "3×12", muscle: "Chest" },
        { name: "Face Pulls", sets: "3×15", muscle: "Rear Delts" },
      ],
      lower: [
        { name: "Banded Squats", sets: "4×15", muscle: "Quads / Glutes" },
        { name: "Lateral Band Walks", sets: "3×12 each", muscle: "Glutes / Hip" },
        { name: "Glute Bridges (band)", sets: "3×15", muscle: "Glutes" },
        { name: "Standing Kickbacks", sets: "3×15 each", muscle: "Glutes" },
        { name: "Calf Raises", sets: "3×20", muscle: "Calves" },
        { name: "Sumo Squats (band)", sets: "3×15", muscle: "Inner Thigh" },
      ],
    },
    withoutBands: {
      upper: [
        { name: "Push-ups", sets: "3×12", muscle: "Chest / Arms" },
        { name: "Pike Push-ups", sets: "3×10", muscle: "Shoulders" },
        { name: "Diamond Push-ups", sets: "3×10", muscle: "Triceps" },
        { name: "Wide Push-ups", sets: "3×12", muscle: "Chest" },
        { name: "Tricep Dips (chair)", sets: "3×12", muscle: "Triceps" },
      ],
      lower: [
        { name: "Bodyweight Squats", sets: "4×20", muscle: "Quads / Glutes" },
        { name: "Lunges (alternating)", sets: "3×12 each", muscle: "Legs" },
        { name: "Glute Bridges", sets: "3×20", muscle: "Glutes" },
        { name: "Donkey Kicks", sets: "3×15 each", muscle: "Glutes" },
        { name: "Sumo Squats", sets: "3×20", muscle: "Inner Thigh" },
        { name: "Calf Raises", sets: "3×25", muscle: "Calves" },
        { name: "Wall Sit", sets: "3×30–45s", muscle: "Quads" },
      ],
    },
  },
  core: [
    { name: "Plank Hold", sets: "3×30–60s" },
    { name: "Bicycle Crunches", sets: "3×15" },
    { name: "Leg Raises", sets: "3×12" },
    { name: "Russian Twists", sets: "3×20" },
    { name: "Side Plank (each side)", sets: "2×20–30s" },
    { name: "Dead Bug", sets: "3×10" },
    { name: "Hollow Body Hold", sets: "3×20s" },
  ],
  yoga: {
    general: [
      { name: "Surya Namaskar", sets: "5–12 rounds", note: "Best full-body yoga" },
      { name: "Warrior I & II", sets: "30s each side", note: "Strength + balance" },
      { name: "Cat-Cow Flow", sets: "2 min", note: "Spine mobility" },
      { name: "Child's Pose", sets: "1 min", note: "Rest + stretch" },
      { name: "Downward Dog", sets: "3×30s", note: "Full body stretch" },
      { name: "Cobra Pose", sets: "3×20s", note: "Back strength" },
    ],
    pcod: [
      { name: "Butterfly Pose (Baddha Konasana)", sets: "2–3 min hold", note: "Opens hips, helps ovaries" },
      { name: "Supta Baddha Konasana", sets: "3–5 min", note: "Relaxes pelvic area" },
      { name: "Legs Up Wall (Viparita Karani)", sets: "5 min", note: "Improves circulation" },
      { name: "Seated Forward Fold", sets: "2 min", note: "Calms nervous system" },
      { name: "Malasana (Garland Pose)", sets: "1 min", note: "Pelvic floor strength" },
      { name: "Anulom Vilom Pranayama", sets: "5 min", note: "Hormonal balance" },
      { name: "Bhramari Pranayama", sets: "5 min", note: "Reduces cortisol" },
    ],
  },
};

// ──────────────────────────────────────────────
// WEEKLY SCHEDULE TEMPLATES
// ──────────────────────────────────────────────

export const SCHEDULE = {
  standard: [
    { day: "Mon", focus: "Cardio + Core", color: "#FF6B35", emoji: "🔥" },
    { day: "Tue", focus: "Upper Body", color: "#D4691E", emoji: "💪" },
    { day: "Wed", focus: "Cardio + HIIT", color: "#FF6B35", emoji: "⚡" },
    { day: "Thu", focus: "Lower Body", color: "#D4691E", emoji: "🦵" },
    { day: "Fri", focus: "Yoga + Stretch", color: "#7C3AED", emoji: "🧘" },
    { day: "Sat", focus: "Full Body", color: "#0EA5E9", emoji: "🏋️" },
    { day: "Sun", focus: "Rest / Walk", color: "#9CA3AF", emoji: "🌿" },
  ],
  pcod: [
    { day: "Mon", focus: "Strength (Bands)", color: "#D4601F", emoji: "💗" },
    { day: "Tue", focus: "Yoga (PCOD)", color: "#7C3AED", emoji: "🧘" },
    { day: "Wed", focus: "Light Cardio", color: "#FF6B35", emoji: "🚶" },
    { day: "Thu", focus: "Strength (Bands)", color: "#D4601F", emoji: "💗" },
    { day: "Fri", focus: "Yoga + Breathwork", color: "#7C3AED", emoji: "🌸" },
    { day: "Sat", focus: "Full Body Light", color: "#0EA5E9", emoji: "✨" },
    { day: "Sun", focus: "Rest / Walk", color: "#9CA3AF", emoji: "🌿" },
  ],
};

// ──────────────────────────────────────────────
// PCOD SUPERFOODS
// ──────────────────────────────────────────────

export const PCOD_FOODS = {
  mustEat: [
    { food: "Methi Seeds (soaked)", when: "Every morning, empty stomach", why: "Regulates blood sugar & hormones" },
    { food: "Flaxseeds (ground)", when: "Add to any meal daily", why: "Omega-3s reduce androgens (facial hair)" },
    { food: "Spearmint Tea", when: "2 cups daily", why: "Clinically proven to reduce facial hair" },
    { food: "Jowar / Bajra Bhakri", when: "Replace rice at meals", why: "Low GI — key for insulin resistance" },
    { food: "Amla / Indian Gooseberry", when: "Morning with water", why: "Antioxidant, improves insulin sensitivity" },
    { food: "Walnuts", when: "Daily snack (3-4 pieces)", why: "Omega-3 directly lowers androgens" },
    { food: "Cinnamon (Dalchini)", when: "In chai or food", why: "Reduces insulin resistance" },
    { food: "Sol Kadhi (Kokam)", when: "With lunch", why: "Anti-inflammatory, aids digestion" },
  ],
  avoid: [
    "White sugar & sweet chai",
    "Maida (white flour) products",
    "Processed / packaged snacks",
    "Deep fried foods",
    "Excess dairy (paneer, cheese daily)",
    "Large portions of white rice",
    "Fruit juices (eat whole fruit)",
  ],
};

// ──────────────────────────────────────────────
// CALORIE TARGETS BY GOAL
// ──────────────────────────────────────────────

export function getCalorieTarget(weight, goal, gender, hasCondition) {
  let base = gender === "male" ? (weight * 24) : (weight * 22);
  if (hasCondition) base *= 0.92;
  const targets = {
    "loss": Math.round(base * 0.82),
    "loss-muscle": Math.round(base * 0.85),
    "maintain-tone": Math.round(base * 0.95),
  };
  return targets[goal] || targets["loss-muscle"];
}

export function getProteinTarget(weight, goal) {
  const multiplier = goal === "loss-muscle" ? 1.8 : 1.5;
  return Math.round(weight * multiplier);
}
