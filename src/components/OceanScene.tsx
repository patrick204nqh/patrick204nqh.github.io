import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function OceanScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const scene = new THREE.Scene();

    const sizes = { w: container.clientWidth, h: container.clientHeight };
    const camera = new THREE.PerspectiveCamera(50, sizes.w / sizes.h, 0.1, 60);
    camera.position.set(1, 3.5, 6);
    camera.lookAt(0.5, 0, 1);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(sizes.w, sizes.h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;

    /* Ocean */
    const oceanGeo = new THREE.PlaneGeometry(24, 24, 100, 100);
    oceanGeo.rotateX(-Math.PI / 2);
    const oceanMat = new THREE.MeshPhysicalMaterial({
      color: 0x020414, transparent: true, opacity: 0.8,
      roughness: 0.1, metalness: 0.4, clearcoat: 0.4, side: THREE.DoubleSide,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    scene.add(ocean);

    /* Lights */
    scene.add(new THREE.AmbientLight(0x446688, 0.5));
    const dirLight = new THREE.DirectionalLight(0xaaccff, 1.0);
    dirLight.position.set(3, 6, 4);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0x4488cc, 0.4);
    fillLight.position.set(-3, 2, 5);
    scene.add(fillLight);

    scene.fog = new THREE.FogExp2(0x0b0e17, 0.035);

    /* Sailboat */
    const boat = new THREE.Group();
    const hullMat = new THREE.MeshPhysicalMaterial({ color: 0x1a1a1a, roughness: 0.5, metalness: 0.3 });
    boat.add(new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.25, 0.8), hullMat)).position.y = -0.05;
    boat.add(new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 0.72), hullMat)).position.y = 0.08;
    const bow = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.5, 4), hullMat);
    bow.rotation.x = Math.PI / 2; bow.position.set(1.15, -0.05, 0);
    boat.add(bow);
    const cabinMat = new THREE.MeshPhysicalMaterial({ color: 0x2a2a2a, roughness: 0.6 });
    boat.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), cabinMat)).position.set(-0.4, 0.2, 0);

    const mastMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.7 });
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.0, 6), mastMat);
    mast.position.set(0.2, 1.0, 0); mast.rotation.z = 0.05;
    boat.add(mast);

    const sailMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0f0f0, roughness: 0.95, side: THREE.DoubleSide, transparent: true, opacity: 0.9,
    });
    const sail = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.6), sailMat);
    sail.position.set(0.7, 0.8, 0); sail.rotation.y = -0.4; sail.rotation.x = 0.1;
    boat.add(sail);

    const jibMat = new THREE.MeshPhysicalMaterial({
      color: 0xe8e8e8, roughness: 0.95, side: THREE.DoubleSide, transparent: true, opacity: 0.85,
    });
    const jib = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.2), jibMat);
    jib.position.set(1.1, 0.6, 0); jib.rotation.y = -0.3; jib.rotation.x = 0.08;
    boat.add(jib);

    boat.position.set(0.5, 0, 2.5);
    boat.scale.set(0.8, 0.8, 0.8);
    scene.add(boat);

    /* Stars */
    const starCount = 400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 60;
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.6 }));
    stars.position.y = 10;
    scene.add(stars);

    /* Wave data */
    const posAttr = oceanGeo.attributes.position;
    const waveData: { x: number; z: number; speed: number; amp: number; phase: number }[] = [];
    const v = new THREE.Vector3();
    for (let i = 0; i < posAttr.count; i++) {
      v.fromBufferAttribute(posAttr, i);
      waveData.push({ x: v.x, z: v.z, speed: 0.5 + Math.random() * 0.5, amp: 0.08 + Math.random() * 0.12, phase: Math.random() * Math.PI * 2 });
    }

    let animId: number;
    function animate(time: number) {
      const t = time / 1000;
      for (let i = 0; i < posAttr.count; i++) {
        const w = waveData[i];
        const y = Math.sin(w.x * 0.8 + t * w.speed + w.phase) * w.amp + Math.cos(w.z * 0.6 + t * 0.7 + w.phase) * w.amp * 0.6;
        posAttr.setZ(i, y);
      }
      posAttr.needsUpdate = true;
      oceanGeo.computeVertexNormals();

      boat.position.y = Math.sin(t * 0.8) * 0.06;
      boat.rotation.z = Math.sin(t * 0.5) * 0.03;
      boat.rotation.x = Math.sin(t * 0.4 + 1) * 0.02;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    /* Resize */
    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      camera.lookAt(0.5, 0, 1);
    }
    window.addEventListener('resize', onResize, { passive: true });

    /* Scroll fade */
    function onScroll() {
      const hero = document.getElementById('hero');
      const h = hero ? hero.offsetHeight : window.innerHeight;
      const p = Math.min((window.scrollY || window.pageYOffset) / (h * 0.6), 1);
      if (container) container.style.opacity = String(1 - p);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 h-screen z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
