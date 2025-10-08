export default function ProofStrip() {
  const stats = [
    { value: "150+", label: "dossiers Thairé d&#x27;Aunis", icon: "👥" },
    { value: "8+", label: "déménageurs qualifiés", icon: "⭐" }, 
    { value: "3-5", label: "devis sous 7 j", icon: "⚡" }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
        Chiffres‑clés
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="card-glass rounded-2xl p-8 text-center"
          >
            <div className="text-4xl mb-6">{stat.icon}</div>
            <div className="text-4xl md:text-5xl font-bold text-[#6bcfcf] mb-4">
              {stat.value}
            </div>
            <div className="text-white/80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}