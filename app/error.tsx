"use client";

import Link from "next/link";
import { useEffect } from "react";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Cursor />
      <Nav />
      <main className="error-page">
        <div className="error-page__orb error-page__orb--warm" aria-hidden />
        <span className="error-page__code">500</span>
        <h1 className="error-page__title">Что-то пошло не по сценарию</h1>
        <p className="error-page__text">
          Мы уже поймали эту ошибку на уровне интерфейса. Можно попробовать
          перезагрузить страницу или вернуться на главную.
        </p>
        <div className="error-page__actions">
          <button
            type="button"
            className="error-page__btn error-page__btn--primary"
            onClick={reset}
          >
            Попробовать снова
          </button>
          <Link href="/" className="error-page__btn error-page__btn--ghost">
            На главную
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
