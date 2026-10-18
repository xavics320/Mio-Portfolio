import { useState, useEffect } from "react";
import { ME } from "../../data/profile";
import "./LogoIntro.css";

// Mostrata solo alla prima visita. Lo script inline in index.html legge la
// stessa chiave e aggiunge .intro-seen a <html> prima del primo paint, così
// chi torna non vede nemmeno un frame dell'overlay.
const INTRO_KEY = "intro-seen";

export default function LogoIntro({ onDone }) {
  const [phase, setPhase] = useState("center");
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(INTRO_KEY) === "1";
      localStorage.setItem(INTRO_KEY, "1");
    } catch { /* storage bloccato: mostra l'intro */ }
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      onDone();
      return;
    }
    const t1 = setTimeout(() => setPhase("move"), 600);
    const t2 = setTimeout(() => { setPhase("done"); onDone(); }, 1150);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (phase === "done") return null;
  const moved = phase === "move";
  return (
    <div className={`logo-intro-overlay${moved ? " moved" : ""}`}>
      <span className={`logo-intro-text${moved ? " moved" : ""}`}>
        {ME.name}<span>.</span>
      </span>
    </div>
  );
}
