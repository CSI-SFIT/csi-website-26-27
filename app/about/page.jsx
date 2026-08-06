// Aryan
// Aryan

'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.css';

const STATS = [
  { value: '60+', label: 'Years of CSI legacy' },
  { value: '500+', label: 'Active members' },
  { value: '40+', label: 'Events run each year' },
  { value: '15+', label: 'Industry collaborations' },
];

const PILLARS = [
  {
    tag: '01',
    title: 'Technical Training',
    copy: 'Hands-on workshops in web development, AI/ML, cloud and cybersecurity, run by students for students.',
  },
  {
    tag: '02',
    title: 'Competitions',
    copy: 'Hackathons, coding contests and paper-presentation events that turn ideas into working prototypes.',
  },
  {
    tag: '03',
    title: 'Industry Interface',
    copy: 'Seminars, expert talks and industrial visits that connect the classroom to real engineering practice.',
  },
  {
    tag: '04',
    title: 'Community',
    copy: 'A student chapter of India\u2019s largest professional body for CS & IT, built on peer learning.',
  },
];

const TEAM = [
  { initials: 'FC', role: 'Faculty Coordinator' },
  { initials: 'CH', role: 'Chairperson' },
  { initials: 'VC', role: 'Vice Chairperson' },
  { initials: 'TD', role: 'Technical Domain Head' },
  { initials: 'ED', role: 'Events Domain Head' },
  { initials: 'MD', role: 'Media Domain Head' },
];

/**
 * Animated node-network background used across the CSI-SFIT site.
 * Pure canvas, no dependencies — respects prefers-reduced-motion.
 */
function useParticleField(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width, height, particles, animationId;
    const COUNT = 55;
    const LINK_DIST = 130;

    function resize() {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }

    function init() {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST * devicePixelRatio) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${
              0.16 * (1 - dist / (LINK_DIST * devicePixelRatio))
            })`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.fillStyle = 'rgba(94, 234, 212, 0.55)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      animationId = requestAnimationFrame(step);
    }

    resize();
    init();
    if (prefersReduced) {
      step();
      cancelAnimationFrame(animationId);
    } else {
      step();
    }

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef]);
}

export default function AboutPage() {
  const canvasRef = useRef(null);
  useParticleField(canvasRef);

  return (
    <main className={styles.page}>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <canvas ref={canvasRef} className={styles.field} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Computer Society of India &mdash; SFIT Chapter
          </span>
          <h1 className={styles.heroTitle}>
            Building the campus&rsquo;s
            <br />
            <span className={styles.gradientText}>technical backbone.</span>
          </h1>
          <p className={styles.heroCopy}>
            CSI-SFIT is the student chapter of the Computer Society of India at
            St. Francis Institute of Technology &mdash; a community of builders,
            organisers and learners turning curiosity into working code.
          </p>
          <div className={styles.badgeRow}>
            <span className={styles.badge}>Est. Student Chapter</span>
            <span className={styles.badge}>511+ Branches Nationwide</span>
            <span className={styles.badge}>Technical Domain &middot; SFIT</span>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Mission / Vision ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrowSmall}>Why we exist</span>
          <h2 className={styles.sectionTitle}>Mission &amp; Vision</h2>
        </div>
        <div className={styles.mvGrid}>
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>&#9673;</div>
            <h3>Our Mission</h3>
            <p>
              To give every SFIT student hands-on exposure to real technology
              &mdash; through workshops, competitions and mentorship &mdash;
              and turn theoretical learning into engineering confidence.
            </p>
          </div>
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>&#9670;</div>
            <h3>Our Vision</h3>
            <p>
              To be the bridge between classroom and industry: a chapter
              where students don&rsquo;t just study computer science, but
              practise it, ship it, and teach it to the next batch.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrowSmall}>What we do</span>
          <h2 className={styles.sectionTitle}>Four pillars, one chapter</h2>
        </div>
        <div className={styles.pillarGrid}>
          {PILLARS.map((p) => (
            <div key={p.tag} className={styles.pillarCard}>
              <span className={styles.pillarTag}>{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Team ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrowSmall}>Who runs it</span>
          <h2 className={styles.sectionTitle}>The core committee</h2>
        </div>
        <div className={styles.teamGrid}>
          {TEAM.map((m) => (
            <div key={m.role} className={styles.teamCard}>
              <div className={styles.avatar}>{m.initials}</div>
              <div className={styles.teamRole}>{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className={styles.cta}>
        <h2>Want to build with us?</h2>
        <p>Membership is open to every SFIT student, every year.</p>
        <a href="/contact" className={styles.ctaButton}>
          Get Involved
        </a>
      </section>
    </main>
  );
}

