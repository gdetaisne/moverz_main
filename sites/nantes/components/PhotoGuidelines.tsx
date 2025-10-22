"use client";

import { Camera, Lightbulb, RotateCcw } from "lucide-react";
import clsx from "clsx";

type Card = {
  icon: React.ElementType;
  title: string;
  caption: string;
};

const items: Card[] = [
  {
    icon: Camera,
    title: "Prenez large",
    caption: "Capturez l'ensemble de la pièce, de préférence en plein jour.",
  },
  {
    icon: Lightbulb,
    title: "Montrez les détails",
    caption: "Objets fragiles, instruments, tableaux, etc.",
  },
  {
    icon: RotateCcw,
    title: "Ajoutez plusieurs angles",
    caption: "L'IA fusionne les images pour plus de précision.",
  },
];

interface PhotoGuidelinesProps {
  className?: string;
  compact?: boolean;
}

export default function PhotoGuidelines({
  className,
  compact = false,
}: PhotoGuidelinesProps) {
  return (
    <section
      aria-labelledby="photo-guidelines-title"
      className={clsx(
        "relative isolate overflow-hidden rounded-3xl",
        compact ? "px-4 py-6" : "px-6 py-10 md:px-10 md:py-14",
        "text-white",
        // Fond uni bleu nuit
        "bg-[#04163a]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="photo-guidelines-title"
          className={clsx(
            "font-bold tracking-tight text-center",
            compact ? "text-2xl" : "text-3xl md:text-4xl"
          )}
        >
          Bien préparer vos photos pour une estimation parfaite
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
          {items.map(({ icon: Icon, title, caption }) => (
            <div
              key={title}
              className={clsx(
                "rounded-2xl bg-white/5 border border-white/10 backdrop-blur text-center",
                compact ? "p-6" : "p-8",
                "hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
              )}
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full p-4 border border-white/15 bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Icon
                    aria-hidden="true"
                    className={clsx(
                      compact ? "h-8 w-8" : "h-10 w-10"
                    )}
                    style={{ color: "#6bcfcf" }}
                  />
                </div>
              </div>
              <h3
                className={clsx(
                  "font-semibold text-white mb-3",
                  compact ? "text-lg" : "text-xl"
                )}
              >
                {title}
              </h3>
              <p
                className={clsx(
                  "text-white/80 leading-relaxed",
                  compact ? "text-sm" : "text-base"
                )}
              >
                {caption}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-white/70 max-w-3xl mx-auto">
          Notre IA analyse les volumes, détecte les objets fragiles et ajuste le cubage final.
        </p>

        {/* Bouton optionnel - masqué car la route /exemples-photos n'existe pas encore */}
        {false && (
          <div className="mt-6 md:mt-8">
            <a
              href="/exemples-photos"
              className={clsx(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2",
                "border-white/20 bg-white/0 text-white hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                "transition-colors duration-300",
                compact ? "text-sm" : "text-base"
              )}
              aria-label="Voir des exemples de bonnes photos"
            >
              Voir des exemples
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
