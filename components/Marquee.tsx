const items = [
  "Веб-дизайн",
  "UX-исследования",
  "Frontend",
  "Backend",
  "AI-разработка",
  "Дизайн-системы",
  "Прототипирование",
  "Брендинг",
];

function MarqueeItem({ label }: { label: string }) {
  return (
    <div className="marquee__item">
      {label}
      <span className="marquee__dot" aria-hidden />
    </div>
  );
}

export default function Marquee() {
  // Quadruple items so the seamless loop works at any screen width
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee">
      <div className="marquee__track">
        {doubled.map((item, i) => (
          <MarqueeItem key={i} label={item} />
        ))}
      </div>
    </div>
  );
}
