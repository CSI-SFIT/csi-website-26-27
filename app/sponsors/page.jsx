"use client";

import { useEffect } from "react";
import { ExternalLink, Handshake } from "lucide-react";
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

const PREVIOUS_SPONSORS = [
  {
    id: "aecc",
    name: "AECC Study Abroad Consultants",
    logo: "/sponcers_logos/aecc.png",
    description:
      "Supporting students with guidance and opportunities for pursuing higher education abroad.",
    website: "https://www.aeccglobal.in/",
    contribution: "Previous sponsor partner",
  },
  {
    id: "bassein",
    name: "Bassein Catholic Bank",
    logo: "/sponcers_logos/bassein_atholic_bank.jpeg",
    description:
      "A trusted banking partner supporting student initiatives, events, and activities at CSI SFIT.",
    website: "https://bccb.bank.in/",
    contribution: "Previous sponsor partner",
  },
  {
    id: "itvedant",
    name: "IT Vedant",
    logo: "/sponcers_logos/it_vedant.jpeg",
    description:
      "Empowering students through industry-focused technology education, skills, and career opportunities.",
    website: "https://www.itvedant.com/",
    contribution: "Previous sponsor partner",
  },
  {
    id: "sixsense",
    name: "Sixsense",
    logo: "/sponcers_logos/sixsense.jpeg",
    description:
      "An energy drink brand supporting student events and helping keep participants energized throughout our activities.",
    website: "https://www.sixsenseenergydrink.com/",
    contribution: "Previous sponsor partner",
  },
];

function SponsorCard({ sponsor, index }) {
  return (
    <div className={styles.sponsorCard}>
      <div className={styles.cardInner}>
        <div className={styles.logoWrap}>
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className={styles.sponsorLogo}
          />
        </div>
        <h3 className={`${styles.sponsorName} font-inter`}>{sponsor.name}</h3>
        <p className={`${styles.sponsorDescription} font-lato`}>
          {sponsor.description}
        </p>
        <p className={`${styles.sponsorContribution} font-lato`}>
          {sponsor.contribution}
        </p>
        <a
          href={sponsor.website}
          target="_blank"
          className={`${styles.sponsorLink} font-lato`}
          aria-label={`Visit ${sponsor.name}`}
        >
          <span>Visit</span>
          <ExternalLink className={styles.linkIcon} />
        </a>
      </div>
    </div>
  );
}

export default function SponsorsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className={`${styles.page} ${inter.variable} ${lato.variable}`}>
      <section className={styles.hero}>
        <div className={styles.heroWrapper}>
          <p className={`${styles.heroLabel} font-lato`}>Sponsors</p>
          <h1 className={`${styles.heroTitle} font-inter`}>
            This year has no active sponsors,
            <br />
            but we honor our <span>previous partners.</span>
          </h1>
          <p className={`${styles.heroCopy} font-lato`}>
            CSI SFIT is grateful for every organisation that has supported our
            journey. Browse the reserved slots for previous sponsors and connect
            with us to partner in the next season.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={`${styles.sectionLabel} font-lato`}>
            Previous Sponsors
          </p>
        </div>

        <div className={styles.sponsorGrid}>
          {PREVIOUS_SPONSORS.map((sponsor, index) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
