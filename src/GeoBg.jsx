import { useEffect, useRef } from "react";

/*
  MODIFICA PRINCIPALE: rimosso l'import statico di Three.js
  
  PRIMA:
    import * as THREE from "three";
  
  Questo causava il problema — Vite includeva Three.js nel bundle
  principale che viene scaricato subito, bloccando il rendering
  iniziale della pagina (TBT alto, LCP lento).
  
  DOPO:
    nessun import in cima — Three.js viene caricato dinamicamente
    dentro useEffect, DOPO che React ha già renderizzato la pagina.
  
  Risultato atteso: FCP e LCP migliorano perché il browser mostra
  la pagina subito, poi carica Three.js in background.
*/

export default function GeoBg() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /*
      MODIFICA: rimosso il controllo duplicato.
      Era presente due volte (righe 13 e 17 del file originale).
      Una sola volta è sufficiente.
    */
    if (window.innerWidth < 768) return;

    /*
      DYNAMIC IMPORT — il cuore della ottimizzazione
      
      Cos'è: invece di caricare Three.js quando il file viene importato
      (comportamento statico), lo carichiamo qui, dentro useEffect,
      che viene eseguito DOPO il primo render di React.
      
      Il browser quindi:
      1. Scarica React e renderizza la pagina (FCP migliorato)
      2. Mostra hero, navbar, testo all'utente
      3. Solo DOPO inizia a scaricare Three.js in background
      4. Quando Three.js è pronto, monta il canvas 3D
      
      import("three") restituisce una Promise — usiamo .then()
      per eseguire tutto il codice Three.js quando il modulo è pronto.
      
      THREE qui è l'oggetto modulo — tutte le classi sono accessibili
      come THREE.Scene, THREE.Mesh, ecc. esattamente come prima.
    */
    import("three").then((THREE) => {

      /* ── SCENE SETUP ─────────────────────────────────────────────── */
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

      /* ── GEOMETRIA PRINCIPALE — icosaedro suddiviso ──────────────── */
      const geoMain = new THREE.IcosahedronGeometry(3.5, 3);
      const matWire = new THREE.MeshBasicMaterial({
        color: 0xc8ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.10,
      });
      const meshMain = new THREE.Mesh(geoMain, matWire);
      scene.add(meshMain);

      /* ── SECONDA MESH — più grande, ruota al contrario ───────────── */
      const geoBack = new THREE.IcosahedronGeometry(5.5, 2);
      const matBack = new THREE.MeshBasicMaterial({
        color: 0xc8ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.04,
      });
      const meshBack = new THREE.Mesh(geoBack, matBack);
      scene.add(meshBack);

      /* ── PIANI PIATTI ────────────────────────────────────────────── */
      const planeMat = new THREE.MeshBasicMaterial({
        color: 0x111100,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const planeEdgeMat = new THREE.LineBasicMaterial({
        color: 0xc8ff00,
        transparent: true,
        opacity: 0.18,
      });

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
        triangles.push({
          face,
          edge,
          speedX: (Math.random() - 0.5) * 0.002,
          speedY: (Math.random() - 0.5) * 0.002,
        });
      }

      /* ── MOUSE PARALLAX ──────────────────────────────────────────── */
      const mouse = { x: 0, y: 0 };
      const onMouseMove = e => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouseMove);

      /* ── RESIZE ──────────────────────────────────────────────────── */
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      /* ── ANIMATION LOOP ──────────────────────────────────────────── */
      let frameId;
      const clock = new THREE.Clock();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        meshMain.rotation.x = t * 0.04 + mouse.y * 0.15;
        meshMain.rotation.y = t * 0.06 + mouse.x * 0.15;

        meshBack.rotation.x = -t * 0.025;
        meshBack.rotation.y = -t * 0.035 + mouse.x * 0.08;

        triangles.forEach(({ face, edge, speedX, speedY }) => {
          face.rotation.x += speedX;
          face.rotation.y += speedY;
          edge.rotation.x += speedX;
          edge.rotation.y += speedY;
        });

        camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();

      /*
        CLEANUP — invariato nella logica ma ora dentro il .then()
        
        IMPORTANTE: il cleanup di useEffect viene eseguito quando
        il componente viene smontato. Dobbiamo salvare frameId,
        onMouseMove e onResize in variabili accessibili al cleanup.
        
        Poiché sono dentro il .then(), il cleanup di useEffect
        non può accedervi direttamente. Usiamo una variabile
        sull'elemento DOM come "ponte" tra i due scope.
      */
      el._threeCleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (el.contains(renderer.domElement)) {
          el.removeChild(renderer.domElement);
        }
      };

    }); // fine import("three").then()

    /*
      CLEANUP di useEffect
      
      Chiama la funzione di cleanup che Three.js ha salvato
      sull'elemento DOM. Se Three.js non è ancora stato caricato
      quando il componente viene smontato (es. navigazione rapida),
      el._threeCleanup potrebbe non esistere ancora — il controllo
      ?. (optional chaining) gestisce questo caso in sicurezza.
    */
    return () => {
      el._threeCleanup?.();
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
