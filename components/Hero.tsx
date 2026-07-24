"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 6]);

  const visualY = prefersReducedMotion ? 0 : rawY;
  const visualScale = prefersReducedMotion ? 1 : rawScale;
  const visualOpacity = prefersReducedMotion ? 1 : rawOpacity;
  const visualRotate = prefersReducedMotion ? 0 : rawRotate;

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero__glow" aria-hidden />

      <div className="hero__visual-wrap" aria-hidden>
        <motion.div
          className="hero__visual"
          style={{
            y: visualY,
            scale: visualScale,
            opacity: visualOpacity,
            rotate: visualRotate,
          }}
        >
          <Image
            src="/hero-blob.png"
            alt=""
            fill
            priority
            sizes="(max-width: 767px) 78vw, 44vw"
            className="hero__visual-img"
          />
        </motion.div>
      </div>

      <div className="hero__content">
        <div className="hero__top">
          <h1 className="hero__heading">
            Создаём интерфейсы,
            <em className="hero__heading-accent">
              которые выглядят убедительно
            </em>
          </h1>

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
