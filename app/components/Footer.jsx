import { Lato } from "next/font/google";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`${lato.className} relative overflow-hidden bg-[#fa4c14] text-white`}
    >
      <div className="h-0.75 w-full bg-black" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-14 px-6 py-16 md:flex-row lg:px-10">
        <div className="max-w-md">
          <div className="flex items-center gap-4">

            <div>
              <h2 className="text-3xl font-black tracking-tight">
                CSI SFIT
              </h2>
              <p className="text-sm text-white/80">
                Computer Society of India
              </p>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Empowering students through technology, innovation, collaboration,
            and a thriving developer community.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="https://www.linkedin.com/company/csi-sfit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              <FaLinkedinIn
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            <a
              href="https://github.com/CSI-SFIT"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              <FaGithub
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            <a
              href="https://www.instagram.com/csi_sfit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              <FaInstagram
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          </div>

          <p className="mt-8 text-sm text-white/70">
            © {year} CSI SFIT. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col justify-end text-left md:text-right">
          <h3 className="text-4xl font-black leading-tight">
            Let's Build
            <br />
            Something Amazing.
          </h3>

          <p className="mt-4 max-w-md text-white/75 md:ml-auto">
            A community of passionate developers, designers, innovators, and
            leaders dedicated to learning, creating, and growing together.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-15 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-black uppercase leading-none text-black/10"
        style={{
          fontSize: "clamp(6rem, 24vw, 20rem)",
        }}
      >
        CSI SFIT
      </div>
    </footer>
  );
}