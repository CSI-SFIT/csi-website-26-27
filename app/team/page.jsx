"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Users, Code, Palette, Megaphone, TrendingUp, Camera, GraduationCap } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { BlurFade } from "../../components/ui/blur-fade";
import styles from "./page.module.css";
import { Inter, Lato } from "next/font/google";
import { teamData2025, teamData2026 } from "./teamData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-lato", display: "swap" });

const YEARS = ["2025-26", "2026-27"];

const DOMAINS = [
  { id: "faculty", label: "Faculty", icon: GraduationCap, iconBg: "bg-orange-500/15", iconColor: "text-orange-400", color: "orange" },
  { id: "core", label: "Core Team", icon: Users, iconBg: "bg-blue-500/15", iconColor: "text-blue-400", color: "blue" },
  { id: "tech", label: "Tech Team", icon: Code, iconBg: "bg-emerald-500/15", iconColor: "text-emerald-400", color: "emerald" },
  { id: "creative", label: "Creative Team", icon: Palette, iconBg: "bg-purple-500/15", iconColor: "text-purple-400", color: "purple" },
  { id: "pr", label: "PR Team", icon: Megaphone, iconBg: "bg-pink-500/15", iconColor: "text-pink-400", color: "pink" },
  { id: "marketing", label: "Marketing Team", icon: TrendingUp, iconBg: "bg-amber-500/15", iconColor: "text-amber-400", color: "amber" },
  { id: "multimedia", label: "Multimedia Team", icon: Camera, iconBg: "bg-cyan-500/15", iconColor: "text-cyan-400", color: "cyan" },
];

const SOCIAL_ICONS = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  instagram: FaInstagram,
};

function enrichMember(member, domainId, index, year) {
  const yearSuffix = year === "2025-26" ? "202526" : "202627";
  const defaultSocials = {
    linkedin: `https://linkedin.com/in/${domainId}${index}${yearSuffix}`,
    github: `https://github.com/${domainId}${index}${yearSuffix}`,
    instagram: `https://instagram.com/${domainId}${index}${yearSuffix}`,
  };
  return {
    id: `${domainId}-${year}-${index}`,
    name: member.name,
    role: member.role,
    avatar: member.avatar,
    socials: member.socials || defaultSocials,
  };
}

function generateTeamData(year) {
  const sourceData = year === "2025-26" ? teamData2025 : teamData2026;
  const data = {};
  DOMAINS.forEach(domain => {
    const members = sourceData[domain.id] || [];
    data[domain.id] = members.map((member, i) => enrichMember(member, domain.id, i, year));
  });
  return data;
}

const SOCIAL_LINKS = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "github", label: "GitHub" },
  { key: "instagram", label: "Instagram" },
];

