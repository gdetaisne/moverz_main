import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      icon: "📸",
      title: "Prenez vos photos",
      description: "3 à 10 par pièce, c'est suffisant."
    },
    {
      icon: "🤖", 
      title: "Notre IA estime votre volume",
      description: "En quelques minutes."
    },
    {
      icon: "📦",
      title: "Recevez 5 devis fiables",
      description: "Sous 7 jours, par email."
    }
  ];

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
        Déménager n'a jamais été aussi simple
      </h2>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {steps.map((step, i) => (
          <div key={i} className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="text-7xl transition-transform duration-300 group-hover:scale-110">
                {step.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
            <p className="text-white/80 text-lg">{step.description}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <a
          href="/inventaire-ia/"
          className="inline-flex items-center justify-center rounded-full bg-[#2b7a78] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:brightness-110 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-all duration-300"
        >
          Lancer mon estimation gratuite
        </a>
        <p className="mt-4 text-sm text-white/70">⚡ Processus 100 % en ligne, sans visite.</p>
      </div>
    </div>
  );
}