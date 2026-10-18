import { Download, Eye, FileText } from "lucide-react";
import type { Brochure } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BrochureCard({ brochure, projectTitle }: { brochure: Brochure; projectTitle: string }) {
  return (
    <section className="bg-white py-20" aria-label="Project brochure">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-[24px] border border-brand/25 bg-warm p-8 sm:flex-row sm:items-center sm:p-10">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_25px_hsl(12_98%_53%/0.35)]">
              <FileText aria-hidden className="size-7" />
            </span>
            <div className="flex-1">
              <h2 className="font-heading text-[26px] font-bold text-navy sm:text-[30px]">Project Brochure</h2>
              <p className="mt-2 max-w-xl text-muted">
                Download or view the official {projectTitle} brochure containing detailed floor plans, specifications, elevations, and unit configurations.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={brochure.viewUrl} variant="outline" icon={<Eye className="size-4" />}>View Brochure</ButtonLink>
              <ButtonLink href={brochure.downloadUrl} icon={<Download className="size-4" />}>Download Brochure</ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
