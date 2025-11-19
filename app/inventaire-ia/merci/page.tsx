'use client';

import React, { useEffect, useState } from 'react';

export default function MerciPage() {
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('moverz_form_state');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading form data:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ✅ Demande envoyée avec succès !
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Nos déménageurs partenaires analysent votre demande.
          </p>

          <p className="text-gray-600 mb-8">
            Vous recevrez <strong>3 à 6 devis personnalisés</strong> sous 24h par email et SMS.
          </p>

          {formData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h2 className="font-bold mb-4 text-center">📊 Récapitulatif de votre demande</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email de confirmation :</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                {formData.originAddress && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trajet :</span>
                    <span className="font-medium">
                      {formData.originAddress} → {formData.destinationAddress}
                    </span>
                  </div>
                )}
                {formData.movingDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date souhaitée :</span>
                    <span className="font-medium">{formData.movingDate}</span>
                  </div>
                )}
                {formData.formule && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Formule :</span>
                    <span className="font-medium">{formData.formule}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold mb-2">📧 Email envoyé</h3>
              <p className="text-sm text-gray-600">
                Vérifiez votre boîte de réception (et vos spams) pour l'email de confirmation.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold mb-2">📱 SMS envoyé</h3>
              <p className="text-sm text-gray-600">
                Un SMS de confirmation vous a été envoyé avec le récapitulatif.
              </p>
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="font-bold mb-4">🎯 Prochaines étapes</h3>
            <ol className="text-left space-y-3 mb-8">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span className="text-sm text-gray-700">
                  Nos déménageurs partenaires étudient votre demande
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span className="text-sm text-gray-700">
                  Vous recevez 3 à 6 devis détaillés sous 24-48h
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span className="text-sm text-gray-700">
                  Les déménageurs vous contactent pour finaliser les détails
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span className="text-sm text-gray-700">
                  Vous comparez les offres et choisissez le meilleur
                </span>
              </li>
            </ol>
          </div>

          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Retour à l'accueil
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Contactez-nous
            </a>
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-xs text-gray-500">
              Une question ? Besoin d'aide ?{' '}
              <a href="/contact" className="text-blue-600 hover:underline">
                Contactez notre support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

