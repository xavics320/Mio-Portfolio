import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * GeoBg — sfondo geometrico 3D fisso con Three.js.
 * Mesh poligonale wireframe animata, palette dark/lime coerente col portfolio.
 * Posizionato fixed z-index 0; tutto il contenuto va sopra con z-index > 0.
 */
export default function GeoBg() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── SCENE SETUP ─────────────────────────────────────────────────── */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0d0d0d, 1);
    el.appendChild(renderer.domElement);

    /* ── GEOMETRIA PRINCIPALE — icosaedro suddiviso ──────────────────── */
    // IcosahedronGeometry con detail=3 dà una mesh poligonale densa
    const geoMain = new THREE.IcosahedronGeometry(3.5, 3);
    const matWire = new THREE.MeshBasicMaterial({
      color: 0xc8ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const meshMain = new THREE.Mesh(geoMain, matWire);
    scene.add(meshMain);

    /* ── SECONDA MESH — più grande, ruota al contrario ───────────────── */
    const geoBack = new THREE.IcosahedronGeometry(5.5, 2);
    const matBack = new THREE.MeshBasicMaterial({
      color: 0xc8ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const meshBack = new THREE.Mesh(geoBack, matBack);
    scene.add(meshBack);

    /* ── PIANI PIATTI (triangoli grandi come nell'immagine) ──────────── */
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x1a1a0a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const planeEdgeMat = new THREE.LineBasicMaterial({
      color: 0xc8ff00,
      transparent: true,
      opacity: 0.35,
    });

    // Crea 10 triangoli grandi posizionati casualmente
    const triangles = [];
    for (let i = 0; i < 10; i++) {
      const triGeo = new THREE.BufferGeometry();
      const r = () => (Math.random() - 0.5) * 8;
      const vertices = new Float32Array([
        r(), r(), r(),
        r(), r(), r(),
        r(), r(), r(),
      ]);
      triGeo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      triGeo.computeVertexNormals();

      const face = new THREE.Mesh(triGeo, planeMat.clone());
      const edge = new THREE.LineLoop(triGeo, planeEdgeMat.clone());

      scene.add(face);
      scene.add(edge);
      triangles.push({ face, edge, speedX: (Math.random() - 0.5) * 0.002, speedY: (Math.random() - 0.5) * 0.002 });
    }

    /* ── MOUSE PARALLAX ──────────────────────────────────────────────── */
    const mouse = { x: 0, y: 0 };
    const onMouseMove = e => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── RESIZE ──────────────────────────────────────────────────────── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── ANIMATION LOOP ──────────────────────────────────────────────── */
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Rotazione lenta mesh principali
      meshMain.rotation.x = t * 0.04 + mouse.y * 0.15;
      meshMain.rotation.y = t * 0.06 + mouse.x * 0.15;

      meshBack.rotation.x = -t * 0.025;
      meshBack.rotation.y = -t * 0.035 + mouse.x * 0.08;

      // Triangoli: rotazione individuale lenta
      triangles.forEach(({ face, edge, speedX, speedY }) => {
        face.rotation.x += speedX;
        face.rotation.y += speedY;
        edge.rotation.x += speedX;
        edge.rotation.y += speedY;
      });

      // Camera segue il mouse leggermente
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    /* ── CLEANUP ─────────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
