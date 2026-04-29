import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { cases } from "@/data/cases";

type CasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return cases.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((entry) => entry.slug === slug);

  if (!item) {
    return {
      title: "Кейс не найден — YAGA",
    };
  }

  return {
    title: `${item.client} — кейс YAGA`,
    description: item.intro,
    openGraph: {
      title: `${item.client} — кейс YAGA`,
      description: item.intro,
      siteName: "YAGA Studio",
      locale: "ru_RU",
      type: "article",
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = cases.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Cursor />
      <Nav />
      <main className="case-page">
        <section className="case-hero">
          <Link href="/#cases" className="case-hero__back" data-hover>
            <span aria-hidden="true">↙</span>
            Назад к кейсам
          </Link>

          <div className="case-hero__top">
            <span className="case-hero__label">
              {item.year} — {item.category}
            </span>
            <span className="case-hero__status">{item.status}</span>
          </div>

          <h1 className="case-hero__title">{item.title}</h1>
          <p className="case-hero__intro">{item.intro}</p>

          <div className="case-hero__image" aria-hidden="true">
            <span>{item.heroImageLabel}</span>
            <small>NDA IMAGE</small>
          </div>
        </section>

        <section className="case-content">
          <div className="case-content__meta">
            <div className="case-content__meta-item">
              <span>Клиент</span>
              <strong>{item.client}</strong>
            </div>
            <div className="case-content__meta-item">
              <span>Формат</span>
              <strong>{item.category}</strong>
            </div>
          </div>

          <div className="case-content__body">
            {item.sections.map((section) => (
              <article key={section.title} className="case-content__section">
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </article>
            ))}
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
