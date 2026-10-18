import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

interface AssetPlaceholderProps {
  label: string;
  recommendedSize: string;
  assetKey: string;
  /** CSS aspect-ratio, e.g. "16 / 9". */
  aspectRatio?: string;
  className?: string;
  tone?: "light" | "dark";
}

/**
 * Neutral, clearly-labelled stand-in for content the original site does not
 * publish. Never styled to look like a real photo. Listed in docs/missing-content.md.
 */
export function AssetPlaceholder({ label, recommendedSize, assetKey, aspectRatio = "4 / 3", className, tone = "light" }: AssetPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label} (content required)`}
      data-asset-key={assetKey}
      data-placeholder="true"
      style={{ aspectRatio }}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-[inherit] border-2 border-dashed p-6 text-center",
        tone === "light" ? "border-navy/20 bg-[repeating-linear-gradient(45deg,#f6f7f9,#f6f7f9_12px,#eef0f4_12px,#eef0f4_24px)] text-muted" : "border-white/20 bg-white/5 text-white/70",
        className,
      )}
    >
      <ImageOff aria-hidden className="size-7 opacity-60" />
      <span className="font-body text-sm font-semibold">{label}</span>
      <span className="font-body text-xs opacity-80">Recommended: {recommendedSize}</span>
      <code className="rounded bg-black/5 px-1.5 py-0.5 text-[11px]">{assetKey}</code>
    </div>
  );
}
