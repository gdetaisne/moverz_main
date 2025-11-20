export default function ValueTriad() {
  const items = [
    {
      icon: "✅",
      title: "5+ déménageurs contrôlés",
      description:
        "Solidité financière vérifiée + Historique litiges analysé. Seuls les pros fiables reçoivent votre dossier.",
    },
    {
      icon: "🎯",
      title: "Devis vraiment comparables",
      description:
        "L'IA crée UN inventaire unique → tous chiffrent le même volume. Fini les devis incomparables.",
    },
    {
      icon: "🆓",
      title: "100% gratuit, sans engagement",
      description:
        "Comparez en toute liberté, décidez sans pression. Pas de frais cachés, pas de piège.",
    },
    {
      icon: "🚫",
      title: "Sans harcèlement téléphonique",
      description:
        "Zéro appel intempestif, vous recevez tout par email. Vous gardez le contrôle total de vos échanges.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6bcfcf]">
          Nos 4 garanties
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
          Pourquoi Moverz est différent
        </h2>
        <p className="text-white/80 max-w-3xl mx-auto text-sm md:text-base">
          Un comparateur pensé pour éviter les arnaques et vous donner des devis vraiment comparables.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-black/30 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl leading-none">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

