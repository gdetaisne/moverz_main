export default function ValueTriad() {
  const values = [
    { icon: "🤖", title: "IA précise", description: "Estimation fiable depuis vos photos" },
    { icon: "🔎", title: "Transparence totale", description: "Devis clairs, aucun frais caché" },
    { icon: "✅", title: "100% gratuit", description: "Comparez en toute liberté" },
    { icon: "📍", title: "Experts locaux", description: "Déménageurs vérifiés près de chez vous" }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">Nos garanties</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 text-center hover:translate-y-[2px] transition">
            <div className="text-3xl mb-2">{value.icon}</div>
            <h3 className="text-xl font-semibold">{value.title}</h3>
            <p className="mt-2 text-white/80">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}