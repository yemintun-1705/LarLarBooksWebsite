"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

type Lang = "my" | "en";

const SUPPORT_EMAIL = "support@larlarbooks.com";

const COPY = {
  my: {
    signUp: "အကောင့်ဖွင့်ရန်",
    contact: "ဆက်သွယ်ရန်",
    switchTo: "English",
    title: "လာလာစာပေ",
    subtitle:
      "မည်သူမဆို မည်သည့်နေရာမဆို စာပေနှင့် ပညာရေးရရှိစေရန် ယူဆောင်ပေးနေပါသည်",
    missionTitle: "မိမိတို့ ရည်ရွယ်မှု",
    // Line breaks (\n) follow the design exactly; the layout scales in proportion,
    // so they stay the same at every window width.
    missions: [
      "အရည်အသွေးမြင့်မားသော ပညာ\nရေးနှင့် စာပေတို့ကို မည်သူမဆို\nလွယ်လင့်တကူ ရရှိနိုင်ရန်",
      "မြန်မာ့ယဉ်ကျေးမှုနှင့် စာပေ\nလက်ရာများကို ကမ္ဘာ့\nအကောင်းဆုံးများ နှင့်\nရင်ဘောင်တန်း ရပ်တည်နိုင်ရန်",
      "စာရေးဆရာများအတွက်\nလွယ်လင့်တကူ စာပေရေးသား\nထုတ်ဝေနိုင်ရန်",
    ],
    valueTitle: "မိမိတို့ ယုံကြည်မှု",
    values: [
      "အဆင်ပြေချောမွေ့စွာ\nအသုံးပြုနိုင်ခြင်း",
      "ယဉ်ကျေးမှုအမွေအနှစ်\nကြွယ်ဝခြင်း",
      "အဆင့်အတန်း ပြည့်မီစွာ\nတီထွင်ဖန်တီးနိုင်ခြင်း",
    ],
    contactTitle: "ဆက်သွယ်ရန်",
    enquiry: "မေးမြန်းရန်",
    enquirySep: "-",
    privacy: "ကိုယ်ရေးကိုယ်တာမူဝါဒ",
    deleteAccount: "သင့်အကောင့်ကို ဖျက်သိမ်းရန်",
  },
  en: {
    signUp: "Sign up",
    contact: "Contact",
    switchTo: "မြန်မာ",
    title: "LarLar Books",
    subtitle: "Bringing Literature and Education to Everyone Around the World",
    missionTitle: "Our Mission",
    missions: [
      "Provide access to\ncreative, quality\neducation and\nentertainment",
      "Boost Myanmar's culture\nand literary works to\nbecome on par with the\nworld's greatest",
      "Ensure sustainable\nproduction and the well-\nbeing of creators and\ncreatives",
    ],
    valueTitle: "Our Value",
    values: [
      "Conveniently accessible",
      "Culturally affluent",
      "Professionally innovative",
    ],
    contactTitle: "Contact Us",
    enquiry: "Enquiry:",
    enquirySep: "",
    privacy: "Privacy Policy",
    deleteAccount: "Delete your account",
  },
} as const;

const MISSION_IMAGES = [
  "/brand/mission-1.png",
  "/brand/mission-2.png",
  "/brand/mission-3.png",
];

const VALUE_IMAGES = [
  "/brand/value-1.png",
  "/brand/value-2.png",
  "/brand/value-3.png",
];

/* ---------- Social icons (drawn as inline SVG, colored by the footer) ---------- */

