import { FOODS, WORKOUTS, SCHEDULE, PCOD_FOODS, getCalorieTarget, getProteinTarget } from "../data/mahaData.js";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pick(arr, n = 1) {
  const s = shuffle(arr);
  return n === 1 ? s[0] : s.slice(0, n);
}

function hasPCOD(person) {
  return person.conditions?.includes("pcod");
}

function hasKneeIssue(person) {
  return person.conditions?.includes("knee");
}

function hasNone(person) {
  return person.conditions?.includes("none") || person.conditions?.length === 0;
}

export function generatePlan(data) {
  const { user, partner, mode, equipment, workoutTime } = data;
  const isCouple = mode === "couple";

  const hasRope = equipment.includes("rope");
  const hasBands = equipment.includes("bands");
  const hasDumbbells = equipment.includes("dumbbells");
  const noEquipment = equipment.includes("none");

  function buildPersonPlan(person) {
    const pcod = hasPCOD(person);
    const knee = hasKneeIssue(person);
    const kcal = getCalorieTarget(+person.weight || 70, person.goal, person.gender, pcod);
    const protein = getProteinTarget(+person.weight || 70, person.goal);

    // Diet plan
    const diet = {
      kcal,
      protein,
      carbs: Math.round(kcal * 0.45 / 4),
      fats: Math.round(kcal * 0.25 / 9),
      preWorkout: pick(FOODS.preWorkout),
      breakfast: pick(pcod ? FOODS.breakfast.veg : FOODS.breakfast.highProtein),
      midMorning: pick(FOODS.snacks),
      lunch: pick(FOODS.lunch),
      eveningSnack: pick(FOODS.snacks.filter(s => s.name !== (pick(FOODS.snacks)).name)),
      dinner: pick(FOODS.dinner),
      pcodFoods: pcod ? PCOD_FOODS : null,
      postWorkout: pick(FOODS.postWorkout),
    };

    // Workout schedule
    const schedule = pcod ? SCHEDULE.pcod : SCHEDULE.standard;

    // Build workouts based on equipment
    const cardioExercises = hasRope
      ? WORKOUTS.cardio.withRope
      : WORKOUTS.cardio.withoutRope;

    const upperBodyExercises = hasBands
      ? WORKOUTS.strength.withBands.upper
      : WORKOUTS.strength.withoutBands.upper;

    const lowerBodyExercises = (hasBands && !knee)
      ? WORKOUTS.strength.withBands.lower
      : WORKOUTS.strength.withoutBands.lower.filter(e => knee ? !["Jump", "Lunge"].some(k => e.name.includes(k)) : true);

    const yogaExercises = pcod
      ? [...WORKOUTS.yoga.general.slice(0, 3), ...WORKOUTS.yoga.pcod]
      : WORKOUTS.yoga.general;

    // 3-phase monthly plan
    const phases = [
      {
        month: 1,
        title: "Foundation",
        description: "Build the habit. Master form. Fix your diet.",
        color: "#FF6B35",
        workoutDuration: "30–35 min",
        intensity: "Low–Moderate",
        skipSets: hasRope ? "3×1 min jump" : "Spot jog 3×2 min",
        focus: ["Establish consistency", "Learn all exercises", "Track your food", "Sleep 7–8 hrs"],
      },
      {
        month: 2,
        title: "Intensity",
        description: "Push harder. Add sets. Clean up your diet.",
        color: "#D4691E",
        workoutDuration: "40–45 min",
        intensity: "Moderate–High",
        skipSets: hasRope ? "5×90s with variations" : "HIIT intervals 6 rounds",
        focus: ["Increase volume", "Add HIIT 2x/week", "Reduce refined carbs", "Meal prep Sunday"],
      },
      {
        month: 3,
        title: "Shred",
        description: "Visible results. Push intensity. Dial in nutrition.",
        color: "#7C3AED",
        workoutDuration: "45–50 min",
        intensity: "High",
        skipSets: hasRope ? "HIIT 30s on/15s off × 10 rounds" : "Tabata intervals 8 rounds",
        focus: ["Full circuits", "Minimal rest", "Protein at every meal", "Measure weekly"],
      },
    ];

    const workoutPlan = {
      schedule,
      cardio: cardioExercises,
      upper: upperBodyExercises,
      lower: lowerBodyExercises,
      core: WORKOUTS.core,
      yoga: yogaExercises,
      phases,
      hasRope,
      hasBands,
      noEquipment,
      equipment,
    };

    const progress = {
      month1: `−${person.gender === "female" && pcod ? "1–1.5" : "1.5–2"} kg + fat adaptation`,
      month2: `−${person.gender === "female" && pcod ? "1.5–2" : "2–2.5"} kg + visible toning`,
      month3: `−${person.gender === "female" && pcod ? "1.5–2" : "1.5–2.5"} kg + muscle definition`,
      total: person.gender === "female" && pcod ? "4–5.5 kg in 3 months" : "5–7 kg in 3 months",
    };

    const tips = pcod ? [
      { emoji: "🌱", title: "Methi Seeds Daily", body: "Soak 1 tsp overnight. Eat on empty stomach every morning." },
      { emoji: "🍵", title: "Spearmint Tea", body: "2 cups daily. Clinically reduces facial hair & androgens." },
      { emoji: "🌾", title: "Jowar > Rice", body: "Swap white rice for jowar/bajra bhakri. Low GI is key for PCOD." },
      { emoji: "💤", title: "Sleep is Hormonal", body: "8 hrs sleep reduces cortisol, which directly worsens PCOD." },
      { emoji: "🥜", title: "Walnuts Daily", body: "3–4 walnuts — omega-3s reduce androgens and help regulate cycles." },
      { emoji: "🧘", title: "Yoga > HIIT (Days 1–14)", body: "Avoid high-intensity in early cycle. Butterfly pose daily." },
    ] : person.gender === "female" ? [
      { emoji: "💧", title: "Hydration First", body: "3 litres daily. Warm water in morning flushes toxins." },
      { emoji: "🥚", title: "Protein Power", body: "Moong, eggs, curd, chana — protein at every single meal." },
      { emoji: "🌙", title: "Early Dinner", body: "Finish by 8 PM. No rice at dinner from Month 2." },
      { emoji: "📊", title: "Weekly Weigh-in", body: "Same time, same day. Avoid daily weighing." },
      { emoji: "🎽", title: "Resistance > Cardio", body: "Bands build curves and burn fat longer than cardio alone." },
      { emoji: "☕", title: "Cut Sugar in Chai", body: "This alone can save 200–300 kcal daily. Switch to jaggery in minimal amounts." },
    ] : [
      { emoji: "💧", title: "3.5L Water Daily", body: "Start with 2 glasses warm water every morning." },
      { emoji: "🥗", title: "Protein at Every Meal", body: "Dal + eggs + curd + chana. Hit 100g protein daily." },
      { emoji: "🌙", title: "Early Dinner", body: "Finish eating by 8:30 PM. Your metabolism thanks you." },
      { emoji: "📈", title: "Progressive Overload", body: "Add reps/sets every 2 weeks. Don't stay at same level." },
      { emoji: "🛌", title: "7–8 hrs Sleep", body: "Muscle is built during sleep, not during workout." },
      { emoji: "⚡", title: "Skip the Biscuits", body: "Replace biscuit/chai snack with roasted chana. 2 kg saved." },
    ];

    return { person, diet, workoutPlan, progress, tips, pcod };
  }

  const userPlan = buildPersonPlan(user);
  const partnerPlan = isCouple ? buildPersonPlan(partner) : null;

  return {
    mode,
    workoutTime,
    equipment,
    userPlan,
    partnerPlan,
    isCouple,
    generatedAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
  };
}
