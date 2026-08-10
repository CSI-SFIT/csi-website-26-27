"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Check, HelpCircle, Users, Code, Award, Globe, Zap, Shield, Sparkles, Star, ArrowRight, BookOpen, Network, Rocket, GraduationCap, Briefcase, Building2, Calendar, Lightbulb } from "lucide-react";
import { Inter, Lato } from "next/font/google";
import { BlurFade } from "../../components/ui/blur-fade";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-lato", display: "swap" });

/* ─────────────────────────────────────────────────
   MEMBERSHIP TIERS DATA
   ───────────────────────────────────────────────── */

const TIERS = [
  {
    id: "student",
    name: "Student Member",
    subtitle: "For active SFIT students",
    price: "₹500",
    period: "/year",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
    icon: GraduationCap,
    popular: false,
    features: [
      "Access to all workshops & webinars",
      "Priority registration for events",
      "Member-only Discord community",
      "Certificate of membership",
      "Discount on flagship events (15%)",
      "Access to job/internship board",
      "Mentorship program eligibility",
      "CSI digital membership card",
    ],
    cta: "Join as Student",
    href: "/contact?type=student-membership",
  },
  {
    id: "professional",
    name: "Professional Member",
    subtitle: "For alumni & working professionals",
    price: "₹1,500",
    period: "/year",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    icon: Briefcase,
    popular: true,
    features: [
      "Everything in Student tier",
      "Speak at CSI events & workshops",
      "Access to alumni network",
      "Exclusive industry roundtables",
      "Discount on flagship events (25%)",
      "Job referral network access",
      "Technical blog publication opportunity",
      "Mentor student members",
      "Annual CSI magazine (physical copy)",
    ],
    cta: "Join as Professional",
    href: "/contact?type=professional-membership",
  },
  {
    id: "corporate",
    name: "Corporate Partner",
    subtitle: "For companies & organizations",
    price: "₹50,000",
    period: "/year",
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
    icon: Building2,
    popular: false,
    features: [
      "Everything in Professional tier",
      "Branding at all CSI events",
      "Recruitment drive access",
      "Dedicated booth at flagship events",
      "Co-host workshops & hackathons",
      "Access to student talent pool",
      "Tech talk / seminar slot",
      "Logo on CSI website & collateral",
      "Annual impact report",
      "5 professional memberships included",
    ],
    cta: "Become a Partner",
    href: "/contact?type=corporate-partnership",
  },
];

const BENEFITS = [
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Join 500+ passionate students, alumni, and industry professionals collaborating on projects, sharing knowledge, and building lifelong connections.",
  },
  {
    icon: Code,
    title: "Hands-on Learning",
    description: "Access 40+ annual workshops, hackathons, and technical sessions covering AI/ML, web dev, cybersecurity, cloud, and emerging technologies.",
  },
  {
    icon: Award,
    title: "Recognition & Rewards",
    description: "Earn certificates, badges, and awards for participation, volunteering, and excellence. Build a portfolio that stands out to employers.",
  },
  {
    icon: Globe,
    title: "National Network",
    description: "Connect with CSI's 500+ chapters across India. Participate in national conventions, competitions, and student exchanges.",
  },
  {
    icon: Zap,
    title: "Leadership Opportunities",
    description: "Run for core committee positions, lead domains, organize events, and develop real-world leadership and project management skills.",
  },
  {
    icon: Shield,
    title: "Career Support",
    description: "Access exclusive job/internship boards, resume reviews, mock interviews, and direct referrals from our alumni and corporate network.",
  },
];

const MEMBERSHIP_STATS = [
  { value: "500+", label: "Active Members" },
  { value: "10+", label: "Events / Year" },
  { value: "50+", label: "Workshops Conducted" },
  { value: "2000+", label: "Alumni Network" },
];

const WHY_JOIN_POINTS = [
  { icon: Users, title: "Industry mentors and peers", description: "Learn from alumni, professionals, and fellow student innovators." },
  { icon: BookOpen, title: "Learning resources", description: "Access curated materials, workshops, and project opportunities." },
  { icon: Rocket, title: "Career acceleration", description: "Get priority access to events, internships, and placement guidance." },
  { icon: Calendar, title: "Leadership exposure", description: "Build real-world organizing and communication skills through CSI initiatives." },
  { icon: Lightbulb, title: "Innovation projects", description: "Collaborate on hackathons, research, and prototype development." },
  { icon: Award, title: "Recognition", description: "Earn certificates and grow your portfolio through participation." },
];

const INTEREST_OPTIONS = [
  "Web Development",
  "Mobile App Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
  "Blockchain",
  "IoT",
  "Game Development",
];

