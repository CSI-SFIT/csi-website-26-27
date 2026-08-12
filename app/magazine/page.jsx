"use client";
import { useRef, useState } from "react";
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

/* ---- Edit these to point at your actual files ----
   Add/remove entries here as new editions are published.
   The first entry is treated as the current issue and gets
   the big 3D showcase; everything else lands in the archive. */
const MAGAZINES = [
  {
    year: "2026",
    title: "CSI SFIT Magazine",
    edition: "Edition 2025\u201326",
    cover: "./magazine_covers/magazine2026.webp",
    pdf: "./magazine/magazine2026.pdf",
    pages: "48",
    size: "6 MB",
  },
  {
    year: "2025",
    cover: "./magazine_covers/magazine2025.webp",
    pdf: "./magazine/magazine2025.pdf",
    pages: "44",
    size: "70 MB",
  },
  {
    year: "2024",
    cover: "./magazine_covers/magazine2024.webp",
    pdf: "./magazine/magazine2024.pdf",
    pages: "38",
    size: "4 MB",
  },
  {
    year: "2022",
    cover: "./magazine_covers/magazine2022.webp",
    pdf: "./magazine/magazine2022.pdf",
    pages: "26",
    size: "18 MB",
  },
];
/* --------------------------------------------------- */

const CURRENT = MAGAZINES[0];
const ARCHIVE = MAGAZINES.slice(1);

const STATS = [
  { value: 9, label: "Editions published" },
  { value: "2018", label: "First edition" },
  { value: 9, label: "Unique Ideas" },
  { value: "100+", label: "Student contributors" },
];

const CONTENTS = [
  {
    tag: "Reads",
    title: "Tech Deep-Dives",
    copy: "Long-form explainers on AI/ML, web and cloud, written by students who built the projects.",
  },
  {
    tag: "People",
    title: "Our Team",
    copy: "The people behind CSI SFIT, working together to lead initiatives, build projects and grow our community.",
  },
  {
    tag: "Recap",
    title: "Year in Events",
    copy: "Hackathons, workshops and expert talks from the year, in photos and numbers.",
  },
  {
    tag: "Challenge",
    title: "Tech Puzzles & Quizzes",
    copy: "Put your tech knowledge to the test with puzzles, quizzes and challenges made for curious minds.",
  },
];

function DownloadIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

/* ---- Featured cover: mouse-tracked 3D tilt ---- */
function FeaturedCover({ cover, year }) {
  const sceneRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 8, ry: -14 });
  const [active, setActive] = useState(false);

  function handleMove(e) {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 34;
    const rx = (0.5 - py) * 24;
    setTilt({ rx, ry });
  }

  function handleLeave() {
    setActive(false);
    setTilt({ rx: 8, ry: -14 });
  }

  return (
    <div
      className={styles.scene}
      ref={sceneRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleLeave}
    >
      <div className={styles.sceneGlow} />

      <div
        className={`${styles.coverRig} ${active ? styles.coverRigActive : ""}`}
        style={{
          transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        <div className={styles.pageStack} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className={styles.coverFace}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover}
            alt={`CSI SFIT Magazine ${year} front cover`}
            className={styles.coverImg}
            draggable={false}
          />
          <div className={styles.coverSheen} />
        </div>

        <div className={styles.coverSpine} aria-hidden="true" />
      </div>

      <div className={styles.sceneShadow} />
    </div>
  );
}

/* ---- Archive cover: lighter CSS-only hover tilt ---- */
function ArchiveCover({ cover, year }) {
  return (
    <div className={styles.archiveScene}>
      <div className={styles.archiveGlow} />

      <div className={styles.archiveRig}>
        <div className={styles.archivePageStack} aria-hidden="true">
          <span />
          <span />
        </div>

        <div className={styles.archiveCoverFace}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover}
            alt={`CSI SFIT Magazine ${year} front cover`}
            className={styles.archiveCoverImg}
            draggable={false}
          />
          <div className={styles.archiveSheen} />
        </div>
      </div>

      <div className={styles.archiveShadow} />
    </div>
  );
}

export default function MagazinePage() {
  return (
    <main className={`${styles.page} ${inter.variable} ${lato.variable}`}>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero} aria-labelledby="magazine-heading">
        <div className={styles.heroGlow} />

        <div className={styles.heroInner}>
          <div className={`${styles.heroLabel} font-lato`}>
            CSI SFIT Publication
          </div>

          <h1
            id="magazine-heading"
            className={`${styles.heroTitle} font-inter`}
          >
            Every year&apos;s story,{" "}
            <span className={styles.highlight}>bound in one issue.</span>
          </h1>

          <p className={`${styles.heroSub} font-lato`}>
            Our annual magazine collects the workshops, hackathons, projects and
            people that made up the year at CSI-SFIT. Browse the current issue
            and every edition since 2022.
          </p>

          <div className={`${styles.badgeRow} font-lato`}>
            <span className={styles.badge}>{CURRENT.edition}</span>
            <span className={styles.badge}>Free Digital Download</span>
          </div>
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

      {/* ---------- Current issue: cover + download ---------- */}
      <section className={styles.section}>
        <div className={styles.showcaseGrid}>
          <FeaturedCover cover={CURRENT.cover} year={CURRENT.year} />

          <div className={styles.showcaseInfo}>
            <span className={`${styles.eyebrowSmall} font-lato`}>
              Get the latest issue
            </span>

            <h2 className={`${styles.showcaseTitle} font-inter`}>
              PARADIGM: ISSUE 9
            </h2>

            <p className={`${styles.showcaseCopy} font-lato`}>
              A magazine exploring how artificial intelligence is reshaping
              technology, creativity and the world around us. Discover ideas,
              insights and perspectives on the future of AI.
            </p>

            <div className={styles.showcaseMeta}>
              <span>PDF &middot; {CURRENT.size}</span>
              <span className={styles.metaDot} />
              <span>{CURRENT.pages} pages</span>
            </div>

            <a
              href={CURRENT.pdf}
              download
              className={`${styles.downloadBtn} font-lato`}
            >
              <DownloadIcon />
              Download the {CURRENT.year} issue
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Inside this issue ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={`${styles.eyebrowSmall} font-lato`}>
            Inside the {CURRENT.year} issue
          </span>

          <h2 className={`${styles.sectionTitle} font-inter`}>
            What you&apos;ll find
          </h2>
        </div>

        <div className={styles.pillarGrid}>
          {CONTENTS.map((c) => (
            <div key={c.title} className={styles.pillarCard}>
              <span className={`${styles.pillarTag} font-inter`}>{c.tag}</span>
              <h3 className="font-inter">{c.title}</h3>
              <p className="font-lato">{c.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Archive ---------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={`${styles.eyebrowSmall} font-lato`}>Archive</span>

          <h2 className={`${styles.sectionTitle} font-inter`}>Past editions</h2>
        </div>

        <div className={styles.archiveGrid}>
          {ARCHIVE.map((mag) => (
            <div key={mag.year} className={styles.archiveCard}>
              <ArchiveCover cover={mag.cover} year={mag.year} />

              <div className={styles.archiveMeta}>
                <div className={styles.archiveMetaText}>
                  <span className={`${styles.archiveYear} font-inter`}>
                    {mag.year}
                  </span>
                  <span className={`${styles.archivePages} font-lato`}>
                    {mag.pages} pages &middot; {mag.size}
                  </span>
                </div>

                <a
                  href={mag.pdf}
                  download
                  aria-label={`Download the ${mag.year} magazine`}
                  className={styles.archiveDownload}
                >
                  <DownloadIcon size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
