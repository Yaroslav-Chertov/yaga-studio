import Link from "next/link";
import { siteConfig } from "@/data/site";

const contactLinks = [
  { href: siteConfig.telegram, label: "Telegram" },
  { href: `mailto:${siteConfig.email}`, label: "Email" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Политика конфиденциальности" },
  { href: "/consent-to-data-processing", label: "Согласие на обработку" },
  { href: "/cookie-policy", label: "Cookie" },
  { href: "/terms", label: "Соглашение" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__intro">
          <p className="footer__copy">
            Делаем интерфейсы и&nbsp;продукты, которые выглядят уверенно
            и&nbsp;работают на&nbsp;результат.
          </p>
          <p className="footer__caption">© 2026 · Нови-Сад · Санкт-Петербург</p>
        </div>

        <div className="footer__col">
          <span className="footer__col-title">Контакты</span>
          <ul className="footer__links">
            {contactLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} data-hover className="footer__link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <span className="footer__col-title">Документы</span>
          <ul className="footer__legal">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-hover
                  className="footer__legal-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom" role="img" aria-label="YAGA">
        <svg
          className="footer__big"
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <text
            x="500"
            y="200"
            fontSize="190"
            textAnchor="middle"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
          >
            YAGA
          </text>
        </svg>
      </div>
    </footer>
  );
}
