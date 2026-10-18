import { useEffect, useRef } from "react";

/**
 * Aggiunge la classe "visible" all'elemento quando entra nel viewport,
 * attivando l'animazione .fade-section definita in styles/global.css.
 * Si scollega dopo la prima comparsa: l'animazione parte una sola volta.
 */
export function useFadeIn(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