function FacebookIcon() {
  return (
    <svg
      viewBox="-3 -3 54 82"
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinejoin="round"
    >
      <path d="M31 76V42h11.5l1.8-13.5H31v-8.6c0-3.9 1.1-6.6 6.7-6.6h7.1V1.2C43.6 1 39.4.6 34.5.6 24.3.6 17.3 6.8 17.3 18.2v10.3H5.7V42h11.6v34H31z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true" fill="none" stroke="currentColor">
      <rect x="5" y="5" width="62" height="62" rx="17" strokeWidth="8" />
      <circle cx="36" cy="36" r="14" strokeWidth="8" />
      <circle cx="54" cy="18" r="4.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true" fill="currentColor">
      <rect
        x="4"
        y="4"
        width="64"
        height="64"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />
      {/* The "in" spans x 16.5–63.5, so it is shifted 4 left to sit centred in the 72-wide box */}
      <g transform="translate(-4 0)">
        <circle cx="22" cy="23" r="5.5" />
        <rect x="16.5" y="32" width="11" height="22" />
        <path d="M33 32h10.5v3.6c1.6-2.6 4.6-4.4 8.6-4.4 8 0 11 4.9 11 12.6V54H52V44.4c0-3.4-1-5.6-4.2-5.6-3.4 0-4.8 2.3-4.8 5.6V54H33V32z" />
      </g>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="-1 -1 26 26"
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("my");
  const [scrolled, setScrolled] = useState(false);
  const t = COPY[lang];

  // The header is fixed; give it a backdrop once the page has scrolled so content
  // doesn't run underneath the nav (at the very top it stays transparent, as designed)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div lang={lang} className={styles.page}>
      {/* Header (fixed) */}
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
      >
        <div className={styles.headerInner}>
          <Link href="/" aria-label="LarLar Books" className={styles.brand}>
            <Image
              src="/brand/logo.png"
              alt="LarLar Books"
              width={44}
              height={44}
              priority
            />
          </Link>

          <nav className={styles.nav}>
            <Link href="/auth/signup" className={styles.navLink}>
              {t.signUp}
            </Link>
            <Link href="#contact" className={styles.navLink}>
              {t.contact}
            </Link>
            <button
              type="button"
              onClick={() => setLang(lang === "my" ? "en" : "my")}
              className={styles.lang}
            >
              {t.switchTo}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero — one design screen (1080 design px tall) */}
      <div className={styles.hero}>
        {/* Decorative lotus ornament — flush with the top, centered */}
        <div className={styles.ornament} aria-hidden="true" />

        {/* Anchored to the top (like the ornament) so the logo and title always
            sit over the same part of the lotus, whatever the window height */}
        <main className={styles.main}>
          <Image
            src="/brand/logo.png"
            alt=""
            width={130}
            height={130}
            priority
            className={styles.heroLogo}
          />
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </main>
      </div>

      {/* Our Mission — the next design screen, revealed on scroll */}
      <section
        className={`${styles.mission} ${styles.missionBg}`}
        aria-labelledby="mission-title"
      >
        <h2 id="mission-title" className={styles.missionTitle}>
          <span className={styles.missionTitleText}>{t.missionTitle}</span>
        </h2>

        <ul className={styles.cards}>
          {t.missions.map((text, i) => (
            <li key={i} className={styles.card}>
              <Image
                src={MISSION_IMAGES[i]}
                alt=""
                width={200}
                height={200}
                className={styles.cardImage}
              />
              <p className={styles.cardText}>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Our Value — same layout as Our Mission */}
      <section
        className={`${styles.mission} ${styles.value}`}
        aria-labelledby="value-title"
      >
        <h2 id="value-title" className={styles.missionTitle}>
          <span className={styles.missionTitleText}>{t.valueTitle}</span>
        </h2>

        <ul className={styles.cards}>
          {t.values.map((text, i) => (
            <li key={i} className={styles.card}>
              <Image
                src={VALUE_IMAGES[i]}
                alt=""
                width={200}
                height={200}
                className={styles.cardImage}
              />
              <p className={styles.cardText}>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact Us (footer) */}
      <footer id="contact" className={styles.footer}>
        <div className={styles.footerPattern} aria-hidden="true" />
        <div className={styles.footerInner}>
          <div className={styles.footerText}>
            <h2 className={styles.footerTitle}>{t.contactTitle}</h2>

            <p className={styles.footerRow}>
              <span className={styles.footerLabel}>
                {t.enquiry}
                {t.enquirySep && (
                  <span className={styles.footerSep}>{t.enquirySep}</span>
                )}
              </span>
              <a href={`mailto:${SUPPORT_EMAIL}`} className={styles.footerLink}>
                {SUPPORT_EMAIL}
              </a>
            </p>

            <p className={`${styles.footerRow} ${styles.footerLinks}`}>
              <a href="#" className={styles.footerLink}>
                {t.privacy}
              </a>
              <span className={styles.footerDot} aria-hidden="true">
                •
              </span>
              <a href="#" className={styles.footerLink}>
                {t.deleteAccount}
              </a>
            </p>
          </div>

          <ul className={styles.social}>
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} aria-label={label} className={styles.socialLink}>
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
