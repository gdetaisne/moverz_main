"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simuler l'envoi (à remplacer par votre vraie API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-[#E3E5E8] bg-gradient-to-br from-[#6BCFCF]/10 to-[#4FB8B8]/5 p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#6BCFCF] to-[#4FB8B8]">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-[#04163a] mb-3">Message envoyé !</h3>
        <p className="text-[#4b5c6b] mb-6">
          Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] px-6 py-3 text-sm font-semibold text-[#04141f] hover:scale-105 transition-transform duration-300"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#04163a] mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-[#E3E5E8] bg-white px-4 py-3 text-[#04163a] placeholder-[#4b5c6b]/50 focus:border-[#6BCFCF] focus:outline-none focus:ring-2 focus:ring-[#6BCFCF]/20 transition-all"
            placeholder="Jean Dupont"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#04163a] mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-[#E3E5E8] bg-white px-4 py-3 text-[#04163a] placeholder-[#4b5c6b]/50 focus:border-[#6BCFCF] focus:outline-none focus:ring-2 focus:ring-[#6BCFCF]/20 transition-all"
            placeholder="jean.dupont@exemple.fr"
          />
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-[#04163a] mb-2">
          Sujet *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-[#E3E5E8] bg-white px-4 py-3 text-[#04163a] focus:border-[#6BCFCF] focus:outline-none focus:ring-2 focus:ring-[#6BCFCF]/20 transition-all"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="question">Question générale</option>
          <option value="devis">Question sur un devis</option>
          <option value="partenariat">Partenariat professionnel</option>
          <option value="ville">Demande d'ouverture dans ma ville</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#04163a] mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-xl border border-[#E3E5E8] bg-white px-4 py-3 text-[#04163a] placeholder-[#4b5c6b]/50 focus:border-[#6BCFCF] focus:outline-none focus:ring-2 focus:ring-[#6BCFCF]/20 transition-all resize-none"
          placeholder="Décrivez votre demande en détail..."
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        <span className="relative">
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </span>
        {!isSubmitting && (
          <span className="relative text-xl leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
        )}
      </button>

      <p className="text-xs text-[#4b5c6b]">
        * Champs obligatoires. Vos données sont traitées conformément à notre{" "}
        <a href="/politique-confidentialite/" className="text-[#2B7A78] underline hover:text-[#1F5F5D]">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
}

