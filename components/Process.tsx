"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const steps = [
  {
    timing: "Шаг 01",
    name: "Погружение",
    desc: "Разбираемся в задаче, продукте и контексте бизнеса. Изучаем материалы, аудиторию, рынок и фиксируем рамки проекта, чтобы с самого начала двигаться в верном направлении.",
  },
  {
    timing: "Шаг 02",
    name: "UX и прототип",
    desc: "Собираем логику будущего решения: пользовательские сценарии, архитектуру, ключевые экраны и содержание. Согласовываем основу до визуальной проработки.",
  },
  {
    timing: "Шаг 03",
    name: "Дизайн и разработка",
    desc: "Проектируем интерфейсы, собираем визуальную систему и переносим всё в рабочий продукт. Дизайн и разработка идут согласованно, поэтому идея не теряется на этапе реализации.",
  },
  {
    timing: "Шаг 04",
    name: "Запуск и передача",
    desc: "Тестируем, публикуем и доводим проект до финального состояния. Передаём доступы, материалы и рекомендации для дальнейшей работы с продуктом.",
  },
];

type Step = (typeof steps)[0];

function StepRow({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="process-step"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="process-step__timing">
        <span className="process-step__timing-label">{step.timing}</span>
      </div>
      <h3 className="process-step__name">{step.name}</h3>
      <p className="process-step__desc">{step.desc}</p>
    </div>
  );
}

export default function Process() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="process" className="process">
      <div className="process__header">
        <div>
          <span className="process__label">03 — Процесс</span>
          <h2
            ref={titleRef}
            className="process__heading"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Как это
            <br />
            работает
          </h2>
        </div>
        <p className="process__intro">
          Работаем поэтапно, чтобы ключевые решения по структуре, подаче и
          реализации принимались вовремя и не терялись на пути к запуску.
        </p>
      </div>

      <div className="process__list">
        {steps.map((step, i) => (
          <StepRow key={step.timing} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
