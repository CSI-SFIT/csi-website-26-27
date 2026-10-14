"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isMosaicPage = pathname === "/mosaic";

  return (
    <>
      {!isMosaicPage && (
        <>
          <CustomCursor />
          <Navbar />
        </>
      )}

      <div className="overflow-x-hidden">{children}</div>

      {!isMosaicPage && <Footer />}
    </>
  );
}
