import type { ProjectStatus } from "@/types/content";
import { projectStatusLabel } from "@/data/projects";
import { cn } from "@/lib/cn";

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[1.5px] backdrop-blur",
        status === "ongoing" && "bg-brand text-white",
        status === "completed" && "bg-navy text-white",
        status === "upcoming" && "bg-white text-navy",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current opacity-80" />
      {projectStatusLabel[status]}
    </span>
  );
}
