import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatedBackground, CustomCursor, LoadingScreen } from "@/components/portfolio/Atmosphere";
import { About, Contact, Footer, Hero, Navbar, Projects, Resume, ScrollFX, Skills } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kirubanandhan M — Full Stack Developer & Cloud Enthusiast" },
      { name: "description", content: "Award-style portfolio of Kirubanandhan Murugesan — Full Stack Developer, Cloud & AI enthusiast. CSE student at SNS College of Technology." },
      { property: "og:title", content: "Kirubanandhan M — Full Stack Developer" },
      { property: "og:description", content: "Immersive futuristic portfolio: Three.js, GSAP, glassmorphism and a developer building with React, Node, AWS and AI." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
