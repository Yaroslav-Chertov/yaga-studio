"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#cases", label: "Портфолио" },
  { href: "/#services", label: "Услуги" },
  { href: "/#process", label: "Процесс" },
  { href: "/#why", label: "Почему мы" },
];

const BurgerIcon = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <line
      x1="3"
      y1={open ? "10" : "6"}
      x2="17"
      y2={open ? "10" : "6"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      style={{
        transformOrigin: "10px 10px",
        transform: open ? "rotate(45deg)" : "none",
        transition: "transform 0.28s ease, y 0.28s ease",
      }}
    />
    <line
      x1="3"
      y1="10"
      x2="17"
      y2="10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      style={{
        opacity: open ? 0 : 1,
        transition: "opacity 0.2s ease",
      }}
    />
    <line
      x1="3"
      y1={open ? "10" : "14"}
      x2="17"
      y2={open ? "10" : "14"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      style={{
        transformOrigin: "10px 10px",
        transform: open ? "rotate(-45deg)" : "none",
        transition: "transform 0.28s ease, y 0.28s ease",
      }}
    />
  </svg>
);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`nav${scrolled ? " nav--scrolled" : ""}${menuOpen ? " nav--open" : ""}`}
      >
        <div className="nav__brand">
          <Link href="/" className="nav__logo" onClick={closeMenu}>
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

        <button
          type="button"
          className="nav__burger"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <BurgerIcon open={menuOpen} />
        </button>
      </nav>

      <div
        className={`nav-drawer${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nav-drawer__list">
          {links.map((l, i) => (
            <li
              key={l.href}
              style={{ transitionDelay: menuOpen ? `${0.05 + i * 0.05}s` : "0s" }}
            >
              <Link href={l.href} className="nav-drawer__link" onClick={closeMenu}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="nav-drawer__cta"
          onClick={closeMenu}
        >
          Обсудить проект
        </Link>
      </div>
    </>
  );
}
