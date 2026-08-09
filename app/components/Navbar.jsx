"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  { name: "Sponsors", href: "/sponsors" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${lato.className}`}>
      <div
        className="
          absolute inset-0
          bg-white/6
          backdrop-blur-2xl
          backdrop-saturate-180
          border-b border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        "
      />

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

      <div
        className="
          absolute top-0 left-0 w-full h-px
          bg-linear-to-r
          from-transparent
          via-white/40
          to-transparent
        "
      />

      <div className="relative max-w-7xl mx-auto h-14 flex items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <Image
            src="/csi_logo_white_no_bg.png"
            alt="CSI SFIT"
            width={44}
            height={44}
            className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />

          <span className="text-white text-xl lg:text-2xl font-bold drop-shadow-lg">
            CSI SFIT
          </span>
        </Link>

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
                  group-hover:scale-x-100
                  group-hover:origin-left
                "
              />
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            md:hidden
            text-white
            p-2
            rounded-lg
            hover:bg-white/10
            transition
          "
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-500
          ease-in-out
          ${isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div
          className="
            bg-white/4
            backdrop-blur-3xl
            backdrop-saturate-150
            border-t border-white/10
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="
                relative
                block
                px-6
                py-4
                text-white/90
                hover:text-white
                text-base
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
                  left-6
                  bottom-2
                  h-0.5
                  w-[calc(100%-3rem)]
                  bg-orange-500
                  scale-x-0
                  origin-right
                  transition-transform
                  duration-300
                  group-hover:scale-x-100
                  group-hover:origin-left
                "
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
