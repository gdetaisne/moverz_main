import Image from "next/image";

export default function Testimonials() {
  // Utilisation de Handlebars pour injecter les témoignages dynamiquement
  // La structure sera remplacée par le script de génération
  const testimonials = [
    {
      name: "Marie L.",
      city: "Thairé d'Aunis",
      comment: "Excellent service pour notre déménagement vers La Rochelle. Équipe très professionnelle !",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Jean-Paul D.",
      city: "Aigrefeuille",
      comment: "Déménagement rapide et soigné. Je recommande vivement !",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">Témoignages</h2>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="card-glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                <Image 
                  src={testimonial.avatar}
                  alt={`Photo de ${testimonial.name}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                  quality={85}
                />
              </div>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-white/70">{testimonial.city}</div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-white/30'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-white/90 italic">"{testimonial.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}