import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outline-light" | "ghost-light";
type Size = "md" | "lg";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-body font-semibold tracking-wide transition-[color,box-shadow,transform,background-color] duration-300 [transition-timing-function:var(--ease-button)] focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Reference: solid orange pill with soft halo ring, circle-fill hover.
  primary:
    "bg-brand text-white shadow-[0_0_0_6px_hsl(12_98%_53%/0.16)] hover:shadow-[0_0_0_9px_hsl(12_98%_53%/0.2)] before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-navy before:transition-all before:duration-500 hover:before:size-[420px]",
  outline:
    "border border-navy/20 bg-white text-navy hover:border-brand hover:text-brand",
  "outline-light":
    "border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-navy",
  "ghost-light": "bg-white text-navy hover:bg-brand hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[13px] uppercase",
  lg: "h-[60px] px-8 text-[15px] uppercase",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode | false;
  children: ReactNode;
  className?: string;
}

function Content({ children, icon }: { children: ReactNode; icon?: ReactNode | false }) {
  return (
    <>
      <span>{children}</span>
      {icon === false ? null : (
        <span aria-hidden className="relative inline-flex size-4 overflow-hidden">
          <span className="absolute inset-0 transition-transform duration-500 group-hover/btn:translate-x-6">
            {icon ?? <ArrowRight className="size-4" />}
          </span>
          <span className="absolute inset-0 -translate-x-6 transition-transform duration-500 group-hover/btn:translate-x-0">
            {icon ?? <ArrowRight className="size-4" />}
          </span>
        </span>
      )}
    </>
  );
}

type LinkButtonProps = CommonProps & { href: string; external?: boolean } & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

export function ButtonLink({ href, variant = "primary", size = "md", icon, children, className, external, ...rest }: LinkButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        <Content icon={icon}>{children}</Content>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Content icon={icon}>{children}</Content>
    </Link>
  );
}

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function Button({ variant = "primary", size = "md", icon, children, className, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Content icon={icon}>{children}</Content>
    </button>
  );
}
