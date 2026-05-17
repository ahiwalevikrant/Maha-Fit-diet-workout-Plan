import { useState, useRef } from "react";
import WorkoutTab from "./WorkoutTab.jsx";
import DietTab from "./DietTab.jsx";
import { ProgressTab, TipsTab } from "./TipsTab.jsx";

const TABS = [
  { label: "Overview", emoji: "🏠" },
  { label: "Workout", emoji: "💪" },
  { label: "Diet", emoji: "🍛" },
  { label: "Progress", emoji: "📈" },
  { label: "Tips", emoji: "💡" },
];

export default function Dashboard({ plan, onReset }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activePerson, setActivePerson] = useState("user");
  const [isExporting, setIsExporting] = useState(false);
  const dashRef = useRef(null);
  const pdfContentRef = useRef(null);

  const { userPlan, partnerPlan, isCouple, generatedAt } = plan;
  const currentPlan = activePerson === "partner" && partnerPlan ? partnerPlan : userPlan;
  const accentColor = currentPlan.pcod ? "#D4601F" : "#D4691E";
  const accentLight = currentPlan.pcod ? "#FFF3E0" : "#FFE0BD";

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas");
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      let isFirstPage = true;
      
      // Capture hero section first
      const heroDiv = dashRef.current.querySelector("[style*='linear-gradient']");
      if (heroDiv && heroDiv.parentElement) {
        const canvas = await html2canvas(heroDiv.parentElement, { scale: 1.5, useCORS: true, backgroundColor: "#FAF7F0" });
        const imgData = canvas.toDataURL("image/png");
        const imgH = (canvas.height * pageW) / canvas.width;
        let y = 0;
        while (y < imgH) {
          if (!isFirstPage) pdf.addPage();
          isFirstPage = false;
          pdf.addImage(imgData, "PNG", 0, -y, pageW, imgH);
          y += pageH;
        }
      }
      
      // Capture all tabs
      for (let tabIndex = 0; tabIndex < TABS.length; tabIndex++) {
        const tabDiv = dashRef.current.querySelector(`[data-tab="${tabIndex}"]`);
        if (tabDiv) {
          const wrapper = document.createElement("div");
          wrapper.style.position = "fixed";
          wrapper.style.left = "-9999px";
          wrapper.style.top = "-9999px";
          wrapper.style.width = "800px";
          wrapper.style.background = "#FAF7F0";
          wrapper.style.padding = "24px 20px";
          wrapper.style.fontFamily = "system-ui, sans-serif";
          
          const header = document.createElement("div");
          header.style.fontSize = "24px";
          header.style.fontWeight = "900";
          header.style.color = "#D4691E";
          header.style.marginBottom = "20px";
          header.style.paddingBottom = "12px";
          header.style.borderBottom = "3px solid #FF9500";
          header.textContent = `${TABS[tabIndex].emoji} ${TABS[tabIndex].label}`;
          
          wrapper.appendChild(header);
          const clone = tabDiv.cloneNode(true);
          clone.style.display = "block";
          wrapper.appendChild(clone);
          document.body.appendChild(wrapper);
          
          const canvas = await html2canvas(wrapper, { scale: 1.5, useCORS: true, backgroundColor: "#FAF7F0", width: 800 });
          const imgData = canvas.toDataURL("image/png");
          const imgH = (canvas.height * pageW) / canvas.width;
          let y = 0;
          
          while (y < imgH) {
            if (!isFirstPage) pdf.addPage();
            isFirstPage = false;
            pdf.addImage(imgData, "PNG", 0, -y, pageW, imgH);
            y += pageH;
          }
          
          document.body.removeChild(wrapper);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      pdf.save(`MahaFit-${currentPlan.person.name || "plan"}-Plan.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={styles.wrap}>
      {isExporting && (
        <div style={styles.spinnerOverlay}>
          <div style={styles.spinnerContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.spinnerText}>Generating PDF...</p>
          </div>
        </div>
      )}
      <div style={styles.topBar}>
        <button onClick={onReset} style={styles.logoBtn}>🍃 MahaFit</button>
        <div style={styles.topRight}>
          {isCouple && (
            <div style={styles.personSwitch}>
              {[
                { id: "user", label: userPlan.person.name || "You" },
                { id: "partner", label: partnerPlan.person.name || "Partner" },
              ].map(p => (
                <button key={p.id} onClick={() => setActivePerson(p.id)}
                  style={{ ...styles.personBtn, ...(activePerson === p.id ? { ...styles.personBtnActive, background: accentColor } : {}) }}>
                  {p.label}
                </button>
              ))}
            </div>
          )}
          <button onClick={handleExportPDF} disabled={isExporting} style={{...styles.exportBtn, opacity: isExporting ? 0.6 : 1}}>↓ PDF</button>
        </div>
      </div>

      <div ref={dashRef}>
        <div style={styles.hero}>
          {currentPlan.pcod && <div style={styles.pcodBadge}>🌸 PCOD-Optimised Plan</div>}
          <h1 style={styles.heroName}>
            {currentPlan.person.name ? `${currentPlan.person.name}'s` : "Your"} <span style={{ color: "#F7C948" }}>3-Month</span> Plan
          </h1>
          <p style={styles.heroSub}>Generated {generatedAt} · Personalised Maharashtrian Plan</p>
          <div style={styles.heroStats}>
            {[
              { label: "Daily Calories", val: `${currentPlan.diet.kcal} kcal` },
              { label: "Protein Goal", val: `${currentPlan.diet.protein}g/day` },
              { label: "Weight Now", val: `${currentPlan.person.weight} kg` },
              { label: "3-Month Goal", val: currentPlan.progress.total },
            ].map(s => (
              <div key={s.label} style={styles.heroStat}>
                <div style={styles.heroStatVal}>{s.val}</div>
                <div style={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.tabBar}>
          {TABS.map((t, i) => (
            <button key={t.label} onClick={() => setActiveTab(i)}
              style={{ ...styles.tab, ...(activeTab === i ? { ...styles.tabActive, color: accentColor, borderBottomColor: accentColor } : {}) }}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <div style={styles.content}>
          <div data-tab="0" style={{display: activeTab === 0 ? 'block' : 'none'}}>
            <OverviewTab plan={currentPlan} accentColor={accentColor} accentLight={accentLight} />
          </div>
          <div data-tab="1" style={{display: activeTab === 1 ? 'block' : 'none'}}>
            <WorkoutTab plan={currentPlan} accentColor={accentColor} accentLight={accentLight} />
          </div>
          <div data-tab="2" style={{display: activeTab === 2 ? 'block' : 'none'}}>
            <DietTab plan={currentPlan} accentColor={accentColor} accentLight={accentLight} />
          </div>
          <div data-tab="3" style={{display: activeTab === 3 ? 'block' : 'none'}}>
            <ProgressTab plan={currentPlan} accentColor={accentColor} accentLight={accentLight} />
          </div>
          <div data-tab="4" style={{display: activeTab === 4 ? 'block' : 'none'}}>
            <TipsTab plan={currentPlan} accentColor={accentColor} accentLight={accentLight} />
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>🍃 MahaFit — Built for Maharashtrian families. Consult your doctor for PCOD & medical conditions.</p>
        <button onClick={onReset} style={styles.restartBtn}>← Build New Plan</button>
      </footer>
    </div>
  );
}

function OverviewTab({ plan, accentColor, accentLight }) {
  const { workoutPlan, diet, progress, pcod } = plan;
  return (
    <div>
      <div style={o.title}>📅 3-Month Roadmap</div>
      <div style={o.phaseRow}>
        {workoutPlan.phases.map(ph => (
          <div key={ph.month} style={{ ...o.phaseCard, borderTop: `4px solid ${ph.color}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ph.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Month {ph.month}</div>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{ph.title}</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>{ph.description}</div>
            <div style={{ fontSize: 11, color: "#374151", marginBottom: 6 }}>⏱ {ph.workoutDuration} · ⚡ {ph.intensity}</div>
            {ph.focus.map(f => <div key={f} style={{ fontSize: 12, color: "#374151", padding: "2px 0" }}>✓ {f}</div>)}
          </div>
        ))}
      </div>

      <div style={o.title}>📆 Weekly Schedule</div>
      <div style={o.weekGrid}>
        {workoutPlan.schedule.map(d => (
          <div key={d.day} style={{ ...o.dayCard, background: d.focus.includes("Rest") ? "#F9FAFB" : "#fff" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" }}>{d.day}</div>
            <div style={{ fontSize: 18, margin: "5px 0" }}>{d.emoji}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: d.color, lineHeight: 1.3 }}>{d.focus}</div>
          </div>
        ))}
      </div>

      <div style={o.title}>🍽️ Nutrition Targets</div>
      <div style={o.macroRow}>
        {[
          { label: "Calories", val: diet.kcal, unit: "kcal", color: "#FF6B35", bg: "#FFF3EE" },
          { label: "Protein", val: diet.protein, unit: "g", color: accentColor, bg: accentLight },
          { label: "Carbs", val: diet.carbs, unit: "g", color: "#0EA5E9", bg: "#F0F9FF" },
          { label: "Fats", val: diet.fats, unit: "g", color: "#7C3AED", bg: "#FAF5FF" },
        ].map(m => (
          <div key={m.label} style={{ ...o.macroCard, background: m.bg }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: m.color }}>{m.val}<span style={{ fontSize: 12 }}>{m.unit}</span></div>
            <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {pcod && plan.diet.pcodFoods && (
        <div style={o.pcodCard}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#D4601F", marginBottom: 12 }}>💗 PCOD Daily Essentials</div>
          {plan.diet.pcodFoods.mustEat.slice(0, 5).map(f => (
            <div key={f.food} style={{ padding: "8px 0", borderBottom: "1px solid rgba(194,24,91,0.1)" }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{f.food}</div>
              <div style={{ fontSize: 12, color: "#9C2752" }}>{f.when} · {f.why}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const o = {
  title: { fontSize: 17, fontWeight: 800, color: "#111827", marginBottom: 14, marginTop: 28 },
  phaseRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 },
  phaseCard: { background: "#fff", borderRadius: 16, padding: "18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  weekGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 },
  dayCard: { borderRadius: 10, padding: "10px 4px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
  macroRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 },
  macroCard: { borderRadius: 14, padding: "14px 10px", textAlign: "center" },
  pcodCard: { background: "#FFF3E0", border: "1px solid #FFE0BD", borderRadius: 16, padding: "18px", marginTop: 20 },
};

const styles = {
  wrap: { minHeight: "100vh", background: "#FAF7F0", fontFamily: "system-ui, sans-serif" },
  topBar: { background: "#fff", borderBottom: "2px solid #FF9500", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 },
  logoBtn: { background: "none", border: "none", fontWeight: 900, fontSize: 20, color: "#D4691E", cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: -0.5 },
  topRight: { display: "flex", alignItems: "center", gap: 10 },
  personSwitch: { display: "flex", background: "#FFF3E0", borderRadius: 30, padding: 3 },
  personBtn: { padding: "6px 14px", border: "none", borderRadius: 30, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#6B7280", background: "transparent" },
  personBtnActive: { color: "#fff" },
  exportBtn: { padding: "8px 16px", border: "2px solid #D4691E", borderRadius: 30, background: "transparent", color: "#D4691E", cursor: "pointer", fontWeight: 700, fontSize: 13 },
  hero: { background: "linear-gradient(135deg, #8B2E1F, #B8451C)", padding: "40px 24px 36px", textAlign: "center" },
  pcodBadge: { display: "inline-block", background: "rgba(255,149,0,0.2)", border: "1px solid rgba(255,149,0,0.4)", color: "#FF9500", padding: "5px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 16 },
  heroName: { fontSize: "clamp(22px,5vw,36px)", fontWeight: 900, color: "#FFE4BA", fontFamily: "Georgia, serif", marginBottom: 8, letterSpacing: -1 },
  heroSub: { fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 24 },
  heroStats: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" },
  heroStat: { background: "rgba(255,149,0,0.15)", border: "1px solid rgba(255,149,0,0.3)", borderRadius: 12, padding: "12px 16px", textAlign: "center" },
  heroStatVal: { fontSize: 15, fontWeight: 800, color: "#FFE4BA" },
  heroStatLabel: { fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 },
  tabBar: { background: "#fff", display: "flex", overflowX: "auto", borderBottom: "2px solid #FFE0BD", padding: "0 12px" },
  tab: { padding: "13px 12px", border: "none", borderBottom: "2px solid transparent", background: "transparent", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "#9CA3AF", whiteSpace: "nowrap", marginBottom: -2, fontFamily: "inherit" },
  tabActive: { fontWeight: 700 },
  content: { maxWidth: 800, margin: "0 auto", padding: "24px 20px 60px" },
  footer: { background: "linear-gradient(135deg, #8B2E1F, #6B1E14)", color: "rgba(255,255,255,0.6)", textAlign: "center", padding: "24px 20px", fontSize: 13 },
  restartBtn: { marginTop: 12, padding: "10px 24px", border: "1px solid rgba(255,149,0,0.3)", borderRadius: 30, background: "transparent", color: "rgba(255,149,0,0.8)", cursor: "pointer", fontSize: 13 },
  spinnerOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  spinnerContainer: { textAlign: "center", background: "#fff", padding: "40px", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" },
  spinner: { width: 50, height: 50, border: "4px solid #FFE0BD", borderTop: "4px solid #D4691E", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 1s linear infinite" },
  spinnerText: { fontSize: 14, fontWeight: 600, color: "#D4691E" },
};

// Add animation keyframes
if (typeof document !== 'undefined' && !document.querySelector('#spinner-style')) {
  const style = document.createElement('style');
  style.id = 'spinner-style';
  style.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}
