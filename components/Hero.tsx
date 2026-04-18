"use client";

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
  return (
    <section className="hero">
      <div className="hero__backdrop" aria-hidden>
        <span className="hero__ghost hero__ghost--main">YAGA</span>
        <span className="hero__ghost hero__ghost--shadow">YAGA</span>
      </div>

      <div className="hero__glow" aria-hidden />
      <div className="hero__orb hero__orb--one" aria-hidden />
      <div className="hero__orb hero__orb--two" aria-hidden />

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
          <em className="hero__heading-accent">для амбициозных брендов</em>
        </h1>

        <aside className="hero__panel">
          <div className="hero__panel-meta">
            <span className="hero__panel-kicker">YAGA / 2026</span>
            <span className="hero__panel-line" />
          </div>

          <p className="hero__description">
            Бутиковая студия без лишних звеньев. Делаем интерфейсы, брендинг и
            разработку так, чтобы продукт выглядел уверенно, говорил ясно и
            запускался без потерь между дизайном и кодом.
          </p>

          <ul className="hero__tags" aria-label="Ключевые направления">
            {heroTags.map((tag) => (
              <li key={tag} className="hero__tag">
                {tag}
              </li>
            ))}
          </ul>
        </aside>
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
