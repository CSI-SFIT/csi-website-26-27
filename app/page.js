"use client";
import { useState } from "react";
import { NoiseTexture } from "../components/ui/noise-texture";
import SplashScreen from "./components/SplashScreen.jsx";
import Hero3D from "./components/Hero3D.jsx";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  BookOpen,
  Code2,
  Trophy,
  Users,
  FlaskConical,
} from "lucide-react";
import { Inter, Lato, JetBrains_Mono } from "next/font/google";

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

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const OFFERINGS = [
  {
    icon: Code2,
    title: "Technical Workshops",
    description:
      "Hands-on workshops on cutting-edge technologies and programming languages.",
    iconBg: "bg-orange-500/15",
    iconText: "text-orange-400",
  },
  {
    icon: Trophy,
    title: "Coding Competitions",
    description:
      "Regular coding contests to sharpen your problem-solving skills.",
    iconBg: "bg-emerald-500/15",
    iconText: "text-emerald-400",
  },
  {
    icon: Users,
    title: "Industry Connect",
    description:
      "Networking events with industry professionals and tech leaders.",
    iconBg: "bg-purple-500/15",
    iconText: "text-purple-400",
  },
  {
    icon: FlaskConical,
    title: "Research Projects",
    description:
      "Collaborative research opportunities in emerging tech domains.",
    iconBg: "bg-pink-500/15",
    iconText: "text-pink-400",
  },
];

