"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Code2, Cpu, GraduationCap, Mail, MapPin, Radio, Sparkles, Terminal, Trophy, X } from "lucide-react";
import { useState } from "react";

const WorldCanvas = dynamic(() => import("./WorldCanvas"), { ssr: false });

const zoneContent: Record<string, { label: string; title: string; description: string; items: string[] }> = {
  projects: {
    label: "ZONE 01 / PROJECT LAB",
    title: "Things I've built.",
    description: "A growing collection of software and AI projects designed around real problems. Each project will eventually have a live demo, architecture notes, source code and measurable outcomes.",
    items: ["MeccaFix — AI automotive diagnostics", "ModelWatch — AI model evaluation", "CivicLens — community issue reporting"],
  },
  experience: {
    label: "ZONE 02 / ENGINEERING HQ",
    title: "How I work.",
    description: "Computer science graduate focused on full-stack engineering and applied AI. I enjoy turning complex problems into useful, reliable software.",
    items: ["Java · Python · JavaScript · TypeScript", "React · React Native · Node.js · Django", "REST APIs · SQL · Computer Vision · LLMs"],
  },
  education: {
    label: "ZONE 03 / THE ACADEMY",
    title: "Always learning.",
    description: "A foundation in computer science with a continued focus on intelligent systems, software engineering and building technology that creates practical value.",
    items: ["BSc Computer Science — University of North Georgia", "Google Cybersecurity Professional Certificate — in progress", "Ongoing study: AI engineering, cloud and system design"],
  },
};

