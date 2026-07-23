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

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden />

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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