const FAQ = [
  {
    question: "Who can become a CSI SFIT member?",
    answer: "Any active student at SFIT can join as a Student Member. Alumni and working professionals can join as Professional Members. Companies and organizations can become Corporate Partners.",
  },
  {
    question: "What is the membership validity?",
    answer: "All memberships are valid for one academic year (August–July). Renewals open in July for the next academic year. Corporate partnerships are annual with multi-year options available.",
  },
  {
    question: "How do I pay for membership?",
    answer: "Payments can be made via UPI, bank transfer, or online payment gateway. Details are shared after you submit the membership form. Student members can also pay in person at the CSI office during office hours.",
  },
  {
    question: "Can I upgrade my membership tier later?",
    answer: "Yes! You can upgrade from Student to Professional at any time by paying the difference. Contact us at membership@csi-sfit.org for assistance with upgrades.",
  },
  {
    question: "What happens if I graduate?",
    answer: "Student membership converts to Professional membership upon graduation at a discounted renewal rate. Your membership continuity and benefits remain intact.",
  },
  {
    question: "Are there any prerequisites to join?",
    answer: "No prerequisites! Just an interest in technology and a willingness to learn, contribute, and grow with the community. All skill levels and departments are welcome.",
  },
];

// Icon components for tiers
function GraduationCapIcon({ className }) {
  return <GraduationCap size={28} className={className} />;
}
function BriefcaseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
function Building2Icon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

const TIER_ICONS = {
  student: GraduationCapIcon,
  professional: BriefcaseIcon,
  corporate: Building2Icon,
};

