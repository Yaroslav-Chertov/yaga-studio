"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "yaga_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const timer = setTimeout(() => setVisible(true), 700);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const respond = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* localStorage unavailable — proceed without persisting */
    }
    setVisible(false);
  };

  if (!mounted) return null;

  return (
    <div className={`cookie-banner${visible ? " is-open" : ""}`} role="dialog" aria-live="polite" aria-label="Уведомление об использовании cookie">
      <p className="cookie-banner__text">
        Мы используем cookie, чтобы сайт работал корректно и стабильно. Подробности — в{" "}
        <Link href="/cookie-policy" className="cookie-banner__link">
          политике использования cookie
        </Link>
        .
      </p>
      <div className="cookie-banner__actions">
        <button
          type="button"
          className="cookie-banner__decline"
          onClick={() => respond("declined")}
        >
          Отклонить
        </button>
        <button
          type="button"
          className="cookie-banner__accept"
          data-hover
          onClick={() => respond("accepted")}
        >
          Принять
        </button>
      </div>
    </div>
  );
}
