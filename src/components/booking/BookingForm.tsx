"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { booking, disciplines, getService, servicesBy, type Discipline, type Service } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Check, Sparkle } from "@/components/ui/Icons";
import { Field } from "./Field";

const { form: t, errors: err } = booking;

type Values = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  birthName: string;
  dob: string;
  tob: string;
  tobUnknown: boolean;
  pob: string;
  partnerName: string;
  partnerBirthName: string;
  partnerDob: string;
  partnerTob: string;
  partnerTobUnknown: boolean;
  partnerPob: string;
  date: string;
  time: string;
  mode: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  birthName: "",
  dob: "",
  tob: "",
  tobUnknown: false,
  pob: "",
  partnerName: "",
  partnerBirthName: "",
  partnerDob: "",
  partnerTob: "",
  partnerTobUnknown: false,
  partnerPob: "",
  date: "",
  time: "",
  mode: booking.modes[0].value,
  message: "",
  consent: false,
};

/** Which birth details a reading needs. Numerology: name at birth. Astrology: time and place. */
export function requirements(service?: Service) {
  if (!service) return { numerology: false, astrology: false, partner: false };
  return {
    numerology: service.discipline !== "astrology",
    astrology: service.discipline !== "numerology",
    partner: Boolean(service.compatibility),
  };
}

const todayISO = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const noSubscribe = () => () => {};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateStep(step: number, v: Values, today?: string): Errors {
  const e: Errors = {};
  const need = requirements(getService(v.service));
  const validDob = (d: string) => Boolean(d) && d >= "1900-01-01" && (!today || d <= today);

  if (step === 1) {
    if (!getService(v.service)) e.service = err.service;
  }

  if (step === 2) {
    if (v.fullName.trim().length < 2) e.fullName = err.fullName;
    if (!EMAIL.test(v.email.trim())) e.email = err.email;
    const digits = v.phone.replace(/[\s\-()+.]/g, "");
    if (!/^\d{8,15}$/.test(digits)) e.phone = err.phone;
  }

  if (step === 3) {
    if (need.numerology && v.birthName.trim().length < 2) e.birthName = err.birthName;
    if ((need.numerology || need.astrology) && !validDob(v.dob)) e.dob = err.dob;
    if (need.astrology && !v.tobUnknown && !v.tob) e.tob = err.tob;
    if (need.astrology && v.pob.trim().length < 2) e.pob = err.pob;

    if (need.partner) {
      if (need.numerology && v.partnerBirthName.trim().length < 2) e.partnerBirthName = err.birthName;
      if (!need.numerology && v.partnerName.trim().length < 2) e.partnerName = err.partnerName;
      if (!validDob(v.partnerDob)) e.partnerDob = err.dob;
      if (need.astrology && !v.partnerTobUnknown && !v.partnerTob) e.partnerTob = err.tob;
      if (need.astrology && v.partnerPob.trim().length < 2) e.partnerPob = err.pob;
    }
  }

  if (step === 4) {
    if (!v.date || (today && v.date < today)) e.date = err.date;
    if (!v.time) e.time = err.time;
    if (!v.consent) e.consent = err.consent;
  }

  return e;
}

const groups: Discipline[] = ["numerology", "astrology", "combo"];

/** ?service= from the address bar; empty during the static prerender. */
const readServiceParam = () => new URLSearchParams(window.location.search).get("service") ?? "";

