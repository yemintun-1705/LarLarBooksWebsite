"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

type Lang = "my" | "en";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.softwarelarlar.larlarbooks";
const SUPPORT_EMAIL = "support@larlarbooks.com";

const COPY = {
  my: {
    signUp: "အကောင့်ဖွင့်ရန်",
    contact: "ဆက်သွယ်ရန်",
    switchTo: "English",
    menu: "မီနူး",
    noAccess: "ဤစာမျက်နှာသို့ ဝင်ရောက်ခွင့် မရှိပါ",
    ok: "ကောင်းပြီ",
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
    menu: "Menu",
    noAccess: "You don't have access to this page",
    ok: "OK",
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

/* ---------- Social icons (PNG masks, coloured by the footer via CSS) ---------- */

// TikTok has no account link yet: its icon shows but is not clickable until one is added
const SOCIALS: { label: string; href?: string; icon: string }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1ZETAEiCma/",
    icon: styles.iconFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/larlarbooks",
    icon: styles.iconInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/larlar-books/",
    icon: styles.iconLinkedin,
  },
  { label: "TikTok", icon: styles.iconTiktok },
];
// Stops right-click "save image" and dragging images out of the page
function blockImageAction(e: React.SyntheticEvent) {
  if (e.target instanceof HTMLImageElement) e.preventDefault();
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("my");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [noAccess, setNoAccess] = useState(false);
  const t = COPY[lang];

  // The header is fixed; give it a backdrop once the page has scrolled so content
  // doesn't run underneath the nav (at the very top it stays transparent, as designed)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Restricted pages redirect here with ?restricted=1: show the popup, then tidy the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("restricted")) {
      setNoAccess(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <div
      lang={lang}
      className={styles.page}
      onContextMenu={blockImageAction}
      onDragStart={blockImageAction}
    >
      {noAccess && (
        <div className={styles.overlay} onClick={() => setNoAccess(false)}>
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="no-access-text"
            className={styles.dialog}
            onClick={(e) => e.stopPropagation()}
          >
            <p id="no-access-text" className={styles.dialogText}>
              {t.noAccess}
            </p>
            <button
              type="button"
              autoFocus
              className={styles.dialogBtn}
              onClick={() => setNoAccess(false)}
            >
              {t.ok}
            </button>
          </div>
        </div>
      )}

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
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              {t.signUp}
            </a>
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

          {/* Phones: icon buttons, the menu holds the text links */}
          <div className={styles.mobileNav}>
            <button
              type="button"
              aria-label={t.switchTo}
              onClick={() => setLang(lang === "my" ? "en" : "my")}
              className={styles.iconBtn}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 5h9M7.5 3v2M5 5c.5 3.5 3 6 6 7M11 5c-.5 3.5-3 6.5-7 8" />
                <path d="m12.5 21 4-9 4 9M13.9 18h5.2" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={t.menu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className={styles.iconBtn}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.menu}>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              {t.signUp}
            </a>
            <Link href="#contact" onClick={() => setMenuOpen(false)}>
              {t.contact}
            </Link>
          </div>
        )}
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
            {SOCIALS.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className={styles.socialLink}
                  {...(href && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span className={`${styles.socialIcon} ${icon}`} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
