import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "CSI SFIT 2026-27",
  description: "CSI SFIT 2026-27",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white overflow-x-hidden">
        <CustomCursor />
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}