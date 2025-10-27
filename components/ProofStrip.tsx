export default function ProofStrip() {
  const stats = [
    { value: "1200+", label: "clients satisfaits", icon: "👥" },
    { value: "4,9/5", label: "note moyenne", icon: "⭐" }, 
    { value: "30 min", label: "pour votre dossier complet", icon: "⚡" }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
        Chiffres‑clés
      </h2>
      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="card-glass rounded-xl p-5 md:p-6 text-center hover:translate-y-[1px] transition"
          >
            <div className="text-2xl md:text-3xl mb-2 opacity-90">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#6bcfcf] to-white bg-clip-text text-transparent mb-1">
              {stat.value}
            </div>
            <div className="text-white/80 text-xs md:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}