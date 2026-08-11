"use client";

import { useEffect } from "react";
import { ExternalLink, Handshake } from "lucide-react";
import { BlurFade } from "../../components/ui/blur-fade";
import styles from "./page.module.css";

const PREVIOUS_SPONSORS = [
  {
    id: "aecc",
    name: "AECC Study Abroad Consultants",
    logo: "/sponcers_logos/aecc.png",
    description: "Expert overseas education partners who have supported our student development initiatives.",
    website: "https://www.aeccglobal.in/",
    contribution: "Previous sponsor partner",
  },
  {
    id: "bassein",
    name: "Bassein Catholic Bank",
    logo: "/sponcers_logos/bassein_atholic_bank.jpeg",
    description: "Financial services partner supporting our chapter's events and student programmes.",
    website: "#",
    contribution: "Previous sponsor partner",
  },
  {
    id: "itvedant",
    name: "IT Vedant",
    logo: "/sponcers_logos/it_vedant.jpeg",
    description: "Technology education supporters who have helped CSI SFIT deliver more practical learning experiences.",
    website: "#",
    contribution: "Previous sponsor partner",
  },
  {
    id: "sixsense",
    name: "Sixsense",
    logo: "/sponcers_logos/sixsense.jpeg",
    description: "Innovation and analytics partner that has supported our technical outreach and workshops.",
    website: "#",
    contribution: "Previous sponsor partner",
  },
];

function SponsorCard({ sponsor, index }) {
  return (
    <BlurFade className={styles.sponsorCard} delay={index * 0.05}>
      <div className={styles.cardInner}>
        <div className={styles.logoWrap}>
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className={styles.sponsorLogo}
          />
        </div>
        <h3 className={styles.sponsorName}>{sponsor.name}</h3>
        <p className={styles.sponsorDescription}>{sponsor.description}</p>
        <p className={styles.sponsorContribution}>{sponsor.contribution}</p>
        <a
          href={sponsor.website}
          className={styles.sponsorLink}
          aria-label={`Visit ${sponsor.name}`}
        >
          <span>Visit</span>
          <ExternalLink className={styles.linkIcon} />
        </a>
      </div>
    </BlurFade>
  );
}

export default function SponsorsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroWrapper}>
          <p className={styles.heroLabel}>Sponsors</p>
          <h1 className={styles.heroTitle}>
            This year has no active sponsors,
            <br />
            but we honor our <span>previous partners.</span>
          </h1>
          <p className={styles.heroCopy}>
            CSI SFIT is grateful for every organisation that has supported our
            journey. Browse the reserved slots for previous sponsors and connect
            with us to partner in the next season.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionLabel}>Previous Sponsors</p>
          <h2 className={styles.sectionTitle}>Reserved sponsor slots</h2>
          <p className={styles.sectionText}>
            There are no current sponsors this year. Below are the four reserved
            cards for past sponsors who have contributed to CSI SFIT.
          </p>
        </div>

        <div className={styles.sponsorGrid}>
          {PREVIOUS_SPONSORS.map((sponsor, index) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
          ))}
        </div>
      </section>

      <section className={styles.kitSection}>
        <div className={styles.kitCard}>
          <div className={styles.kitIcon} aria-hidden="true">
            <Handshake />
          </div>
          <div>
            <h3 className={styles.kitTitle}>Interested in partnering?</h3>
            <p className={styles.kitText}>
              Reach out to learn about sponsorship opportunities for the next
              academic year and how your brand can support student innovation.
            </p>
          </div>
          <a href="/contact" className={styles.kitButton}>
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
