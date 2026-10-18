import { useEffect, useRef } from "react";
import "./CodeBg.css";

/*
  Sfondo "editor": griglia sottile + bagliore lime, tutto in CSS (vedi
  CodeBg.css). Il JS serve solo a passare la posizione del
  mouse alle variabili --mx/--my per il riflettore che illumina la
  griglia — niente canvas, niente librerie.
*/
export default function CodeBg() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    // Solo con un mouse vero: su touch il riflettore non ha senso
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = e => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        el.classList.add("code-bg--active");
        frame = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="code-bg" aria-hidden="true">
      <div className="code-bg__grid" />
      <div className="code-bg__spot" />
    </div>
  );
}