const stepsConfig = [
  { step: 1, title: "Consultation", subtitle: "Select reading" },
  { step: 2, title: "Your Details", subtitle: "Client contact" },
  { step: 3, title: "Birth Data", subtitle: "Time & location" },
  { step: 4, title: "Schedule", subtitle: "Time & confirm" },
];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 32 : -32,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -32 : 32,
    opacity: 0,
  }),
};

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<Values>(empty);

  const urlService = useSyncExternalStore(noSubscribe, readServiceParam, () => "");
  const [appliedParam, setAppliedParam] = useState("");
  if (urlService !== appliedParam) {
    setAppliedParam(urlService);
    if (getService(urlService)) setValues((prev) => ({ ...prev, service: urlService }));
  }

  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const today = useSyncExternalStore(noSubscribe, todayISO, () => undefined);

  const service = getService(values.service);
  const need = requirements(service);

  // Validate step-specific errors
  const stepErrors = validateStep(currentStep, values, today);
  const errorFor = (k: keyof Values) => (submitted || touched[k] ? stepErrors[k] : undefined);

  const set = <K extends keyof Values>(k: K, v: Values[K]) => setValues((prev) => ({ ...prev, [k]: v }));
  const blur = (k: keyof Values) => () => setTouched((prev) => ({ ...prev, [k]: true }));

  function chooseService(slug: string) {
    set("service", slug);
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("service", slug);
    else url.searchParams.delete("service");
    window.history.replaceState(null, "", url);
  }

  function handleNext() {
    const errors = validateStep(currentStep, values, today);
    if (Object.keys(errors).length > 0) {
      // Mark touched for current step fields to trigger visual errors
      const stepTouched: Partial<Record<keyof Values, boolean>> = {};
      (Object.keys(errors) as (keyof Values)[]).forEach((k) => {
        stepTouched[k] = true;
      });
      setTouched((prev) => ({ ...prev, ...stepTouched }));
      const firstInvalid = Object.keys(errors)[0];
      if (firstInvalid) {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      }
      return;
    }

    setDirection(1);
    setCurrentStep((prev) => Math.min(4, prev + 1));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleBack() {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(1, prev - 1));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToStep(targetStep: number) {
    if (targetStep < currentStep) {
      setDirection(-1);
      setCurrentStep(targetStep);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);

    const errors = validateStep(4, values, today);
    if (Object.keys(errors).length > 0) {
      const stepTouched: Partial<Record<keyof Values, boolean>> = {};
      (Object.keys(errors) as (keyof Values)[]).forEach((k) => {
        stepTouched[k] = true;
      });
      setTouched((prev) => ({ ...prev, ...stepTouched }));
      const firstInvalid = Object.keys(errors)[0];
      if (firstInvalid) {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      }
      return;
    }

    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("done");
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reset() {
    setValues({ ...empty });
    setTouched({});
    setSubmitted(false);
    setCurrentStep(1);
    setStatus("idle");
  }

  const text = (k: keyof Values, extra: Record<string, unknown> = {}) => ({
    name: k,
    value: values[k] as string,
    onChange: (e: { target: { value: string } }) => set(k, e.target.value as never),
    onBlur: blur(k),
    className: "field",
    ...extra,
  });

  return (
    <div ref={topRef} className="scroll-mt-32">
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="glass relative overflow-hidden rounded-[2rem] p-8 text-center sm:p-14"
            role="status"
          >
            <div className="relative mx-auto grid size-20 place-items-center rounded-full border border-gold/60 text-gold-soft shadow-[0_0_50px_-10px_var(--palette-gold)]">
              <Check size={36} />
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-gold/40 [animation-duration:2.5s] [animation-iteration-count:2]" />
            </div>
            <h2 className="mt-8 text-4xl text-cream font-display">{booking.success.title}</h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">{booking.success.text}</p>

            <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-line/80 text-left text-sm bg-night-deep/40">
              <p className="px-5 pb-2 pt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{booking.success.summaryTitle}</p>
              <dl className="divide-y divide-line/60">
                {[
                  [booking.success.labels.service, service?.name],
                  [booking.success.labels.when, `${formatDate(values.date)} · ${values.time}`],
                  [booking.success.labels.mode, booking.modes.find((m) => m.value === values.mode)?.label],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-5 py-3">
                    <dt className="text-faint">{k}</dt>
                    <dd className="text-right text-cream font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Button variant="ghost" className="mt-10" onClick={reset}>
              {booking.success.again}
            </Button>
          </motion.div>
        ) : (
          <div className="glass rounded-[2rem] p-6 sm:p-10 shadow-xl">
            {/* Multi-Step Wizard Progress Header */}
            <div className="mb-8 border-b border-line/60 pb-6">
              <div className="grid grid-cols-4 gap-2">
                {stepsConfig.map((s) => {
                  const isCurrent = currentStep === s.step;
                  const isDone = currentStep > s.step;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      disabled={!isDone}
                      onClick={() => goToStep(s.step)}
                      className={`flex flex-col items-center text-center transition-all ${
                        isCurrent
                          ? "text-gold"
                          : isDone
                          ? "text-cream hover:text-gold-soft cursor-pointer"
                          : "text-muted/40 cursor-default"
                      }`}
                    >
                      <div
                        className={`grid size-8 sm:size-9 place-items-center rounded-full font-display text-xs sm:text-sm font-semibold transition-all ${
                          isCurrent
                            ? "bg-gold text-night-deep shadow-[0_0_20px_rgb(217_182_108/0.45)] scale-105"
                            : isDone
                            ? "bg-gold/20 text-gold-soft border border-gold/40"
                            : "bg-surface/50 text-faint border border-line/60"
                        }`}
                      >
                        {isDone ? "✓" : s.step}
                      </div>
                      <span className="mt-2 text-xs font-semibold hidden sm:block">{s.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic progress bar */}
              <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                <motion.div
                  className="h-full bg-linear-to-r from-gold-soft via-gold to-gold-deep"
                  initial={{ width: "25%" }}
                  animate={{ width: `${(currentStep / 4) * 100}%` }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-faint">
                <span>Step {currentStep} of 4: {stepsConfig[currentStep - 1].title}</span>
                <span>{stepsConfig[currentStep - 1].subtitle}</span>
              </div>
            </div>

            {/* Step Form */}
            <form ref={formRef} noValidate onSubmit={onSubmit}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* STEP 1: CONSULTATION SELECTION */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display text-2xl text-cream sm:text-3xl">
                          Select Your Consultation
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          Choose the reading or advisory session that best suits your current inquiry.
                        </p>
                      </div>

                      <Field id="service" label={t.service} required error={errorFor("service")}>
                        {(a) => (
                          <select
                            {...a}
                            name="service"
                            value={values.service}
                            onChange={(e) => chooseService(e.target.value)}
                            onBlur={blur("service")}
                            className="field text-base py-3.5"
                          >
                            <option value="">{t.servicePlaceholder}</option>
                            {groups.map((g) => (
                              <optgroup key={g} label={disciplines[g].title}>
                                {servicesBy(g).map((s) => (
                                  <option key={s.slug} value={s.slug}>
                                    {s.name}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        )}
                      </Field>

                      {service ? (
                        <div className="rounded-2xl border border-gold/30 bg-surface/50 p-5 backdrop-blur-xs">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">
                                {disciplines[service.discipline].title}
                              </span>
                              <h4 className="mt-1 font-display text-xl text-cream">{service.name}</h4>
                              <p className="mt-1.5 text-xs text-muted leading-relaxed">{service.tagline}</p>
                            </div>
                            <div className="shrink-0 text-right">
                              <span className="block text-[0.65rem] uppercase tracking-wider text-faint">Fee</span>
                              <span className="font-display text-2xl text-gold-soft">{service.price}</span>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line/40 pt-3 text-xs text-faint">
                            <span>Duration: {service.duration}</span>
                            <span>·</span>
                            <span>Format: {service.format.join(" / ")}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="flex items-start gap-3 rounded-2xl border border-dashed border-line px-5 py-4 text-xs leading-relaxed text-faint">
                          <Sparkle size={15} className="mt-0.5 shrink-0 text-gold" />
                          Selecting a consultation will tailor the birth data required in subsequent steps.
                        </p>
                      )}
                    </div>
                  )}

                  {/* STEP 2: CLIENT DETAILS */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display text-2xl text-cream sm:text-3xl">
                          Your Contact Information
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          Where our confirmation, session links, and post-reading dossier should be sent.
                        </p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="fullName" label={t.fullName} required error={errorFor("fullName")} className="sm:col-span-2">
                          {(a) => <input {...a} {...text("fullName", { autoComplete: "name", placeholder: "e.g. Eleanor Vance" })} />}
                        </Field>
                        <Field id="email" label={t.email} required error={errorFor("email")}>
                          {(a) => <input {...a} {...text("email", { type: "email", autoComplete: "email", inputMode: "email", placeholder: "name@example.com" })} />}
                        </Field>
                        <Field id="phone" label={t.phone} required hint={t.phoneHint} error={errorFor("phone")}>
                          {(a) => <input {...a} {...text("phone", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+91 98765 43210" })} />}
                        </Field>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: BIRTH DATA */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display text-2xl text-cream sm:text-3xl">
                          Birth Data & Parameters
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          Accurate birth data ensures rigorous mathematical chart calculation and numerological mapping.
                        </p>
                      </div>

                      <div className="space-y-8">
                        <BirthFields
                          prefix=""
                          need={need}
                          values={values}
                          set={set}
                          blur={blur}
                          errorFor={errorFor}
                          today={today}
                        />

                        {need.partner && (
                          <div className="rounded-2xl border border-gold/30 bg-gold/[0.03] p-5 sm:p-6">
                            <h4 className="font-display text-xl text-cream">{t.sections.partner}</h4>
                            <p className="mb-5 mt-1 text-xs text-faint">{t.partnerIntro}</p>
                            <BirthFields prefix="partner" need={need} values={values} set={set} blur={blur} errorFor={errorFor} today={today} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: SCHEDULE & CONFIRMATION */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display text-2xl text-cream sm:text-3xl">
                          Schedule & Confirmation
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          Choose your preferred consultation timing and video/audio platform.
                        </p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="date" label={t.date} required error={errorFor("date")}>
                          {(a) => <input {...a} {...text("date", { type: "date", min: today })} />}
                        </Field>
                        <Field id="time" label={t.time} required hint={t.timeHint} error={errorFor("time")}>
                          {(a) => <input {...a} {...text("time", { type: "time" })} />}
                        </Field>
                      </div>

                      <fieldset className="mt-4">
                        <legend className="mb-3 text-sm font-medium text-cream">
                          {t.mode} <span className="text-gold" aria-hidden>*</span>
                        </legend>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {booking.modes.map((m) => (
                            <label
                              key={m.value}
                              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line px-4 py-3 text-sm transition-colors hover:border-gold/50 has-[:checked]:border-gold has-[:checked]:bg-gold/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-soft"
                            >
                              <input
                                type="radio"
                                name="mode"
                                value={m.value}
                                checked={values.mode === m.value}
                                onChange={() => set("mode", m.value)}
                                className="peer sr-only"
                              />
                              <span aria-hidden className="grid size-4 place-items-center rounded-full border border-gold/60 peer-checked:[&>span]:scale-100">
                                <span className="size-2 scale-0 rounded-full bg-gold transition-transform" />
                              </span>
                              <span>{m.label}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <Field id="message" label={t.message} optional={t.messageOptional}>
                        {(a) => <textarea {...a} {...text("message", { rows: 3, placeholder: t.messagePlaceholder })} />}
                      </Field>

                      <div className="mt-4 rounded-xl border border-line/60 bg-night-deep/40 p-4">
                        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted">
                          <input
                            type="checkbox"
                            name="consent"
                            checked={values.consent}
                            onChange={(e) => set("consent", e.target.checked)}
                            onBlur={blur("consent")}
                            aria-invalid={Boolean(errorFor("consent"))}
                            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--palette-gold)]"
                          />
                          <span>
                            {t.consent}{" "}
                            <Link href="/disclaimer" target="_blank" className="text-gold-soft underline underline-offset-4 hover:text-cream">
                              {t.consentLink}
                            </Link>
                            .
                          </span>
                        </label>
                        {errorFor("consent") && (
                          <p className="mt-2 text-xs font-medium text-danger" role="alert">
                            ✕ {errorFor("consent")}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Step Navigation Controls */}
              <div className="mt-10 flex items-center justify-between border-t border-line/60 pt-6">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    className="text-xs sm:text-sm py-2.5 px-5"
                  >
                    ← Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    arrow
                    className="text-xs sm:text-sm py-2.5 px-6"
                  >
                    {currentStep === 1
                      ? "Next: Contact Details"
                      : currentStep === 2
                      ? "Next: Birth Data"
                      : "Next: Schedule & Confirm"}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    arrow={status === "idle"}
                    disabled={status === "sending"}
                    className="px-8! py-3.5! text-base!"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-night-deep/30 border-t-night-deep" />
                        {t.submitting}
                      </span>
                    ) : (
                      t.submit
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

type BirthProps = {
  prefix: "" | "partner";
  need: ReturnType<typeof requirements>;
  values: Values;
  set: <K extends keyof Values>(k: K, v: Values[K]) => void;
  blur: (k: keyof Values) => () => void;
  errorFor: (k: keyof Values) => string | undefined;
  today?: string;
};

/** Birth-detail fields for one person; prefix "partner" targets the second person. */
function BirthFields({ prefix, need, values, set, blur, errorFor, today }: BirthProps) {
  const key = (k: string) => (prefix ? `${prefix}${k[0].toUpperCase()}${k.slice(1)}` : k) as keyof Values;
  const k = { birthName: key("birthName"), name: key("name"), dob: key("dob"), tob: key("tob"), tobUnknown: key("tobUnknown"), pob: key("pob") };

  const input = (name: keyof Values, extra: Record<string, unknown> = {}) => ({
    name,
    value: values[name] as string,
    onChange: (e: { target: { value: string } }) => set(name, e.target.value as never),
    onBlur: blur(name),
    className: "field",
    ...extra,
  });

  const unknown = values[k.tobUnknown] as boolean;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {need.numerology ? (
        <Field
          id={k.birthName}
          label={prefix ? t.partnerBirthName : t.birthName}
          required
          hint={t.birthNameHint}
          error={errorFor(k.birthName)}
          className="sm:col-span-2"
        >
          {(a) => <input {...a} {...input(k.birthName, { placeholder: "Full name as on birth certificate" })} />}
        </Field>
      ) : (
        prefix && (
          <Field id={k.name} label={t.partnerName} required error={errorFor(k.name)} className="sm:col-span-2">
            {(a) => <input {...a} {...input(k.name)} />}
          </Field>
        )
      )}

      <Field id={k.dob} label={t.dob} required error={errorFor(k.dob)}>
        {(a) => <input {...a} {...input(k.dob, { type: "date", max: today, min: "1900-01-01" })} />}
      </Field>

      {need.astrology && (
        <>
          <Field id={k.tob} label={t.tob} required={!unknown} error={errorFor(k.tob)}>
            {(a) => <input {...a} {...input(k.tob, { type: "time", disabled: unknown })} />}
          </Field>
          <div className="sm:col-span-2 -mt-1">
            <label className="flex cursor-pointer items-center gap-3 text-xs sm:text-sm text-muted">
              <input
                type="checkbox"
                name={k.tobUnknown}
                checked={unknown}
                onChange={(e) => {
                  set(k.tobUnknown, e.target.checked as never);
                  if (e.target.checked) set(k.tob, "" as never);
                }}
                className="size-4 cursor-pointer accent-[var(--palette-gold)]"
              />
              <span>{t.tobUnknown}</span>
            </label>
            <AnimatePresence initial={false}>
              {unknown && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <span className="mt-2 block rounded-xl bg-gold/[0.07] px-4 py-2.5 text-xs leading-relaxed text-gold-soft">{t.tobUnknownNote}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <Field id={k.pob} label={t.pob} required error={errorFor(k.pob)} className="sm:col-span-2">
            {(a) => <input {...a} {...input(k.pob, { placeholder: t.pobPlaceholder, autoComplete: "off" })} />}
          </Field>
        </>
      )}
    </div>
  );
}
