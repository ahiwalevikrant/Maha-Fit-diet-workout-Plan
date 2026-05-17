import { useState } from "react";

export function ProgressTab({ plan, accentColor, accentLight }) {
  const { progress, workoutPlan, pcod } = plan;
  const milestones = [
    { week: "Week 1–2", title: "Habit Formation", items: ["Walk every morning without fail", "Log what you eat (awareness only)", "Sleep before 11 PM", "Cut sugar in chai/coffee"] },
    { week: "Week 3–4", title: "First Results", items: ["1–1.5 kg visible weight loss", "More energy in mornings", "Waist feeling slightly looser", "Workouts feel easier"] },
    { week: "Month 2", title: "Visible Changes", items: ["Face and waist slimmer", "Muscle tone beginning to show", "Better stamina in skipping/walk", "Clothes fitting differently"] },
    { week: "Month 3", title: "Transformation Complete", items: ["5–7 kg total loss achieved", "Defined arms and leaner legs", pcod ? "Period more regular (PCOD)" : "Strong core and posture", "Consistent energy all day long"] },
  ];
  const measurements = ["Weight (kg)", "Waist (cm)", "Hips (cm)", "Chest (cm)", "Arms (cm)", "Thighs (cm)"];

  return (
    <div>
      <div style={s.title}>🎯 Expected Results Timeline</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
        {[
          { label: "Month 1", val: progress.month1, color: "#FF6B35" },
          { label: "Month 2", val: progress.month2, color: accentColor },
          { label: "Month 3", val: progress.month3, color: "#7C3AED" },
          { label: "Total Goal", val: progress.total, color: "#F59E0B" },
        ].map(r => (
          <div key={r.label} style={{ background: "#fff", borderRadius: 14, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: 4 }}>{r.label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: r.color }}>{r.val}</div>
          </div>
        ))}
      </div>

      <div style={s.title}>📅 Milestone Checklist</div>
      {milestones.map(m => (
        <div key={m.week} style={{ background: "#fff", borderRadius: 14, padding: "18px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accentColor, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{m.week}</div>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 10 }}>{m.title}</div>
          {m.items.map(item => (
            <div key={item} style={{ fontSize: 13, color: "#374151", padding: "4px 0", display: "flex", gap: 8 }}>
              <span style={{ color: accentColor }}>✓</span>{item}
            </div>
          ))}
        </div>
      ))}

      <div style={s.title}>📏 Measurement Tracker</div>
      <div style={{ background: "#fff", borderRadius: 16, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", overflowX: "auto" }}>
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Measure every <strong>2 weeks</strong>, same time, morning before eating.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, minWidth: 400 }}>
          {["Start", "Week 4", "Week 8", "Week 12"].map(period => (
            <div key={period}>
              <div style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{period}</div>
              {measurements.map(m => (
                <div key={m} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{m}</div>
                  <div style={{ fontWeight: 700, color: "#D1D5DB", fontSize: 13 }}>___</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pcod && (
        <div style={{ background: "#FFF3E0", border: "1px solid #FFE0BD", borderRadius: 16, padding: "20px", marginTop: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: "#D4601F", marginBottom: 10 }}>💗 PCOD Symptom Tracker</div>
          {["Period regularity improving?", "Facial hair growth slowing?", "Skin / acne improving?", "Energy levels higher?", "Mood more stable?", "Cramps less severe?"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(194,24,91,0.1)", fontSize: 13 }}>
              <span>🌸</span>{item}
            </div>
          ))}
          <div style={{ fontSize: 12, color: "#9C2752", marginTop: 10, fontStyle: "italic" }}>
            PCOD symptoms typically improve after 6–8 weeks of consistent healthy habits. Please consult your gynaecologist.
          </div>
        </div>
      )}
    </div>
  );
}

export function TipsTab({ plan, accentColor, accentLight }) {
  const { tips, pcod } = plan;
  const goldenRules = [
    { emoji: "🌅", rule: "Morning walk is non-negotiable", detail: "Even on rest days. Walk is therapy + fat burning." },
    { emoji: "🍽️", rule: "Eat every 3–4 hours", detail: "Skipping meals kills metabolism and leads to overeating." },
    { emoji: "💧", rule: "Water before every meal", detail: "1 glass before eating naturally reduces how much you eat." },
    { emoji: "📵", rule: "No phone while eating", detail: "Mindful eating = better digestion + 20% less overeating." },
    { emoji: "⚖️", rule: "Weigh once per week only", detail: "Daily weighing creates anxiety. Every Tuesday morning." },
    { emoji: "🌙", rule: "Kitchen closed by 9 PM", detail: "Whatever you eat after 9 PM tends to be stored as fat." },
    { emoji: "🤝", rule: "Partner accountability", detail: "Do the walk together. Couples who train together, sustain." },
    { emoji: "📸", rule: "Take progress photos", detail: "Every 2 weeks. Scale lies sometimes. Mirror doesn't." },
  ];

  const drinks = [
    { name: "Jeera + Ajwain Water", when: "Morning", benefit: "Digestive + metabolism booster", recipe: "Boil 1 tsp jeera + ½ tsp ajwain in 2 cups water. Drink warm." },
    { name: "Sol Kadhi (Kokam)", when: "With Lunch", benefit: "Anti-inflammatory, cooling, digestion aid", recipe: "Kokam + thin coconut milk + garlic + green chilli. No sugar." },
    { name: "Haldi Milk", when: "Before Bed", benefit: "Anti-inflammatory, sleep aid, recovery", recipe: "Warm milk + ¼ tsp haldi + pinch pepper + ½ tsp ghee." },
    { name: "Chaas (Buttermilk)", when: "Post Lunch", benefit: "Probiotic, hydration, gut health", recipe: "Curd + water + jeera + rock salt + fresh coriander. Never add sugar." },
    ...(pcod ? [{ name: "Methi Kadha", when: "Morning (PCOD)", benefit: "Blood sugar control, hormone balance", recipe: "Boil 1 tsp soaked methi seeds in water for 5 min. Drink warm." }] : []),
  ];

  return (
    <div>
      <div style={s.title}>💡 Your Personalised Tips</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {tips.map(t => (
          <div key={t.title} style={{ background: "#fff", borderRadius: 16, padding: "18px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", borderTop: `3px solid ${accentColor}` }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{t.emoji}</div>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{t.title}</div>
            <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{t.body}</div>
          </div>
        ))}
      </div>

      <div style={s.title}>🏆 Golden Rules</div>
      {goldenRules.map((r, i) => (
        <div key={r.rule} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", marginBottom: 8 }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 12, width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: accentColor }}>{i + 1}</div>
          <div style={{ fontSize: 20 }}>{r.emoji}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{r.rule}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{r.detail}</div>
          </div>
        </div>
      ))}

      <div style={s.title}>🍵 Maharashtrian Wellness Drinks</div>
      {drinks.map(d => (
        <div key={d.name} style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{d.name}</div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 20, background: accentLight, color: accentColor }}>{d.when}</span>
          </div>
          <div style={{ fontSize: 12, color: "#D4691E", fontWeight: 600, marginBottom: 4 }}>✓ {d.benefit}</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>📋 {d.recipe}</div>
        </div>
      ))}
    </div>
  );
}

const s = {
  title: { fontSize: 17, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 28 },
};

export default TipsTab;