export default function MembershipPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    department: "",
    interests: [],
  });
  const [agreed, setAgreed] = useState(false);
  const tiersRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestToggle = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter((item) => item !== interest)
        : [...formData.interests, interest],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCeLaKqxz3ZX8H3EM5_PD340vAHh0ywfMvXTMR-mIeJ397hiTkCJ_lc2gGSNhATmW6/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, agreed }),
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        year: "",
        department: "",
        interests: [],
      });
      setAgreed(false);
    } catch (error) {
      console.error("Membership form submission failed", error);
    }
  };

  return (
    <main className={`${inter.variable} ${lato.variable} ${styles.page}`}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />

        <BlurFade delay={0.1} inView>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Join the Community
          </span>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h1 className={styles.heroTitle}>
            Become a <span className={styles.gradientText}>CSI Member</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className={styles.heroSub}>
            Unlock access to workshops, hackathons, mentorship, career opportunities, and a nationwide network of 500+ chapters. Your gateway to growth starts here.
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className={styles.heroStats}>
            {MEMBERSHIP_STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* ─── Membership Tiers ─── */}
      <section className={styles.tiersSection} ref={tiersRef}>
        <BlurFade delay={0.1} inView>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrowSmall}>Choose Your Path</span>
            <h2 className={styles.sectionTitle}>Membership Tiers</h2>
            <p className={styles.sectionSub}>Select the tier that matches your journey — from student to industry leader</p>
          </div>
        </BlurFade>

        <div className={styles.tiersGrid}>
          {TIERS.map((tier, i) => {
            const TierIcon = TIER_ICONS[tier.id];
            return (
              <BlurFade key={tier.id} delay={0.2 + i * 0.1} inView>
                <motion.div
                  className={`${styles.tierCard} ${tier.popular ? styles.tierPopular : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {tier.popular && (
                    <div className={styles.popularBadge}>
                      <Star size={14} className={styles.popularStar} />
                      Most Popular
                    </div>
                  )}

                  <div className={styles.tierIconWrap} style={{ background: tier.gradient }}>
                    <TierIcon className={styles.tierIcon} />
                  </div>

                <div className={styles.tierContent}>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <p className={styles.tierSubtitle}>{tier.subtitle}</p>

                  <div className={styles.tierPrice}>
                    <span className={styles.price}>{tier.price}</span>
                    <span className={styles.period}>{tier.period}</span>
                  </div>
                </div>

                <ul className={styles.featuresList} role="list">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <Check size={16} className={styles.featureCheck} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                  <a
                    href={tier.href}
                    className={`${styles.tierCta} ${tier.popular ? styles.ctaPrimary : styles.ctaSecondary}`}
                  >
                    {tier.cta}
                    <ArrowRight size={16} />
                  </a>
                </motion.div>
              </BlurFade>
            );
          })}
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className={styles.benefitsSection}>
        <BlurFade delay={0.1} inView>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrowSmall}>Why Join Us</span>
            <h2 className={styles.sectionTitle}>Benefits That Matter</h2>
            <p className={styles.sectionSub}>More than a membership — it's your launchpad for growth</p>
          </div>
        </BlurFade>

        <div className={styles.benefitsGrid}>
          {BENEFITS.map((benefit, i) => (
            <BlurFade key={benefit.title} delay={0.2 + i * 0.08} inView>
              <motion.div
                className={styles.benefitCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.benefitIcon}>
                  <benefit.icon size={24} />
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDesc}>{benefit.description}</p>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ─── Membership Form ─── */}
      <section className={styles.formSection}>
        <BlurFade delay={0.1} inView>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrowSmall}>Apply Today</span>
            <h2 className={styles.sectionTitle}>Become a Member</h2>
            <p className={styles.sectionSub}>Share your details and join CSI SFIT’s growing tech community.</p>
          </div>
        </BlurFade>

        <div className={styles.formLayout}>
          <BlurFade delay={0.2} inView>
            <motion.div className={styles.formCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <label className={styles.field}>
                    <span className={styles.label}>Full Name *</span>
                    <input className={styles.input} type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your full name" required />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Email Address *</span>
                    <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" required />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Phone Number *</span>
                    <input className={styles.input} type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" required />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Academic Year *</span>
                    <select className={styles.select} name="year" value={formData.year} onChange={handleInputChange} required>
                      <option value="">Select Year</option>
                      <option value="first">First Year</option>
                      <option value="second">Second Year</option>
                      <option value="third">Third Year</option>
                      <option value="final">Final Year</option>
                    </select>
                  </label>
                </div>

                <label className={styles.field}>
                  <span className={styles.label}>Department *</span>
                  <select className={styles.select} name="department" value={formData.department} onChange={handleInputChange} required>
                    <option value="">Select Department</option>
                    <option value="computer">Computer Engineering</option>
                    <option value="it">Information Technology</option>
                    <option value="electronics">Electronics Engineering</option>
                    <option value="extc">Electronics & Telecommunication</option>
                    <option value="mechanical">Mechanical Engineering</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <div className={styles.interestSection}>
                  <span className={styles.label}>Areas of Interest</span>
                  <div className={styles.interestGrid}>
                    {INTEREST_OPTIONS.map((interest) => (
                      <motion.button
                        key={interest}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleInterestToggle(interest)}
                        className={`${styles.interestChip} ${formData.interests.includes(interest) ? styles.interestChipActive : ""}`}
                      >
                        {interest}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <label className={styles.checkboxRow}>
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
                  <span>I agree to be contacted by CSI SFIT regarding membership updates.</span>
                </label>

                <button type="submit" className={styles.submitButton}>
                  Join CSI SFIT
                  <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <motion.div className={styles.reasonCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h3 className={styles.reasonTitle}>Why Join CSI SFIT?</h3>
              <ul className={styles.reasonList}>
                {WHY_JOIN_POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <li key={point.title} className={styles.reasonItem}>
                      <div className={styles.reasonIcon}><Icon size={18} /></div>
                      <div>
                        <h4 className={styles.reasonHeading}>{point.title}</h4>
                        <p className={styles.reasonText}>{point.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </BlurFade>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className={styles.faqSection}>
        <BlurFade delay={0.1} inView>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrowSmall}>Questions?</span>
            <h2 className={styles.sectionTitle}>Frequently Asked</h2>
            <p className={styles.sectionSub}>Everything you need to know before joining</p>
          </div>
        </BlurFade>

        <div className={styles.faqGrid}>
          {FAQ.map((faq, i) => (
            <BlurFade key={i} delay={0.2 + i * 0.06} inView>
              <motion.div
                className={styles.faqCard}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  className={`${styles.faqQuestion} ${activeFaq === i ? styles.faqOpen : ""}`}
                  onClick={() => toggleFaq(i)}
                  aria-expanded={activeFaq === i}
                >
                  <span className={styles.faqQuestionText}>{faq.question}</span>
                  <div className={`${styles.faqIcon} ${activeFaq === i ? styles.faqIconOpen : ""}`}>
                    <ChevronDown size={20} />
                  </div>
                  <HelpCircle size={20} className={styles.helpIcon} />
                </button>

                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.ctaSection}>
        <BlurFade delay={0.1} inView>
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
            <p className={styles.ctaDesc}>Join 500+ members building the future of tech at SFIT. Membership takes 2 minutes.</p>
            <div className={styles.ctaButtons}>
              <a href="/contact?type=student-membership" className={styles.ctaPrimaryBtn}>
                <Sparkles size={18} />
                Join as Student
              </a>
              <a href="/contact?type=professional-membership" className={styles.ctaSecondaryBtn}>
                <Network size={18} />
                Join as Professional
              </a>
            </div>
            <p className={styles.ctaNote}>Questions? Email us at <a href="mailto:membership@csi-sfit.org" className={styles.emailLink}>membership@csi-sfit.org</a></p>
          </div>
        </BlurFade>
      </section>

      {/* ─── Scroll indicator ─── */}
      {scrolled && (
        <div className={styles.scrollTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ChevronUp size={20} />
        </div>
      )}
    </main>
  );
}