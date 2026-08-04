import type { Metadata } from "next";
import { Noto_Sans_Myanmar } from "next/font/google";

/**
 * Myanmar font is loaded here and scoped to the (legal) route group only
 * (/privacy and /delete-account). The shared root layout intentionally is not
 * touched. The root layout loads `Noto_Sans` (Latin-only) under a misleading
 * name and does NOT render Burmese correctly; these compliance pages must be
 * legible for Google Play reviewers on a clean machine, so we load the real
 * Noto Sans Myanmar with the `myanmar` subset here.
 */
const notoMyanmar = Noto_Sans_Myanmar({
  variable: "--font-myanmar-legal",
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${notoMyanmar.variable} min-h-screen bg-[#181818]`}>
      {children}
    </div>
  );
}
