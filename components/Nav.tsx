"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#about",    label: "О нас" },
  { href: "#services", label: "Услуги" },
  { href: "#process",  label: "Процесс" },
  { href: "#why",      label: "Почему мы" },
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
      <Link href="#" className="nav__logo">
        YA<span className="nav__logo-accent">GA</span>
      </Link>

      <ul className="nav__list">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="nav__link">
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" data-hover className="nav__cta">
            Обсудить проект
          </a>
        </li>
      </ul>
    </nav>
  );
}
