import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { cases } from "@/data/cases";
import { siteConfig, siteUrl } from "@/data/site";

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
    alternates: {
      canonical: `/cases/${item.slug}`,
    },
    openGraph: {
      title: `${item.client} — кейс YAGA`,
      description: item.intro,
      url: `${siteUrl}/cases/${item.slug}`,
      siteName: siteConfig.name,
      locale: "ru_RU",
      type: "article",
      images: [
        {
          url: item.previewImage,
          alt: item.previewAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.client} — кейс YAGA`,
      description: item.intro,
      images: [item.previewImage],
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
          <div className="case-hero__meta">
            <Link href="/#cases" className="case-hero__back" data-hover>
              Назад к кейсам
            </Link>

            <div className="case-hero__top">
              <span className="case-hero__label">
                {item.year} — {item.category}
              </span>
              <span className="case-hero__status">{item.status}</span>
            </div>
          </div>

          <h1 className="case-hero__title">{item.title}</h1>

          <div className="case-hero__intro-row">
            <p className="case-hero__intro">{item.intro}</p>
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="case-hero__visit"
              >
                Перейти на сайт
              </a>
            )}
          </div>

          <div className="case-hero__image">
            <Image
              src={item.previewImage}
              alt={item.previewAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 980px"
            />
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
