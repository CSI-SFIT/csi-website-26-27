// Aryan
// Aryan

"use client";
import { BlurFade } from "../../components/ui/blur-fade.jsx";
import styles from "./page.module.css";
import { Inter, Lato } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const STATS = [
  { value: "10+", label: "Years of CSI SFIT legacy" },
  { value: "500+", label: "Active members" },
  { value: "10+", label: "Events run each year" },
  { value: "15+", label: "Industry collaborations" },
];

const PILLARS = [
  {
    tag: "01",
    title: "Technical Training",
    copy: "Hands-on workshops in web development, AI/ML, cloud and cybersecurity, run by students for students.",
  },
  {
    tag: "02",
    title: "Competitions",
    copy: "Hackathons, coding contests and paper-presentation events that turn ideas into working prototypes.",
  },
  {
    tag: "03",
    title: "Industry Interface",
    copy: "Seminars, expert talks and industrial visits that connect the classroom to real engineering practice.",
  },
  {
    tag: "04",
    title: "Community",
    copy: "A student chapter of India\u2019s largest professional body for CS & IT, built on peer learning.",
  },
];

export default function AboutPage() {
  return (
    <main className={`${styles.page} ${inter.variable} ${lato.variable}`}>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero} aria-labelledby="about-heading">
        <div className={styles.heroGlow} />

        <div className={styles.heroInner}>
          <BlurFade delay={0.1} inView>
            <div className={`${styles.heroLabel} font-lato`}>
              About CSI SFIT
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 id="about-heading" className={`${styles.heroTitle} font-inter`}>
              Building the campus&apos;s{" "}
              <span className={styles.highlight}>technical backbone.</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className={`${styles.heroSub} font-lato`}>
              CSI-SFIT is the student chapter of the Computer Society of India
              at St. Francis Institute of Technology — a community of builders,
              organisers and learners turning curiosity into working code.
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className={`${styles.badgeRow} font-lato`}>
              <span className={styles.badge}>Est. Student Chapter</span>

              <span className={styles.badge}>Technical Domain · SFIT</span>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={`${styles.statValue} font-inter`}>{s.value}</div>

              <div className={`${styles.statLabel} font-lato`}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Mission / Vision ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={`${styles.eyebrowSmall} font-lato`}>
            Why we exist
          </span>

          <h2 className={`${styles.sectionTitle} font-inter`}>
            Mission &amp; Vision
          </h2>
        </div>

        <div className={styles.mvGrid}>
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>&#9673;</div>

            <h3 className="font-inter">Our Mission</h3>

            <p className="font-lato">
              To give every SFIT student hands-on exposure to real technology
              &mdash; through workshops, competitions and mentorship &mdash; and
              turn theoretical learning into engineering confidence.
            </p>
          </div>

          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>&#9670;</div>

            <h3 className="font-inter">Our Vision</h3>

            <p className="font-lato">
              To be the bridge between classroom and industry: a chapter where
              students don&rsquo;t just study computer science, but practise it,
              ship it, and teach it to the next batch.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={`${styles.eyebrowSmall} font-lato`}>What we do</span>

          <h2 className={`${styles.sectionTitle} font-inter`}>
            Four pillars, one chapter
          </h2>
        </div>

        <div className={styles.pillarGrid}>
          {PILLARS.map((p) => (
            <div key={p.tag} className={styles.pillarCard}>
              <span className={`${styles.pillarTag} font-inter`}>{p.tag}</span>

              <h3 className="font-inter">{p.title}</h3>

              <p className="font-lato">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
