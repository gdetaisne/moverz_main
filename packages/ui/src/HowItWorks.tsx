import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Prenez vos photos",
      description: "3 à 5 par pièce, l'essentiel",
      image: "/images/how-it-works/step-1-photos.jpg",
      alt: "Main prenant une photo d'une pièce pour estimer le volume à déménager"
    },
    {
      number: "2", 
      title: "Notre IA calcule votre volume",
      description: "Estimation fiable en 2 minutes",
      image: "/images/how-it-works/step-2-estimation.jpg",
      alt: "Écran affichant l'estimation en m³ calculée par l'IA"
    },
    {
      number: "3",
      title: "Vous recevez vos devis précis gratuitement",
      description: "5 offres adaptées sous 7 jours",
      image: "/images/how-it-works/step-3-loading.jpg",
      alt: "Équipe de déménagement chargeant des cartons dans un camion"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-6 md:mb-10">
        Comment ça marche
      </h2>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step, i) => (
          <div key={i} className="group">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 ring-1 ring-white/10 shadow-lg transition-transform duration-300 group-hover:-translate-y-0.5">
              <Image 
                src={step.image}
                alt={step.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                quality={80}
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04163a]/60 via-[#04163a]/20 to-transparent"></div>
              <div
                className="absolute top-3 left-3 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#6bcfcf] text-[#04163a] text-base md:text-lg font-bold ring-2 ring-white/60 shadow-[0_4px_14px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04163a] focus-visible:ring-[#6bcfcf]"
                aria-hidden="true"
              >
                {step.number}
              </div>
              <div className="absolute inset-x-3 bottom-3 text-left">
                <h3 className="text-white font-semibold text-base md:text-lg">{step.title}</h3>
                <p className="text-white/85 text-xs md:text-sm">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10 md:mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="/inventaire-ia/" className="btn-primary" aria-label="Obtenez vos devis précis gratuitement">Obtenez vos devis précis gratuitement</a>
        <a href="/comment-ca-marche/" className="btn-secondary">Comment ça marche</a>
      </div>
    </div>
  );
}
