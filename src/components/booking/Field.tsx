import type { ReactNode } from "react";
import { booking } from "@/content/site";

type Props = {
  id: string;
  label: string;
  required?: boolean;
  optional?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: (a11y: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; "aria-required"?: boolean }) => ReactNode;
};

/** Label + control + hint + error, wired together for screen readers. */
export function Field({ id, label, required, optional, hint, error, className = "", children }: Props) {
  const hintId = hint && !error ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 text-sm font-medium text-cream">
        {label}
        {required && (
          <span className="text-gold" aria-hidden>
            *
          </span>
        )}
        {required && <span className="sr-only">({booking.form.required})</span>}
        {optional && <span className="text-xs font-normal text-faint">({optional})</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy, "aria-required": required || undefined })}
      {hint && !error && (
        <p id={hintId} className="mt-2 text-xs leading-relaxed text-faint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-xs font-medium text-danger" role="alert">
          <span aria-hidden>✕</span> {error}
        </p>
      )}
    </div>
  );
}
