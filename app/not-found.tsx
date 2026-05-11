import Link from "next/link";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="error-page">
        <div className="error-page__orb" aria-hidden />
        <span className="error-page__code">404</span>
        <h1 className="error-page__title">Эта страница выпала из сетки</h1>
        <p className="error-page__text">
          Похоже, ссылка устарела или адрес набран с ошибкой. Вернемся на
          главную и продолжим оттуда.
        </p>
        <div className="error-page__actions">
          <Link href="/" className="error-page__btn error-page__btn--primary">
            На главную
          </Link>
          <Link href="/#cases" className="error-page__btn error-page__btn--ghost">
            Смотреть кейсы
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
