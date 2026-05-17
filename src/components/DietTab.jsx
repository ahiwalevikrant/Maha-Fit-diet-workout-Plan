import { useState } from "react";

const MEAL_ORDER = [
  { key: "preWorkout", time: "5:30–6:00 AM", label: "Pre-Workout", emoji: "⚡" },
  { key: "breakfast", time: "8:00–9:00 AM", label: "Breakfast", emoji: "🌅" },
  { key: "midMorning", time: "11:00–11:30 AM", label: "Mid-Morning Snack", emoji: "🍎" },
  { key: "lunch", time: "1:30–2:00 PM", label: "Lunch", emoji: "🍽️" },
  { key: "postWorkout", time: "Post-Workout", label: "Post-Workout", emoji: "💪" },
  { key: "eveningSnack", time: "4:30–5:00 PM", label: "Evening Snack", emoji: "🌇" },
  { key: "dinner", time: "7:30–8:30 PM", label: "Dinner", emoji: "🌙" },
];

export default function DietTab({ plan, accentColor, accentLight }) {
  const { diet, pcod } = plan;
  const [showSwaps, setShowSwaps] = useState(false);

  const SWAPS = [
    { from: "White rice (large bowl)", to: "Jowar / Bajra Bhakri (2 pieces)", save: "Save 80 kcal + lower GI" },
    { from: "Sweet chai (2 cups/day)", to: "Kadha / Green tea (no sugar)", save: "Save 150–200 kcal" },
    { from: "Biscuits / packaged snacks", to: "Roasted chana / murmura", save: "Save 120 kcal + more protein" },
    { from: "Vada pav / misal pav", to: "Thalipeeth + curd", save: "Save 200 kcal + high protein" },
    { from: "Fried chakli / shev", to: "Popped jowar / roasted peanuts", save: "Save 100 kcal" },
    { from: "Shrikhand (full fat)", to: "Hung curd + jaggery (small)", save: "Save 150 kcal + high protein" },
    { from: "Butter on roti", to: "1 tsp ghee (not butter)", save: "Healthier fat profile" },
  ];

  return (
    <div>
      {/* Macro banner */}
      <div style={styles.macroBanner}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#6B7280", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Daily Targets</div>
        <div style={styles.macroRow}>
          {[
            { label: "Calories", val: `${diet.kcal}`, unit: "kcal", color: "#FF6B35" },
            { label: "Protein", val: `${diet.protein}`, unit: "g", color: accentColor },
            { label: "Carbs", val: `${diet.carbs}`, unit: "g", color: "#0EA5E9" },
            { label: "Fats", val: `${diet.fats}`, unit: "g", color: "#7C3AED" },
          ].map(m => (
            <div key={m.label} style={styles.macroItem}>
              <div style={{ fontSize: 20, fontWeight: 800, color: m.color }}>{m.val}<span style={{ fontSize: 12 }}>{m.unit}</span></div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PCOD Daily Must-Dos */}
      {pcod && diet.pcodFoods && (
        <div style={styles.pcodBanner}>
          <div style={{ fontWeight: 800, fontSize: 14, color: "#D4601F", marginBottom: 10 }}>💗 PCOD Daily Essentials — Do This Every Day</div>
          {diet.pcodFoods.mustEat.map(f => (
            <div key={f.food} style={styles.pcodItem}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{f.food}</div>
              <div style={{ fontSize: 12, color: "#9C2752" }}>{f.when} · {f.why}</div>
            </div>
          ))}
          <div style={{ marginTop: 14, fontWeight: 700, fontSize: 13, color: "#D4601F" }}>🚫 Avoid</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
            {diet.pcodFoods.avoid.map(a => (
              <span key={a} style={styles.avoidChip}>{a}</span>
            ))}
          </div>
        </div>
      )}

      {/* Meal Plan */}
      <div style={{ fontSize: 17, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 24 }}>🍛 Daily Meal Plan</div>
      {MEAL_ORDER.map(m => {
        const meal = diet[m.key];
        if (!meal) return null;
        return (
          <div key={m.key} style={styles.mealCard}>
            <div style={styles.mealHeader}>
              <span style={{ fontSize: 20 }}>{m.emoji}</span>
              <div>
                <div style={styles.mealLabel}>{m.time}</div>
                <div style={styles.mealName}>{m.label}</div>
              </div>
              {meal.kcal && (
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: accentColor }}>{meal.kcal}</div>
                  <div style={{ fontSize: 10, color: "#9CA3AF" }}>kcal</div>
                </div>
              )}
            </div>
            <div style={styles.mealDish}>{meal.name}</div>
            <div style={styles.mealItems}>{meal.items}</div>
            {meal.note && <div style={styles.mealNote}>💡 {meal.note}</div>}
            {(meal.protein || meal.carbs) && (
              <div style={styles.mealMacros}>
                {meal.protein && <span style={{ ...styles.macroPill, background: "#FFE0BD", color: "#D4691E" }}>P: {meal.protein}g</span>}
                {meal.carbs && <span style={{ ...styles.macroPill, background: "#F0F9FF", color: "#0EA5E9" }}>C: {meal.carbs}g</span>}
              </div>
            )}
          </div>
        );
      })}

      {/* Smart Swaps */}
      <div style={styles.sectionTitle}>🔄 Smart Maharashtrian Swaps</div>
      <button onClick={() => setShowSwaps(!showSwaps)} style={{ ...styles.swapToggle, borderColor: accentColor, color: accentColor }}>
        {showSwaps ? "Hide Swaps" : "Show Healthy Swaps ↓"}
      </button>
      {showSwaps && (
        <div>
          {SWAPS.map(s => (
            <div key={s.from} style={styles.swapCard}>
              <div style={styles.swapRow}>
                <div style={styles.swapFrom}>❌ {s.from}</div>
                <div style={{ color: "#9CA3AF", fontSize: 18 }}>→</div>
                <div style={styles.swapTo}>✅ {s.to}</div>
              </div>
              <div style={styles.swapSave}>{s.save}</div>
            </div>
          ))}
        </div>
      )}

      {/* Hydration */}
      <div style={styles.hydroCard}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>💧</div>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Hydration Goal</div>
        <div style={{ fontSize: 13, color: "#6B7280" }}>
          {plan.person.gender === "female" ? "3 litres" : "3.5 litres"} of water daily.
          Start every morning with 2 glasses of warm water. Chaas + sol kadhi count too!
        </div>
      </div>
    </div>
  );
}