function SectionMark({ index, label }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3 sm:justify-start">
      <span className="font-mono text-xs tracking-[0.25em] text-orange-500/80">
        0x{String(index).padStart(2, "0")}
      </span>
      <span className="h-px w-8 bg-white/20" />
      <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/40">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <main
        className={`${inter.variable} ${lato.variable} ${mono.variable} font-lato relative snap-y snap-mandatory bg-black text-white`}
      >
        <section className="relative flex min-h-svh snap-start items-center justify-center overflow-hidden bg-black px-4 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-12">
          <div className="absolute inset-0">
            <picture className="absolute inset-0 block">
              <source
                media="(max-width: 767px)"
                srcSet="/hero-hands-portrait.png"
              />

              <Image
                src="/hero-hands.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[50%_38%]"
              />
            </picture>

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/10 to-black/10" />

            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center py-6 sm:py-8">
            <p className="text-center font-mono text-[9px] uppercase tracking-[0.3em] text-orange-400/90 sm:text-[11px] sm:tracking-[0.5em]">
              Computer Society of India · SFIT
            </p>

            <div
              className="
                relative
                mt-2
                flex
                h-64
                w-64
                shrink-0
                items-center
                justify-center

                sm:mt-3
                sm:h-72
                sm:w-72

                md:h-104
                md:w-104
              "
            >
              <div className="absolute left-1/2 top-1/2 -z-10 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/25 blur-3xl" />

              <div className="relative h-full w-full overflow-hidden">
                <Hero3D />
              </div>
            </div>

            <div className="mt-2 flex w-full flex-col items-center gap-4 sm:mt-3 sm:gap-6">
              <p className="max-w-[90vw] text-center text-xs leading-relaxed text-white/70 sm:max-w-2xl sm:text-lg md:text-xl">
                Empowering the next generation of{" "}
                <span className="font-semibold text-orange-400">
                  developers, innovators
                </span>{" "}
                and{" "}
                <span className="font-semibold text-orange-400">
                  technology leaders.
                </span>
              </p>

              <div className="grid w-full max-w-sm grid-cols-1 gap-2.5 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-5">
                <HeroButton href="/membership">
                  <span>Join CSI SFIT</span>
                  <ArrowRight
                    size={18}
                    className="text-orange-400 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </HeroButton>

                <HeroButton href="/events">
                  <span>View Events</span>
                  <CalendarDays
                    size={18}
                    className="text-orange-400 transition-transform duration-300 group-hover:scale-110"
                  />
                </HeroButton>

                <HeroButton href="https://chat.whatsapp.com/JWRSyFzmrzT3YJFr3HIM5H">
                  <span>Code with CSI</span>
                  <ArrowRight
                    size={18}
                    className="text-orange-400 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </HeroButton>
              </div>

              <div className="w-full max-w-sm sm:w-auto sm:max-w-none">
                <HeroButton wide href="/paradigm-magazine">
                  <span>View Paradigm Edition 9 Magazine</span>
                  <BookOpen
                    size={18}
                    className="shrink-0 text-orange-400 transition-transform duration-300 group-hover:scale-110"
                  />
                </HeroButton>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 sm:bottom-6 sm:text-[10px]">
            scroll ↓
          </div>
        </section>

        <section className="relative z-10 flex min-h-svh snap-start items-center bg-orange-500 px-4 py-16 pt-20 sm:px-6 md:py-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <SectionMark index={1} label="About" />

              <h2 className="mb-6 font-inter text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl">
                We build with <span className="text-white">code</span>, not just
                about it.
              </h2>

              <p className="mb-4 text-base leading-relaxed text-black/80 sm:text-lg">
                The Computer Society of India (CSI) Student Chapter at SFIT is a
                community of curious builders, coders, and creators. We bring
                students together to learn, collaborate, and grow through
                hands-on projects, events, and mentorship.
              </p>

              <p className="text-base leading-relaxed text-black/80 sm:text-lg">
                From coding sessions to hackathons, workshops, industry talks,
                and our flagship{" "}
                <span className="font-medium text-white">
                  Paradigm Magazine
                </span>
                , CSI SFIT is where ideas become products and students become
                leaders.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-2xl border border-black/15" />
              <Image
                src="/aboutus.png"
                alt="CSI SFIT community"
                width={600}
                height={600}
                className="relative mx-auto h-auto w-full max-w-xl rounded-2xl border border-black/10 object-cover shadow-[0_0_60px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>
        </section>

        <section className="relative z-10 flex min-h-svh snap-start items-center overflow-hidden bg-black px-4 py-16 pt-20 sm:px-6 md:py-20">
          <NoiseTexture noiseOpacity={0.5} />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-4 flex justify-center">
              <SectionMark index={2} label="Offerings" />
            </div>

            <h2 className="font-inter mb-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
              What We <span className="text-orange-500">Offer</span>
            </h2>

            <p className="mx-auto mb-12 max-w-2xl text-center text-base text-white/60 sm:text-lg md:mb-16">
              Discover opportunities to grow, learn, and connect with
              like-minded tech enthusiasts
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {OFFERINGS.map((item, i) => (
                <div
                  key={item.title}
                  className="group relative h-full rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-white/5"
                >
                  <span className="absolute right-5 top-5 font-mono text-[10px] text-white/20">
                    0{i + 1}
                  </span>

                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} ${item.iconText} shadow-lg`}
                  >
                    <item.icon size={22} />
                  </div>

                  <h3 className="font-inter mb-2 text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 flex min-h-svh snap-start items-center justify-center overflow-hidden bg-black px-4 py-16 sm:px-6">
          <NoiseTexture noiseOpacity={0.35} />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionMark index={3} label="Get Involved" />

            <h2 className="mb-5 font-inter text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Your first commit
              <span className="text-orange-500"> starts here.</span>
            </h2>

            <p className="mb-10 max-w-xl text-base text-white/60 sm:text-lg">
              No prior experience required — just curiosity. Membership is free,
              the projects are real, and the community sticks around long after
              the semester ends.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
              <HeroButton href="/membership">
                <span>Join CSI SFIT</span>
                <ArrowRight
                  size={18}
                  className="text-orange-400 transition-transform duration-300 group-hover:translate-x-1"
                />
              </HeroButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function HeroButton({ children, wide, href = "#" }) {
  const isExternal = /^https?:\/\//.test(href);

  const className = `
    group
    relative
    flex
    w-full
    items-center
    justify-center
    gap-2.5
    overflow-hidden
    rounded-xl
    border
    border-white/10
    bg-white/4
    px-5
    py-3
    text-sm
    font-medium
    text-white/90
    backdrop-blur-xl
    transition-all
    duration-300

    hover:border-orange-400/50
    hover:bg-white/8
    hover:shadow-[0_0_35px_rgba(249,115,22,0.18)]
    hover:-translate-y-0.5

    sm:w-auto
    sm:gap-3
    sm:px-6
    sm:py-3.5
    sm:text-base

    ${wide ? "sm:min-w-95 md:min-w-105" : "sm:min-w-55"}
  `;

  const content = (
    <>
      <span className="absolute inset-0 bg-linear-to-r from-transparent via-orange-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative flex items-center gap-2.5 sm:gap-3">
        {children}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
