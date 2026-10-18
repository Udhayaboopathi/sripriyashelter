import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-grid-light mt-[var(--header-height)] flex min-h-[70vh] items-center py-24">
      <div className="container-site text-center">
        <p className="font-heading text-[96px] font-black leading-none text-brand/20">404</p>
        <h1 className="mt-2 font-heading text-[40px] font-bold text-navy">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex justify-center gap-4">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/projects" variant="outline">View Projects</ButtonLink>
        </div>
      </div>
    </section>
  );
}
