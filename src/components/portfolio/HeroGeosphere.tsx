import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero 3D scene — tech skill geosphere inspired by the user's reference.
 * A faceted solid core sits inside a glowing wireframe icosphere,
 * with orbiting tech labels and floating dot nodes.
 */
export function HeroGeosphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Solid core
    const coreGeo = new THREE.IcosahedronGeometry(1.65, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      metalness: 0.2,
      roughness: 0.25,
      transmission: 0.25,
      thickness: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.25,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Wireframe cage (outer geodesic sphere)
    const wireGeo = new THREE.IcosahedronGeometry(2.45, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff4ecd,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    // Outer thin ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.75, 0.015, 16, 128),
      new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.45 }),
    );
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    // Glowing node dots on the wireframe
    const nodeCount = 24;
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 2.45;
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.85 }),
      );
      m.position.set(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi));
      m.userData = { basePos: m.position.clone(), phase: i * 0.5 };
      nodeGroup.add(m);
      nodes.push(m);
    }

    // Orbiting labels (HTML overlays positioned via projectors)
    const labels: { el: HTMLDivElement; theta: number; phi: number; speed: number; r: number }[] = [];
    const techs = [
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#68A063" },
      { name: "AWS", color: "#FF9900" },
      { name: "Docker", color: "#2496ED" },
      { name: "MongoDB", color: "#47A248" },
      { name: "Supabase", color: "#3ECF8E" },
    ];
    const labelRoot = document.createElement("div");
    labelRoot.className = "absolute inset-0 pointer-events-none overflow-hidden";
    mount.appendChild(labelRoot);

    techs.forEach((t, i) => {
      const el = document.createElement("div");
      el.className = "absolute glass px-3 py-1.5 rounded-full text-[11px] font-mono font-medium text-white/90 whitespace-nowrap";
      el.style.borderColor = `${t.color}40`;
      el.style.boxShadow = `0 0 20px ${t.color}30`;
      el.textContent = t.name;
      labelRoot.appendChild(el);
      labels.push({
        el,
        theta: (i / techs.length) * Math.PI * 2,
        phi: Math.PI / 2 + (i % 2 === 0 ? 0.35 : -0.35),
        speed: 0.18 + (i % 3) * 0.05,
        r: 2.6,
      });
    });

    // Particle field
    const pCount = 500;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x00f5ff, size: 0.02, transparent: true, opacity: 0.6 }),
    );
    scene.add(particles);

    // Lights
    scene.add(new THREE.AmbientLight(0x404060, 1.2));
    const l1 = new THREE.PointLight(0x00f5ff, 40, 30);
    l1.position.set(4, 4, 4);
    scene.add(l1);
    const l2 = new THREE.PointLight(0xff4ecd, 35, 30);
    l2.position.set(-4, -2, 4);
    scene.add(l2);
    const l3 = new THREE.PointLight(0x7b2ff7, 25, 30);
    l3.position.set(0, -4, -3);
    scene.add(l3);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    // Line beam connecting opposite sides of the sphere
    const beamGeo = new THREE.CylinderGeometry(0.015, 0.015, 6.5, 16);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.35 });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.rotation.z = Math.PI / 2;
    beam.position.y = 0.05;
    scene.add(beam);

    let raf = 0;
    const clock = new THREE.Clock();
    const dummy = new THREE.Vector3();
    const animate = () => {
      const t = clock.getElapsedTime();
      core.rotation.y += 0.003;
      core.rotation.x += 0.0015;
      core.position.y = Math.sin(t * 1.1) * 0.08;
      wire.rotation.y -= 0.002;
      wire.rotation.x -= 0.001;
      ring.rotation.z += 0.004;
      particles.rotation.y += 0.0006;
      beam.rotation.y += 0.006;

      nodes.forEach((m) => {
        const bp = m.userData.basePos as THREE.Vector3;
        const phase = m.userData.phase as number;
        m.position.copy(bp).multiplyScalar(1 + Math.sin(t * 1.5 + phase) * 0.03);
        (m.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(t * 2 + phase) * 0.25;
      });

      // Parallax camera
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Label positioning
      labels.forEach((l) => {
        l.theta += l.speed * 0.008;
        const x = l.r * Math.cos(l.theta) * Math.sin(l.phi);
        const y = l.r * Math.cos(l.phi) + Math.sin(t + l.theta) * 0.12;
        const z = l.r * Math.sin(l.theta) * Math.sin(l.phi);
        dummy.set(x, y, z);
        dummy.project(camera);
        const sx = (dummy.x * 0.5 + 0.5) * mount.clientWidth;
        const sy = (-dummy.y * 0.5 + 0.5) * mount.clientHeight;
        if (dummy.z > 1 || sx < -80 || sx > mount.clientWidth + 80 || sy < -40 || sy > mount.clientHeight + 40) {
          l.el.style.opacity = "0";
        } else {
          l.el.style.transform = `translate(-50%,-50%) translate(${sx}px, ${sy}px)`;
          l.el.style.opacity = z > 0 ? "1" : "0.45";
        }
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      labelRoot.remove();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full relative" />;
}
