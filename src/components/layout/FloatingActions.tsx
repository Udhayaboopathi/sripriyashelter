"use client";

import { useEffect, useState } from "react";
import { Phone, MessageSquareText, X } from "lucide-react";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/SocialIcon";
import { useEnquiry } from "@/components/layout/EnquiryProvider";

/**
 * Reference floating actions: vertical "Enquiry Now" tab on the right edge and
 * stacked WhatsApp / call buttons bottom-left. Targets are Sripriya's own
 * published WhatsApp and phone numbers.
 */
export function FloatingActions() {
  const { open } = useEnquiry();
  const [bubble, setBubble] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setBubble(true), 6000);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => open()}
        data-testid="enquiry-tab"
        className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-center gap-2 rounded-l-xl bg-brand px-2.5 py-4 text-[14px] font-semibold text-white shadow-lg transition hover:bg-brand-strong hover:pr-4 [writing-mode:vertical-rl] rotate-180"
      >
        <MessageSquareText aria-hidden className="size-4 rotate-90" />
        Enquire Now
      </button>
      <div className="fixed bottom-5 left-4 z-40 flex flex-col gap-3 sm:left-5">
        <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label={site.whatsapp.label} className="grid size-[50px] place-items-center rounded-full bg-[#25d366] text-white shadow-[0_8px_20px_rgb(37_211_102/0.4)] transition hover:scale-110">
          <WhatsAppIcon className="size-6" />
        </a>
        <a href={site.phone.href} aria-label={`Call ${site.phone.display}`} className="grid size-[50px] place-items-center rounded-full bg-brand text-white shadow-[0_8px_20px_hsl(12_98%_53%/0.4)] transition hover:scale-110">
          <Phone className="size-5" />
        </a>
      </div>
      {/* Reference chat widget ("Glad to support you") → Sripriya's WhatsApp. */}
      <div className="fixed bottom-5 right-4 z-[91] flex items-end gap-3 sm:right-6" data-testid="chat-widget">
        {bubble ? (
          <div className="relative mb-2 hidden max-w-[220px] rounded-[14px] rounded-br-sm bg-white p-3.5 pr-8 text-[13px] leading-snug text-navy shadow-[0_10px_30px_rgb(0_0_0/0.15)] motion-safe:animate-[fadeUp_0.5s_var(--ease-standard)_both] sm:block">
            <p className="font-semibold">Glad to support you!</p>
            <p className="mt-0.5 text-muted">Chat with our team on WhatsApp.</p>
            <button type="button" onClick={() => setBubble(false)} aria-label="Dismiss chat message" className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full text-muted hover:bg-accent hover:text-navy">
              <X className="size-3.5" />
            </button>
          </div>
        ) : null}
        <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label="Chat with Sripriya Shelter on WhatsApp" className="relative grid size-[58px] place-items-center rounded-full bg-navy text-white shadow-[0_10px_25px_rgb(0_11_107/0.35)] transition hover:scale-105 hover:bg-brand">
          <MessageSquareText aria-hidden className="size-6" />
          <span aria-hidden className="absolute right-0.5 top-0.5 size-3.5 rounded-full border-2 border-white bg-[#25d366]" />
        </a>
      </div>
    </>
  );
}
