"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CalendarDays, CheckCircle2, ChevronDown, Home, Loader2, Mail, Phone, Send, User, MessageSquare } from "lucide-react";
import { buildMailtoUrl, validateEnquiry, type EnquiryErrors, type EnquiryMode, type EnquiryValues } from "@/lib/enquiry";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "mail-client" }
  | { kind: "error"; message: string };

interface EnquiryFormProps {
  /** "underline" = reference contact section; "boxed" = reference quick-enquiry modal. */
  variant?: "underline" | "boxed";
  project?: string;
  submitLabel?: string;
  className?: string;
  mode?: EnquiryMode;
  /** Options for the reference "Interested In" select; omitted = no select. */
  interestOptions?: string[];
}

export const TIMELINE_OPTIONS = ["Immediately", "Within 3 months", "3 – 6 months", "6 – 12 months", "Just exploring"];

const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;
const MIN_FILL_MS = 2500;

const empty: EnquiryValues = { name: "", phone: "", email: "", message: "" };

/**
 * Enquiry form with real client-side validation.
 * Delivery: if NEXT_PUBLIC_ENQUIRY_ENDPOINT is configured the form POSTs JSON
 * there and only reports success on a 2xx response. Without an endpoint it
 * falls back to the original site's behaviour (opening a pre-filled email) and
 * says so honestly – it never fakes a "sent" state.
 * Spam protection: hidden honeypot field + minimum time-to-submit.
 */
