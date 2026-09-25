"use client";

import { useEffect, useState } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function CaesarGambit() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const phases = [
    {
      number: "I",
      title: "Caesar Cipher",
      label: "HARDWARE GAME",
      description:
        "A cipher created by Caesar himself. A message awaits you, hidden behind one of history's most famous codes.",
      highlight: "CAN YOU DECIPHER WHAT CAESAR LEFT BEHIND?",
    },
    {
      number: "II",
      title: "The Roman World",
      label: "3D GAME",
      description:
        "Step into an ancient world brought to life in 3D. Separated across Rome, your team must find its way back together.",
      highlight: "YOUR JOURNEY INTO ROME BEGINS.",
    },
    {
      number: "III",
      title: "The Final Gambit",
      label: "THE CLIMAX",
      description:
        "You have decoded the message. You have entered Rome. You have found your allies.",
      highlight: "NOW, THE FATE OF CAESAR RESTS IN YOUR HANDS.",
    },
  ];

  return (
    <main
      className={`${playfair.variable} ${inter.variable} ${
        loaded ? "opacity-100" : "opacity-0"
      } min-h-screen overflow-hidden bg-[#f6f0e3] text-[#2b2118] transition-opacity duration-1000`}
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f6f0e3;
          font-family: var(--font-inter), sans-serif;
        }

        .font-roman {
          font-family: var(--font-playfair), serif;
        }

        .font-ui {
          font-family: var(--font-inter), sans-serif;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 rgba(125, 29, 29, 0);
          }

          50% {
            box-shadow: 0 0 30px rgba(125, 29, 29, 0.2);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(-4px);
            opacity: 0.4;
          }

          50% {
            transform: translateY(4px);
            opacity: 1;
          }

          100% {
            transform: translateY(-4px);
            opacity: 0.4;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .float {
          animation: float 5s ease-in-out infinite;
        }

        .seal-pulse {
          animation: pulse 3s ease-in-out infinite;
        }

        .scroll-animation {
          animation: scroll 2s ease-in-out infinite;
        }

        .fade-up {
          animation: fadeUp 1s ease forwards;
        }

        .gold-text {
          background: linear-gradient(
            135deg,
            #91651f,
            #d2a94c,
            #9b702b,
            #e0bd65
          );

          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .paper {
          background:
            radial-gradient(
              circle at 10% 10%,
              rgba(170, 130, 60, 0.08),
              transparent 25%
            ),
            radial-gradient(
              circle at 90% 90%,
              rgba(125, 29, 29, 0.05),
              transparent 30%
            ),
            #f1e7d2;
        }

        .paper-light {
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(190, 150, 70, 0.08),
              transparent 40%
            ),
            #faf7ef;
        }

        .roman-shadow {
          text-shadow: 0 2px 0 rgba(145, 104, 43, 0.15);
        }
      `}</style>

      {/* =========================================================
          ROOM 318 STICKY
      ========================================================= */}

      <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2">
        <div className="flex items-center gap-2 rounded-l-md border border-r-0 border-[#b78b3c]/50 bg-[#f5ead5] px-3 py-2 shadow-md sm:px-4 sm:py-2.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#861f1f]" />

          <span className="font-ui text-[9px] font-bold tracking-[0.15em] text-[#6e511f] sm:text-xs">
            ROOM 318
          </span>
        </div>
      </div>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <div className="absolute left-5 top-8 h-32 w-px bg-linear-to-b from-transparent via-[#b58a3c] to-transparent opacity-50" />

        <div className="absolute right-5 top-8 h-32 w-px bg-linear-to-b from-transparent via-[#b58a3c] to-transparent opacity-50" />

        <p className="font-ui mb-7 text-[9px] font-bold tracking-[0.45em] text-[#8d6a2e] sm:text-xs">
          A MESSAGE FROM THE ROMAN REPUBLIC
        </p>

        <div className="float relative mb-9 flex h-28 w-28 items-center justify-center">
          <img
            src="/ancient_csi_sfit_stamp.png"
            alt="Roman stamp"
            className="h-full w-full object-contain"
          />
        </div>

        <p className="font-ui text-sm uppercase tracking-[0.3em] text-[#72552a]">
          The Game
        </p>

        <h1 className="roman-shadow gold-text font-roman mt-3 text-6xl font-black uppercase leading-[0.85] tracking-tight sm:text-8xl md:text-9xl">
          Caesar&apos;s
          <br />
          Gambit
        </h1>

        <div className="my-8 flex items-center gap-4">
          <span className="h-px w-12 bg-[#a57a32] sm:w-24" />

          <span className="font-roman text-xl text-[#8a2020]">✦</span>

          <span className="h-px w-12 bg-[#a57a32] sm:w-24" />
        </div>

        <p className="font-roman max-w-xl text-lg italic leading-relaxed text-[#5d4a32] sm:text-xl">
          Rome is about to lose its greatest leader.
          <br />
          <span className="font-bold text-[#7b2020]">Can you save him?</span>
        </p>

        <div className="scroll-animation absolute bottom-8 flex flex-col items-center gap-2 text-[#8d6a2e]">
          <span className="font-ui text-[8px] tracking-[0.3em]">
            READ THE DECREE
          </span>

          <span>↓</span>
        </div>
      </section>

      <section id="story" className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="paper relative border border-[#b99a61]/50 px-7 py-12 shadow-sm sm:px-14 sm:py-16">
            {/* Header */}

            <div className="mb-10 text-center">
              <p className="font-ui text-[9px] font-bold tracking-[0.4em] text-[#85652d]">
                ROME · 44 BC
              </p>

              <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-16 bg-[#b78b3c]/50" />

                <span className="text-[#8a2222]">◆</span>

                <span className="h-px w-16 bg-[#b78b3c]/50" />
              </div>
            </div>

            <div className="font-roman space-y-7 leading-relaxed text-[#594731]">
              <p className="text-center text-2xl italic text-[#3f3022] sm:text-3xl">
                The Ides of March.
              </p>

              <p className="text-center text-5xl font-bold text-[#8a2222] sm:text-6xl">
                44 BC
              </p>

              <p>
                Julius Caesar, one of the most powerful men in Rome, walked into
                the Senate.
              </p>

              <p>He would never walk out.</p>

              <p>
                On the{" "}
                <span className="font-bold text-[#7e2020]">
                  15th of March, 44 BC
                </span>
                , Caesar was assassinated by a group of Roman senators.
              </p>

              <div className="my-10 border-y border-[#b99a61]/40 py-8 text-center">
                <p className="text-2xl italic text-[#4a3826] sm:text-3xl">
                  But what if history
                  <br />
                  could be changed?
                </p>
              </div>

              <p className="text-center text-xl font-semibold text-[#7d2020] sm:text-2xl">
                What if Caesar had one final chance?
              </p>

              <p className="text-center text-2xl font-bold text-[#3c2c20] sm:text-3xl">
                Can you save him?
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="paper-light border-y border-[#c8ae7b]/30 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-ui text-[9px] font-bold tracking-[0.45em] text-[#85652d]">
            THE CHALLENGE
          </p>

          <h2 className="gold-text font-roman mt-4 text-5xl font-black uppercase sm:text-7xl">
            Three Trials
          </h2>

          <p className="font-roman mx-auto mt-6 max-w-xl text-lg italic text-[#6c5738]">
            Three stages stand between your team and the fate of Rome.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl space-y-8">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="group relative overflow-hidden border border-[#b89a60]/50 bg-[#f3e9d5] p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#9c762f] hover:shadow-lg sm:p-10"
            >
              <div className="font-roman absolute -right-3 -top-8 text-[150px] font-black leading-none text-[#8a2222]/6 transition-all group-hover:text-[#8a2222]/10">
                {phase.number}
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="font-roman text-5xl text-[#8a2222]">
                      {phase.number}
                    </span>
                  </div>

                  <span className="font-ui border border-[#b18a48]/60 px-3 py-1 text-[8px] font-bold tracking-[0.2em] text-[#765a2a]">
                    {phase.label}
                  </span>
                </div>

                <h3 className="font-roman mt-7 text-3xl font-bold uppercase text-[#3b2c20] sm:text-4xl">
                  {phase.title}
                </h3>

                <div className="my-5 h-1 w-12 bg-[#8a2222]" />

                <p className="font-ui max-w-2xl text-base leading-relaxed text-[#675238] sm:text-lg">
                  {phase.description}
                </p>

                <p className="font-ui mt-7 max-w-xl text-sm font-bold italic tracking-wide text-[#8a2222] sm:text-base">
                  {phase.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#b78b3c]/60" />

            <span className="font-roman text-[#8a2222]">IV</span>

            <span className="h-px w-12 bg-[#b78b3c]/60" />
          </div>

          <p className="font-ui text-[9px] font-bold tracking-[0.4em] text-[#85652d]">
            YOUR LEGION
          </p>

          <h2 className="font-roman mt-4 text-4xl font-bold uppercase text-[#3d2d20] sm:text-6xl">
            Four Minds.
            <br />
            One Mission.
          </h2>

          <p className="font-roman mx-auto mt-7 max-w-xl text-lg italic leading-relaxed text-[#705c3e]">
            Caesar cannot be saved by one hero.
            <br />
            Assemble your team of four.
          </p>

          <div className="mx-auto mt-12 grid max-w-sm grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((player) => (
              <div
                key={player}
                className="font-roman flex aspect-square items-center justify-center border border-[#b28a45] bg-[#f1e5cf] text-3xl text-[#8a2222] shadow-sm transition-all duration-300 hover:bg-[#8a2222] hover:text-[#f5e9d3]"
              >
                {player}
              </div>
            ))}
          </div>

          <p className="font-ui mt-6 text-xs font-bold tracking-[0.3em] text-[#80602b]">
            TEAM OF 4
          </p>
        </div>
      </section>

      <section className="paper border-y border-[#b99a61]/40 px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-ui text-[9px] font-bold tracking-[0.4em] text-[#85652d]">
            THE REWARD
          </p>

          <h2 className="font-roman mt-5 text-4xl font-black uppercase text-[#3d2d20] sm:text-6xl">
            Victory Has Its Reward.
          </h2>

          <div className="mx-auto my-8 h-px w-24 bg-[#8a2222]" />

          <p className="font-roman text-lg italic text-[#685238] sm:text-xl">
            Survive the trials.
            <br />
            Save Caesar.
            <br />
            <span className="font-bold text-[#8a2222]">Claim the prize.</span>
          </p>

          <div className="mx-auto mt-10 inline-flex items-center gap-3 border border-[#b28a45] bg-[#faf5e9] px-7 py-4">
            <span className="text-2xl text-[#b28a45]">✦</span>

            <span className="font-ui text-sm font-bold uppercase tracking-[0.2em] text-[#594328]">
              Winner Gets a Prize
            </span>

            <span className="text-2xl text-[#b28a45]">✦</span>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8a2222]/[0.07] blur-[120px]" />

        <div className="relative max-w-3xl">
          <p className="font-ui text-[9px] font-bold tracking-[0.45em] text-[#85652d]">
            THE FINAL MOMENT
          </p>

          <h2 className="gold-text roman-shadow font-roman mt-6 text-5xl font-black uppercase leading-[0.9] sm:text-7xl md:text-8xl">
            History
            <br />
            Has Already
            <br />
            Been Written.
          </h2>

          <div className="mx-auto my-10 h-px w-28 bg-[#8a2222]" />

          <p className="font-roman mx-auto max-w-xl text-lg leading-relaxed text-[#604d32] sm:text-xl">
            But tonight, you are given something Caesar never had:
            <br />
            <span className="font-bold text-[#8a2222]">a second chance.</span>
          </p>

          <p className="font-roman mt-8 text-xl italic text-[#3e2d20] sm:text-2xl">
            The message has been found.
            <br />
            The gates of Rome are open.
            <br />
            Your team is ready.
          </p>

          <p className="font-roman mt-10 text-2xl font-bold uppercase tracking-wide text-[#8a2222] sm:text-3xl">
            Now change history.
          </p>

          <div className="mt-12 flex w-full justify-center">
            <div className="float relative h-36 w-36">
              <img
                src="/ancient_csi_sfit_stamp.png"
                alt="Roman stamp"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <p className="font-ui mt-7 text-[9px] font-bold tracking-[0.35em] text-[#80602b]">
            ACCEPT THE GAMBIT
          </p>
        </div>
      </section>

      <footer className="border-t border-[#b99a61]/40 bg-[#eee3ce] px-6 py-10 text-center">
        <p className="font-roman text-sm font-bold tracking-[0.2em] text-[#765728]">
          CAESAR&apos;S GAMBIT
        </p>

        <div className="mx-auto my-3 h-px w-12 bg-[#8a2222]" />

        <p className="font-ui text-[8px] tracking-[0.3em] text-[#8a7658]">
          ROME · THREE TRIALS · ONE FATE
        </p>
      </footer>
    </main>
  );
}
