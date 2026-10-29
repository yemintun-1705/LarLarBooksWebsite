"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../home.module.css";
import extra from "./author.module.css";

type Lang = "my" | "en";

const ANDROID_PACKAGE = "com.softwarelarlar.larlarbooks";
const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;
const SUPPORT_EMAIL = "support@larlarbooks.com";

// Same wording as the landing page for everything the two pages share.
const COPY = {
  my: {
    signUp: "အကောင့်ဖွင့်ရန်",
    contact: "ဆက်သွယ်ရန်",
    switchTo: "English",
    menu: "မီနူး",
    title: "လာလာစာပေ",
    withName: (name: string) =>
      `${name} ကို ဖော်လိုလုပ်ရန်နှင့် စာအုပ်များ ဖတ်ရှုရန် LarLar Books အက်ပ်ကို ဒေါင်းလုဒ်လုပ်ပါ။`,
    generic:
      "စာရေးဆရာကို ဖော်လိုလုပ်ရန်နှင့် စာအုပ်များ ဖတ်ရှုရန် LarLar Books အက်ပ်ကို ဒေါင်းလုဒ်လုပ်ပါ။",
    play: "Google Play တွင် ရယူရန်",
    appStore: "App Store - မကြာမီ လာမည်",
    openApp: "အက်ပ်ရှိပြီးသားလား? အက်ပ်တွင် ဖွင့်ရန်",
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
    title: "LarLar Books",
    withName: (name: string) =>
      `Get the LarLar Books app to follow ${name} and read their books.`,
    generic: "Get the LarLar Books app to follow this author and read their books.",
    play: "Get it on Google Play",
    appStore: "App Store - coming soon",
    openApp: "Already installed? Open in app",
    contactTitle: "Contact Us",
    enquiry: "Enquiry:",
    enquirySep: "",
    privacy: "Privacy Policy",
    deleteAccount: "Delete your account",
  },
} as const;

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

export default function AuthorShare({
  name,
  appLink,
}: {
  name: string | null;
  appLink: string | null;
}) {
  const [lang, setLang] = useState<Lang>("my");
  const [menuOpen, setMenuOpen] = useState(false);

  // Chrome on Android ignores a plain larlar0:// link. An intent:// link opens
  // the app when installed and otherwise falls back to the Play Store. Other
  // platforms keep the custom-scheme link.
  const [openHref, setOpenHref] = useState(appLink);
  useEffect(() => {
    if (appLink && /android/i.test(navigator.userAgent)) {
      const target = appLink.replace("larlar0://", "");
      setOpenHref(
        `intent://${target}#Intent;scheme=larlar0;package=${ANDROID_PACKAGE};` +
          `S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`,
      );
    }
  }, [appLink]);
  const t = COPY[lang];

  return (
    <div lang={lang} className={styles.page}>
      {/* Header: same bar as the landing page. Over the lotus, so no scroll backdrop. */}
      <header className={styles.header}>
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
            <Link href="/#contact" className={styles.navLink}>
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
            <Link href="/#contact" onClick={() => setMenuOpen(false)}>
              {t.contact}
            </Link>
          </div>
        )}
      </header>

      {/* Hero: the landing page's lotus + logo, with the author in place of the title */}
      <div className={`${styles.hero} ${extra.fullHero}`}>
        <div className={styles.ornament} aria-hidden="true" />
        <main className={styles.main}>
          <Image
            src="/brand/logo.png"
            alt=""
            width={130}
            height={130}
            priority
            className={styles.heroLogo}
          />
          <h1 className={extra.name}>{name ?? t.title}</h1>
          <p className={styles.subtitle}>
            {name ? t.withName(name) : t.generic}
          </p>

          <div className={extra.actions}>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${extra.btn} ${extra.btnPrimary}`}
            >
              {t.play}
            </a>
            <span aria-disabled="true" className={`${extra.btn} ${extra.btnDisabled}`}>
              {t.appStore}
            </span>
            {openHref && (
              <a href={openHref} className={extra.btn}>
                {t.openApp}
              </a>
            )}
          </div>
        </main>
      </div>

      {/* Contact Us (footer): same as the landing page */}
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
              <Link href="/privacy" className={styles.footerLink}>
                {t.privacy}
              </Link>
              <span className={styles.footerDot} aria-hidden="true">
                •
              </span>
              <Link href="/delete-account" className={styles.footerLink}>
                {t.deleteAccount}
              </Link>
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