export function EnquiryForm({ variant = "underline", project, submitLabel = "Submit Now", className, mode = "full", interestOptions }: EnquiryFormProps) {
  const id = useId();
  const [values, setValues] = useState<EnquiryValues>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef<number>(0);

  const update = (key: keyof EnquiryValues, value: string, at: number) => {
    if (!startedAt.current) startedAt.current = at;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("company_website") as HTMLInputElement | null)?.value;
    const payload = { ...values, project };
    const found = validateEnquiry(payload, mode);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    if (honeypot || (startedAt.current && e.timeStamp - startedAt.current < MIN_FILL_MS)) {
      setStatus({ kind: "error", message: "Please take a moment to review your details and try again." });
      return;
    }
    setStatus({ kind: "submitting" });
    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...payload, source: typeof window !== "undefined" ? window.location.href : "" }),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setStatus({ kind: "sent" });
        setValues(empty);
      } catch {
        setStatus({ kind: "error", message: `We couldn't send your enquiry. Please call ${site.phone.display} or email ${site.email.display}.` });
      }
      return;
    }
    window.location.href = buildMailtoUrl(site.email.display, payload);
    setStatus({ kind: "mail-client" });
  }

  const allFields: { key: keyof EnquiryValues; label: string; type: string; placeholder: string; autoComplete: string; icon: typeof User; inputMode?: "tel" | "email" }[] = [
    { key: "name", label: "Full Name", type: "text", placeholder: "Your Full Name", autoComplete: "name", icon: User },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "Your Mobile Number", autoComplete: "tel", icon: Phone, inputMode: "tel" },
    { key: "email", label: "Email Address", type: "email", placeholder: "Your Email Address", autoComplete: "email", icon: Mail, inputMode: "email" },
  ];
  const fields = mode === "quick" ? allFields.filter((f) => f.key !== "email") : allFields;
  const selects: { key: "interest" | "timeline"; label: string; placeholder: string; options: string[]; icon: typeof User }[] = [];
  if (interestOptions?.length) selects.push({ key: "interest", label: "Interested In", placeholder: "Select a project", options: interestOptions, icon: Home });
  if (mode === "quick") selects.push({ key: "timeline", label: "When are you planning to buy?", placeholder: "Select a timeframe", options: TIMELINE_OPTIONS, icon: CalendarDays });

  const underline = variant === "underline";
  const inputCls = (hasError: boolean) =>
    underline
      ? cn("w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-base text-navy placeholder:text-muted/80 focus:outline-none focus:ring-0 transition-colors", hasError ? "border-red-500" : "border-navy/20 focus:border-brand")
      : cn("w-full rounded-xl border bg-surface-alt py-3.5 pl-11 pr-4 text-[15px] text-navy placeholder:text-muted/80 focus:outline-none focus:ring-2 focus:ring-brand/30 transition", hasError ? "border-red-500" : "border-line focus:border-brand");
  const labelCls = underline ? "text-[13px] font-semibold uppercase tracking-[2.5px] text-navy" : "sr-only";

  return (
    <form noValidate onSubmit={onSubmit} className={cn("relative", className)} aria-describedby={`${id}-status`} data-testid="enquiry-form">
      <div className={cn("grid", underline ? "gap-7" : "gap-4")}>
        {fields.map(({ key, label, type, placeholder, autoComplete, icon: Icon, inputMode }) => (
          <div key={key} className="relative flex flex-col gap-1">
            <label htmlFor={`${id}-${key}`} className={labelCls}>
              {label} <span aria-hidden className="text-brand">*</span>
            </label>
            {!underline ? <Icon aria-hidden className="pointer-events-none absolute left-4 top-[15px] size-[18px] text-muted" /> : null}
            <input
              id={`${id}-${key}`}
              name={key}
              type={type}
              inputMode={inputMode}
              autoComplete={autoComplete}
              placeholder={placeholder}
              required
              value={values[key] ?? ""}
              onChange={(e) => update(key, e.target.value, e.timeStamp)}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${id}-${key}-error` : undefined}
              className={inputCls(Boolean(errors[key]))}
            />
            {errors[key] ? (
              <p id={`${id}-${key}-error`} className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
                <AlertCircle aria-hidden className="size-3.5" /> {errors[key]}
              </p>
            ) : null}
          </div>
        ))}
        {selects.map(({ key, label, placeholder, options, icon: Icon }) => (
          <div key={key} className="relative flex flex-col gap-1">
            <label htmlFor={`${id}-${key}`} className={labelCls}>{label}</label>
            {!underline ? <Icon aria-hidden className="pointer-events-none absolute left-4 top-[15px] size-[18px] text-muted" /> : null}
            <select
              id={`${id}-${key}`}
              name={key}
              value={values[key] ?? ""}
              onChange={(e) => update(key, e.target.value, e.timeStamp)}
              className={cn(inputCls(false), "appearance-none pr-10", !values[key] && "text-muted/80")}
            >
              <option value="">{placeholder}</option>
              {options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <ChevronDown aria-hidden className={cn("pointer-events-none absolute right-3 size-4 text-muted", underline ? "bottom-4" : "top-[17px]")} />
          </div>
        ))}
        {mode === "full" ? (
        <div className="relative flex flex-col gap-1">
          <label htmlFor={`${id}-message`} className={labelCls}>
            Your Message <span aria-hidden className="text-brand">*</span>
          </label>
          {!underline ? <MessageSquare aria-hidden className="pointer-events-none absolute left-4 top-[15px] size-[18px] text-muted" /> : null}
          <textarea
            id={`${id}-message`}
            name="message"
            rows={underline ? 3 : 3}
            required
            placeholder="Tell us about your requirements..."
            value={values.message}
            onChange={(e) => update("message", e.target.value, e.timeStamp)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${id}-message-error` : undefined}
            className={cn(inputCls(Boolean(errors.message)), "resize-y")}
          />
          {errors.message ? (
            <p id={`${id}-message-error`} className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
              <AlertCircle aria-hidden className="size-3.5" /> {errors.message}
            </p>
          ) : null}
        </div>
        ) : null}
        {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-hp`}>Company website</label>
          <input id={`${id}-hp`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className={cn("mt-8 flex flex-col gap-4", !underline && "mt-6")}>
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className={cn(
            "inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-brand px-8 text-[15px] font-semibold uppercase tracking-wide text-white shadow-[0_10px_25px_hsl(12_98%_53%/0.35)] transition hover:bg-brand-strong disabled:opacity-70",
            underline ? "self-start" : "w-full bg-gradient-to-r from-[hsl(22_100%_55%)] to-brand",
          )}
        >
          {status.kind === "submitting" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Send aria-hidden className="size-4" />}
          {status.kind === "submitting" ? "Sending..." : submitLabel}
        </button>
        <div id={`${id}-status`} role="status" aria-live="polite" className="text-sm">
          {status.kind === "sent" ? (
            <p className="flex items-start gap-2 rounded-xl bg-green-50 p-3 text-green-800">
              <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0" /> Thank you! Your enquiry has been sent. Our team will get back to you shortly.
            </p>
          ) : null}
          {status.kind === "mail-client" ? (
            <p className="flex items-start gap-2 rounded-xl bg-accent p-3 text-navy" data-testid="mail-client-notice">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0" />
              <span>
                Your email app should open with this enquiry pre-filled. Please press send there to complete it. If nothing opened, email{" "}
                <a className="font-semibold text-brand underline" href={site.email.href}>{site.email.display}</a> or call{" "}
                <a className="font-semibold text-brand underline" href={site.phone.href}>{site.phone.display}</a>.
              </span>
            </p>
          ) : null}
          {status.kind === "error" ? (
            <p className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-red-700">
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" /> {status.message}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
