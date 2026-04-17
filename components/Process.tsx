"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const steps = [
  {
    timing: "Неделя 1–2",
    name:   "Погружение & ТЗ",
    desc:   "Изучаем материалы, исследуем рынок и конкурентов. Фиксируем требования, архитектуру и критерии приёмки. Нет ТЗ — нет сюрпризов в конце.",
  },
  {
    timing: "Неделя 3–8",
    name:   "UX & Прототип",
    desc:   "Пользовательские сценарии, архитектура продукта, вайрфреймы. Согласовываем структуру и логику до старта UI — чтобы не переделывать.",
  },
  {
    timing: "Неделя 9–16",
    name:   "Дизайн & Разработка",
    desc:   "UI параллельно с frontend. Backend и интеграции. Дизайнер и разработчик в одной команде — синхронизация без потерь.",
  },
  {
    timing: "Неделя 17–18",
    name:   "Запуск & Передача",
    desc:   "Тестирование, деплой, финальная проверка. Передаём доступы, документацию, рекомендации. Поддержка — по договорённости.",
  },
];

type Step = (typeof steps)[0];

function StepRow({ step, index }: { step: Step; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="process-step"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "none" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s`,
      }}
    >
      <span className="process-step__timing">{step.timing}</span>
      <p className="process-step__name">{step.name}</p>
      <p className="process-step__desc">{step.desc}</p>
    </div>
  );
}

export default function Process() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inView   = useInView(titleRef, { once: true });

  return (
    <section id="process" className="process">
      <span className="process__label">03 — Процесс</span>

      <h2
        ref={titleRef}
        className="process__heading"
        style={{
          opacity:    inView ? 1 : 0,
          transform:  inView ? "none" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        Как это
        <br />
        работает
      </h2>

      <div className="process__list">
        {steps.map((step, i) => (
          <StepRow key={step.timing} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
