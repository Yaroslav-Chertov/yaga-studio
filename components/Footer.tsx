const footerLinks = [
  { href: "#", label: "Behance" },
  { href: "#", label: "Telegram" },
  { href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <a href="#" className="footer__logo">
        YA<span className="footer__logo-accent">GA</span>
      </a>

      <ul className="footer__links">
        {footerLinks.map((l) => (
          <li key={l.label}>
            <a href={l.href} data-hover className="footer__link">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="footer__copy">© 2025 YAGA Studio · Белград — Петербург</p>
    </footer>
  );
}