export default function UniverseExperience() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const active = activeZone ? zoneContent[activeZone] : null;

  return (
    <main className="universe-shell">
      <div className="noise" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Jireh home">
          <span className="brand-mark">J/</span>
          <span>JIREH<span style={{ color: "var(--cyan)" }}>.EXE</span><br /><small>DEVELOPER UNIVERSE</small></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#world">Universe</a>
          <a href="#zones">Explore</a>
          <a href="#about">About</a>
          <a href="https://github.com/Jayce777-M" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
        <div className="status"><span className="status-dot" /> SYSTEM ONLINE</div>
      </header>

      <section className="hero" id="home">
        <WorldCanvas onSelect={setActiveZone} />
        <div className="hero-vignette" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="eyebrow">FULL-STACK ENGINEERING · APPLIED AI</div>
          <h1>BUILDING<br /><span>BEYOND</span><span className="accent">BOUNDARIES.</span></h1>
          <p className="hero-copy">I'm <strong>Jireh</strong> — a computer science graduate building intelligent applications and thoughtful software that solve problems in the real world.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#zones">Explore my universe <ArrowRight size={15} /></a>
            <button className="button" onClick={() => setTerminalOpen(true)}><Terminal size={15} /> Open terminal</button>
          </div>
          <div className="hero-meta">
            <span><MapPin size={12} /> <b>SOFTWARE · AI</b></span>
            <span><Cpu size={12} /> <b>BUILDING WHAT'S NEXT</b></span>
          </div>
        </motion.div>
        <div className="world-hud">
          <div className="hud-label">EXPLORER PROFILE</div>
          <div className="hud-title">JIREH / ENGINEER</div>
          <div className="hud-row"><span>MISSION PROGRESS</span><span>IN PROGRESS</span></div>
          <div className="hud-bar"><span /></div>
          <div className="hud-row"><span>ACTIVE SPECIALTY</span><span>AI + FULL STACK</span></div>
          <div className="hud-row"><span>WORLD STATUS</span><span style={{ color: "var(--green)" }}>ONLINE</span></div>
        </div>
        <div className="scroll-cue">SCROLL TO EXPLORE</div>
      </section>

      <section className="section" id="zones">
        <div className="section-kicker">/ SELECT YOUR DESTINATION</div>
        <h2>Explore the universe.</h2>
        <p className="section-intro">The world is yours to explore. Select a destination below or click one of the glowing structures in the 3D environment.</p>
        <div className="zone-grid">
          <button className="zone-card" onClick={() => setActiveZone("projects")} style={{ textAlign: "left", cursor: "pointer" }}>
            <span className="zone-index">01 / LAB</span><span className="zone-icon"><Code2 size={20} /></span>
            <h3>Project Lab</h3><p>Explore applications, experiments and the engineering behind them.</p>
          </button>
          <button className="zone-card" onClick={() => setActiveZone("experience")} style={{ textAlign: "left", cursor: "pointer" }}>
            <span className="zone-index">02 / HQ</span><span className="zone-icon"><Cpu size={20} /></span>
            <h3>Engineering HQ</h3><p>Discover my technical toolkit, engineering experience and approach.</p>
          </button>
          <button className="zone-card" onClick={() => setActiveZone("education")} style={{ textAlign: "left", cursor: "pointer" }}>
            <span className="zone-index">03 / ACADEMY</span><span className="zone-icon"><GraduationCap size={20} /></span>
            <h3>The Academy</h3><p>My computer science foundation, certifications and learning path.</p>
          </button>
        </div>
      </section>

      <section className="section" id="about" style={{ paddingTop: 70 }}>
        <div className="section-kicker">/ THE BUILDER BEHIND THE WORLD</div>
        <h2>Technology should<br />make a difference.</h2>
        <p className="section-intro">I care about building software that is useful beyond the screen: tools that make information more accessible, help people make better decisions and turn ambitious ideas into working products.</p>
        <div className="hero-actions">
          <a className="button" href="https://github.com/Jayce777-M" target="_blank" rel="noreferrer">GitHub <ArrowRight size={14} /></a>
          <a className="button" href="https://www.linkedin.com/in/jireh-asumah-954a6920a/" target="_blank" rel="noreferrer">LinkedIn <ArrowRight size={14} /></a>
          <a className="button" href="mailto:hello@jireh.dev"><Mail size={14} /> Contact</a>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} JIREH.EXE · BUILT WITH CURIOSITY</span>
        <span>DESIGNED TO EXPLORE · ENGINEERED TO WORK</span>
      </footer>

      <AnimatePresence>
        {active && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveZone(null)}>
            <motion.div className="modal" role="dialog" aria-modal="true" aria-labelledby="zone-title" initial={{ opacity: 0, y: 20, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveZone(null)} aria-label="Close"><X size={17} /></button>
              <div className="section-kicker">{active.label}</div>
              <h2 id="zone-title">{active.title}</h2>
              <p>{active.description}</p>
              <ul style={{ paddingLeft: 18, color: "#c3d4ec", lineHeight: 2, fontSize: 12 }}>
                {active.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="control-hint">MORE CONTENT AND LIVE DEMOS WILL BE ADDED AS PROJECTS SHIP.</div>
            </motion.div>
          </motion.div>
        )}
        {terminalOpen && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setTerminalOpen(false)}>
            <motion.div className="modal" role="dialog" aria-modal="true" aria-labelledby="terminal-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onClick={(event) => event.stopPropagation()}>
              <button className="modal-close" onClick={() => setTerminalOpen(false)} aria-label="Close"><X size={17} /></button>
              <div className="section-kicker"><Radio size={12} style={{ display: "inline", verticalAlign: "middle" }} /> JIREH SHELL / SESSION 001</div>
              <h2 id="terminal-title">Terminal initialized.</h2>
              <p style={{ fontFamily: "DM Mono, monospace", color: "#8deaff" }}>visitor@jireh-universe:~$ help</p>
              <p>Available commands: <strong>about</strong>, <strong>projects</strong>, <strong>skills</strong>, <strong>contact</strong>, <strong>resume</strong>.</p>
              <p className="control-hint">INTERACTIVE COMMAND EXECUTION COMING IN THE NEXT BUILD.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
