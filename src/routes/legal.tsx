import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal")({
  component: Legal,
  head: () => ({ meta: [{ title: "Legal — tapt." }, { name: "description", content: "Terms, privacy, cookies and accessibility." }] }),
});

const docs = [
  {
    t: "Terms of service",
    b: "Standard B2C terms covering purchase, returns (14-day per EU Directive 2011/83/EU), warranties, IP, and limitation of liability. In LATAM, adapted to local consumer protection codes (e.g. Brazilian CDC Law 8.078/90; Mexican LFPC).",
  },
  {
    t: "Privacy policy",
    b: "GDPR (EU) + CCPA (California) compliant. Data minimization: only fields the user puts on the card are stored. In emergent markets we additionally comply with LGPD (Brazil) and the South African POPIA where applicable.",
  },
  {
    t: "Cookies policy",
    b: "ePrivacy Directive consent banner with granular opt-in. PostHog uses first-party cookies only, no third-party tracking. In jurisdictions without explicit cookie law (e.g. parts of SEA), we still offer the same opt-out by default.",
  },
  {
    t: "Accessibility statement",
    b: "WCAG 2.2 AA target. Public profiles render with semantic HTML, full keyboard nav, prefers-reduced-motion honored. Compliant with the EU Accessibility Act (effective 2025) and US ADA Title III precedents.",
  },
];

function Legal() {
  return (
    <div className="px-6 py-24 max-w-4xl mx-auto">
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Legal</div>
      <h1 className="text-5xl sm:text-6xl mb-6">Four statements, two jurisdictions.</h1>
      <p className="text-muted-foreground mb-16 max-w-2xl">
        Below: the four legal pillars and how legislation in our destination markets applies.
      </p>
      <div className="space-y-px">
        {docs.map((d) => (
          <details key={d.t} className="group border-t border-border last:border-b">
            <summary className="cursor-pointer py-6 flex justify-between items-center text-lg list-none">
              <span>{d.t}</span>
              <span className="text-muted-foreground text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="pb-6 text-sm text-muted-foreground max-w-2xl leading-relaxed">{d.b}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
