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
    <section className="py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ils nous font confiance
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <p className="text-white/70 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

