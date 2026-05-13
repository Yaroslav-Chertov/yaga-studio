# YAGA Studio — сайт студии

> Маркетинговый сайт бутиковой студии дизайна и разработки. Next.js 16, React 19, TypeScript, SCSS (7-1), Framer Motion. Форма заявок с EmailJS + Telegram Bot.

**Продакшн:** [yaga-studio.vercel.app](https://yaga-studio.vercel.app)

---

## О проекте

YAGA Studio — студия брендинга, интерфейсов и веб-разработки для бизнеса, которому важны вкус, цельность и сильная цифровая подача.

Сайт выстроен как одностраничный лендинг с секциями Hero, About, Services, Process, Why и Contact. Визуальный язык — тёплая офф-вайтовая палитра, типографика Manrope + Onest, плавные анимации появления через Framer Motion. Форма заявок отправляет письмо через EmailJS и, опционально, уведомление в Telegram через Bot API.

---

## Стек

| Слой | Технология |
|---|---|
| Фреймворк | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Стили | SCSS, 7-1 паттерн, BEM |
| Анимации | Framer Motion |
| Форма / Email | EmailJS (`@emailjs/browser`) |
| Уведомления | Telegram Bot API |
| Деплой | Vercel |
| Линтинг | ESLint, Prettier |

---

## Архитектура

```
├── app/                    # App Router — страницы и мета
│   ├── page.tsx            # Главная (все секции)
│   ├── layout.tsx          # Root layout, шрифты, метаданные
│   ├── cases/[slug]/       # Динамические страницы кейсов
│   ├── privacy-policy/     # Политика конфиденциальности
│   ├── cookie-policy/      # Политика куки
│   ├── terms/              # Пользовательское соглашение
│   └── consent-to-data-processing/
├── components/             # React-компоненты секций
│   ├── Hero.tsx
│   ├── Nav.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── Why.tsx
│   ├── Contact.tsx         # Форма заявок с EmailJS + TG
│   ├── Marquee.tsx
│   ├── Footer.tsx
│   ├── Cursor.tsx
│   └── LegalPage.tsx
├── styles/                 # SCSS, 7-1 паттерн
│   ├── globals.scss        # Точка входа, импорты
│   ├── _variables.scss     # Дизайн-токены: цвета, шрифты, отступы
│   ├── _mixins.scss        # Миксины: медиа, радиальное свечение
│   ├── _base.scss          # Глобальные стили
│   └── components/         # Стили по компоненту
└── data/
    ├── site.ts             # Конфиг студии: контакты, URL
    └── cases.ts            # Данные кейсов
```

**Ключевые решения:**

- **SCSS 7-1 + BEM** — стили разбиты по компонентам, дизайн-токены вынесены в `_variables.scss`. Нет Tailwind, нет утилитарных классов в разметке.
- **App Router + динамические маршруты** — страницы кейсов генерируются из `data/cases.ts` через `[slug]`, со статической генерацией (`generateStaticParams`).
- **Framer Motion `useInView`** — анимации появления секций запускаются один раз при попадании в viewport, без лишних зависимостей.
- **EmailJS на клиенте** — отправка формы без бэкенда: `@emailjs/browser` делает запрос напрямую к EmailJS API из браузера.
- **Telegram Bot API** — параллельное уведомление в чат. Опционально: если переменные `TG_BOT_TOKEN` / `TG_CHAT_ID` не заданы, блок молча пропускается.
- **Кастомный курсор** — `Cursor.tsx` подключается через `next/dynamic` с `ssr: false`, чтобы не сломать SSR.
- **SEO** — `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` через App Router Metadata API, манифест PWA.

---

## Настройка EmailJS

1. Зарегистрируйтесь на [emailjs.com](https://www.emailjs.com).
2. **Email Service** → подключите Яндекс Почту (SMTP или через «Gmail», указав smtp.yandex.ru).
3. **Email Template** → создайте шаблон. Используйте переменные:

   | Переменная в шаблоне | Что придёт |
   |---|---|
   | `{{from_name}}` | Имя отправителя |
   | `{{company}}` | Компания |
   | `{{services}}` | Выбранные услуги |
   | `{{budget}}` | Бюджет |
   | `{{contact}}` | Telegram / email клиента |
   | `{{referral}}` | Откуда узнали |
   | `{{message}}` | Описание задачи |
   | `{{file_name}}` | Имя прикреплённого файла |

4. **Account → API Keys** → скопируйте Public Key.
5. Заполните переменные окружения (см. ниже).

> ⚠️ На бесплатном тарифе EmailJS — 200 писем/месяц. Файлы через EmailJS не передаются — в письмо приходит только имя файла. Для передачи вложений потребуется платный тариф или отдельное хранилище.

---

## Настройка Telegram Bot (опционально)

1. Создайте бота через [@BotFather](https://t.me/BotFather) → получите токен.
2. Напишите боту любое сообщение, затем откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` — найдите свой `chat_id`.
3. Заполните `NEXT_PUBLIC_TG_BOT_TOKEN` и `NEXT_PUBLIC_TG_CHAT_ID`.

Если переменные не заданы — уведомления в Telegram просто не отправляются, форма продолжает работать.

---

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните значения:

```bash
cp .env.example .env.local
```

| Переменная | Описание |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Канонический URL сайта |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | ID сервиса в EmailJS |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | ID шаблона в EmailJS |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Public Key аккаунта EmailJS |
| `NEXT_PUBLIC_TG_BOT_TOKEN` | Токен Telegram-бота (опционально) |
| `NEXT_PUBLIC_TG_CHAT_ID` | Chat ID для уведомлений (опционально) |

На Vercel переменные добавляются через **Project → Settings → Environment Variables**.

---

## Локальный запуск

```bash
# Установка зависимостей
npm install

# Настройка окружения
cp .env.example .env.local
# Заполнить переменные

# Dev-сервер
npm run dev

# Сборка
npm run build

# Линтинг
npm run lint

# Форматирование
npm run format
```

---

## Деплой

Проект задеплоен на [Vercel](https://vercel.com). Push в `main` → автоматический деплой.

Не забудьте добавить все переменные из `.env.example` в настройки проекта на Vercel.

---

## Другие проекты

- [Стажер Онлайн](https://stazher.online) — HR-платформа, Vue 3, TypeScript, Pinia, Tiptap, Chart.js
- [Structura](https://github.com/Yaroslav-Chertov/structura) — SaaS-планер продуктивности, Next.js 16, React 19, ЮКасса, Resend
- [GALITSKIY & GALITSKIY](https://github.com/Yaroslav-Chertov/galitskiy-and-galitskiy) — JSX, кастомный scroll-controller, Lighthouse 90+
- [ONY Career Page](https://github.com/Yaroslav-Chertov/ony-agency) — JSX, SSR + интеграция Bitrix API, Telegram-уведомления
