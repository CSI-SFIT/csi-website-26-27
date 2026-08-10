"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, MapPin, Mail, Phone, Clock } from "lucide-react";
import { BlurFade } from "../../components/ui/blur-fade.jsx";
import { Inter, Lato } from "next/font/google";
import styles from "./page.module.css";

/* ─── Fonts ─────────────────────────────────────────────────── */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

/* ─── WhatsApp Icon ─────────────────────────────────────────── */

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─── Contact Page ──────────────────────────────────────────── */

export default function Contact() {
  const formRef = useRef(null);

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (!form) return;

    const formData = new FormData(form);

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const subject = formData.get("subject")?.trim();
    const message = formData.get("message")?.trim();

    /* ─── Client-side validation ───────────────────────────── */

    if (!name || !email || !subject || !message) {
      setStatus("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    /* ─── Submit to Formspree ──────────────────────────────── */

    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("https://formspree.io/f/xjybynwn", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        form.reset();
      } else {
        const data = await response.json();

        if (data?.errors) {
          setStatus(data.errors.map((error) => error.message).join(", "));
        } else {
          setStatus("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("Formspree error:", error);

      setStatus("Unable to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`${styles.page} ${inter.variable} ${lato.variable}`}>
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <BlurFade delay={0.1} inView>
          <div className={styles.heroLabel}>Get In Touch</div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h1 className={styles.heroTitle}>
            Contact <span className={styles.highlight}>Us</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className={styles.heroSub}>
            Have a question, want to collaborate, or interested in joining CSI
            SFIT? We would love to hear from you.
          </p>
        </BlurFade>
      </section>

      {/* ======================================================
          CONTACT FORM
      ====================================================== */}

      <section className={styles.section}>
        <BlurFade delay={0.1} inView>
          <div className={styles.sectionHead}>
            <span className={styles.num}>01</span>
            <h2>Send a Message</h2>
            <span className={styles.line} />
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className={styles.sectionSub}>
            Fill out the form below and our team will get back to you shortly.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className={styles.glass}>
            <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                  />
                  <label htmlFor="name">Name</label>
                </div>

                <div className={styles.field}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className={styles.field}>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
                <label htmlFor="subject">Subject</label>
              </div>

              <div className={styles.field}>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  maxLength={500}
                  required
                />
                <label htmlFor="message">Message</label>
              </div>

              <button
                type="submit"
                className={styles.sendBtn}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>

                {!isSubmitting && <ArrowRight size={18} />}
              </button>

              {status && <p className={styles.status}>{status}</p>}
            </form>
          </div>
        </BlurFade>
      </section>

      {/* ======================================================
          CONTACT INFORMATION
      ====================================================== */}

      <section className={styles.section}>
        <BlurFade delay={0.1} inView>
          <div className={styles.sectionHead}>
            <span className={styles.num}>02</span>
            <h2>Contact Information</h2>
            <span className={styles.line} />
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className={styles.sectionSub}>
            Reach out to us through any of the channels below.
          </p>
        </BlurFade>

        <div className={styles.infoGrid}>
          <BlurFade delay={0.25} inView>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Mail size={20} />
              </div>

              <div>
                <div className={styles.infoLabel}>Email</div>

                <a href="mailto:csi@sfit.ac.in" className={styles.infoValue}>
                  csi@sfit.ac.in
                </a>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Phone size={20} />
              </div>

              <div>
                <div className={styles.infoLabel}>Phone</div>

                <div className={styles.infoValue}>
                  <a href="tel:+919967706569">Chairperson: +91 9967706569</a>

                  <br />

                  <a href="tel:+918355844274">Vice Chairperson: +91 8355844274</a>

                  <br />

                  <a href="tel:+919372692745">General Secretary: +91 9372692745</a>

                  <br />

                  <a href="tel:+919372692745">Treasurer: +91 8452809552</a>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.35} inView>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Clock size={20} />
              </div>

              <div>
                <div className={styles.infoLabel}>Office Hours</div>

                <div className={styles.infoValue}>
                  Monday – Friday
                  <br />
                  9:00 AM – 5:00 PM
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ======================================================
          LOCATION
      ====================================================== */}

      <section className={styles.section}>
        <BlurFade delay={0.1} inView>
          <div className={styles.sectionHead}>
            <span className={styles.num}>03</span>
            <h2>Location</h2>
            <span className={styles.line} />
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className={styles.sectionSub}>
            St. Francis Institute of Technology, Mount Poinsur, Borivali West,
            Mumbai – 400103
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className={styles.locationCard}>
            <iframe
              loading="lazy"
              allowFullScreen
              title="CSI SFIT Location"
              src="https://www.google.com/maps?q=St.+Francis+Institute+of+Technology+Borivali+West+Mumbai&output=embed"
            />

            <div className={styles.mapTag}>
              <MapPin size={16} />
              St. Francis Institute of Technology
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ======================================================
          WHATSAPP COMMUNITY
      ====================================================== */}

      <section className={styles.section}>
        <BlurFade delay={0.1} inView>
          <div className={styles.sectionHead}>
            <span className={styles.num}>04</span>
            <h2>Join the Community</h2>
            <span className={styles.line} />
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className={styles.sectionSub}>
            Stay updated with events, workshops, hackathons, and announcements.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className={styles.waCard}>
            <div className={styles.waIcon}>
              <WhatsAppIcon />
            </div>

            <div className={styles.waBody}>
              <div className={styles.waLabel}>WhatsApp Community</div>

              <h3 className={styles.waTitle}>Code with CSI — Stay Connected</h3>

              <p className={styles.waDesc}>
                Join our WhatsApp community for updates on events, workshops,
                hackathons, and everything happening at CSI SFIT.
              </p>
            </div>

            <a
              href="https://chat.whatsapp.com/JWRSyFzmrzT3YJFr3HIM5H"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waButton}
            >
              <WhatsAppIcon />
              Join Now
            </a>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
