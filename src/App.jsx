import { useState } from "react";
import Onboarding from "./components/Onboarding.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { generatePlan } from "./utils/generatePlan.js";
import "./index.css";

export default function App() {
  const [plan, setPlan] = useState(null);

  const handleComplete = (data) => {
    const generated = generatePlan(data);
    setPlan(generated);
  };

  const handleReset = () => setPlan(null);

  return plan
    ? <Dashboard plan={plan} onReset={handleReset} />
    : <Onboarding onComplete={handleComplete} />;
}
