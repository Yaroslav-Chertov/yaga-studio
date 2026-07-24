"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Service {
  icon: string;
  name: string;
  desc: string;
  badge?: string;
}

const services: Service[] = [
  {
    icon: "/icons/icon-01.svg",
    name: "UX & Исследования",
    desc: "Изучаем продукт, аудиторию и сценарии использования. Формируем структуру, логику и пользовательский путь, чтобы дизайн и разработка опирались на понятные решения.",
  },
  {
    icon: "/icons/icon-02.svg",
    name: "UI-дизайн",
    desc: "Проектируем интерфейсы, которые выглядят цельно, современно и убедительно. Собираем макеты, адаптивные версии и UI-kit для дальнейшего развития продукта.",
  },
  {
    icon: "/icons/icon-03.svg",
    name: "Веб-разработка",
    desc: "Реализуем сайты и цифровые продукты на frontend и backend, настраиваем интеграции и готовим проект к запуску. Следим, чтобы итог точно соответствовал задумке и работал стабильно.",
  },
  {
    icon: "/icons/icon-04.svg",
    name: "AI-формат",
    desc: "Подключаем AI там, где он помогает ускорить рутину и быстрее проверять рабочие гипотезы. Это сокращает сроки отдельных этапов и оставляет больше ресурса на смысл, эстетику и точность.",
    badge: "🚀 Быстрый запуск",
  },
];

interface ServiceRowProps {
  s: Service;
  delay: number;
}

function ServiceRow({ s, delay }: ServiceRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      data-hover
      className="service-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        background: hovered ? "rgba(255,77,46,0.04)" : "transparent",
      }}
    >
      <span className="service-row__icon" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, no optimization needed */}
        <img src={s.icon} alt="" width={56} height={56} />
      </span>

      <div className="service-row__body">
        <p className="service-row__name">{s.name}</p>
      </div>

      <p className="service-row__desc">{s.desc}</p>
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="services" className="services">
      <div className="services__header">
        <div ref={ref}>
          <h2
            className="services__heading"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Что
            <br />
            делаем
          </h2>
        </div>
        <p className="services__intro">
          Подключаемся к проектам, где важно собрать сильный визуальный образ,
          удобный пользовательский опыт и качественную реализацию.
        </p>
      </div>

      <div className="services__list">
        {services.map((s, i) => (
          <ServiceRow key={s.name} s={s} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
