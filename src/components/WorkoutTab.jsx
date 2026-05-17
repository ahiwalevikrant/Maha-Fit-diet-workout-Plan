import { useState } from "react";

export default function WorkoutTab({ plan, accentColor, accentLight }) {
  const { workoutPlan, pcod } = plan;
  const [openSection, setOpenSection] = useState("cardio");

  const sections = [
    { id: "cardio", label: "Cardio", emoji: "🔥", exercises: workoutPlan.cardio },
    { id: "upper", label: "Upper Body", emoji: "💪", exercises: workoutPlan.upper },
    { id: "lower", label: "Lower Body", emoji: "🦵", exercises: workoutPlan.lower },
    { id: "core", label: "Core", emoji: "⚡", exercises: workoutPlan.core },
    { id: "yoga", label: pcod ? "Yoga (PCOD)" : "Yoga & Stretch", emoji: "🧘", exercises: workoutPlan.yoga },
  ];

  return (
    <div>
      {/* Equipment banner */}
      <div style={styles.equipBanner}>
        <div style={styles.equipTitle}>Your Equipment</div>
        <div style={styles.equipChips}>
          {plan.workoutPlan.equipment?.map(e => (
            <span key={e} style={styles.equipChip}>{
              e === "rope" ? "🪢 Skipping Rope" :
              e === "bands" ? "🟡 Resistance Bands" :
              e === "mat" ? "🧘 Yoga Mat" :
              e === "dumbbells" ? "🏋️ Dumbbells" :
              e === "none" ? "🤲 No Equipment" : e
            }</span>
          ))}
        </div>
      </div>

      {/* Weekly Schedule mini */}
      <div style={styles.sectionTitle}>📅 Weekly Plan</div>
      <div style={styles.weekMini}>
        {workoutPlan.schedule.map(d => (
          <div key={d.day} style={{ ...styles.weekDay, borderLeft: `3px solid ${d.color}` }}>
            <span style={{ fontWeight: 700, width: 32, color: "#374151" }}>{d.day}</span>
            <span style={{ fontSize: 16 }}>{d.emoji}</span>
            <span style={{ fontSize: 13, color: "#374151" }}>{d.focus}</span>
          </div>
        ))}
      </div>

      {/* Exercise Sections - Accordion */}
      <div style={styles.sectionTitle}>🏋️ Exercises</div>
      {sections.map(sec => (
        <div key={sec.id} style={styles.accordion}>
          <button onClick={() => setOpenSection(openSection === sec.id ? null : sec.id)}
            style={{ ...styles.accordionHeader, ...(openSection === sec.id ? { background: accentLight } : {}) }}>
            <span style={{ fontSize: 20 }}>{sec.emoji}</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{sec.label}</span>
            <span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: "auto" }}>{sec.exercises.length} exercises</span>
            <span style={{ fontSize: 18, color: accentColor, marginLeft: 8 }}>{openSection === sec.id ? "−" : "+"}</span>
          </button>
          {openSection === sec.id && (
            <div style={styles.accordionBody}>
              {sec.exercises.map((ex, i) => (
                <div key={i} style={styles.exRow}>
                  <div style={styles.exNum}>{i + 1}</div>
                  <div style={styles.exInfo}>
                    <div style={styles.exName}>{ex.name}</div>
                    {ex.muscle && <div style={styles.exMuscle}>{ex.muscle}</div>}
                    {ex.note && <div style={styles.exNote}>💡 {ex.note}</div>}
                  </div>
                  <div style={{ ...styles.exSets, color: accentColor, background: accentLight }}>
                    {ex.sets}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Monthly Progression */}
      <div style={styles.sectionTitle}>📈 Monthly Progression</div>
      {workoutPlan.phases.map(ph => (
        <div key={ph.month} style={styles.phaseCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ ...styles.phaseBadge, background: ph.color }}>Month {ph.month}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{ph.title}</div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>{ph.description}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span style={styles.phaseStat}>⏱ {ph.workoutDuration}</span>
            <span style={styles.phaseStat}>🔥 {ph.intensity}</span>
            <span style={styles.phaseStat}>🪢 {ph.skipSets}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  equipBanner: { background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 14, padding: "16px 20px", marginBottom: 8 },
  equipTitle: { fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  equipChips: { display: "flex", gap: 8, flexWrap: "wrap" },
  equipChip: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 600 },
  sectionTitle: { fontSize: 17, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 28 },
  weekMini: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 },
  weekDay: { display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 10, padding: "10px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
  accordion: { marginBottom: 10, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  accordionHeader: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", border: "none", background: "#fff", cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "background 0.2s" },
  accordionBody: { background: "#fff", padding: "4px 20px 16px" },
  exRow: { display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: "1px solid #F3F4F6" },
  exNum: { width: 24, height: 24, borderRadius: "50%", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#6B7280", flexShrink: 0, marginTop: 2 },
  exInfo: { flex: 1 },
  exName: { fontWeight: 600, fontSize: 14, color: "#111827" },
  exMuscle: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  exNote: { fontSize: 12, color: "#6B7280", marginTop: 4, fontStyle: "italic" },
  exSets: { fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 },
  phaseCard: { background: "#fff", borderRadius: 14, padding: "18px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  phaseBadge: { color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap" },
  phaseStat: { fontSize: 12, background: "#F3F4F6", padding: "5px 12px", borderRadius: 20, fontWeight: 600 },
};
