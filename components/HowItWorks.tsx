import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Prenez vos photos",
      description: "3 à 5 par pièce, l'essentiel",
      image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&h=900&fit=crop&q=80",
      alt: "Main prenant une photo d'une pièce pour estimation déménagement"
    },
    {
      number: "2", 
      title: "Notre IA calcule votre volume",
      description: "Estimation fiable en 2 minutes",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&q=80",
      alt: "Écran montrant l'estimation IA du volume en m³"
    },
    {
      number: "3",
      title: "Vous recevez vos devis précis gratuitement",
      description: "5 offres adaptées sous 7 jours",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&h=900&fit=crop&q=80",
      alt: "Équipe de déménagement chargeant un carton dans un camion"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-6 md:mb-10">
        Comment ça marche
      </h2>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step, i) => (
          <div key={i} className="text-center">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-white/10 ring-1 ring-white/10">
              <Image 
                src={step.image}
                alt={step.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04163a]/50 to-transparent"></div>
              <div className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#6bcfcf] text-[#04163a] text-base font-bold ring-1 ring-white/40">
                {step.number}
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-white/80 text-sm md:text-base">{step.description}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10 md:mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="/inventaire-ia/" className="btn-primary">Obtenez vos devis gratuits</a>
        <a href="/comment-ca-marche/" className="btn-secondary">Comment ça marche</a>
      </div>
    </div>
  );
}