"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#cases", label: "Кейсы" },
  { href: "/#services", label: "Услуги" },
  { href: "/#process", label: "Процесс" },
  { href: "/#why", label: "Почему мы" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="nav__brand">
        <Link href="/" className="nav__logo">
          YAGA
        </Link>
        <span className="nav__status">Studio</span>
      </div>

      <ul className="nav__list">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="nav__link">
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/#contact" data-hover className="nav__cta">
            Заявка
          </Link>
        </li>
      </ul>
    </nav>
  );
}
