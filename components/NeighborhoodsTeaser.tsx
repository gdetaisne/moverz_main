import Link from "next/link";

export default function NeighborhoodsTeaser() {
  // Quartiers populaires avec liens vers les pages zones desservies
  const picks = [
    { title: "Centre-ville", href: "/Nantes/centre-ville" },
    { title: "Ile de Nantes", href: "/Nantes/ile-de-Nantes" },
    { title: "Malakoff", href: "/Nantes/malakoff" },
    { title: "Dervallières", href: "/Nantes/dervallieres" },
    { title: "Beaulieu", href: "/Nantes/beaulieu" },
  ];
  
  return (
    <div>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Zones couvertes</h2>
        <Link href="/quartiers-Nantes" className="text-sm text-[#6bcfcf] underline">Voir tous les quartiers</Link>
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
