const footerLinks = [
  { href: "#", label: "Behance" },
  { href: "#", label: "Telegram" },
  { href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__intro">
        <a href="#" className="footer__logo">
          YAGA
        </a>
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

        <p className="footer__caption">
          © 2026 YAGA Studio · Белград — Петербург
        </p>
      </div>
    </footer>
  );
}
