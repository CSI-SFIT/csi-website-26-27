"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { NoiseTexture } from "../../components/ui/noise-texture";
import { Inter, Lato } from "next/font/google";
import Image from "next/image";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Code2,
  Trophy,
  LayoutGrid,
  Share2,
  Check,
  Camera,
  Play,
  Palette,
  Laptop,
  Ticket,
} from "lucide-react";

/* ── Fonts (same as homepage) ── */
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

/* ── Filter Tabs ── */
const TABS = [
  { id: "all", label: "All Events", Icon: LayoutGrid },
  { id: "upcoming", label: "Upcoming", Icon: Sparkles },
  { id: "flagship", label: "Flagship", Icon: Trophy },
  { id: "workshop", label: "Workshops", Icon: Code2 },
  { id: "past", label: "Past", Icon: Clock },
];

/* ─────────────────────────────────────────────────
   EVENT DATA
   ───────────────────────────────────────────────── */

const EVENTS_DATA = [
  {
    id: "csi-day-2025-26",
    title: "CSI Day 2025–26",
    tagline: "Celebrating a year of innovation, growth, and community",
    category: "flagship",
    status: "past",
    date: "August 25, 2025",
    time: "Full Day",
    venue: "SFIT Campus",
    description:
      "The annual CSI Day celebration — honouring the outgoing core committee, celebrating achievements, and welcoming the next generation of CSI SFIT leaders.",
    fullDescription:
      "CSI Day is the cornerstone event of the CSI SFIT calendar — a full-day celebration marking the end of an era and the beginning of a new one. The event features the ceremonial handover from the outgoing core committee to the incoming team, awards for outstanding contributions, fun activities, performances, and heartfelt speeches. It's a day to reflect on everything the committee accomplished and to set the vision for the year ahead.",
    tags: ["Celebration", "Core Committee", "Awards", "Community"],
    highlights: [
      "Outgoing core committee felicitation",
      "Achievement awards and certificates",
      "Year-in-review presentation",
      "Fun games and team activities",
      "New committee announcement",
    ],
    registrations: 150,
    maxCapacity: 200,
    price: "Free (CSI Members)",
    gradient: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
    Icon: Trophy,
    coverImage: null,
    images: [
      "/events/csi-day/1.webp",
      "/events/csi-day/2.webp",
      "/events/csi-day/3.webp",
      "/events/csi-day/4.webp",
      "/events/csi-day/5.webp",
      "/events/csi-day/6.webp",
      "/events/csi-day/7.webp",
      "/events/csi-day/8.webp",
    ],
    videos: [
      "/events/csi-day/video-1.webm",
      "/events/csi-day/video-2.webm",
      "/events/csi-day/video-3.webm",
      "/events/csi-day/video-4.webm",
    ],
  },
  {
    id: "nextjs-workshop",
    title: "Next.js Workshop",
    tagline: "Building modern web apps with the React framework for production",
    category: "workshop",
    status: "past",
    date: "January 21, 2026",
    time: "4:00 PM – 7:00 PM",
    venue: "SFIT Campus",
    description:
      "A hands-on workshop on building production-grade web applications using Next.js, covering routing, server components, and deployment.",
    fullDescription:
      "CSI SFIT's Next.js Workshop gave students a deep dive into the most popular React framework for production. Participants learned about file-based routing, server and client components, data fetching, API routes, and deploying to Vercel. The session included live coding demos and a mini-project that students built and deployed by the end of the workshop.",
    tags: ["Next.js", "React", "Full-Stack", "Vercel"],
    highlights: [
      "Hands-on with Next.js App Router",
      "Server Components and data fetching",
      "Built and deployed a live project",
      "Taught by experienced CSI developers",
      "Certificate of participation",
    ],
    registrations: 65,
    maxCapacity: 80,
    price: "Free",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    Icon: Laptop,
    coverImage: "./events_covers/nextjs_workshop.jpeg",
    images: [
      "/events/nextjs-workshop/1.webp",
      "/events/nextjs-workshop/2.webp",
      "/events/nextjs-workshop/3.webp",
      "/events/nextjs-workshop/4.webp",
      "/events/nextjs-workshop/5.webp",
      "/events/nextjs-workshop/6.webp",
    ],
    videos: [
      "/events/nextjs-workshop/video-1.webm",
      "/events/nextjs-workshop/video-2.webm",
    ],
  },
  {
    id: "mosaic-25",
    title: "Mosaic 25",
    tagline: "A creative fusion of technology, art, and competition",
    category: "flagship",
    status: "past",
    date: "October 17, 2025",
    time: "10:00 AM – 5:00 PM",
    venue: "SFIT Campus",
    description:
      "Mosaic — CSI SFIT's signature inter-college competition blending creativity with technology through diverse challenges.",
    fullDescription:
      "Mosaic 25 was a vibrant inter-college event that brought together students from across Mumbai for a day of creative and technical challenges. From UI/UX design battles to coding sprints, quiz rounds, and surprise events, Mosaic tested participants across multiple domains. With exciting prizes, engaging activities, and an electric atmosphere, Mosaic 25 was one of the highlights of the CSI SFIT calendar.",
    tags: ["Competition", "Inter-College", "Design", "Quiz"],
    highlights: [
      "Multiple competition tracks",
      "Participants from 15+ colleges",
      "Cash prizes and trophies",
      "Design, coding, and quiz rounds",
      "Networking and fun activities",
    ],
    registrations: 200,
    maxCapacity: 250,
    price: "₹70",
    gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    Icon: Palette,
    coverImage: "./events_covers/mosaic25.jpeg",
    images: [
      "/events/mosaic-25/1.webp",
      "/events/mosaic-25/2.webp",
      "/events/mosaic-25/4.webp",
      "/events/mosaic-25/5.webp",
      "/events/mosaic-25/6.webp",
      "/events/mosaic-25/8.webp",
      "/events/mosaic-25/9.webp",
      "/events/mosaic-25/10.webp",
    ],
    videos: [
      "/events/mosaic-25/video-1.webm",
      "/events/mosaic-25/video-2.webm",
      "/events/mosaic-25/video-3.webm",
      "/events/mosaic-25/video-4.webm",
      "/events/mosaic-25/video-5.webm",
    ],
  },
  {
    id: "frame-the-moment",
    title: "Frame the Moment",
    tagline: "Capturing life through the lens — a photography event",
    category: "workshop",
    status: "past",
    date: "August 25, 2025",
    time: "11:00 AM – 4:00 PM",
    venue: "SFIT Campus",
    description:
      "A photography event challenging participants to capture the beauty of everyday moments through creative compositions and storytelling.",
    fullDescription:
      "Frame the Moment was CSI SFIT's photography event that encouraged students to see the world through a creative lens. Participants were given themes and prompts to capture compelling photographs around the campus and beyond. The best entries were showcased in a gallery-style display, with winners selected by a panel of judges based on creativity, composition, and storytelling. The event brought together photography enthusiasts and curious beginners alike.",
    tags: ["Photography", "Creative", "Campus", "Gallery"],
    highlights: [
      "Themed photography challenges",
      "Open to all skill levels",
      "Gallery showcase of best entries",
      "Judged by professional photographers",
      "Prizes for top 3 entries",
    ],
    registrations: 90,
    maxCapacity: 120,
    price: "Free",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
    Icon: Camera,
    coverImage: "./events_covers/frame_the_moment.jpeg",
    images: [
      "/events/frame-the-moment/1.webp",
      "/events/frame-the-moment/2.webp",
      "/events/frame-the-moment/3.webp",
      "/events/frame-the-moment/4.webp",
      "/events/frame-the-moment/5.webp",
      "/events/frame-the-moment/6.webp",
    ],
    videos: [
      "/events/frame-the-moment/video-1.webm",
      "/events/frame-the-moment/video-2.webm",
      "/events/frame-the-moment/video-3.webm",
      "/events/frame-the-moment/video-4.webm",
      "/events/frame-the-moment/video-5.webm",
    ],
  },
  {
    id: "hackx",
    title: "HackX",
    tagline: "Code. Build. Innovate. CSI SFIT's premier hackathon",
    category: "flagship",
    status: "past",
    date: "April 17–18, 2026",
    time: "24 Hours",
    venue: "SFIT Campus",
    description:
      "HackX — CSI SFIT's flagship hackathon where teams build real-world solutions in 24 hours of intense coding and collaboration.",
    fullDescription:
      "HackX was CSI SFIT's premier hackathon — a 24-hour marathon of coding, creativity, and collaboration. Teams of 2–4 students tackled problem statements across domains like healthtech, edtech, fintech, and sustainability. With industry mentors guiding teams, surprise challenges to keep things exciting, and an electrifying valedictory ceremony, HackX showcased the best of student innovation. The event featured behind-the-scenes moments, geotagged activities, and an unforgettable closing ceremony.",
    tags: ["Hackathon", "Innovation", "Teamwork", "24-Hours"],
    highlights: [
      "24-hour non-stop hackathon",
      "Problem statements across 5+ domains",
      "Industry mentors and judges",
      "Cash prizes and incubation opportunities",
      "Valedictory ceremony and awards",
    ],
    registrations: 180,
    maxCapacity: 200,
    price: "₹250",
    gradient: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
    Icon: Code2,
    coverImage: "./events_covers/hackx.jpeg",
    images: [
      "/events/hackx/1.webp",
      "/events/hackx/2.webp",
      "/events/hackx/3.webp",
      "/events/hackx/4.webp",
      "/events/hackx/5.webp",
      "/events/hackx/6.webp",
      "/events/hackx/7.webp",
      "/events/hackx/8.webp",
      "/events/hackx/9.webp",
      "/events/hackx/10.webp",
      "/events/hackx/11.webp",
      "/events/hackx/12.webp",
      "/events/hackx/13.webp",
    ],
    videos: [],
  },
];

