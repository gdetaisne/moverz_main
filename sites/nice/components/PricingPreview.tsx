export default function PricingPreview() {
  const pricing = [
    { type: "Studio T1", price: "300 – 700 €", icon: "🏠" },
    { type: "T2 – T3", price: "600 – 1200 €", icon: "🏡" },
    { type: "Maison", price: "1200 € et +", icon: "🏘️" }
  ];

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
        Tarifs moyens observés
      </h2>
      <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
        Basé sur plus de 1200 dossiers analysés. Les prix varient selon distance et prestation.
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pricing.map((item, i) => (
          <div 
            key={i} 
            className="card-glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">{item.type}</h3>
            <div className="text-3xl font-bold text-[#6bcfcf]">{item.price}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a 
          href="/inventaire-ia/" 
          className="inline-flex items-center justify-center rounded-full bg-[#2b7a78] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:brightness-110 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-all duration-300"
        >
          Obtenir mon estimation personnalisée
        </a>
      </div>
    </div>
  );
}