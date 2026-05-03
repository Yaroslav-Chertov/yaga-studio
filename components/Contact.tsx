"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useInView } from "framer-motion";

const SERVICES = [
  "Дзайн сайта",
  "Дзайн мобильного приложения",
  "Разработка сайта",
  "Фирменный стиль",
  "UX-исследование",
  "Другое",
] as const;

const BUDGETS = [
  "до 500 тыс. ₽",
  "до 1 млн ₽",
  "от 1 — до 3 млн ₽",
  "от 3 млн ₽",
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

type FormErrors = Partial<Record<keyof FormValues | "file", string>>;

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

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3 13L13 3M13 3H5M13 3V11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path
      d="M4 9.5L7.2 12.5L14 5.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [values, setValues] = useState<FormValues>(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setValues((current) => ({
      ...current,
      [name]: nextValue,
    }));

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

    const nextErrors = validate(values, file);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setSubmitted(true);
    setIsSubmitting(false);
    setValues(initialValues);
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
          <span className="contact__label">Контакт</span>
          <h2 className="contact__heading">Расскажите о&nbsp;проекте</h2>
          <p className="contact__lead">
            Заполните короткую форму&nbsp;&mdash; мы&nbsp;изучим задачу,
            свяжемся с&nbsp;вами в&nbsp;течение рабочего дня и&nbsp;предложим
            понятный следующий шаг.
          </p>
        </div>

        {submitted ? (
          <div className="contact__success" role="status" aria-live="polite">
            <div className="contact__success-icon">
              <CheckIcon />
            </div>
            <p className="contact__success-label">Заявка получена</p>
            <h3 className="contact__success-title">
              Скоро свяжемся и обсудим задачу подробнее
            </h3>
            <p className="contact__success-text">
              Если удобнее, можете сразу написать нам в Telegram или на почту.
            </p>
            <div className="contact__actions">
              <a
                href="mailto:hello@yaga.studio"
                data-hover
                className="contact__btn-primary"
              >
                hello@yaga.studio
                <ArrowIcon />
              </a>
              <a
                href="https://t.me/yagastudio"
                data-hover
                className="contact__btn-secondary"
              >
                Telegram ↗
              </a>
            </div>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__grid">
              <fieldset
                className={`contact__field contact__field--full${
                  errors.services ? " is-invalid" : ""
                }`}
              >
                <legend className="contact__legend">
                  Какие услуги вас интересуют?
                </legend>
                <p className="contact__hint">
                  Можно выбрать несколько вариантов
                </p>
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
                {errors.services ? (
                  <p className="contact__error">{errors.services}</p>
                ) : null}
              </fieldset>

              <fieldset
                className={`contact__field contact__field--full${
                  errors.budget ? " is-invalid" : ""
                }`}
              >
                <legend className="contact__legend">Ваш бюджет</legend>
                <p className="contact__hint">Выберите один вариант</p>
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
                {errors.budget ? (
                  <p className="contact__error">{errors.budget}</p>
                ) : null}
              </fieldset>

              <label className="contact__field contact__field--full">
                <span className="contact__legend">Кратко о задаче</span>
                <span className="contact__hint">Необязательно</span>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Расскажите, что хотите запустить, какие есть сроки и на каком этапе сейчас находится проект."
                />
              </label>

              <div
                className={`contact__field contact__field--full${
                  errors.file ? " is-invalid" : ""
                }`}
              >
                <span className="contact__legend">Прикрепить файл</span>
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
                {errors.file ? (
                  <p className="contact__error">{errors.file}</p>
                ) : null}
              </div>

              <label className="contact__field">
                <span className="contact__legend">Название компании</span>
                <span className="contact__hint">Необязательно</span>
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={handleInputChange}
                  placeholder="Как называется компания или бренд?"
                />
              </label>

              <label className="contact__field">
                <span className="contact__legend">Имя</span>
                <span className="contact__hint">Необязательно</span>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  placeholder="Как к вам обращаться?"
                />
              </label>

              <label className="contact__field">
                <span className="contact__legend">Откуда вы о нас узнали?</span>
                <span className="contact__hint">Необязательно</span>
                <input
                  type="text"
                  name="referral"
                  value={values.referral}
                  onChange={handleInputChange}
                  placeholder="Рекомендация, Behance, поиск, Telegram и другие источники"
                />
              </label>

              <label
                className={`contact__field${errors.contact ? " is-invalid" : ""}`}
              >
                <span className="contact__legend">
                  Telegram или другой способ связи
                </span>
                <span className="contact__hint">Обязательно</span>
                <input
                  type="text"
                  name="contact"
                  value={values.contact}
                  onChange={handleInputChange}
                  placeholder="Укажите ваш @username в Telegram или email"
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={
                    errors.contact ? "contact-error" : undefined
                  }
                />
                {errors.contact ? (
                  <p id="contact-error" className="contact__error">
                    {errors.contact}
                  </p>
                ) : null}
              </label>
            </div>

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
                данных и соглашаетесь с политикой конфиденциальности.
              </span>
            </label>
            {errors.consent ? (
              <p className="contact__error contact__error--consent">
                {errors.consent}
              </p>
            ) : null}

            <div className="contact__footer">
              <p className="contact__note">
                Обычно отвечаем в&nbsp;течение рабочего дня. Если потребуется,
                уточним детали по&nbsp;задаче.
              </p>
              <button
                type="submit"
                data-hover
                className="contact__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
                <ArrowIcon />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