/* ── Tab counts ── */
const TAB_COUNTS = {
  all: EVENTS_DATA.length,
  upcoming: EVENTS_DATA.filter((e) => e.status === "upcoming").length,
  past: EVENTS_DATA.filter((e) => e.status === "past").length,
  flagship: EVENTS_DATA.filter((e) => e.category === "flagship").length,
  workshop: EVENTS_DATA.filter((e) => e.category === "workshop").length,
};

/* ── Main Component ── */
export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [copiedId, setCopiedId] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleImageError = (src) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  /* ── Escape key to close modal/lightbox + body scroll lock ── */
  useEffect(() => {
    if (lightboxIndex !== null || selectedEvent) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e) => {
        if (e.key === "Escape") {
          if (lightboxIndex !== null) setLightboxIndex(null);
          else setSelectedEvent(null);
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedEvent, lightboxIndex]);

  /* ── Arrow keys for lightbox navigation ── */
  useEffect(() => {
    if (lightboxIndex === null || !selectedEvent) return;
    const allMedia = [
      ...(selectedEvent.images || []),
      ...(selectedEvent.videos || []),
    ];
    const handleKey = (e) => {
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i + 1) % allMedia.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i - 1 + allMedia.length) % allMedia.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, selectedEvent]);

  /* ── Deep-link: open event from URL hash on load ── */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const event = EVENTS_DATA.find((e) => e.id === hash);
      if (event) {
        setSelectedEvent(event);
        showToast(`Opened shared event: ${event.title}`);
      }
    }
  }, []);

  /* Filter by tab + search query */
  const filteredEvents = EVENTS_DATA.filter((event) => {
    if (activeTab === "upcoming" && event.status !== "upcoming") return false;
    if (activeTab === "past" && event.status !== "past") return false;
    if (activeTab === "flagship" && event.category !== "flagship") return false;
    if (activeTab === "workshop" && event.category !== "workshop") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  /* Toggle registration */
  const toggleReg = (e, eventId) => {
    e.stopPropagation();
    setRegisteredEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  };

  /* Share — native share sheet or copy event deep-link to clipboard */
  const handleShare = async (e, event) => {
    e.stopPropagation();
    const eventId = typeof event === "string" ? event : event.id;
    const eventTitle = typeof event === "object" ? event.title : "CSI Event";
    const url = `${window.location.origin}/events#${eventId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `CSI SFIT — ${eventTitle}`,
          text: `Check out ${eventTitle} by CSI SFIT!`,
          url: url,
        });
        showToast("Shared successfully!");
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    setCopiedId(eventId);
    showToast(`✓ Link copied for ${eventTitle}!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  /* Check if an image/video file exists (graceful fallback) */
  const isVideo = (src) => /\.(mp4|mov|webm)$/i.test(src);

  /* Badge helpers */
  const badgeClass = (event) =>
    event.status === "upcoming"
      ? event.category === "flagship"
        ? styles.badgeFlagship
        : styles.badgeUpcoming
      : styles.badgePast;

  const badgeLabel = (event) =>
    event.status === "upcoming"
      ? event.category === "flagship"
        ? "🔥 Flagship"
        : "Upcoming"
      : "Completed";

  /* All media for lightbox (filtered to exclude failed image loads) */
  const allMedia = selectedEvent
    ? [...(selectedEvent.images || []), ...(selectedEvent.videos || [])].filter(
        (src) => !failedImages.has(src),
      )
    : [];

  return (
    <main className={`${inter.variable} ${lato.variable} ${styles.page}`}>
      <NoiseTexture noiseOpacity={0.4} />

      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className={styles.heroLabel}>Explore</div>

        <h1 className={styles.heroTitle}>
          Our <span className={styles.highlight}>Events</span>
        </h1>

        <p className={styles.heroSub}>
          From hackathons to workshops, discover events that sharpen your skills
          and connect you with the tech community.
        </p>

        <div className={styles.searchWrap}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search events, topics, or technologies..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.Icon size={14} />
              {tab.label}
              <span className={styles.tabCount}>{TAB_COUNTS[tab.id]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Events Grid ─── */}
      <section className={styles.eventsSection}>
        {filteredEvents.length > 0 ? (
          <div className={styles.grid}>
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={styles.card}
                onClick={() => setSelectedEvent(event)}
              >
                {/* Card header — cover photo or gradient placeholder */}
                <div
                  className={styles.cardHead}
                  style={
                    event.coverImage && !failedImages.has(event.coverImage)
                      ? {}
                      : { background: event.gradient }
                  }
                >
                  {event.coverImage && !failedImages.has(event.coverImage) ? (
                    <Image
                      src={event.coverImage}
                      alt={event.title}
                      fill
                      unoptimized
                      className={styles.cardHeadImg}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={() => handleImageError(event.coverImage)}
                    />
                  ) : (
                    <event.Icon size={56} className={styles.cardHeadIcon} />
                  )}
                  <span className={`${styles.badge} ${badgeClass(event)}`}>
                    {badgeLabel(event)}
                  </span>
                </div>

                {/* body */}
                <div className={styles.cardBody}>
                  <div className={styles.cardCategory}>{event.category}</div>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <p className={styles.cardDesc}>{event.description}</p>

                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      <Calendar size={13} className={styles.metaIcon} />
                      {event.date}
                    </span>
                    <span className={styles.metaItem}>
                      <MapPin size={13} className={styles.metaIcon} />
                      {event.venue}
                    </span>
                    <span className={styles.metaItem}>
                      <Ticket size={13} className={styles.metaIcon} />
                      {event.price}
                    </span>
                  </div>

                  <div className={styles.tags}>
                    {event.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardFoot}>
                    <button
                      className={styles.btnDetails}
                      disabled={event.status === "past"}
                    >
                      {event.status === "past" ? "COMPLETED!" : "Details"}
                      {event.status !== "past" && <ChevronRight size={14} />}
                    </button>

                    {/* Share button — hidden on mobile via CSS */}
                    <button
                      className={`${styles.btnShare} ${
                        copiedId === event.id ? styles.btnShareCopied : ""
                      }`}
                      onClick={(e) => handleShare(e, event)}
                      title="Share event link"
                    >
                      {copiedId === event.id ? (
                        <Check size={14} />
                      ) : (
                        <Share2 size={14} />
                      )}
                    </button>

                    {event.status === "upcoming" && (
                      <button
                        className={
                          registeredEvents.has(event.id)
                            ? styles.btnRegistered
                            : styles.btnRegister
                        }
                        onClick={(e) => toggleReg(e, event.id)}
                      >
                        {registeredEvents.has(event.id)
                          ? "✓ Registered"
                          : "Register"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Search size={48} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No events found</h3>
            <p className={styles.emptyText}>
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </section>

      {/* ─── Event Detail Modal ─── */}
      {selectedEvent && (
        <div className={styles.overlay} onClick={() => setSelectedEvent(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* header */}
            <div className={styles.modalHead}>
              <div
                className={styles.modalGrad}
                style={{ background: selectedEvent.gradient }}
              />
              <button
                className={styles.modalClose}
                onClick={() => setSelectedEvent(null)}
              >
                <X size={16} />
              </button>
              <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
              <p className={styles.modalTagline}>{selectedEvent.tagline}</p>
              <div className={styles.modalBadges}>
                <span
                  className={`${styles.badge} ${badgeClass(selectedEvent)}`}
                >
                  {badgeLabel(selectedEvent)}
                </span>
              </div>
            </div>

            {/* body */}
            <div className={styles.modalBody}>
              <p className={styles.modalDesc}>
                {selectedEvent.fullDescription}
              </p>

              <div className={styles.modalInfo}>
                <div className={styles.infoItem}>
                  <Calendar size={16} className={styles.infoIcon} />
                  {selectedEvent.date}
                </div>
                <div className={styles.infoItem}>
                  <Clock size={16} className={styles.infoIcon} />
                  {selectedEvent.time}
                </div>
                <div className={styles.infoItem}>
                  <MapPin size={16} className={styles.infoIcon} />
                  {selectedEvent.venue}
                </div>
                <div className={styles.infoItem}>
                  <Ticket size={16} className={styles.infoIcon} />
                  {selectedEvent.price}
                </div>
              </div>

              <div className={styles.tags} style={{ marginBottom: "1.5rem" }}>
                {selectedEvent.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.modalHighlights}>
                <h4 className={styles.modalHighlightsTitle}>Highlights</h4>
                {selectedEvent.highlights.map((item, i) => (
                  <div key={i} className={styles.highlightItem}>
                    <span className={styles.highlightDot} />
                    {item}
                  </div>
                ))}
              </div>

              {/* ── Photo / Video Gallery ── */}
              {allMedia.length > 0 && (
                <div className={styles.gallerySection}>
                  <h4 className={styles.gallerySectionTitle}>
                    Gallery ({allMedia.length})
                  </h4>
                  <div className={styles.galleryGrid}>
                    {allMedia.map((src, i) => (
                      <div
                        key={i}
                        className={styles.galleryItem}
                        onClick={() => setLightboxIndex(i)}
                      >
                        {isVideo(src) ? (
                          <>
                            <video src={src} muted preload="none" />
                            <div className={styles.videoBadge}>
                              <Play size={28} />
                            </div>
                          </>
                        ) : (
                          <Image
                            src={src}
                            alt={`${selectedEvent.title} photo ${i + 1}`}
                            fill
                            unoptimized
                            sizes="200px"
                            style={{ objectFit: "cover" }}
                            onError={() => handleImageError(src)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* footer — only for upcoming events */}
            {selectedEvent.status === "upcoming" && (
              <div className={styles.modalFoot}>
                <button
                  className={
                    registeredEvents.has(selectedEvent.id)
                      ? styles.modalRegBtnDone
                      : styles.modalRegBtn
                  }
                  onClick={(e) => toggleReg(e, selectedEvent.id)}
                >
                  {registeredEvents.has(selectedEvent.id)
                    ? "✓ Registered — Click to Cancel"
                    : "Register Now"}
                </button>
                <span className={styles.modalCapacity}>
                  {selectedEvent.maxCapacity - selectedEvent.registrations}{" "}
                  spots left
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Lightbox ─── */}
      {lightboxIndex !== null && allMedia.length > 0 && (
        <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxIndex(null)}
          >
            <X size={18} />
          </button>

          {/* Prev */}
          {allMedia.length > 1 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + allMedia.length) % allMedia.length,
                );
              }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Media */}
          <div onClick={(e) => e.stopPropagation()}>
            {isVideo(allMedia[lightboxIndex]) ? (
              <video
                src={allMedia[lightboxIndex]}
                className={styles.lightboxVideo}
                controls
                autoPlay
              />
            ) : (
              <img
                src={allMedia[lightboxIndex]}
                alt={`Photo ${lightboxIndex + 1}`}
                className={styles.lightboxMedia}
              />
            )}
          </div>

          {/* Next */}
          {allMedia.length > 1 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % allMedia.length);
              }}
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div className={styles.lightboxCounter}>
            {lightboxIndex + 1} / {allMedia.length}
          </div>
        </div>
      )}

      {toastMessage && (
        <div className={styles.toast}>
          <Check size={16} className={styles.toastIcon} />
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
}
