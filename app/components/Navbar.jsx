"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
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

export default function Navbar() {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${lato.className}`}>
      {/* Glass background */}
      <div
        className="
          absolute inset-0
          bg-white/6
          backdrop-blur-2xl
          backdrop-saturate-180
          border-b border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.35)]
          pointer-events-none
        "
      />

      {/* Gradient overlay */}
      <div
        className="
          absolute inset-0
          bg-linear-to-r
          from-cyan-500/5
          via-white/5
          to-cyan-500/5
          pointer-events-none
        "
      />

      {/* Top highlight */}
      <div
        className="
          absolute top-0 left-0 w-full h-px
          bg-linear-to-r
          from-transparent
          via-white/40
          to-transparent
          pointer-events-none
        "
      />

      {/* Navbar content */}
      <div
        className="
          relative z-10
          max-w-7xl mx-auto
          h-14
          flex items-center justify-between
          px-5 lg:px-8
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/csi_logo_white_no_bg.png"
            alt="CSI SFIT"
            width={44}
            height={44}
            className=""
          />

          <span className="text-white text-xl lg:text-2xl font-bold drop-shadow-lg">
            CSI SFIT
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                relative
                text-white/90
                hover:text-white
                text-[15px]
                font-medium
                transition-colors
                duration-300
                group
              "
            >
              {item.name}

              <span
                className="
                  absolute
                  left-0
                  -bottom-1.5
                  h-0.5
                  w-full
                  rounded-full
                  bg-orange-500
                  scale-x-0
                  origin-right
                  transition-transform
                  duration-300
                  ease-out
                  group-hover:scale-x-100
                  group-hover:origin-left
                "
              />

              <span
                className="
                  absolute
                  left-0
                  -bottom-1.5
                  h-0.5
                  w-full
                  bg-orange-500/50
                  blur-sm
                  scale-x-0
                  origin-right
                  transition-transform
                  duration-300
                  ease-out
                  group-hover:scale-x-100
                  group-hover:origin-left
                "
              />
            </Link>
          ))}
        </div>

        {/* Mobile menu link */}
        <Link
          href="/navbar"
          className="
            relative z-20
            md:hidden
            text-white
            p-2
            rounded-lg
            hover:bg-white/10
            transition
            cursor-pointer
            flex items-center justify-center
          "
          aria-label="Open Menu"
        >
          <Menu size={28} />
        </Link>
      </div>
    </nav>
  );
}
