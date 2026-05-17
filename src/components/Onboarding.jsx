import { useState } from "react";

const STEPS = [
  "who",       // single / couple
  "profile",   // name, age, weight, height, gender
  "partner",   // partner info (if couple)
  "equipment", // equipment available
  "conditions",// health conditions
  "goal",      // weight loss goal
  "timing",    // workout timing
];

const conditionOptions = [
  { id: "pcod", label: "PCOD / PCOS", emoji: "🌸", gender: "female" },
  { id: "thyroid", label: "Thyroid", emoji: "🦋", gender: "both" },
  { id: "diabetes", label: "Pre-diabetes / Diabetes", emoji: "🩸", gender: "both" },
  { id: "bp", label: "High BP", emoji: "❤️", gender: "both" },
  { id: "knee", label: "Knee / Joint Pain", emoji: "🦵", gender: "both" },
  { id: "back", label: "Back Pain", emoji: "🔵", gender: "both" },
  { id: "none", label: "None", emoji: "✅", gender: "both" },
];

const equipmentOptions = [
  { id: "rope", label: "Skipping Rope", emoji: "🪢" },
  { id: "bands", label: "Resistance Bands", emoji: "🟡" },
  { id: "mat", label: "Yoga Mat", emoji: "🧘" },
  { id: "dumbbells", label: "Dumbbells", emoji: "🏋️" },
  { id: "none", label: "No Equipment", emoji: "🤲" },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    mode: "",
    user: { name: "", age: "", weight: "", height: "", gender: "male", conditions: [], goal: "loss-muscle" },
    partner: { name: "", age: "", weight: "", height: "", gender: "female", conditions: [], goal: "loss-muscle" },
    equipment: [],
    workoutTime: "morning",
    duration: "3months",
  });

  const update = (key, val) => setData(prev => ({ ...prev, [key]: val }));
  const updateUser = (field, val) => setData(prev => ({ ...prev, user: { ...prev.user, [field]: val } }));
  const updatePartner = (field, val) => setData(prev => ({ ...prev, partner: { ...prev.partner, [field]: val } }));

  const toggleEquipment = (id) => {
    const eq = data.equipment;
    if (id === "none") { update("equipment", ["none"]); return; }
    const filtered = eq.filter(e => e !== "none");
    if (filtered.includes(id)) update("equipment", filtered.filter(e => e !== id));
    else update("equipment", [...filtered, id]);
  };

  const toggleCondition = (who, id) => {
    const fn = who === "user" ? updateUser : updatePartner;
    const current = who === "user" ? data.user.conditions : data.partner.conditions;
    if (id === "none") { fn("conditions", ["none"]); return; }
    const filtered = current.filter(c => c !== "none");
    if (filtered.includes(id)) fn("conditions", filtered.filter(c => c !== id));
    else fn("conditions", [...filtered, id]);
  };

  const steps = ["who", "profile", ...(data.mode === "couple" ? ["partner"] : []), "equipment", "conditions", "goal"];
  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const canNext = () => {
    if (currentStep === "who") return data.mode !== "";
    if (currentStep === "profile") return data.user.name && data.user.age && data.user.weight;
    if (currentStep === "partner") return data.partner.name && data.partner.age && data.partner.weight;
    if (currentStep === "equipment") return data.equipment.length > 0;
    if (currentStep === "conditions") return data.user.conditions.length > 0;
    if (currentStep === "goal") return true;
    return true;
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else onComplete(data);
  };

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>🍃 MahaFit</div>
        <div style={styles.progressWrap}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
        <div style={styles.stepCount}>{step + 1} of {steps.length}</div>
      </div>

      <div style={styles.content}>
        {/* STEP: WHO */}
        {currentStep === "who" && (
          <div style={styles.step}>
            <div style={styles.emoji}>👤</div>
            <h2 style={styles.title}>Who's this plan for?</h2>
            <p style={styles.sub}>No sign-up. No account. Just your plan.</p>
            <div style={styles.cards}>
              {[
                { id: "single", emoji: "🧍", label: "Just Me", desc: "Personal plan for one person" },
                { id: "couple", emoji: "👫", label: "Me & My Partner", desc: "Combined plan for two people" },
              ].map(opt => (
                <button key={opt.id} onClick={() => update("mode", opt.id)} style={{ ...styles.optCard, ...(data.mode === opt.id ? styles.optCardActive : {}) }}>
                  <span style={styles.optEmoji}>{opt.emoji}</span>
                  <span style={styles.optLabel}>{opt.label}</span>
                  <span style={styles.optDesc}>{opt.desc}</span>
                  {data.mode === opt.id && <span style={styles.check}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP: PROFILE */}
        {currentStep === "profile" && (
          <div style={styles.step}>
            <div style={styles.emoji}>📋</div>
            <h2 style={styles.title}>Tell us about yourself</h2>
            <p style={styles.sub}>Your numbers help us personalise everything.</p>

            <div style={styles.genderRow}>
              {["male", "female"].map(g => (
                <button key={g} onClick={() => updateUser("gender", g)}
                  style={{ ...styles.genderBtn, ...(data.user.gender === g ? styles.genderActive : {}) }}>
                  {g === "male" ? "♂ Male" : "♀ Female"}
                </button>
              ))}
            </div>

            {[
              { label: "Your Name", key: "name", type: "text", placeholder: "e.g. Rahul" },
              { label: "Age", key: "age", type: "number", placeholder: "e.g. 29" },
              { label: "Current Weight (kg)", key: "weight", type: "number", placeholder: "e.g. 81" },
              { label: "Height (cm)", key: "height", type: "number", placeholder: "e.g. 172" },
            ].map(f => (
              <div key={f.key} style={styles.fieldWrap}>
                <label style={styles.label}>{f.label}</label>
                <input style={styles.input} type={f.type} placeholder={f.placeholder}
                  value={data.user[f.key]} onChange={e => updateUser(f.key, e.target.value)} />
              </div>
            ))}
          </div>
        )}

        {/* STEP: PARTNER */}
        {currentStep === "partner" && (
          <div style={styles.step}>
            <div style={styles.emoji}>💑</div>
            <h2 style={styles.title}>Partner's details</h2>
            <p style={styles.sub}>We'll build a customised plan for them too.</p>

            <div style={styles.genderRow}>
              {["male", "female"].map(g => (
                <button key={g} onClick={() => updatePartner("gender", g)}
                  style={{ ...styles.genderBtn, ...(data.partner.gender === g ? styles.genderActive : {}) }}>
                  {g === "male" ? "♂ Male" : "♀ Female"}
                </button>
              ))}
            </div>

            {[
              { label: "Partner's Name", key: "name", type: "text", placeholder: "e.g. Priya" },
              { label: "Age", key: "age", type: "number", placeholder: "e.g. 27" },
              { label: "Current Weight (kg)", key: "weight", type: "number", placeholder: "e.g. 68" },
              { label: "Height (cm)", key: "height", type: "number", placeholder: "e.g. 160" },
            ].map(f => (
              <div key={f.key} style={styles.fieldWrap}>
                <label style={styles.label}>{f.label}</label>
                <input style={styles.input} type={f.type} placeholder={f.placeholder}
                  value={data.partner[f.key]} onChange={e => updatePartner(f.key, e.target.value)} />
              </div>
            ))}
          </div>
        )}

        {/* STEP: EQUIPMENT */}
        {currentStep === "equipment" && (
          <div style={styles.step}>
            <div style={styles.emoji}>🏋️</div>
            <h2 style={styles.title}>What equipment do you have?</h2>
            <p style={styles.sub}>Select all that apply. We'll build around what you have.</p>
            <div style={styles.chipGrid}>
              {equipmentOptions.map(opt => (
                <button key={opt.id} onClick={() => toggleEquipment(opt.id)}
                  style={{ ...styles.chip, ...(data.equipment.includes(opt.id) ? styles.chipActive : {}) }}>
                  <span style={{ fontSize: 22 }}>{opt.emoji}</span>
                  <span>{opt.label}</span>
                  {data.equipment.includes(opt.id) && <span style={styles.chipCheck}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP: CONDITIONS */}
        {currentStep === "conditions" && (
          <div style={styles.step}>
            <div style={styles.emoji}>🩺</div>
            <h2 style={styles.title}>Any health conditions?</h2>
            <p style={styles.sub}>This helps us tailor safe, effective workouts and diet.</p>

            {data.mode === "couple" && (
              <div style={styles.sectionLabel}>For {data.user.name || "You"}</div>
            )}
            <div style={styles.chipGrid}>
              {conditionOptions
                .filter(c => c.gender === "both" || c.gender === data.user.gender)
                .map(opt => (
                  <button key={opt.id} onClick={() => toggleCondition("user", opt.id)}
                    style={{ ...styles.chip, ...(data.user.conditions.includes(opt.id) ? styles.chipActive : {}) }}>
                    <span style={{ fontSize: 22 }}>{opt.emoji}</span>
                    <span>{opt.label}</span>
                    {data.user.conditions.includes(opt.id) && <span style={styles.chipCheck}>✓</span>}
                  </button>
                ))}
            </div>

            {data.mode === "couple" && (
              <>
                <div style={{ ...styles.sectionLabel, marginTop: 24 }}>For {data.partner.name || "Partner"}</div>
                <div style={styles.chipGrid}>
                  {conditionOptions
                    .filter(c => c.gender === "both" || c.gender === data.partner.gender)
                    .map(opt => (
                      <button key={opt.id} onClick={() => toggleCondition("partner", opt.id)}
                        style={{ ...styles.chip, ...(data.partner.conditions.includes(opt.id) ? { ...styles.chipActive, borderColor: "#D4601F", background: "#FFF3E0" } : {}) }}>
                        <span style={{ fontSize: 22 }}>{opt.emoji}</span>
                        <span>{opt.label}</span>
                        {data.partner.conditions.includes(opt.id) && <span style={styles.chipCheck}>✓</span>}
                      </button>
                    ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP: GOAL */}
        {currentStep === "goal" && (
          <div style={styles.step}>
            <div style={styles.emoji}>🎯</div>
            <h2 style={styles.title}>What's your primary goal?</h2>
            <p style={styles.sub}>In the next 3 months, I want to…</p>
            <div style={styles.cards}>
              {[
                { id: "loss-muscle", emoji: "💪", label: "Lose Fat + Build Muscle", desc: "Transform body composition. Most popular." },
                { id: "loss", emoji: "⚖️", label: "Lose Weight (Focus)", desc: "Pure weight loss, max calorie deficit." },
                { id: "maintain-tone", emoji: "✨", label: "Tone & Maintain", desc: "Already good weight, want to look fit." },
              ].map(opt => (
                <button key={opt.id} onClick={() => { updateUser("goal", opt.id); if (data.mode === "couple") updatePartner("goal", opt.id); }}
                  style={{ ...styles.optCard, ...(data.user.goal === opt.id ? styles.optCardActive : {}) }}>
                  <span style={styles.optEmoji}>{opt.emoji}</span>
                  <span style={styles.optLabel}>{opt.label}</span>
                  <span style={styles.optDesc}>{opt.desc}</span>
                  {data.user.goal === opt.id && <span style={styles.check}>✓</span>}
                </button>
              ))}
            </div>

            <div style={styles.fieldWrap}>
              <label style={styles.label}>Preferred Workout Time</label>
              <div style={styles.genderRow}>
                {[{ id: "morning", label: "🌅 Morning" }, { id: "evening", label: "🌇 Evening" }, { id: "both", label: "⏰ Both" }].map(t => (
                  <button key={t.id} onClick={() => update("workoutTime", t.id)}
                    style={{ ...styles.genderBtn, ...(data.workoutTime === t.id ? styles.genderActive : {}) }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div style={styles.navRow}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={styles.backBtn}>← Back</button>
          )}
          <button onClick={handleNext} disabled={!canNext()}
            style={{ ...styles.nextBtn, ...(canNext() ? {} : styles.nextBtnDisabled) }}>
            {step === steps.length - 1 ? "Generate My Plan 🚀" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrap: { minHeight: "100vh", background: "#FAF7F0", display: "flex", flexDirection: "column" },
  header: { background: "#fff", borderBottom: "2px solid #FF9500", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 10 },
  logo: { fontWeight: 900, fontSize: 20, color: "#D4691E", fontFamily: "'Georgia', serif", whiteSpace: "nowrap", letterSpacing: -0.5 },
  progressWrap: { flex: 1, height: 6, background: "#F0F0F0", borderRadius: 20, overflow: "hidden" },
  progressBar: { height: "100%", background: "linear-gradient(90deg, #D4691E, #FF9500)", borderRadius: 20, transition: "width 0.4s ease" },
  stepCount: { fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" },
  content: { flex: 1, maxWidth: 540, margin: "0 auto", padding: "32px 24px", width: "100%" },
  step: { marginBottom: 24 },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 8, fontFamily: "'Georgia', serif", lineHeight: 1.2 },
  sub: { fontSize: 15, color: "#6B7280", marginBottom: 28 },
  cards: { display: "flex", flexDirection: "column", gap: 12 },
  optCard: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4, padding: "20px", border: "2px solid #E5E7EB", borderRadius: 16, background: "#fff", cursor: "pointer", textAlign: "left", position: "relative", transition: "all 0.2s" },
  optCardActive: { border: "2px solid #D4691E", background: "#FFE0BD" },
  optEmoji: { fontSize: 28, marginBottom: 4 },
  optLabel: { fontSize: 16, fontWeight: 700, color: "#111827" },
  optDesc: { fontSize: 13, color: "#6B7280" },
  check: { position: "absolute", top: 16, right: 16, background: "#D4691E", color: "#fff", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 },
  genderRow: { display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" },
  genderBtn: { padding: "10px 20px", border: "2px solid #E5E7EB", borderRadius: 30, background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151", transition: "all 0.2s" },
  genderActive: { border: "2px solid #D4691E", background: "#FFE0BD", color: "#D4691E" },
  fieldWrap: { marginBottom: 20 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" },
  input: { width: "100%", padding: "14px 16px", border: "2px solid #E5E7EB", borderRadius: 12, fontSize: 16, outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s", color: "#111827", background: "#fff" },
  chipGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 },
  chip: { display: "flex", alignItems: "center", gap: 10, padding: "14px", border: "2px solid #E5E7EB", borderRadius: 14, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#374151", position: "relative", transition: "all 0.2s", textAlign: "left" },
  chipActive: { border: "2px solid #D4691E", background: "#FFE0BD", color: "#D4691E" },
  chipCheck: { marginLeft: "auto", background: "#D4691E", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 },
  sectionLabel: { fontSize: 12, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 },
  navRow: { display: "flex", gap: 12, marginTop: 12 },
  backBtn: { padding: "14px 24px", border: "2px solid #E5E7EB", borderRadius: 12, background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 15, color: "#374151", fontFamily: "inherit" },
  nextBtn: { flex: 1, padding: "14px 24px", border: "none", borderRadius: 12, background: "#D4691E", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 16, fontFamily: "inherit", transition: "all 0.2s" },
  nextBtnDisabled: { background: "#D1D5DB", cursor: "not-allowed" },
};
