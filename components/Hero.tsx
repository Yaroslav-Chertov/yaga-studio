"use client";

const heroTags = [
  "Брендинг",
  "UX-исследования",
  "Интерфейсы",
  "Веб-разработка",
  "AI workflow",
] as const;

const heroFacts = [
  { value: "5+", label: "лет практики с цифровыми продуктами" },
  { value: "1", label: "команда для стратегии, дизайна и запуска" },
  { value: "∞", label: "внимание к качеству и деталям" },
] as const;

const tickerWords = [
  "Брендинг",
  "Дизайн",
  "Разработка",
  "UI/UX",
  "Брендинг",
  "Дизайн",
  "Разработка",
  "UI/UX",
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path
      d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5"
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
      <div className="hero__gridline hero__gridline--v" aria-hidden />
      <div className="hero__gridline hero__gridline--h" aria-hidden />
      <div className="hero__ticker" aria-hidden>
        <div className="hero__ticker-track">
          {tickerWords.map((w, i) => (
            <span key={i} className="hero__ticker-word">
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="hero__content">
        <div className="hero__top">
          <h1 className="hero__heading">
            Создаём интерфейсы,
            <em className="hero__heading-accent">
              которые выглядят убедительно
            </em>
          </h1>

          <div className="hero__aside">
            <p className="hero__description">
              Подключаемся к проектам, где важно не просто сделать красивый
              digital-слой, а выстроить цельный образ бренда и довести его до
              рабочего результата.
            </p>
            <div className="hero__tags" aria-label="Направления работы">
              {heroTags.map((tag) => (
                <span key={tag} className="hero__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hero__bottom">
          <div className="hero__actions">
            <a href="#contact" data-hover className="hero__cta">
              Обсудить проект
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
