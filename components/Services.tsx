"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Service {
  num: string;
  name: string;
  desc: string;
  badge?: string;
}

const services: Service[] = [
  {
    num: "01",
    name: "UX-дизайн & Исследования",
    desc: "Ресёрч, сценарии, архитектура, вайрфреймы. Проектируем логику до того, как нарисуем пиксель.",
  },
  {
    num: "02",
    name: "UI-дизайн & Дизайн-система",
    desc: "Полный комплект макетов, адаптив, UI-kit. Смело, но со смыслом — каждое решение обосновано.",
  },
  {
    num: "03",
    name: "Веб-разработка",
    desc: "Frontend + Backend, интеграции, деплой. Реализуем то, что нарисовано — без компромиссов.",
  },
  {
    num: "04",
    name: "AI-трек",
    desc: "Дизайн или разработка с AI-ускорением. В 2–3 раза быстрее, дешевле, с фиксированным числом итераций.",
    badge: "⚡ Быстрый запуск",
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
      <span className="service-row__num">{s.num}</span>

      <div className="service-row__body">
        <p className="service-row__name">{s.name}</p>
        {s.badge && <span className="service-row__badge">{s.badge}</span>}
      </div>

      <p className="service-row__desc">{s.desc}</p>

      <span
        className="service-row__arrow"
        style={{
          color: hovered ? "#FF4D2E" : "rgba(241,237,231,0.15)",
          transform: hovered ? "translate(4px,-4px)" : "none",
        }}
      >
        ↗
      </span>
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="services" className="services">
      <span className="services__label">02 — Услуги</span>

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
        <p className="services__subtitle">
          Берёмся за проекты, где нужен не просто красивый экран, а работающий продукт.
        </p>
      </div>

      <div className="services__list">
        {services.map((s, i) => (
          <ServiceRow key={s.num} s={s} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
