"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const reasons = [
  {
    num: "01",
    title: "Сильная визуальная подача",
    text: "Не идём по шаблонному пути и не собираем решения “как у всех”. Для нас важно, чтобы у проекта был собственный характер, а у бренда — выразительный и узнаваемый образ.",
  },
  {
    num: "02",
    title: "Дизайн и разработка в одной связке",
    text: "Проектируем и реализуем внутри одной команды. Это помогает сохранить идею, избежать искажений на этапе передачи и довести результат до нужного уровня в деталях.",
  },
  {
    num: "03",
    title: "Рациональный формат работы",
    text: "Без лишних управленческих слоёв и перегруженной структуры. Бюджет проекта работает на исследование, дизайн и разработку — то есть на сам результат.",
  },
  {
    num: "04",
    title: "Прямой диалог",
    text: "Вы общаетесь напрямую с теми, кто ведёт проект. Это ускоряет работу, упрощает согласования и делает процесс более прозрачным.",
  },
  {
    num: "05",
    title: "Технологичный подход",
    text: "Используем современные инструменты, включая AI, там, где они действительно помогают ускорить процесс.",
  },
];

type Reason = (typeof reasons)[0];

function Card({ r, delay }: { r: Reason; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="why-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <span className="why-card__num" aria-hidden>
        {r.num}
      </span>
      <h3 className="why-card__title">{r.title}</h3>
      <p className="why-card__text">{r.text}</p>
    </div>
  );
}

export default function Why() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="why" className="why">
      <span className="why__label">04 — Почему мы</span>

      <div ref={titleRef} className="why__header">
        <h2
          className="why__heading"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          Почему
          <br />
          YAGA
        </h2>
        <p className="why__subtitle">
          Подходим бизнесу, которому важны уровень, цельность и&nbsp;живая
          вовлечённость в&nbsp;проект.
        </p>
      </div>

      <div className="why__grid">
        {reasons.map((r, i) => (
          <Card key={r.num} r={r} delay={i * 0.08} />
        ))}
      </div>

      <div className="why__banner">
        <p className="why__banner-text">
          Если вам близок современный, смелый и&nbsp;собранный подход
          к&nbsp;дизайну и&nbsp;разработке,{" "}
          <span className="why__banner-accent">значит нам по&nbsp;пути.</span>
        </p>
      </div>
    </section>
  );
}