const styles = {
  macroBanner: { background: "#fff", borderRadius: 16, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 16 },
  macroRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 },
  macroItem: { textAlign: "center", padding: "10px 0" },
  pcodBanner: { background: "#FFF3E0", border: "1px solid #FFE0BD", borderRadius: 16, padding: "18px 20px", marginBottom: 16 },
  pcodItem: { padding: "8px 0", borderBottom: "1px solid rgba(212,107,30,0.1)" },
  avoidChip: { background: "rgba(212,107,30,0.1)", color: "#D4601F", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 },
  sectionTitle: { fontSize: 17, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 28 },
  mealCard: { background: "#fff", borderRadius: 16, padding: "18px 20px", marginBottom: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  mealHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
  mealLabel: { fontSize: 11, color: "#9CA3AF", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 },
  mealName: { fontSize: 14, fontWeight: 800, color: "#111827" },
  mealDish: { fontSize: 16, fontWeight: 700, color: "#374151", marginBottom: 6 },
  mealItems: { fontSize: 13, color: "#6B7280", lineHeight: 1.6 },
  mealNote: { fontSize: 12, color: "#92400E", background: "#FFFBEB", padding: "6px 12px", borderRadius: 8, marginTop: 8, fontStyle: "italic" },
  mealMacros: { display: "flex", gap: 8, marginTop: 10 },
  macroPill: { fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 },
  swapToggle: { border: "2px solid", borderRadius: 30, padding: "10px 20px", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit", marginBottom: 12 },
  swapCard: { background: "#fff", borderRadius: 14, padding: "14px 18px", marginBottom: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" },
  swapRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" },
  swapFrom: { fontSize: 13, color: "#EF4444", fontWeight: 600 },
  swapTo: { fontSize: 13, color: "#D4691E", fontWeight: 600 },
  swapSave: { fontSize: 12, color: "#6B7280", fontStyle: "italic" },
  hydroCard: { background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", borderRadius: 16, padding: "20px", textAlign: "center", marginTop: 20 },
};
