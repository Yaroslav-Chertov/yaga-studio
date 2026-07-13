import Link from "next/link";
import { siteConfig } from "@/data/site";

const footerLinks = [
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
      <div className="footer__intro">
        <Link href="/" className="footer__logo">
          YAGA
        </Link>
        <p className="footer__copy">
          Делаем интерфейсы и&nbsp;продукты, которые выглядят уверенно
          и&nbsp;работают на&nbsp;результат.
        </p>
      </div>

      <div className="footer__meta">
        <ul className="footer__links">
          {footerLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} data-hover className="footer__link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="footer__legal">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} data-hover className="footer__legal-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="footer__caption">
          © 2026 YAGA Studio · Нови-Сад · Петербург
        </p>
      </div>
    </footer>
  );
}
