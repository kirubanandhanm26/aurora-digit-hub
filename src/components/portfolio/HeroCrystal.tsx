import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero 3D scene — futuristic crystal (icosahedron) with wireframe halo,
 * orbiting tech icon points, particle field, and mouse parallax.
 */
export function HeroCrystal() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6;

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

    // Crystal — faceted core
    const crystalGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f5ff,
      metalness: 0.4,
      roughness: 0.15,
      transmission: 0.6,
      thickness: 1.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      emissive: 0x7b2ff7,
      emissiveIntensity: 0.3,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    scene.add(crystal);

    // Wireframe halo
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.85, 1),
      new THREE.MeshBasicMaterial({ color: 0xff4ecd, wireframe: true, transparent: true, opacity: 0.35 }),
    );
    scene.add(wire);

    // Outer wireframe ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.012, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.6 }),
    );
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.9, 0.008, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xff4ecd, transparent: true, opacity: 0.5 }),
    );
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Orbiting tech icon points (colored glowing spheres)
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    const techColors = [0x00f5ff, 0xff4ecd, 0x7b2ff7, 0xffffff, 0x61dafb, 0xf7df1e, 0x68a063, 0x47a248, 0xf05032, 0xff9900, 0x3ecf8e, 0xffca28];
    const orbiters: { mesh: THREE.Mesh; r: number; speed: number; phase: number; tilt: number }[] = [];
    techColors.forEach((c, i) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshBasicMaterial({ color: c }),
      );
      orbitGroup.add(m);
      orbiters.push({
        mesh: m,
        r: 2.4 + (i % 3) * 0.25,
        speed: 0.25 + (i % 4) * 0.08,
        phase: (i / techColors.length) * Math.PI * 2,
        tilt: (i % 3) * 0.4,
      });
    });

    // Particle field
    const pCount = 600;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x00f5ff, size: 0.025, transparent: true, opacity: 0.7 }),
    );
    scene.add(particles);

    // Lights
    scene.add(new THREE.AmbientLight(0x404060, 1.2));
    const l1 = new THREE.PointLight(0x00f5ff, 50, 30);
    l1.position.set(4, 4, 4);
    scene.add(l1);
    const l2 = new THREE.PointLight(0xff4ecd, 40, 30);
    l2.position.set(-4, -2, 4);
    scene.add(l2);
    const l3 = new THREE.PointLight(0x7b2ff7, 30, 30);
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

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      crystal.rotation.x += 0.004;
      crystal.rotation.y += 0.006;
      crystal.position.y = Math.sin(t * 1.2) * 0.12;
      wire.rotation.x -= 0.003;
      wire.rotation.y -= 0.002;
      ring.rotation.z += 0.005;
      ring2.rotation.z -= 0.004;
      particles.rotation.y += 0.0008;

      orbiters.forEach((o) => {
        const a = t * o.speed + o.phase;
        o.mesh.position.set(
          Math.cos(a) * o.r,
          Math.sin(a * 0.7) * o.r * 0.4 + Math.sin(o.tilt) * 0.5,
          Math.sin(a) * o.r,
        );
      });

      // Parallax
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 0.6 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      renderer.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
