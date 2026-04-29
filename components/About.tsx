"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cases, type CaseItem } from "@/data/cases";

interface CaseRowProps {
  item: CaseItem;
  index: number;
}

function CaseRow({ item, index }: CaseRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/cases/${item.slug}`}
      className="case-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={ref}
        className="case-row__main"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
        }}
      >
        <span className="case-row__year">{item.year}</span>
        <p className="case-row__client">{item.client}</p>
        <p className="case-row__scope">{item.scope}</p>
        <span className="case-row__link">{item.linkLabel}</span>
        <span className="case-row__status">{item.status}</span>
      </div>

      <div
        className={`case-row__preview ${hovered ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <div className="case-row__preview-image">
          <span>{item.ndaLabel}</span>
          <small>NDA</small>
        </div>
      </div>
    </Link>
  );
}

export default function About() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="cases" className="about">
      <span className="about__label">01 — Кейсы</span>

      <div className="about__hero" ref={titleRef}>
        <h2
          className="about__heading"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          Наши
          <br />
          клиенты
        </h2>

        <p
          className="about__intro"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.08s, transform 0.6s ease 0.08s",
          }}
        >
          Проекты, где мы собирали визуальный язык, интерфейсы и разработку в
          цельную систему.
        </p>
      </div>

      <div className="about__table-head">
        <span>Год</span>
        <span>Клиент</span>
        <span>Что сделали</span>
        <span>Ссылка</span>
        <span>Статус</span>
      </div>

      <div className="about__list">
        {cases.map((item, index) => (
          <CaseRow key={item.slug} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
