"use client";

import Image from "next/image";
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
        <div className="case-row__body">
          <div className="case-row__headline">
            <h3 className="case-row__client">{item.client}</h3>
            <span className="case-row__status">{item.status}</span>
          </div>

          <div className="case-row__tags">
            <span className="case-row__tag">[{item.category}]</span>
            <span className="case-row__tag">/{item.year}</span>
          </div>

          <p className="case-row__scope">{item.scope}</p>

          <div className="case-row__footer">
            <div className="case-row__tasks">
              {item.tasks.map((task) => (
                <span key={task} className="case-row__task">
                  {task}
                </span>
              ))}
            </div>
            <span className="case-row__link">{item.linkLabel}</span>
          </div>
        </div>
      </div>

      <div
        className={`case-row__preview ${hovered ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <div className="case-row__preview-image">
          <span className="case-row__preview-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Image
            src={item.previewImage}
            alt={item.previewAlt}
            fill
            sizes="(max-width: 1024px) 0px, 24rem"
          />
        </div>
      </div>
    </Link>
  );
}

export default function About() {
  return (
    <section id="cases" className="about">
      <div className="about__hero">
        <h2 className="about__heading">Наши кейсы</h2>
      </div>

      <div className="about__list">
        {cases.map((item, index) => (
          <CaseRow key={item.slug} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
