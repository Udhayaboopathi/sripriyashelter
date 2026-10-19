import Image from "next/image";
import type { Approval } from "@/types/landing";

/** Reference RERA strip (210px, brand colour): white cards with QR, registration number, date and portal URL. */
export function ApprovalsStrip({ approvals }: { approvals: Approval[] }) {
  return (
    <section id="approvals" aria-label="Approvals and registration" className="bg-brand py-8 lg:py-[45px]">
      <div className="container-site">
        <ul className="mx-auto grid max-w-[980px] gap-5 md:grid-cols-2 md:gap-[30px]">
          {approvals.map((a) => (
            <li key={a.number} className="flex min-w-0 items-center gap-3 rounded-[14px] bg-white p-3 xs:gap-5 xs:p-4 shadow-[0_10px_30px_rgb(0_0_0/0.12)] sm:p-5" data-testid="approval-card">
              <Image src="/images/samples/qr-tnrera.svg" alt="" width={84} height={84} unoptimized className="size-[60px] shrink-0 xs:size-[72px] rounded-md border border-line p-1 sm:size-[84px]" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[1px] text-muted xs:tracking-[2px]">{a.authority}</p>
                <p className="mt-1 break-words font-heading text-[16px] font-extrabold text-navy sm:text-[18px]">{a.number}</p>
                <p className="mt-0.5 text-[13px] text-muted">Dated: {a.date}</p>
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 max-w-full items-center truncate text-[13px] font-semibold text-brand hover:underline">
                  {a.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
