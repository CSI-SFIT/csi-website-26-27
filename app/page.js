"use client";
import { useState } from "react";
import { BlurFade } from "../components/ui/blur-fade.jsx";
import { NoiseTexture } from "../components/ui/noise-texture";
import SplashScreen from "./components/SplashScreen.jsx";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  BookOpen,
  Code2,
  Trophy,
  Users,
  FlaskConical,
} from "lucide-react";
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

const BLUR_FADE_DELAY = 0.15;

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

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <main
        className={`${inter.variable} ${lato.variable} font-lato relative snap-y snap-mandatory text-white`}
      >
        <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden bg-black px-4 pb-12 pt-16 sm:px-6">
          {" "}
          <div className="mx-auto flex min-h-full max-w-7xl flex-col items-center justify-center gap-4 py-6">
            <BlurFade delay={BLUR_FADE_DELAY} inView>
              <div className="relative w-40 sm:w-64 md:w-80 lg:w-105">
                <Image
                  src="/csi_logo_white_no_bg.png"
                  alt="CSI SFIT"
                  width={650}
                  height={650}
                  priority
                  className="h-auto w-full drop-shadow-[0_0_45px_rgba(255,255,255,0.35)]"
                />
              </div>
            </BlurFade>

            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <BlurFade delay={0.2} inView>
                <p className="max-w-2xl text-center text-sm text-white/60 sm:text-lg md:text-xl">
                  Empowering the next generation of{" "}
                  <span className="font-semibold text-orange-400">
                    developers, innovators
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-orange-400">
                    technology leaders.
                  </span>
                </p>
              </BlurFade>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                <BlurFade delay={0.3} inView>
                  <HeroButton>
                    <span>Join CSI SFIT</span>
                    <ArrowRight
                      size={18}
                      className="text-orange-400 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </HeroButton>
                </BlurFade>

                <BlurFade delay={0.45} inView>
                  <HeroButton>
                    <span>View Events</span>
                    <CalendarDays
                      size={18}
                      className="text-orange-400 transition-transform duration-300 group-hover:scale-110"
                    />
                  </HeroButton>
                </BlurFade>

                <BlurFade delay={0.6} inView>
                  <HeroButton>
                    <span>Code with CSI</span>
                    <ArrowRight
                      size={18}
                      className="text-orange-400 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </HeroButton>
                </BlurFade>
              </div>

              <BlurFade delay={0.75} inView>
                <HeroButton wide>
                  <span>View Paradigm Edition 9 Magazine</span>
                  <BookOpen
                    size={18}
                    className="text-orange-400 transition-transform duration-300 group-hover:scale-110"
                  />
                </HeroButton>
              </BlurFade>
            </div>
          </div>
        </section>

        <section className="relative z-10 flex min-h-screen snap-start items-center bg-orange-500 px-4 py-16 pt-20 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <BlurFade delay={BLUR_FADE_DELAY} inView>
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-black/70">
                  About Us
                </p>

                <h2 className="font-inter mb-6 text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl">
                  About <span className="text-white">CSI SFIT</span>
                </h2>

                <p className="mb-4 text-base leading-relaxed text-black/80 sm:text-lg">
                  The Computer Society of India (CSI) Student Chapter at SFIT is
                  a community of curious builders, coders, and creators. We
                  bring students together to learn, collaborate, and grow
                  through hands-on projects, events, and mentorship.
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
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY + 0.15} inView>
              <div className="relative">
                <Image
                  src="/aboutus.png"
                  alt="CSI SFIT community"
                  width={600}
                  height={600}
                  className="relative h-auto w-full rounded-2xl border border-black/10 object-cover shadow-[0_0_60px_rgba(0,0,0,0.15)]"
                />
              </div>
            </BlurFade>
          </div>
        </section>

        <section className="relative z-10 flex min-h-screen snap-start items-center overflow-hidden bg-black px-4 py-16 pt-20 sm:px-6 md:py-20">
          <NoiseTexture noiseOpacity={0.5} />

          <div className="relative z-10 mx-auto max-w-6xl">
            <BlurFade delay={BLUR_FADE_DELAY} inView>
              <h2 className="font-inter mb-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
                What We <span className="text-orange-500">Offer</span>
              </h2>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY + 0.1} inView>
              <p className="mx-auto mb-12 max-w-2xl text-center text-base text-white/60 sm:text-lg md:mb-16">
                Discover opportunities to grow, learn, and connect with
                like-minded tech enthusiasts
              </p>
            </BlurFade>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {OFFERINGS.map((item, i) => (
                <BlurFade
                  key={item.title}
                  delay={BLUR_FADE_DELAY + 0.15 + i * 0.1}
                  inView
                >
                  <div className="group relative h-full rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-white/5">
                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl  shadow-lg`}
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
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function HeroButton({ children, wide }) {
  return (
    <button
      className={`
        group
        relative
        flex
        w-full
        items-center
        justify-center
        gap-3
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-white/4
        px-6
        py-3.5
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
        sm:w-auto sm:text-base
        ${wide ? "sm:min-w-95 md:min-w-105" : "sm:min-w-55"}
      `}
    >
      <span className="absolute inset-0 bg-linear-to-r from-transparent via-orange-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative flex items-center gap-3">{children}</span>
    </button>
  );
}
