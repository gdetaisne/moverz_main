"use client";

export default function Guarantees() {
  const guarantees = [
    {
      icon: "💬",
      title: "Transparence totale",
      description: "Devis clairs, sans frais cachés."
    },
    {
      icon: "🧠",
      title: "Estimation IA",
      description: "Précise à 90 %, vérifiée par nos experts."
    },
    {
      icon: "🤝",
      title: "Déménageurs certifiés",
      description: "Assurés, notés et vérifiés."
    },
    {
      icon: "💸",
      title: "100 % gratuit",
      description: "Aucun engagement ni paiement en ligne."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Nos garanties Moverz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="card-glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {guarantee.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {guarantee.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {guarantee.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

