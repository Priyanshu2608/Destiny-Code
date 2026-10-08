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

function validate(v: Values, today?: string): Errors {
  const e: Errors = {};
  const need = requirements(getService(v.service));
  const validDob = (d: string) => Boolean(d) && d >= "1900-01-01" && (!today || d <= today);

  if (v.fullName.trim().length < 2) e.fullName = err.fullName;
  if (!EMAIL.test(v.email.trim())) e.email = err.email;
  const digits = v.phone.replace(/[\s\-()+.]/g, "");
  if (!/^\d{8,15}$/.test(digits)) e.phone = err.phone;
  if (!getService(v.service)) e.service = err.service;

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

  if (!v.date || (today && v.date < today)) e.date = err.date;
  if (!v.time) e.time = err.time;
  if (!v.consent) e.consent = err.consent;
  return e;
}

const groups: Discipline[] = ["numerology", "astrology", "combo"];

/** ?service= from the address bar; empty during the static prerender. */
const readServiceParam = () => new URLSearchParams(window.location.search).get("service") ?? "";

export function BookingForm() {
  const [values, setValues] = useState<Values>(empty);
  // Pre-select the reading from "Book Now" links (/booking?service=slug).
  // The page stays fully static; the choice is applied once the browser has the URL.
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

  // "today" is read only in the browser, so server and visitor time zones can't disagree
  const today = useSyncExternalStore(noSubscribe, todayISO, () => undefined);

  const service = getService(values.service);
  const need = requirements(service);
  const allErrors = validate(values, today);
  const errorFor = (k: keyof Values) => (submitted || touched[k] ? allErrors[k] : undefined);

  const set = <K extends keyof Values>(k: K, v: Values[K]) => setValues((prev) => ({ ...prev, [k]: v }));
  const blur = (k: keyof Values) => () => setTouched((prev) => ({ ...prev, [k]: true }));

  function chooseService(slug: string) {
    set("service", slug);
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("service", slug);
    else url.searchParams.delete("service");
    window.history.replaceState(null, "", url);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const firstInvalid = Object.keys(allErrors)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Phase 1 demo: nothing is sent anywhere. Phase 3 connects email delivery here.
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("done");
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reset() {
    setValues({ ...empty });
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
  }

  /* Small helpers to keep the JSX readable */
  const text = (k: keyof Values, extra: Record<string, unknown> = {}) => ({
    name: k,
    value: values[k] as string,
    onChange: (e: { target: { value: string } }) => set(k, e.target.value as never),
    onBlur: blur(k),
    className: "field",
    ...extra,
  });

  const errorCount = Object.keys(allErrors).length;

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
            <h2 className="mt-8 text-4xl text-cream">{booking.success.title}</h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">{booking.success.text}</p>

            <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-line/80 text-left text-sm">
              <p className="px-5 pb-2 pt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{booking.success.summaryTitle}</p>
              <dl className="divide-y divide-line/60">
              {[
                [booking.success.labels.service, service?.name],
                [booking.success.labels.when, `${formatDate(values.date)} · ${values.time}`],
                [booking.success.labels.mode, booking.modes.find((m) => m.value === values.mode)?.label],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3">
                  <dt className="text-faint">{k}</dt>
                  <dd className="text-right text-cream">{v}</dd>
                </div>
              ))}
              </dl>
            </div>

            <Button variant="ghost" className="mt-10" onClick={reset}>
              {booking.success.again}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass space-y-12 rounded-[2rem] p-6 sm:p-10"
            aria-describedby={submitted && errorCount ? "form-errors" : undefined}
          >
            {submitted && errorCount > 0 && (
              <p id="form-errors" role="alert" className="rounded-xl border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-danger">
                {err.summary}
              </p>
            )}

            <Step n={1} title={t.sections.you}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="fullName" label={t.fullName} required error={errorFor("fullName")} className="sm:col-span-2">
                  {(a) => <input {...a} {...text("fullName", { autoComplete: "name" })} />}
                </Field>
                <Field id="email" label={t.email} required error={errorFor("email")}>
                  {(a) => <input {...a} {...text("email", { type: "email", autoComplete: "email", inputMode: "email" })} />}
                </Field>
                <Field id="phone" label={t.phone} required hint={t.phoneHint} error={errorFor("phone")}>
                  {(a) => <input {...a} {...text("phone", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+91 " })} />}
                </Field>
              </div>
            </Step>

            <Step n={2} title={t.sections.reading}>
              <Field id="service" label={t.service} required error={errorFor("service")}>
                {(a) => (
                  <select {...a} name="service" value={values.service} onChange={(e) => chooseService(e.target.value)} onBlur={blur("service")} className="field">
                    <option value="">{t.servicePlaceholder}</option>
                    {groups.map((g) => (
                      <optgroup key={g} label={disciplines[g].title}>
                        {servicesBy(g).map((s) => (
                          <option key={s.slug} value={s.slug}>
                            {s.name} · {s.price}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                )}
              </Field>
              <AnimatePresence initial={false}>
                {service && (
                  <motion.p
                    key={service.slug}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 flex flex-wrap gap-x-4 gap-y-1 overflow-hidden text-sm text-muted"
                  >
                    <span className="text-gold-soft">{service.price}</span>
                    <span>{service.duration}</span>
                    <span>{service.format.join(" · ")}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </Step>

            <Step n={3} title={t.sections.birth}>
              {!service ? (
                <p className="flex items-start gap-3 rounded-2xl border border-dashed border-line px-5 py-4 text-sm leading-relaxed text-faint">
                  <Sparkle size={16} className="mt-0.5 shrink-0 text-gold" />
                  {t.noService}
                </p>
              ) : (
                <div className="space-y-10">
                  <BirthFields
                    prefix=""
                    need={need}
                    values={values}
                    set={set}
                    blur={blur}
                    errorFor={errorFor}
                    today={today}
                  />
                  <AnimatePresence initial={false}>
                    {need.partner && (
                      <motion.div
                        key="partner"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-2xl border border-gold/25 bg-gold/[0.03] p-5 sm:p-6">
                          <h4 className="font-display text-2xl text-cream">{t.sections.partner}</h4>
                          <p className="mb-6 mt-1 text-sm text-faint">{t.partnerIntro}</p>
                          <BirthFields prefix="partner" need={need} values={values} set={set} blur={blur} errorFor={errorFor} today={today} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </Step>

            <Step n={4} title={t.sections.schedule}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="date" label={t.date} required error={errorFor("date")}>
                  {(a) => <input {...a} {...text("date", { type: "date", min: today })} />}
                </Field>
                <Field id="time" label={t.time} required hint={t.timeHint} error={errorFor("time")}>
                  {(a) => <input {...a} {...text("time", { type: "time" })} />}
                </Field>
              </div>
              <fieldset className="mt-6">
                <legend className="mb-3 text-sm font-medium text-cream">
                  {t.mode} <span className="text-gold" aria-hidden>*</span>
                </legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  {booking.modes.map((m) => (
                    <label
                      key={m.value}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line px-4 py-3.5 text-sm transition-colors hover:border-gold/50 has-[:checked]:border-gold has-[:checked]:bg-gold/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-soft"
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
                      {m.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </Step>

            <Step n={5} title={t.sections.notes}>
              <Field id="message" label={t.message} optional={t.messageOptional}>
                {(a) => <textarea {...a} {...text("message", { rows: 4, placeholder: t.messagePlaceholder })} />}
              </Field>

              <div className="mt-6">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={values.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    onBlur={blur("consent")}
                    aria-invalid={Boolean(errorFor("consent"))}
                    aria-describedby={errorFor("consent") ? "consent-error" : undefined}
                    className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--palette-gold)]"
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
                  <p id="consent-error" className="mt-2 text-xs font-medium text-danger" role="alert">
                    ✕ {errorFor("consent")}
                  </p>
                )}
              </div>
            </Step>

            <div className="flex flex-col gap-4 border-t border-line/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-faint">
                <span className="text-gold">*</span> {t.required}
              </p>
              <Button type="submit" arrow={status === "idle"} disabled={status === "sending"} className="px-8! py-4!">
                {status === "sending" ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-night-deep/30 border-t-night-deep" />
                    {t.submitting}
                  </span>
                ) : (
                  t.submit
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`step-${n}`}>
      <h3 id={`step-${n}`} className="mb-6 flex items-center gap-4 text-2xl text-cream sm:text-3xl">
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/50 font-display text-base italic text-gold">{n}</span>
        {title}
      </h3>
      {children}
    </section>
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
          {(a) => <input {...a} {...input(k.birthName)} />}
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
            <label className="flex cursor-pointer items-center gap-3 text-sm text-muted">
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
              {t.tobUnknown}
            </label>
            <AnimatePresence initial={false}>
              {unknown && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <span className="mt-3 block rounded-xl bg-gold/[0.07] px-4 py-3 text-xs leading-relaxed text-gold-soft">{t.tobUnknownNote}</span>
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
