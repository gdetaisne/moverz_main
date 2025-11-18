export default function ProofStrip() {
  const stats = [
    {
      value: "1200+",
      label: "clients ont comparé grâce au comparateur",
      caption: "Dossiers pilotés depuis 2022.",
    },
    {
      value: "4,9/5",
      label: "note moyenne vérifiée",
      caption: "Avis sur des dossiers réellement comparés.",
    },
    {
      value: "5+ devis",
      label: "fiables à comparer",
      caption: "Tous chiffrés sur le même dossier, ligne par ligne.",
    },
    {
      value: "-18%",
      label: "économies moyennes",
      caption: "Écart moyen vs devis le plus cher.",
    },
  ];

  const chips = [
    "Déménageurs contrôlés",
    "Dossier anonyme",
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6BCFCF]">
            Chiffres clés de notre comparateur de déménageurs
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-[#0E0E0E]">
            1200+ déménagements pilotés sans arnaques
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#4b5c6b]">
            Données issues de dossiers réellement comparés sur votre ville et les alentours.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-[#E3E5E8] bg-white px-4 py-2 text-sm font-medium text-[#04163A]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2B7A78]" />
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-[#F4FBFB] via-white to-[#F4FBFB] p-3 md:p-4">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className="rounded-2xl border border-[#E3E5E8] bg-white p-5 md:p-6 text-[#04163A] shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/15 motion-safe:animate-fade-up-soft"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7b8794]">
                {stat.label}
              </div>
              <div
                className={`mt-3 text-3xl md:text-4xl font-bold ${
                  stat.value === "5+ devis" ? "text-transparent bg-clip-text bg-gradient-to-r from-[#0E766E] to-[#6BCFCF]" : "text-[#0E0E0E]"
                }`}
              >
                {stat.value}
              </div>
              <p className="mt-3 text-sm text-[#4b5c6b]">{stat.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}