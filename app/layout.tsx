import type { Metadata } from "next";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "YAGA — Дизайн & Разработка",
  description:
    "Бутиковая студия дизайна и разработки. Делаем то, на что другие не решаются.",
  openGraph: {
    title: "YAGA Studio",
    description: "Дизайн и разработка. Смело, а не безопасно.",
    siteName: "YAGA Studio",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
