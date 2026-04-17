"use client";

import { useEffect, useRef } from "react";

const heroTags = [
  "Brand systems",
  "Digital products",
  "Web platforms",
  "AI tools",
] as const;

const heroFacts = [
  { value: "2", label: "senior-специалиста в ядре" },
  { value: "1", label: "команда на проекте без потерь в коммуникации" },
  { value: "∞", label: "внимания к качеству деталей" },
] as const;

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3 13L13 3M13 3H5M13 3V11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Hero() {
  const bgWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!bgWordRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      bgWordRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero">
      <span ref={bgWordRef} className="hero__ghost" aria-hidden>
        YAGA
      </span>

      <div className="hero__glow" aria-hidden />

      <div className="hero__eyebrow">
        <span className="hero__eyebrow-line" />
        <span className="hero__eyebrow-label">
          Независимая студия дизайна и разработки
        </span>
      </div>

      <div className="hero__top">
        <h1 className="hero__heading">
          Создаём смелые
          <br />
          цифровые продукты
          <br />
          <em className="hero__heading-accent">для амбициозных брендов</em>
        </h1>

        <div className="hero__panel">
          <p className="hero__description">
            Бутиковая студия без лишних звеньев. Делаем интерфейсы, брендинг и разработку
            так, чтобы продукт выглядел уверенно, говорил ясно и запускался без потерь
            между дизайном и кодом.
          </p>

          <ul className="hero__tags" aria-label="Ключевые направления">
            {heroTags.map((tag) => (
              <li key={tag} className="hero__tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hero__bottom">
        <div className="hero__facts">
          {heroFacts.map((fact) => (
            <div key={fact.label} className="hero__fact">
              <span className="hero__fact-value">{fact.value}</span>
              <span className="hero__fact-label">{fact.label}</span>
            </div>
          ))}
        </div>

        <div className="hero__actions">
          <a href="#contact" data-hover className="hero__cta">
            Обсудить проект
            <ArrowIcon />
          </a>
          <span className="hero__scroll-hint">↓ прокрути</span>
        </div>
      </div>

      <div className="hero__divider" aria-hidden />
    </section>
  );
}
