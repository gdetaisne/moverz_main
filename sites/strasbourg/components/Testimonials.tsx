import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sophie",
      location: "Bordeaux",
      text: "Service fluide, estimation juste et déménageurs pros.",
      rating: "⭐⭐⭐⭐⭐",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&q=80"
    },
    {
      name: "Marc", 
      location: "Lyon",
      text: "L'IA a facilité tout le processus. Rapide et efficace !",
      rating: "⭐⭐⭐⭐⭐",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&q=80"
    },
    {
      name: "Julie",
      location: "Toulouse", 
      text: "Transparent, sans surprise. Je recommande vivement.",
      rating: "⭐⭐⭐⭐⭐",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&q=80"
    },
    {
      name: "Pierre",
      location: "Nantes", 
      text: "Super pratique avec les photos. Gain de temps énorme.",
      rating: "⭐⭐⭐⭐⭐",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&q=80"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Ils ont déménagé avec Moverz
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial, i) => (
          <div 
            key={i} 
            className="card-glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
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
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-white/70">{testimonial.location}</div>
              </div>
            </div>
            <p className="text-white/90 mb-3 leading-relaxed">"{testimonial.text}"</p>
            <div className="text-sm">{testimonial.rating}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a 
          href="/faq" 
          className="inline-flex items-center justify-center text-[#6bcfcf] hover:text-white transition-colors font-medium"
        >
          Lire plus d'avis →
        </a>
      </div>
    </div>
  );
}