function SocialLinks({ socials }) {
  return (
    <div className={styles.memberSocials} role="list" aria-label="Social media links">
      {SOCIAL_LINKS.map(({ key, label }) => {
        const Icon = SOCIAL_ICONS[key];
        return (
          <a
            key={key}
            href={socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={label}
          >
            <Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

function MemberCard({ member, index }) {
  return (
    <BlurFade delay={0.1 + index * 0.05} inView className={styles.memberCard}>
      <Image
        src={member.avatar}
        alt={`${member.name}'s profile`}
        width={300}
        height={300}
        className={styles.memberAvatar}
        loading="lazy"
        unoptimized
      />
      <h3 className={styles.memberName}>{member.name}</h3>
      <p className={styles.memberRole}>{member.role}</p>
      <SocialLinks socials={member.socials} />
    </BlurFade>
  );
}

function DomainSection({ domain, members, year }) {
  // Separate heads from executives based on role
  const headRoles = {
    faculty: ["Convenor", "Co-Convenor"],
    core: ["Chairperson", "Vice Chairperson", "General Secretary", "Treasurer"],
    tech: ["Tech Head", "Tech Joint Head"],
    creative: ["Creative Head", "Creative Joint Head"],
    pr: ["PR Head", "PR Joint Head"],
    marketing: ["Marketing Head", "Marketing Joint Head"],
    multimedia: ["Multimedia Head", "Multimedia Joint Head"],
  };

  // For 2026-27, marketing has only 1 Joint Head
  const marketingHeadRoles2027 = ["Marketing Head", "Marketing Joint Head"];

  const isMarketing2027 = domain.id === "marketing" && year === "2026-27";
  const rolesToCheck = isMarketing2027 ? marketingHeadRoles2027 : (headRoles[domain.id] || []);

  const heads = members.filter(m => rolesToCheck.includes(m.role));
  const executives = members.filter(m => !rolesToCheck.includes(m.role));

  const isFaculty = domain.id === "faculty";
  const isCore = domain.id === "core";

  return (
    <section key={domain.id} className={styles.domainSection} aria-labelledby={`${domain.id}-heading`}>
      <header className={styles.domainHeader}>
        <div className={`${styles.domainIcon} ${domain.iconBg} ${domain.iconColor}`}>
          <domain.icon size={22} aria-hidden="true" />
        </div>
        <h2 id={`${domain.id}-heading`} className={styles.domainTitle}>{domain.label}</h2>
        <span className={styles.domainCount}>{members.length} member{members.length !== 1 ? "s" : ""}</span>
      </header>

      {heads.length > 0 && (
        <div className={`${styles.headsRow} ${isFaculty ? styles.facultyHeads : ""} ${isCore ? styles.coreHeads : ""}`} role="list">
          {heads.map((member, i) => (
            <article key={member.id} className={styles.fadeIn} role="listitem" style={{ animationDelay: `${i * 100}ms` }}>
              <MemberCard member={member} index={i} isHead={true} />
            </article>
          ))}
        </div>
      )}

      {executives.length > 0 && (
        <div className={`${styles.executivesGrid} ${isCore ? styles.coreExecutives : ""}`} role="list">
          {executives.map((member, i) => (
            <article key={member.id} className={styles.fadeIn} role="listitem" style={{ animationDelay: `${(i + heads.length) * 50}ms` }}>
              <MemberCard member={member} index={i + heads.length} />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function YearNavigation({ currentYear, onYearChange }) {
  const currentIndex = YEARS.indexOf(currentYear);
  return (
    <nav className={styles.yearNav} aria-label="Academic year navigation">
      <button
        onClick={() => onYearChange(YEARS[currentIndex - 1])}
        disabled={currentIndex === 0}
        className={styles.yearButton}
        aria-label="Previous academic year"
        aria-disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <span className={styles.yearDisplay} aria-live="polite">{currentYear}</span>
      <button
        onClick={() => onYearChange(YEARS[currentIndex + 1])}
        disabled={currentIndex === YEARS.length - 1}
        className={styles.yearButton}
        aria-label="Next academic year"
        aria-disabled={currentIndex === YEARS.length - 1}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </nav>
  );
}

export default function TeamPage() {
  const [currentYear, setCurrentYear] = useState("2026-27");

  const teamData = useMemo(() => generateTeamData(currentYear), [currentYear]);

  const domainSections = DOMAINS.map(domain => ({
    ...domain,
    members: teamData[domain.id] || [],
  })).filter(section => section.members.length > 0);

  return (
    <main className={`${styles.teamPage} ${inter.variable} ${lato.variable} font-lato`}>
      <section className={styles.section} aria-labelledby="team-heading">
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.headerLabel}>Our Team</p>
            <h1 id="team-heading" className={styles.headerTitle}>
              Meet the <span className={styles.headerTitleAccent}>CSI SFIT</span> Family
            </h1>
          </header>

          <YearNavigation currentYear={currentYear} onYearChange={setCurrentYear} />

          {domainSections.map((section, idx) => (
            <DomainSection key={section.id} domain={section} members={section.members} year={currentYear} index={idx} />
          ))}
        </div>
      </section>
    </main>
  );
}