import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/** Reference "main-sub-head": 13px / 800 / 3px tracking uppercase pill. */
export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5 font-body text-[12px] font-extrabold uppercase leading-5 tracking-[3px] sm:text-[13px]",
        tone === "light" ? "border-[var(--brand-primary-line)] bg-[var(--brand-primary-soft)] text-brand" : "border-brand/40 bg-brand/15 text-[hsl(12_98%_68%)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "center", tone = "light", as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow ? (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.1}>
        <Tag
          className={cn(
            "font-heading text-[clamp(1.75rem,2.6vw+1.1rem,3rem)] font-bold leading-[1.2]",
            tone === "light" ? "text-navy" : "text-white",
            align === "center" && "mx-auto max-w-3xl",
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {description ? (
        <Reveal delay={0.2}>
          <p className={cn("max-w-2xl text-base leading-[1.75] sm:text-[17px]", tone === "light" ? "text-muted" : "text-white/70", align === "center" && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
