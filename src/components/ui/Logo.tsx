import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * The original site's header/footer logo is a two-tone Playfair Display
 * wordmark ("Sripriya" in brand orange, "Shelter" in navy / white on dark).
 */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex min-h-11 items-center gap-1.5 font-heading whitespace-nowrap text-[19px] min-[360px]:text-[21px] font-bold leading-none xs:text-[23px] sm:text-[26px]", className)}>
      <span className="text-brand">{site.nameParts[0]}</span>{" "}
      <span className={tone === "light" ? "text-navy" : "text-white"}>{site.nameParts[1]}</span>
      <span className="sr-only"> – Home</span>
    </Link>
  );
}
