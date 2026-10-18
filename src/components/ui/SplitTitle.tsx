import { Fragment, type CSSProperties } from "react";
import type { TwoToneTitle } from "@/types/landing";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

function Words({ text, offset, className }: { text: string; offset: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className={cn("split-word", className)} style={{ "--i": offset + i } as CSSProperties}>
            {w}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Two-tone heading (navy lead + orange accent) with the reference's
 * word-by-word "split right" entrance animation.
 */
export function SplitTitle({ title, as: Tag = "h2", className, accentClassName, breakAccent }: { title: TwoToneTitle; as?: "h1" | "h2" | "h3"; className?: string; accentClassName?: string; breakAccent?: boolean }) {
  const leadCount = title.lead.split(" ").length;
  return (
    <Reveal as={Tag} className={cn("reveal-none overflow-x-clip font-heading", className)}>
      <Words text={title.lead} offset={0} />
      {breakAccent ? <br /> : null}
      <Words text={title.accent} offset={leadCount} className={cn("text-brand", accentClassName)} />
    </Reveal>
  );
}

interface LandingHeadingProps {
  eyebrow?: string;
  title: TwoToneTitle;
  description?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  breakAccent?: boolean;
  className?: string;
}

/** Reference section header: eyebrow pill → 48px/800 serif heading → muted lead paragraph. */
export function LandingHeading({ eyebrow, title, description, tone = "light", align = "center", breakAccent, className }: LandingHeadingProps) {
  const center = align === "center";
  return (
    <div className={cn("flex flex-col", center ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow ? (
        <Reveal delay={0.3}>
          <Eyebrow tone={tone} className="mb-5 !leading-7">{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <SplitTitle
        title={title}
        breakAccent={breakAccent}
        className={cn("text-[32px] font-extrabold leading-[1.2] sm:text-[40px] lg:text-[48px]", tone === "light" ? "text-navy" : "text-white", center && "mx-auto max-w-[900px]")}
      />
      {description ? (
        <Reveal delay={0.5}>
          <p className={cn("mt-5 max-w-[690px] text-[15px] leading-[1.6] sm:text-base", tone === "light" ? "text-muted" : "text-white/70", center && "mx-auto")}>{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
