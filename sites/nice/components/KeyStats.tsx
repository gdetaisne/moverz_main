"use client";

export default function KeyStats() {
  const stats = [
    {
      icon: "📦",
      number: "1200+",
      label: "déménagements gérés"
    },
    {
      icon: "⭐",
      number: "4.9/5",
      label: "satisfaction moyenne"
    },
    {
      icon: "⏱️",
      number: "30 min",
      label: "pour compléter votre dossier"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-[#2b7a78]/20 to-[#6bcfcf]/20 rounded-3xl">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          Ils nous font confiance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {stat.icon}
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <p className="text-white/80 text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

