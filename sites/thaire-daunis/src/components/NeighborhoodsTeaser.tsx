import Link from "next/link";

export default function NeighborhoodsTeaser() {
  // Les quartiers seront définis dans les données générées
  const picks = [

    { title: "Centre-Bourg", href: "/zones-desservies#centre-bourg-thaire" },


    { title: "La Rochelle", href: "/zones-desservies#la-rochelle" },


    { title: "Aigrefeuille-d'Aunis", href: "/zones-desservies#aigrefeuille-daunis" },


    { title: "Surgères", href: "/zones-desservies#surgeres" },


    { title: "Rochefort", href: "/zones-desservies#rochefort" },


    { title: "Saintes", href: "/zones-desservies#saintes" },

  ];
  
  return (
    <div>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Zones couvertes</h2>
        <Link href="/zones-desservies" className="text-sm text-[#6bcfcf] underline">Voir toutes les zones</Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {picks.map((p) => (
          <Link key={p.title} href={p.href} className="card-glass rounded-2xl p-4 hover:translate-y-[2px] hover:shadow-lg transition">
            <div className="text-white font-medium">{p.title}</div>
            <div className="text-white/70 text-xs mt-1">Déménageurs locaux</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
