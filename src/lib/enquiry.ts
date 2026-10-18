/**
 * Enquiry validation mirrors the rules found in the original site's bundle
 * (name 2-100, phone 10-15, valid email, message 10-1000 characters).
 */
export interface EnquiryValues {
  name: string;
  phone: string;
  email: string;
  message: string;
  project?: string;
  /** "Interested In" select (reference contact form + quick-enquiry popup). */
  interest?: string;
  /** "When are you planning to buy?" select (reference quick-enquiry popup). */
  timeline?: string;
}

/** "full" = contact form (name, phone, email, message); "quick" = popup (name, phone + optional selects). */
export type EnquiryMode = "full" | "quick";

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(values: EnquiryValues, mode: EnquiryMode = "full"): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = values.name.trim();
  const phoneDigits = values.phone.replace(/[^\d]/g, "");
  if (name.length < 2) errors.name = "Name must be at least 2 characters";
  else if (name.length > 100) errors.name = "Name must be 100 characters or fewer";
  if (!/^[+\d\s()-]*$/.test(values.phone) || phoneDigits.length < 10 || phoneDigits.length > 15)
    errors.phone = "Please enter a valid phone number";
  if (mode === "quick") return errors;
  if (!EMAIL_RE.test(values.email.trim()) || values.email.length > 255) errors.email = "Please enter a valid email address";
  const message = values.message.trim();
  if (message.length < 10) errors.message = "Message must be at least 10 characters";
  else if (message.length > 1000) errors.message = "Message must be 1000 characters or fewer";
  return errors;
}

export function buildMailtoUrl(to: string, values: EnquiryValues): string {
  const subject = encodeURIComponent("New Enquiry – Sripriya Shelter");
  const lines = [
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : "",
    values.project ? `Project: ${values.project}` : "",
    values.interest ? `Interested in: ${values.interest}` : "",
    values.timeline ? `Planning to buy: ${values.timeline}` : "",
    values.message ? `\nMessage:\n${values.message}` : "",
  ].filter(Boolean);
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
