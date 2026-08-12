"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Users,
  Code,
  Award,
  Globe,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Inter, Lato } from "next/font/google";
import styles from "./page.module.css";

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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzepenod";

/* ─────────────────────────────────────────────────
   MEMBERSHIP DATA
   ───────────────────────────────────────────────── */

const MEMBERSHIP_STATS = [
  { value: "500+", label: "Active Members" },
  { value: "10+", label: "Events / Year" },
  { value: "50+", label: "Workshops Conducted" },
  { value: "2000+", label: "Alumni Network" },
];

const BENEFITS = [
  {
    icon: Users,
    title: "Vibrant Community",
    description:
      "Join 500+ passionate students, alumni, and industry professionals collaborating on projects, sharing knowledge, and building lifelong connections.",
  },
  {
    icon: Code,
    title: "Hands-on Learning",
    description:
      "Access 40+ annual workshops, hackathons, and technical sessions covering AI/ML, web dev, cybersecurity, cloud, and emerging technologies.",
  },
  {
    icon: Award,
    title: "Recognition & Rewards",
    description:
      "Earn certificates, badges, and awards for participation, volunteering, and excellence. Build a portfolio that stands out to employers.",
  },
  {
    icon: Globe,
    title: "National Network",
    description:
      "Connect with CSI's 500+ chapters across India. Participate in national conventions, competitions, and student exchanges.",
  },
  {
    icon: Zap,
    title: "Leadership Opportunities",
    description:
      "Run for core committee positions, lead domains, organize events, and develop real-world leadership and project management skills.",
  },
  {
    icon: Shield,
    title: "Career Support",
    description:
      "Access exclusive job/internship boards, resume reviews, mock interviews, and direct referrals from our alumni and corporate network.",
  },
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
    answer:
      "Any active student at SFIT can join as a Student Member. Alumni and working professionals can join as Professional Members. Companies and organizations can become Corporate Partners.",
  },
  {
    question: "What is the membership validity?",
    answer:
      "All memberships are valid for one academic year (August–July). Renewals open in July for the next academic year. Corporate partnerships are annual with multi-year options available.",
  },
  {
    question: "How do I pay for membership?",
    answer:
      "Payments can be made via UPI, bank transfer, or online payment gateway. Details are shared after you submit the membership form. Student members can also pay in person at the CSI office during office hours.",
  },
  {
    question: "Can I upgrade my membership tier later?",
    answer:
      "Yes! You can upgrade from Student to Professional at any time by paying the difference. Contact us at membership@csi-sfit.org for assistance with upgrades.",
  },
  {
    question: "What happens if I graduate?",
    answer:
      "Student membership converts to Professional membership upon graduation at a discounted renewal rate. Your membership continuity and benefits remain intact.",
  },
  {
    question: "Are there any prerequisites to join?",
    answer:
      "No prerequisites! Just an interest in technology and a willingness to learn, contribute, and grow with the community. All skill levels and departments are welcome.",
  },
];

export default function MembershipPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    department: "",
    interests: [],
  });
  const [agreed, setAgreed] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | submitting | success | error

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    setSubmitStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          year: formData.year,
          department: formData.department,
          interests: formData.interests.join(", "),
          agreed,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          year: "",
          department: "",
          interests: [],
        });
        setAgreed(false);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Membership form submission failed", error);
      setSubmitStatus("error");
    }
  };

  return (
    <main className={`${inter.variable} ${lato.variable} ${styles.page}`}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />

        <span className={styles.eyebrow}>
          {/* <span className={styles.eyebrowDot} /> */}
          Join the Community
        </span>

        <h1 className={styles.heroTitle}>
          Become a <span className={styles.gradientText}>CSI Member</span>
        </h1>

        <p className={styles.heroSub}>
          Unlock access to workshops, hackathons, mentorship, career
          opportunities, and a nationwide network of 500+ chapters. Your gateway
          to growth starts here.
        </p>

        <div className={styles.heroStats}>
          {MEMBERSHIP_STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className={styles.benefitsSection}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrowSmall}>Why Join Us</span>
          <h2 className={styles.sectionTitle}>Benefits That Matter</h2>
          <p className={styles.sectionSub}>
            More than a membership — it's your launchpad for growth
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          {BENEFITS.map((benefit, i) => (
            <div key={benefit.title} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <benefit.icon size={24} />
              </div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDesc}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Membership Form ─── */}
      <section className={styles.formSection}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrowSmall}>Apply Today</span>
          <h2 className={styles.sectionTitle}>Become a Member</h2>
          <p className={styles.sectionSub}>
            Share your details and join CSI SFIT's growing tech community.
          </p>
        </div>

        <div className={styles.formLayout}>
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span className={styles.label}>Full Name *</span>
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Email Address *</span>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Phone Number *</span>
                  <input
                    className={styles.input}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Academic Year *</span>
                  <select
                    className={styles.select}
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  >
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
                <select
                  className={styles.select}
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
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
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`${styles.interestChip} ${formData.interests.includes(interest) ? styles.interestChipActive : ""}`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <span>
                  I agree to be contacted by CSI SFIT regarding membership
                  updates.
                </span>
              </label>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={submitStatus === "submitting"}
              >
                {submitStatus === "submitting"
                  ? "Submitting..."
                  : "Join CSI SFIT"}
                <ArrowRight size={16} />
              </button>

              {submitStatus === "success" && (
                <p className={styles.formStatusSuccess} role="status">
                  Thanks for applying! We'll be in touch soon.
                </p>
              )}
              {submitStatus === "error" && (
                <p className={styles.formStatusError} role="alert">
                  Something went wrong submitting the form. Please try again or
                  email us directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className={styles.faqSection}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrowSmall}>Questions?</span>
          <h2 className={styles.sectionTitle}>Frequently Asked</h2>
          <p className={styles.sectionSub}>
            Everything you need to know before joining
          </p>
        </div>

        <div className={styles.faqGrid}>
          {FAQ.map((faq, i) => (
            <div key={i} className={styles.faqCard}>
              <button
                className={`${styles.faqQuestion} ${activeFaq === i ? styles.faqOpen : ""}`}
                onClick={() => toggleFaq(i)}
                aria-expanded={activeFaq === i}
              >
                <span className={styles.faqQuestionText}>{faq.question}</span>
                <div
                  className={`${styles.faqIcon} ${activeFaq === i ? styles.faqIconOpen : ""}`}
                >
                  <ChevronDown size={20} />
                </div>
              </button>

              {activeFaq === i && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}