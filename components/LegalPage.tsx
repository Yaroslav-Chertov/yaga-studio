import type { ReactNode } from "react";
import Link from "next/link";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

type LegalSection = {
  title: string;
  body: ReactNode[];
};

type LegalPageProps = {
  label: string;
  title: string;
  lead: string;
  updatedAt: string;
  sections: LegalSection[];
};

export default function LegalPage({
  label,
  title,
  lead,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="legal-page">
        <section className="legal-page__hero">
          <Link href="/#contact" className="legal-page__back" data-hover>
            <span aria-hidden="true">↙</span>
            Вернуться на сайт
          </Link>

          <div className="legal-page__topline">
            <span className="legal-page__label">{label}</span>
            <span className="legal-page__updated">Обновлено: {updatedAt}</span>
          </div>

          <h1 className="legal-page__title">{title}</h1>
          <p className="legal-page__lead">{lead}</p>
        </section>

        <section className="legal-page__content">
          {sections.map((section) => (
            <article key={section.title} className="legal-page__section">
              <h2>{section.title}</h2>
              <div className="legal-page__section-body">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
