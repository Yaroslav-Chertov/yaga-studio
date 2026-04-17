"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const reasons = [
  {
    num:   "01",
    title: "Смело, а не безопасно",
    text:  "Не делаем «как у всех». Каждый проект — попытка сделать что-то, чего ещё не было. Нам самим неинтересно иначе.",
  },
  {
    num:   "02",
    title: "Дизайн + код в одних руках",
    text:  "Никакого испорченного телефона. Нарисованное реализуется именно так, потому что дизайнер и разработчик работают вместе с первого дня.",
  },
  {
    num:   "03",
    title: "Цена без лишнего воздуха",
    text:  "Нет менеджеров, отделов и офиса. Вы платите за дизайн и код — не за структуру агентства.",
  },
  {
    num:   "04",
    title: "Прямой контакт",
    text:  "Вы всегда говорите с теми, кто делает. Без аккаунт-менеджеров и брифинга брифинга.",
  },
  {
    num:   "05",
    title: "AI-ускорение там, где нужно",
    text:  "Используем AI как инструмент — для скорости и цены там, где оправдано. Без потери качества там, где важна точность.",
  },
];

type Reason = (typeof reasons)[0];

function Card({ r, delay }: { r: Reason; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="why-card"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "none" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <span className="why-card__num" aria-hidden>{r.num}</span>
      <h3 className="why-card__title">{r.title}</h3>
      <p className="why-card__text">{r.text}</p>
    </div>
  );
}

export default function Why() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(titleRef, { once: true });

  return (
    <section id="why" className="why">
      <span className="why__label">04 — Почему мы</span>

      <div ref={titleRef} className="why__header">
        <h2
          className="why__heading"
          style={{
            opacity:    inView ? 1 : 0,
            transform:  inView ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          Пять причин
          <br />
          выбрать YAGA
        </h2>
        <p className="why__subtitle">
          Особенно актуально для брендов, которые оптимизируют бюджеты в 2025.
        </p>
      </div>

      <div className="why__grid">
        {reasons.map((r, i) => (
          <Card key={r.num} r={r} delay={i * 0.08} />
        ))}
      </div>

      <div className="why__banner">
        <p className="why__banner-text">
          Сейчас хорошее время купить смелость. Крупные агентства дорожают —
          мы предлагаем уровень{" "}
          <span className="why__banner-accent">senior-команды</span> по
          разумным деньгам.
        </p>
      </div>
    </section>
  );
}
