"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "motion/react";
import { Download, ExternalLink, X } from "lucide-react";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { siteAssets } from "@/data/assets";
import { projects } from "@/data/projects";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

/** sessionStorage flag: the quick-enquiry popup auto-opens once per browser session. */
export const QUICK_ENQUIRY_SEEN_KEY = "sp-quick-enquiry-seen";
const AUTO_OPEN_DELAY_MS = 3500;

const INTEREST_OPTIONS = [
  "RoseLand – 2 BHK",
  "RoseLand – 3 BHK",
  "Individual House",
  "Custom Home Construction",
];

interface BrochureRequest {
  project?: string;
}

interface EnquiryContextValue {
  open: (project?: string) => void;
  openBrochure: (req?: BrochureRequest) => void;
}

const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry(): EnquiryContextValue {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}

function brochureFor(projectTitle?: string) {
  const match =
    projects.find((p) => p.title === projectTitle && p.brochure) ??
    (projectTitle ? undefined : projects.find((p) => p.brochure));
  return match?.brochure ? { title: match.title, ...match.brochure } : null;
}

function ModalShell({
  label,
  testId,
  onClose,
  children,
}: {
  label: string;
  testId: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const trapRef = useFocusTrap<HTMLDivElement>(true);
  return (
    <m.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-ink/60 p-4 backdrop-blur-[4px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <m.div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={label}
        data-testid={testId}
        className="relative grid max-h-[92vh] w-full max-w-[860px] overflow-y-auto rounded-[24px] bg-white shadow-2xl md:grid-cols-[0.9fr_1.1fr]"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-accent text-navy transition hover:bg-brand hover:text-white"
        >
          <X className="size-5" />
        </button>
      </m.div>
    </m.div>
  );
}

function ImagePanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="relative hidden min-h-[480px] md:block">
      <Image
        src={siteAssets.roseland.elevation.src}
        alt=""
        fill
        sizes="380px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
      <div className="absolute inset-x-6 bottom-6 text-white">
        <p className="font-heading text-[28px] font-extrabold">{title}</p>
        <p className="mt-1 text-sm text-white/80">{text}</p>
      </div>
    </div>
  );
}

/**
 * Reference popups: the split "Quick Enquiry" modal (auto-opens once per
 * session, like the reference page, and from every enquiry trigger) and the
 * brochure modal opened by the header "Brochure" pill and Download buttons.
 */
export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<null | "enquiry" | "brochure">(null);
  const [project, setProject] = useState<string | undefined>();
  const close = useCallback(() => setModal(null), []);
  const value = useMemo<EnquiryContextValue>(
    () => ({
      open: (p) => {
        setProject(p);
        setModal("enquiry");
      },
      openBrochure: (req) => {
        setProject(req?.project);
        setModal("brochure");
      },
    }),
    [],
  );
  useEscapeKey(modal !== null, close);
  useLockBodyScroll(modal !== null);

  useEffect(() => {
    let seen = true;
    try {
      seen = window.sessionStorage.getItem(QUICK_ENQUIRY_SEEN_KEY) === "1";
    } catch {
      /* storage unavailable: never auto-open */
    }
    if (seen) return;
    const t = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(QUICK_ENQUIRY_SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      setModal((m) => m ?? "enquiry");
    }, AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const brochure = modal === "brochure" ? brochureFor(project) : null;

  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <MotionConfig reducedMotion="user">
      <EnquiryContext.Provider value={value}>
        {children}
        <AnimatePresence>
          {modal === "enquiry" ? (
            <ModalShell
              key="enquiry"
              label="enquiry-title"
              testId="enquiry-modal"
              onClose={close}
            >
              <ImagePanel
                title="Enquiry Now"
                text="Share a few details and our team will call you back."
              />
              <div className="p-6 sm:p-9">
                <h2
                  id="enquiry-title"
                  className="pr-10 font-heading text-[30px] font-extrabold text-navy"
                >
                  Quick <span className="text-brand">Enquiry</span>
                </h2>
                <p className="mb-6 mt-1 text-sm text-muted">
                  {project
                    ? `Project: ${project}`
                    : "Tell us what you are looking for."}
                </p>
                <EnquiryForm
                  variant="boxed"
                  mode="quick"
                  project={project}
                  interestOptions={INTEREST_OPTIONS}
                  submitLabel="Submit Enquiry"
                />
              </div>
            </ModalShell>
          ) : null}
          {modal === "brochure" ? (
            <ModalShell
              key="brochure"
              label="brochure-title"
              testId="brochure-modal"
              onClose={close}
            >
              <ImagePanel
                title="Project Brochure"
                text="Floor plans, elevations and pricing in one document."
              />
              <div className="flex flex-col p-6 sm:p-9">
                <h2
                  id="brochure-title"
                  className="pr-10 font-heading text-[30px] font-extrabold text-navy"
                >
                  {brochure ? brochure.title : (project ?? "Project")}{" "}
                  <span className="text-brand">Brochure</span>
                </h2>
                {brochure ? (
                  <>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">
                      Open the brochure in your browser or download the PDF. For
                      pricing on a specific unit, use the enquiry form and our
                      team will call you back.
                    </p>
                    <div className="mt-8 flex flex-col gap-3">
                      <a
                        href={brochure.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-brand px-7 text-[14px] font-semibold uppercase tracking-wide text-white transition hover:bg-brand-strong"
                        data-testid="brochure-download"
                      >
                        <Download aria-hidden className="size-5" /> Download
                        Brochure
                      </a>
                      <a
                        href={brochure.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full border border-navy/20 px-7 text-[14px] font-semibold uppercase tracking-wide text-navy transition hover:border-brand hover:text-brand"
                      >
                        <ExternalLink aria-hidden className="size-5" /> View
                        Online
                      </a>
                      <button
                        type="button"
                        onClick={() => setModal("enquiry")}
                        className="mt-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                      >
                        Request a call back instead
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-6 mt-2 text-[15px] leading-relaxed text-muted">
                      The brochure for this project is shared on request. Leave
                      your details and our team will send it to you.
                    </p>
                    <EnquiryForm
                      variant="boxed"
                      mode="quick"
                      project={project}
                      submitLabel="Request Brochure"
                    />
                  </>
                )}
              </div>
            </ModalShell>
          ) : null}
        </AnimatePresence>
      </EnquiryContext.Provider>
    </MotionConfig>
    </LazyMotion>
  );
}

export function EnquiryTrigger({
  children,
  project,
  className,
}: {
  children: ReactNode;
  project?: string;
  className?: string;
}) {
  const { open } = useEnquiry();
  return (
    <button type="button" onClick={() => open(project)} className={className}>
      {children}
    </button>
  );
}

export function BrochureTrigger({
  children,
  project,
  className,
}: {
  children: ReactNode;
  project?: string;
  className?: string;
}) {
  const { openBrochure } = useEnquiry();
  return (
    <button
      type="button"
      onClick={() => openBrochure({ project })}
      className={className}
    >
      {children}
    </button>
  );
}
