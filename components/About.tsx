"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

function FadeIn({ children, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const team = [
  {
    role: "Разработка",
    name: "Ярослав",
    desc: "Frontend, Backend, архитектура. Пишет код, который работает так же, как выглядит дизайн — без компромиссов.",
  },
  {
    role: "UX/UI Дизайн",
    name: "Галина",
    desc: "Исследования, прототипы, интерфейсы. Делает сложное простым, а простое — запоминающимся.",
  },
];

export default function About() {
  return (
    <section id="about" className="about">
      <FadeIn>
        <span className="about__label">01 — О студии</span>
      </FadeIn>

      <div className="about__grid">
        {/* Left */}
        <FadeIn delay={0.1}>
          <h2 className="about__heading">
            Нас двое.
            <br />
            Это <span className="about__heading-accent">сила,</span>
            <br />
            не слабость.
          </h2>
        </FadeIn>

        {/* Right */}
        <div className="about__content">
          <FadeIn delay={0.15}>
            <p className="about__text">
              YAGA — студия без отделов, менеджеров и испорченного телефона.{" "}
              <strong>Ярослав (разработка) и Галина (UX/UI)</strong> работают с
              вами напрямую — от брифа до деплоя.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="about__text">
              Мы из Петербурга, работаем из Белграда, берём проекты по всему
              миру. Крупные агентства тратят ваш бюджет на структуру.{" "}
              <strong>Мы тратим его на результат.</strong>
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="about__text">
              Сейчас хорошее время для смелых решений — рынок оптимизирует
              бюджеты, а нам не нужно содержать этажи. Уровень senior-команды
              по адекватной цене.
            </p>
          </FadeIn>

          <div className="about__team">
            {team.map((m, i) => (
              <FadeIn key={m.name} delay={0.3 + i * 0.1}>
                <div className="about__member">
                  <span className="about__member-role">{m.role}</span>
                  <p className="about__member-name">{m.name}</p>
                  <p className="about__member-desc">{m.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
