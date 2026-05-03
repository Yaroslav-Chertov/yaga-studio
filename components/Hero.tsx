"use client";

const heroTags = [
  "Бренд",
  "Исследования",
  "Продуктовый UX",
  "Интерфейсы",
  "Разработка",
  "AI-инструменты",
] as const;

const heroFacts = [
  { value: "5+", label: "лет практики с цифровыми продуктами" },
  { value: "∞", label: "внимание к качеству и деталям" },
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
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden />
      <div className="hero__orb hero__orb--one" aria-hidden />
      <div className="hero__orb hero__orb--two" aria-hidden />

      <div className="hero__eyebrow">
        <span className="hero__eyebrow-line" />
        <span className="hero__eyebrow-label">
          Для бизнеса, которому важен уровень
        </span>
      </div>

      <div className="hero__top">
        <h1 className="hero__heading">
          Создаём интерфейсы и&nbsp;сайты,
          <em className="hero__heading-accent">
            которые выглядят современно и&nbsp;убедительно
          </em>
        </h1>
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
        </div>
      </div>

      <div className="hero__divider" aria-hidden />
    </section>
  );
}
