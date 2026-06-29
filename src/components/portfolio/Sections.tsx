import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Download, ArrowRight, MapPin, Phone, Send, ExternalLink, Code2, Cloud, Cpu, Sparkles, ChevronUp, Menu, X, GraduationCap, Briefcase, Award, Layers } from "lucide-react";
import Typed from "typed.js";
import VanillaTilt from "vanilla-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { HeroGeosphere } from "./HeroGeosphere";
import projResumeAi from "@/assets/project-resume-ai.jpg";
import projPortfolio from "@/assets/project-portfolio.jpg";
import projTasks from "@/assets/project-tasks.jpg";
import projWeather from "@/assets/project-weather.jpg";
import projExpense from "@/assets/project-expense.jpg";
import projCloud from "@/assets/project-cloud.jpg";
import aboutPortrait from "@/assets/about-portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

const CONTACT = {
  email: "kirubanandhanm26@gmail.com",
  phone: "+91 90433 04076",
  location: "Coimbatore, Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/kirubanandhan-murugesan",
  github: "https://github.com/",
  resume: "https://drive.google.com/file/d/178fVH0gFxqpwQwjg6NKnxUoyu1FyJB4K/view?usp=sharing",
};

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 30);
    s();
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="container mx-auto px-6">
        <nav className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl ${scrolled ? "glass-strong" : ""}`}>
          <a href="#home" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="w-9 h-9 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center text-[#050816] font-bold">K</span>
            <span className="hidden sm:inline">Kiruba<span className="text-gradient-primary">.</span></span>
          </a>
          <ul className="hidden md:flex items-center gap-1 glass px-2 py-1.5 rounded-full">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="px-3 py-1.5 text-sm text-white/70 hover:text-white rounded-full transition-colors hover:bg-white/5">{n.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="hidden md:inline-flex btn-outline-glow text-sm">Let's Talk</a>
          <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-4 animate-fade-in">
            <ul className="flex flex-col gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-white/80 hover:bg-white/5">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export function Hero() {
  const typedEl = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!typedEl.current) return;
    const typed = new Typed(typedEl.current, {
      strings: ["Full Stack Developer", "Frontend Developer", "Cloud Enthusiast", "AI Developer", "CSE Student"],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1500,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-anim]", {
        y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  const socials = [
    { Icon: Github, href: CONTACT.github, label: "GitHub" },
    { Icon: Linkedin, href: CONTACT.linkedin, label: "LinkedIn" },
    { Icon: Mail, href: `mailto:${CONTACT.email}`, label: "Email" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div data-hero-anim className="section-eyebrow">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Available for opportunities
          </div>
          <h1 data-hero-anim className="font-display font-bold leading-[0.95] tracking-tight">
            <span className="block text-2xl md:text-3xl text-white/70 font-light mb-2">Hi, I'm</span>
            <span className="block text-5xl md:text-7xl xl:text-8xl text-gradient-primary">Kirubanandhan</span>
            <span className="block text-2xl md:text-4xl mt-3 text-white/90">
              <span ref={typedEl} className="text-gradient" />
            </span>
          </h1>
          <p data-hero-anim className="text-white/60 text-lg max-w-xl leading-relaxed">
            CSE undergrad at SNS College of Technology crafting immersive web experiences with React, Node & the cloud — blending design, code, and AI to ship products that feel alive.
          </p>
          <div data-hero-anim className="flex flex-wrap gap-3">
            <a href={CONTACT.resume} target="_blank" rel="noreferrer" className="btn-glow inline-flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Resume
            </a>
            <a href="#projects" className="btn-outline-glow inline-flex items-center gap-2">
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn-outline-glow inline-flex items-center gap-2">
              Contact Me
            </a>
          </div>
          <div data-hero-anim className="flex items-center gap-4 pt-2">
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">Find me</div>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group relative w-11 h-11 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ boxShadow: "0 0 24px rgba(0,245,255,0.6)" }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Scene */}
        <div data-hero-anim className="relative h-[420px] md:h-[560px] lg:h-[640px]">
          <div className="absolute inset-0 rounded-3xl glass overflow-hidden">
            <HeroGeosphere />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs uppercase tracking-[0.3em] flex flex-col items-center gap-2 hover:text-white transition-colors">
        Scroll
        <span className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent" />
      </a>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14" data-reveal>
      <div className="section-eyebrow justify-center">{eyebrow}</div>
      <h2 className="font-display text-4xl md:text-5xl font-bold mt-3"><span className="text-gradient-primary">{title}</span></h2>
      {sub && <p className="text-white/60 mt-3">{sub}</p>}
    </div>
  );
}

export function About() {
  const timeline = [
    { y: "2025–2029", t: "B.E. Computer Science", d: "SNS College of Technology — building a strong CS foundation while shipping real-world projects." },
    { y: "2026", t: "Web Developer Intern — Cognifyz", d: "Designed and developed responsive web modules and dashboards using modern JS frameworks." },
    { y: "2026", t: "UX Designer — Syntex Hub", d: "Crafted clean, accessible interfaces focused on micro-interactions and user delight." },
    { y: "Now", t: "Learning Full-Stack + AI", d: "Exploring LLM-powered apps, cloud-native architecture and production-grade React systems." },
  ];
  const interests = [
    { Icon: Cloud, l: "Cloud Computing" },
    { Icon: Cpu, l: "Artificial Intelligence" },
    { Icon: Code2, l: "Web Development" },
    { Icon: Sparkles, l: "Problem Solving" },
  ];
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="container mx-auto">
        <SectionHeader eyebrow="About" title="A developer with a builder's mindset" sub="I love the moment when an idea becomes something you can click, scroll and feel." />
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Photo card */}
          <div className="lg:col-span-4" data-reveal>
            <div className="tilt-card relative rounded-3xl p-1 bg-[var(--gradient-primary)] animate-gradient">
              <div className="rounded-3xl glass-strong p-8 h-full">
                <div className="aspect-square rounded-2xl relative overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(0,245,255,0.25),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(255,78,205,0.25),transparent_60%)]">
                  <img
                    src={aboutPortrait}
                    alt="Portrait of Kirubanandhan, full-stack developer"
                    width={896}
                    height={1152}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70">CS · 2029</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300">SNSCT</span>
                  </div>
                  <div className="absolute inset-0 noise pointer-events-none" />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="font-display text-xl font-semibold">Kirubanandhan</div>
                  <div className="text-sm text-white/60">Full Stack Developer · Cloud & AI</div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["React", "Node", "AWS", "AI"].map((t) => (
                      <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-white/5 text-white/70">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="tilt-glow" />
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-white/70 leading-relaxed text-lg" data-reveal>
              I'm a Computer Science student at <span className="text-white">SNS College of Technology</span> (graduating 2029),
              currently going deep on <span className="text-cyan-300">full-stack development</span>,
              <span className="text-fuchsia-300"> cloud computing</span>, and <span className="text-violet-300">applied AI</span>.
              Past lives include a Web Developer role at <span className="text-white">Cognifyz</span> and UX work at
              <span className="text-white"> Syntex Hub</span>.
            </p>

            <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-[linear-gradient(180deg,#00F5FF,#7B2FF7,#FF4ECD)]">
              {timeline.map((item, i) => (
                <div key={i} className="relative pb-8 last:pb-0" data-reveal>
                  <div className="absolute -left-[18px] top-1.5 w-3 h-3 rounded-full bg-[var(--gradient-primary)] shadow-[0_0_12px_#00F5FF]" />
                  <div className="text-xs font-mono text-cyan-300 tracking-wider">{item.y}</div>
                  <div className="font-display text-lg font-semibold mt-1">{item.t}</div>
                  <div className="text-white/60 mt-1">{item.d}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Interests</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interests.map(({ Icon, l }) => (
                  <div key={l} className="glass rounded-2xl p-4 text-center hover:-translate-y-1 transition-transform" data-reveal>
                    <Icon className="w-6 h-6 mx-auto text-cyan-300 mb-2" />
                    <div className="text-sm">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ring({ value, color }: { value: number; color: string }) {
  const r = 28; const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 70 70" className="w-16 h-16 -rotate-90">
      <circle cx="35" cy="35" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
      <circle cx="35" cy="35" r={r} stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c - (value / 100) * c}
        style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dashoffset 1.2s ease" }} />
    </svg>
  );
}

export function Skills() {
  const cats = [
    { title: "Frontend", color: "#00F5FF", items: [{ n: "HTML", v: 95 }, { n: "CSS", v: 92 }, { n: "JavaScript", v: 90 }, { n: "React", v: 88 }, { n: "Tailwind", v: 90 }] },
    { title: "Backend", color: "#7B2FF7", items: [{ n: "Node.js", v: 82 }, { n: "Express", v: 80 }] },
    { title: "Database", color: "#FF4ECD", items: [{ n: "MongoDB", v: 78 }, { n: "Supabase", v: 80 }] },
    { title: "Tools", color: "#00F5FF", items: [{ n: "Git", v: 88 }, { n: "GitHub", v: 90 }, { n: "VS Code", v: 95 }, { n: "Figma", v: 80 }] },
    { title: "Cloud", color: "#7B2FF7", items: [{ n: "AWS", v: 72 }, { n: "Firebase", v: 78 }] },
  ];
  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="container mx-auto">
        <SectionHeader eyebrow="Skills" title="Tools of the craft" sub="A focused stack tuned for shipping fast, beautiful, scalable products." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((c) => (
            <div key={c.title} className="tilt-card relative glass rounded-3xl p-6 hover:-translate-y-1 transition-transform" data-reveal data-tilt>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: c.color }} />
              </div>
              <div className="space-y-4">
                {c.items.map((s) => (
                  <div key={s.n} className="flex items-center gap-4">
                    <Ring value={s.v} color={c.color} />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/90">{s.n}</span>
                        <span className="text-white/50 font-mono text-xs">{s.v}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: `linear-gradient(90deg, ${c.color}, #FF4ECD)`, boxShadow: `0 0 10px ${c.color}` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="tilt-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll<HTMLElement>("[data-tilt-card]");
    cards.forEach((c) => VanillaTilt.init(c, { max: 8, speed: 600, glare: true, "max-glare": 0.2, scale: 1.02 }));
    return () => cards.forEach((c) => (c as any).vanillaTilt?.destroy());
  }, []);

  const projects = [
    { t: "AI Resume Analyzer", d: "Upload a resume → get instant AI-driven feedback, ATS score & tailored suggestions.", tech: ["React", "Node", "OpenAI", "Tailwind"], img: projResumeAi, live: "https://ai-resume-analyzer-demo.vercel.app", code: CONTACT.github },
    { t: "Portfolio Website", d: "This very site — Three.js geosphere, GSAP timelines, glassmorphism & Lenis smooth scroll.", tech: ["React", "Three.js", "GSAP", "Tailwind"], img: projPortfolio, live: "#home", code: CONTACT.github },
    { t: "Task Manager", d: "Realtime kanban with drag-and-drop, auth, and team collaboration.", tech: ["React", "Supabase", "Zustand"], img: projTasks, live: "https://taskflow-demo.vercel.app", code: CONTACT.github },
    { t: "Weather App", d: "Beautiful weather UI with hourly forecasts and geolocation.", tech: ["React", "OpenWeather"], img: projWeather, live: "https://weather-glance.vercel.app", code: CONTACT.github },
    { t: "Expense Tracker", d: "Track spending, categorize transactions and visualize trends.", tech: ["React", "Node", "MongoDB"], img: projExpense, live: "https://expense-trace.vercel.app", code: CONTACT.github },
    { t: "Cloud Dashboard", d: "Infra monitoring dashboard built on AWS metrics & serverless functions.", tech: ["React", "AWS", "Lambda"], img: projCloud, live: "https://cloud-pulse.vercel.app", code: CONTACT.github },
  ];

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="container mx-auto">
        <SectionHeader eyebrow="Projects" title="Selected work" sub="A glimpse at things I've shipped while learning out loud." />
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article key={p.t} data-tilt-card data-reveal className="tilt-card relative rounded-3xl overflow-hidden glass group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.t} loading="lazy" width={1024} height={640}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-display text-xl font-semibold">{p.t}</h3>
                <p className="text-sm text-white/60">{p.d}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-white/5 text-cyan-300 border border-cyan-400/20">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-cyan-300 transition-colors">
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-fuchsia-300 transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                </div>
              </div>
              <div className="tilt-glow" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Resume() {
  const stats = [
    { v: "10+", l: "Projects", Icon: Layers },
    { v: "5+", l: "Tech Stacks", Icon: Code2 },
    { v: "2", l: "Internships", Icon: Briefcase },
    { v: "∞", l: "Curiosity", Icon: Sparkles },
  ];
  const experience = [
    { y: "2026", t: "Web Developer Intern", c: "Cognifyz Technologies", Icon: Briefcase, color: "#00F5FF" },
    { y: "2026", t: "UX Designer", c: "Syntex Hub", Icon: Sparkles, color: "#FF4ECD" },
    { y: "2025–29", t: "B.E. Computer Science", c: "SNS College of Technology", Icon: GraduationCap, color: "#7B2FF7" },
  ];
  const highlights = [
    "Full-stack web apps with React, Node & TypeScript",
    "Cloud-native deployments on AWS & Supabase",
    "AI-powered features using OpenAI & vector search",
    "Pixel-precise UI with Tailwind, GSAP & Three.js",
  ];
  return (
    <section id="resume" className="relative py-28 px-6">
      <div className="container mx-auto">
        <SectionHeader eyebrow="Resume" title="The full story" sub="Experience, highlights and the one-page PDF — all in one place." />

        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" data-reveal>
          {stats.map(({ v, l, Icon }) => (
            <div key={l} className="relative glass rounded-2xl p-5 overflow-hidden group hover:-translate-y-1 transition-transform">
              <Icon className="absolute -right-3 -bottom-3 w-16 h-16 text-white/5 group-hover:text-cyan-400/10 transition-colors" />
              <div className="font-display text-3xl font-bold text-gradient-primary">{v}</div>
              <div className="text-xs uppercase tracking-wider text-white/50 mt-1">{l}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Experience timeline */}
          <div className="lg:col-span-3 glass-strong rounded-3xl p-8" data-reveal>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-cyan-300" />
              <h3 className="font-display text-xl font-semibold">Journey so far</h3>
            </div>
            <div className="space-y-5">
              {experience.map((e) => (
                <div key={e.t} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 transition-colors">
                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${e.color}20`, border: `1px solid ${e.color}40`, boxShadow: `0 0 20px ${e.color}30` }}>
                    <e.Icon className="w-5 h-5" style={{ color: e.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-display font-semibold">{e.t}</div>
                      <div className="text-xs font-mono text-white/50">{e.y}</div>
                    </div>
                    <div className="text-sm text-white/60 mt-0.5">{e.c}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 pt-6 border-t border-white/10">
              <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">Highlights</div>
              <ul className="grid sm:grid-cols-2 gap-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00F5FF] shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Download card */}
          <div className="lg:col-span-2" data-reveal>
            <div className="relative h-full rounded-3xl p-[1px] bg-[var(--gradient-primary)] animate-gradient">
              <div className="relative h-full glass-strong rounded-3xl p-8 flex flex-col overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-fuchsia-500/20 blur-3xl" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] font-mono uppercase tracking-wider text-cyan-300 border border-cyan-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" /> PDF · Updated 2026
                  </div>
                  <h3 className="font-display text-2xl font-bold mt-4">Grab the resume</h3>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    One page. Every project, internship, and stack I work with — designed to be skimmed in 60 seconds.
                  </p>
                </div>

                <div className="relative mt-6 grid grid-cols-3 gap-2">
                  {[
                    { l: "Skills", v: "15+" },
                    { l: "Projects", v: "10+" },
                    { l: "Years", v: "1.5" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-xl bg-white/5 px-3 py-2.5 text-center">
                      <div className="font-display text-lg font-bold text-white">{s.v}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">{s.l}</div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-auto pt-6 flex flex-col gap-3">
                  <a href={CONTACT.resume} target="_blank" rel="noreferrer" className="btn-glow inline-flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                  <a href={CONTACT.resume} target="_blank" rel="noreferrer" className="btn-outline-glow inline-flex items-center justify-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4" /> View Online
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErr("Please fill out name, email, and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErr("Please enter a valid email.");
      return;
    }
    // Open mail client as a graceful fallback
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}`);
    const subj = encodeURIComponent(form.subject || "Hello from your portfolio");
    window.location.href = `mailto:${CONTACT.email}?subject=${subj}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const Field = ({ id, label, type = "text", textarea = false }: any) => null; // (not used, keeping fields inline)

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="container mx-auto">
        <SectionHeader eyebrow="Contact" title="Let's build something great" sub="Open to internships, freelance projects, and collaborations." />
        <div className="grid lg:grid-cols-5 gap-8">
          {/* form */}
          <form onSubmit={submit} className="lg:col-span-3 glass-strong rounded-3xl p-8 space-y-5" data-reveal>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { k: "name", l: "Your Name", t: "text" },
                { k: "email", l: "Email Address", t: "email" },
              ].map((f) => (
                <label key={f.k} className="relative block">
                  <input
                    type={f.t}
                    value={(form as any)[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    placeholder=" "
                    className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-all"
                    maxLength={120}
                  />
                  <span className="pointer-events-none absolute left-4 top-3.5 text-sm text-white/40 transition-all peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-cyan-300 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-cyan-300 uppercase tracking-wider">{f.l}</span>
                </label>
              ))}
            </div>
            <label className="relative block">
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder=" "
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-all"
                maxLength={140}
              />
              <span className="pointer-events-none absolute left-4 top-3.5 text-sm text-white/40 transition-all peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-cyan-300 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-cyan-300 uppercase tracking-wider">Subject</span>
            </label>
            <label className="relative block">
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder=" "
                rows={5}
                maxLength={1200}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-all resize-none"
              />
              <span className="pointer-events-none absolute left-4 top-3.5 text-sm text-white/40 transition-all peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-cyan-300 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-cyan-300 uppercase tracking-wider">Message</span>
            </label>
            {err && <div className="text-sm text-red-400">{err}</div>}
            <div className="flex items-center justify-between">
              <button type="submit" className="btn-glow inline-flex items-center gap-2">
                <Send className="w-4 h-4" /> {sent ? "Sent!" : "Send Message"}
              </button>
              {sent && <span className="text-sm text-cyan-300 animate-fade-in">✓ Your mail client is opening…</span>}
            </div>
          </form>

          {/* details */}
          <aside className="lg:col-span-2 space-y-4" data-reveal>
            {[
              { Icon: Mail, l: "Email", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { Icon: Phone, l: "Phone", v: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
              { Icon: MapPin, l: "Location", v: CONTACT.location },
              { Icon: Linkedin, l: "LinkedIn", v: "kirubanandhan-murugesan", href: CONTACT.linkedin },
              { Icon: Github, l: "GitHub", v: "@kirubanandhan", href: CONTACT.github },
            ].map(({ Icon, l, v, href }) => (
              <a
                key={l}
                href={href}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 glass rounded-2xl p-4 hover:-translate-y-1 hover:border-cyan-400/30 transition-all group"
              >
                <span className="w-11 h-11 rounded-xl bg-[var(--gradient-primary)] flex items-center justify-center text-[#050816]">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">{l}</div>
                  <div className="text-sm text-white/90 truncate group-hover:text-cyan-300 transition-colors">{v}</div>
                </div>
              </a>
            ))}
            <div className="rounded-2xl overflow-hidden glass h-48 relative">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Coimbatore&output=embed"
                className="w-full h-full grayscale-[0.6] contrast-110 opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 mix-blend-overlay" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative pt-20 pb-8 px-6">
      {/* Wave */}
      <svg className="absolute top-0 left-0 w-full h-16 -translate-y-full text-cyan-500/20" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
      <div className="container mx-auto">
        <div className="glass-strong rounded-3xl p-8 md:p-10 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="w-9 h-9 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center text-[#050816]">K</span>
              Kirubanandhan<span className="text-gradient-primary">.</span>
            </div>
            <p className="text-sm text-white/60 max-w-md">Designing & building thoughtful web experiences with React, the cloud and a dash of AI.</p>
            <div className="flex gap-3 pt-2">
              {[
                { Icon: Github, href: CONTACT.github },
                { Icon: Linkedin, href: CONTACT.linkedin },
                { Icon: Mail, href: `mailto:${CONTACT.email}` },
                
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/70 hover:text-cyan-300 hover:-translate-y-1 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">Quick Links</div>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="text-white/70 hover:text-cyan-300 transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">Contact</div>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70">{CONTACT.email}</li>
              <li className="text-white/70">{CONTACT.phone}</li>
              <li className="text-white/70">{CONTACT.location}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Kirubanandhan Murugesan. Crafted with care.</div>
          <a href="#home" className="inline-flex items-center gap-2 hover:text-cyan-300 transition-colors">
            Back to top <ChevronUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/** Scroll reveal + lenis smooth scroll bootstrap */
export function ScrollFX() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        {
          y: 0, opacity: 1, filter: "blur(0)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        },
      );
    });
    return () => { lenis.destroy(); ScrollTrigger.getAll().forEach((s) => s.kill()); };
  }, []);
  return null;
}
