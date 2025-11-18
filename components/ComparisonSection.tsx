const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 13.5L9.5 18L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6L18 18M6 18L18 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ComparisonSection() {
  const rows = [
    {
      label: "Prix",
      without: "Devis reçus au fil de l’eau, écarts de prix peu lisibles.",
      with: "5+ devis alignés sur le même volume et les mêmes options.",
    },
    {
      label: "Temps passé",
      without: "2–3 jours de recherches, appels et visites techniques.",
      with: "Un dossier unique, devis reçus sans relances ni visites.",
    },
    {
      label: "Stress & risques",
      without: "Qualité des déménageurs difficile à vérifier, risque d’arnaque.",
      with: "Pros contrôlés (assurances, avis) et support en cas de souci.",
    },
    {
      label: "Lisibilité des devis",
      without: "Formats différents, difficile de comparer ligne par ligne.",
      with: "Même dossier, colonnes alignées : vous voyez qui propose quoi.",
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-5 md:p-6 shadow-[0_24px_70px_rgba(0,0,0,0.55)] motion-safe:animate-fade-up-soft">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-0.5 w-16 rounded-full bg-[#6BCFCF]" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
          Comparatif
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Colonne gauche – Sans comparateur */}
        <div className="rounded-2xl border border-white/10 bg-white/5/0 bg-gradient-to-b from-white/0 to-white/5 p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-200">
            Sans comparateur
          </p>
          <ul className="mt-3 space-y-3 text-sm text-white/80">
            {rows.map((row, index) => (
              <li
                key={row.label}
                className="flex items-start gap-3 motion-safe:animate-fade-up-soft"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-200">
                  <CrossIcon className="h-3 w-3" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/80">{row.without}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne droite – Avec notre comparateur */}
        <div className="rounded-2xl border border-[#6BCFCF]/40 bg-white/5 p-4 md:p-5 shadow-[0_18px_60px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.5)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6BCFCF]">
            Avec notre comparateur
          </p>
          <ul className="mt-3 space-y-3 text-sm text-emerald-50">
            {rows.map((row, index) => (
              <li
                key={row.label}
                className="flex items-start gap-3 motion-safe:animate-fade-up-soft"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-100">
                  <CheckIcon className="h-3 w-3" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-[13px] text-emerald-50">{row.with}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

