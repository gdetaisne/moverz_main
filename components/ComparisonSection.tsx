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
  const items = [
    {
      title: "Déménagement seul",
      icon: "🚚",
      badge: "Sans comparateur",
      tagline: "Vous gérez tout : recherches, appels, visites, relances…",
      highlights: [
        "Temps passé : 2 à 3 jours pour trouver 3 devis",
        "Budget caché : location camion, essence, péages, cartons",
        "Stress : aucune assurance pro, risque de casse",
      ],
      negatives: [
        "Devis impossibles à comparer entre eux",
        "Pas de protection en cas de litige",
        "Organisation longue (visites techniques, appels, relances)",
      ],
    },
    {
      title: "Avec le comparateur",
      icon: "✨",
      badge: "Notre solution",
      tagline: "On prépare le dossier et on met les pros en concurrence pour vous.",
      highlights: [
        "Processus 100% en ligne, sans visites techniques",
        "Dossier anonyme envoyé uniquement à des pros contrôlés",
        "Même dossier pour tous → devis enfin comparables",
      ],
      positives: [
        "5+ devis filtrés sur le même dossier",
        "Assurances et contrats pros vérifiés",
        "Support jusqu’au jour J si besoin",
      ],
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => {
        const isBest = item.badge === "Notre solution";
        return (
          <div
            key={item.title}
            className={`rounded-2xl p-6 border transition shadow-sm card-glass ${
              isBest
                ? "border-[#6bcfcf]/80 shadow-[#04163a]/40 shadow-lg"
                : "border-white/10"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{item.tagline}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${
                  isBest
                    ? "bg-[#e0f5f4] text-[#1b4a4a]"
                    : "bg-white/5 text-white/70 border border-white/10"
                }`}
              >
                {item.badge}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm text-white/85">
              {(item.highlights || []).map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-2 h-0.5 w-5 rounded-full bg-[#6bcfcf]/80" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {(item.negatives || item.positives) && (
              <div className="mt-5 rounded-2xl bg-white/5 p-4 space-y-2 text-sm border border-white/10">
                {(item.negatives || []).map((text) => (
                  <div key={text} className="flex items-start gap-3 text-red-200">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 text-red-300">
                      <CrossIcon className="h-3 w-3" />
                    </span>
                    <span>{text}</span>
                  </div>
                ))}
                {(item.positives || []).map((text) => (
                  <div key={text} className="flex items-start gap-3 text-emerald-200">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

