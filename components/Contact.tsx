"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { useInView } from "framer-motion";
import { siteConfig } from "@/data/site";

const SERVICES = [
  "Дизайн сайта",
  "Дизайн мобильного приложения",
  "Разработка сайта",
  "Фирменный стиль",
  "UX-исследование",
  "Другое",
] as const;

const BUDGETS = [
  "до 300 тыс. ₽",
  "до 1 млн ₽",
  "от 1 — до 5 млн ₽",
  "Пока не знаю",
] as const;

type FormValues = {
  services: string[];
  budget: string;
  message: string;
  company: string;
  name: string;
  referral: string;
  contact: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues | "file" | "submit", string>>;

const initialValues: FormValues = {
  services: [],
  budget: "",
  message: "",
  company: "",
  name: "",
  referral: "",
  contact: "",
  consent: false,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const WarningIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
    <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M7 3.8V7.6"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="7" cy="10.1" r="0.85" fill="currentColor" />
  </svg>
);

function FieldError({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: string;
}) {
  return (
    <p id={id} className={`contact__error ${className}`.trim()}>
      <WarningIcon />
      {children}
    </p>
  );
}

function validate(values: FormValues, file: File | null): FormErrors {
  const errors: FormErrors = {};

  if (!values.services.length) {
    errors.services = "Выберите хотя бы одну услугу.";
  }

  if (!values.budget) {
    errors.budget = "Укажите ориентир по бюджету.";
  }

  if (!values.contact.trim()) {
    errors.contact = "Оставьте Telegram, email или телефон.";
  } else if (values.contact.trim().length < 4) {
    errors.contact = "Контакт выглядит слишком коротким.";
  }

  if (!values.consent) {
    errors.consent = "Нужно согласие на обработку данных.";
  }

  if (file && file.size > MAX_FILE_SIZE) {
    errors.file = "Файл должен быть меньше 10 МБ.";
  }

  return errors;
}

/**
 * Отправляет уведомление в Telegram через Bot API.
 * Требует NEXT_PUBLIC_TG_BOT_TOKEN и NEXT_PUBLIC_TG_CHAT_ID.
 */
async function sendTelegram(values: FormValues): Promise<void> {
  const token = process.env.NEXT_PUBLIC_TG_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TG_CHAT_ID;

  if (!token || !chatId) return;

  const lines = [
    `📬 *Новая заявка с YAGA Studio*`,
    ``,
    `*Услуги:* ${values.services.join(", ")}`,
    `*Бюджет:* ${values.budget}`,
    values.company ? `*Компания:* ${values.company}` : null,
    values.name ? `*Имя:* ${values.name}` : null,
    `*Контакт:* ${values.contact}`,
    values.referral ? `*Откуда узнали:* ${values.referral}` : null,
    values.message ? `\n*Задача:*\n${values.message.slice(0, 800)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines,
      parse_mode: "Markdown",
    }),
  });
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [values, setValues] = useState<FormValues>(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSubmitted(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [submitted]);

  const handleServiceToggle = (service: string) => {
    setValues((current) => {
      const exists = current.services.includes(service);
      const services = exists
        ? current.services.filter((item) => item !== service)
        : [...current.services, service];
      return { ...current, services };
    });
    setErrors((current) => ({ ...current, services: undefined }));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type } = event.target;
    const nextValue =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : event.target.value;

    setValues((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setFile(nextFile);
    setErrors((current) => ({
      ...current,
      file:
        nextFile && nextFile.size > MAX_FILE_SIZE
          ? "Файл должен быть меньше 10 МБ."
          : undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate(values, file);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);

    try {
      // EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: values.name || "Не указано",
          company: values.company || "Не указано",
          services: values.services.join(", "),
          budget: values.budget,
          message: values.message || "—",
          contact: values.contact,
          referral: values.referral || "Не указано",
          file_name: file ? file.name : "Без файла",
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        },
      );

      // Telegram Bot
      await sendTelegram(values);

      setSubmitted(true);
      setValues(initialValues);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setErrors((current) => ({
        ...current,
        submit:
          "Не удалось отправить заявку. Напишите нам напрямую в Telegram или на почту.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__glow" aria-hidden />

      <div
        ref={ref}
        className="contact__inner"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div className="contact__intro">
          <h2 className="contact__heading">Расскажите о&nbsp;проекте</h2>
          <p className="contact__lead">
            Заполните короткую форму&nbsp;&mdash; мы&nbsp;изучим задачу,
            свяжемся с&nbsp;вами в&nbsp;течение рабочего дня и&nbsp;предложим
            понятный следующий шаг.
          </p>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <fieldset className="contact__fieldset" disabled={isSubmitting}>
            <div className="contact__grid">
              {/* Services */}
              <div
                className={`contact__field contact__field--full${
                  errors.services ? " is-invalid" : ""
                }`}
              >
                <span className="contact__field-label">
                  Какие услуги вас интересуют?
                </span>
                <span className="contact__hint">Можно выбрать несколько</span>
                <div className="contact__choices">
                  {SERVICES.map((service) => {
                    const checked = values.services.includes(service);
                    return (
                      <label
                        key={service}
                        className={`contact__choice${checked ? " is-selected" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleServiceToggle(service)}
                        />
                        <span>{service}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.services && <FieldError>{errors.services}</FieldError>}
              </div>

              {/* Budget */}
              <div
                className={`contact__field contact__field--full${
                  errors.budget ? " is-invalid" : ""
                }`}
              >
                <span className="contact__field-label">Ваш бюджет</span>
                <span className="contact__hint">Выберите один вариант</span>
                <div className="contact__choices contact__choices--budget">
                  {BUDGETS.map((budget) => (
                    <label
                      key={budget}
                      className={`contact__choice contact__choice--budget${
                        values.budget === budget ? " is-selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={budget}
                        checked={values.budget === budget}
                        onChange={handleInputChange}
                      />
                      <span>{budget}</span>
                    </label>
                  ))}
                </div>
                {errors.budget && <FieldError>{errors.budget}</FieldError>}
              </div>

              {/* Message */}
              <label className="contact__field contact__field--full">
                <span className="contact__field-label">Кратко о задаче</span>
                <span className="contact__hint">Необязательно</span>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Расскажите, что хотите запустить, какие есть сроки и на каком этапе сейчас находится проект."
                />
              </label>

              {/* File upload */}
              <div
                className={`contact__field contact__field--full${
                  errors.file ? " is-invalid" : ""
                }`}
              >
                <span className="contact__field-label">Прикрепить файл</span>
                <span className="contact__hint">
                  Максимальный размер — 10 МБ
                </span>
                <div className="contact__upload">
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className="contact__upload-input"
                  />
                  <button
                    type="button"
                    className="contact__upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {file ? "Заменить файл" : "Выбрать файл"}
                  </button>
                  <span className="contact__upload-name">
                    {file ? file.name : "Файл не выбран"}
                  </span>
                </div>
                {errors.file && <FieldError>{errors.file}</FieldError>}
              </div>

              {/* Company */}
              <label className="contact__field">
                <span className="contact__field-label">Название компании</span>
                <span className="contact__hint">Необязательно</span>
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={handleInputChange}
                  placeholder="Как называется компания или бренд?"
                />
              </label>

              {/* Name */}
              <label className="contact__field">
                <span className="contact__field-label">Имя</span>
                <span className="contact__hint">Необязательно</span>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  placeholder="Как к вам обращаться?"
                />
              </label>

              {/* Referral */}
              <label className="contact__field">
                <span className="contact__field-label">
                  Откуда вы о нас узнали?
                </span>
                <span className="contact__hint">Необязательно</span>
                <input
                  type="text"
                  name="referral"
                  value={values.referral}
                  onChange={handleInputChange}
                  placeholder="Рекомендация, Behance, поиск, Telegram…"
                />
              </label>

              {/* Contact — required */}
              <label
                className={`contact__field${errors.contact ? " is-invalid" : ""}`}
              >
                <span className="contact__field-label">
                  Telegram или способ связи
                </span>
                <span className="contact__hint">Обязательно</span>
                <input
                  type="text"
                  name="contact"
                  value={values.contact}
                  onChange={handleInputChange}
                  placeholder="@username в Telegram или email"
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={
                    errors.contact ? "contact-error" : undefined
                  }
                />
                {errors.contact && (
                  <FieldError id="contact-error">{errors.contact}</FieldError>
                )}
              </label>
            </div>

            {/* Consent */}
            <label
              className={`contact__consent${errors.consent ? " is-invalid" : ""}`}
            >
              <input
                type="checkbox"
                name="consent"
                checked={values.consent}
                onChange={handleInputChange}
              />
              <span>
                Нажимая на кнопку, вы даёте согласие на обработку персональных
                данных, соглашаетесь с{" "}
                <Link href="/privacy-policy">политикой конфиденциальности</Link>{" "}
                и{" "}
                <Link href="/consent-to-data-processing">
                  согласием на обработку данных
                </Link>
                .
              </span>
            </label>
            {errors.consent && (
              <FieldError className="contact__error--consent">
                {errors.consent}
              </FieldError>
            )}
          </fieldset>

          {/* Submit-level error */}
          {errors.submit && (
            <FieldError className="contact__error--submit">
              {errors.submit}
            </FieldError>
          )}

          <div className="contact__footer">
            <p className="contact__note">
              Обычно отвечаем в&nbsp;течение рабочего дня.
            </p>
            <button
              type="submit"
              data-hover
              className="contact__submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting && (
                <span className="contact__spinner" aria-hidden />
              )}
              {isSubmitting ? "Отправляем..." : "Отправить заявку"}
            </button>
          </div>
        </form>
      </div>

      {submitted && (
        <div
          className="contact__modal-backdrop"
          onClick={() => setSubmitted(false)}
        >
          <div
            className="contact__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="contact__modal-close"
              onClick={() => setSubmitted(false)}
              aria-label="Закрыть"
            >
              ✕
            </button>

            <div className="contact__success" role="status" aria-live="polite">
              <h3 id="contact-success-title" className="contact__success-title">
                Скоро свяжемся и&nbsp;обсудим задачу подробнее
              </h3>
              <p className="contact__success-text">
                Если удобнее, можете сразу написать нам в Telegram или на почту.
              </p>
              <div className="contact__actions">
                <a
                  href={siteConfig.telegram}
                  data-hover
                  className="contact__btn-primary"
                >
                  Telegram
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  data-hover
                  className="contact__btn-secondary"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
