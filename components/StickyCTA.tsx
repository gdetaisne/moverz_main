export default function StickyCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:right-6">
      <div className="mx-auto max-w-md">
        <div className="card-glass rounded-2xl p-4 text-center">
          <p className="text-sm text-white/90 mb-3">Prêt pour déménager?</p>
          <a href="/inventaire-ia/" className="btn-accent w-full text-center">Obtenez vos devis gratuits</a>
        </div>
      </div>
    </div>
  );
}