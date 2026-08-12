import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "Magazine", href: "/magazine" },
  { name: "Membership", href: "/membership" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Contact", href: "/contact" },
];

export default function NavbarPage() {
  return (
    <main
      className={`
        ${lato.className}
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      `}
    >
      {/* ─────────────────────────────────────────────
          Glass background
      ───────────────────────────────────────────── */}
      <div
        className="
          fixed inset-0
          bg-white/6
          backdrop-blur-2xl
          backdrop-saturate-180
          pointer-events-none
        "
      />

      {/* Cyan glass gradient */}
      <div
        className="
          fixed inset-0
          bg-linear-to-br
          from-cyan-500/8
          via-transparent
          to-cyan-500/5
          pointer-events-none
        "
      />

      {/* Subtle orange glow */}
      <div
        className="
          fixed
          -top-40
          -right-40
          h-80
          w-80
          rounded-full
          bg-orange-500/5
          blur-3xl
          pointer-events-none
        "
      />

      {/* Top highlight */}
      <div
        className="
          fixed
          top-0
          left-0
          h-px
          w-full
          bg-linear-to-r
          from-transparent
          via-white/40
          to-transparent
          pointer-events-none
        "
      />

      {/* ─────────────────────────────────────────────
          Content
      ───────────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header
          className="
            flex
            h-16
            items-center
            justify-between
            border-b
            border-white/10
            px-5
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/csi_logo_white_no_bg.png"
              alt="CSI SFIT"
              width={42}
              height={42}
            />

            <span className="text-xl font-bold text-white">
              CSI SFIT
            </span>
          </Link>

          {/* Close */}
          <Link
            href="/"
            className="
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-white/70
              transition-colors
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={18} />
            <span>Close</span>
          </Link>
        </header>

        {/* ─────────────────────────────────────────
            Navigation
        ───────────────────────────────────────── */}
        <nav className="px-5 py-8">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
            Navigation
          </p>

          <div className="flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  py-5
                  transition-colors
                  duration-300
                "
              >
                {/* Left orange line */}
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-0
                    w-0.5
                    -translate-y-1/2
                    bg-orange-500
                    transition-all
                    duration-300
                    group-hover:h-8
                  "
                />

                <span
                  className="
                    pl-0
                    text-2xl
                    font-medium
                    text-white/90
                    transition-all
                    duration-300
                    group-hover:translate-x-3
                    group-hover:text-white
                  "
                >
                  {item.name}
                </span>

                <span
                  className="
                    text-xs
                    font-medium
                    text-white/30
                    transition-colors
                    duration-300
                    group-hover:text-orange-500
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-5 pb-8 pt-4">
          <div
            className="
              h-px
              w-full
              bg-linear-to-r
              from-orange-500/50
              via-white/10
              to-transparent
            "
          />

          <div className="flex items-center justify-between pt-5">
            <span className="text-xs text-white/40">
              CSI SFIT
            </span>

            <span className="text-xs text-white/30">
              2026–27
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
