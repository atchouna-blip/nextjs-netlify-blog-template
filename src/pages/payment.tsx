import React, { useState } from 'react';
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';

/**
 * Stripe Payment Integration Page
 * 
 * This page is ready for Stripe integration.
 * To activate Stripe payments:
 * 
 * 1. Install Stripe dependencies:
 *    npm install @stripe/stripe-js @stripe/react-stripe-js
 *    npm install stripe (for server-side)
 * 
 * 2. Set up environment variables in Netlify:
 *    - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 *    - STRIPE_SECRET_KEY
 * 
 * 3. Create API route at /api/create-payment-intent.ts
 * 
 * 4. Uncomment the Stripe integration code below
 */

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Participation Simple',
      price: 5000, // in cents (50.00 EUR)
      currency: 'EUR',
      description: 'Accès à la conférence',
      features: [
        'Accès aux sessions principales',
        'Documents de la conférence',
        'Certificat de participation'
      ]
    },
    {
      id: 'premium',
      name: 'Participation Premium',
      price: 15000, // in cents (150.00 EUR)
      currency: 'EUR',
      description: 'Participation complète avec présentation',
      features: [
        'Tout de la participation simple',
        'Présentation orale ou poster',
        'Publication dans les actes',
        'Networking premium',
        'Dîner de gala inclus'
      ]
    },
    {
      id: 'student',
      name: 'Tarif Étudiant',
      price: 2500, // in cents (25.00 EUR)
      currency: 'EUR',
      description: 'Tarif réduit pour étudiants',
      features: [
        'Accès aux sessions principales',
        'Documents de la conférence',
        'Certificat de participation',
        'Justificatif d\'inscription requis'
      ]
    }
  ];

  const handlePayment = async (planId: string) => {
    setSelectedPlan(planId);
    setIsProcessing(true);

    try {
      // TODO: Implement Stripe payment flow
      // 1. Call API to create payment intent
      // 2. Redirect to Stripe Checkout or use Stripe Elements
      
      console.log('Payment initiated for plan:', planId);
      
      // Placeholder for Stripe integration
      alert(
        'Intégration Stripe prête \u00e0 activer!\n\n' +
        'Prochaines étapes:\n' +
        '1. Configurez vos clés Stripe dans Netlify\n' +
        '2. Installez les dépendances Stripe\n' +
        '3. Créez l\'API route pour le paiement\n\n' +
        'Consultez INTEGRATION_GUIDE.md pour les instructions détaillées.'
      );
    } catch (error) {
      console.error('Payment error:', error);
      alert('Erreur lors du traitement du paiement. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (cents: number, currency: string) => {
    const amount = cents / 100;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <Layout>
      <BasicMeta url="/payment" title="Paiement - Inscription Conférence" />
      <OpenGraphMeta url="/payment" title="Paiement - Inscription Conférence" />
      <TwitterCardMeta url="/payment" title="Paiement - Inscription Conférence" />
      
      <div className="container">
        <article>
          <header>
            <h1>Inscription à la Conférence</h1>
            <p className="subtitle">
              Sélectionnez votre formule de participation et procédez au paiement sécurisé
            </p>
          </header>

          <div className="payment-notice">
            <h3>⚠️ Intégration Stripe Prête</h3>
            <p>
              Cette page est préparée pour l'intégration Stripe. 
              Consultez le fichier <code>INTEGRATION_GUIDE.md</code> pour activer les paiements.
            </p>
          </div>

          <div className="plans-grid">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
              >
                <div className="plan-header">
                  <h2>{plan.name}</h2>
                  <div className="price">
                    {formatPrice(plan.price, plan.currency)}
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePayment(plan.id)}
                  disabled={isProcessing}
                  className="pay-button"
                >
                  {isProcessing && selectedPlan === plan.id 
                    ? 'Traitement...' 
                    : 'Sélectionner et Payer'
                  }
                </button>
              </div>
            ))}
          </div>

          <div className="info-section">
            <h3>Informations de Paiement</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>🔒 Paiement Sécurisé</strong>
                <p>Tous les paiements sont traités de manière sécurisée via Stripe</p>
              </div>
              <div className="info-item">
                <strong>💳 Moyens de Paiement</strong>
                <p>Cartes bancaires, cartes de crédit, et autres méthodes supportées</p>
              </div>
              <div className="info-item">
                <strong>🧯 Reçu Automatique</strong>
                <p>Reçu et confirmation envoyés par email immédiatement</p>
              </div>
              <div className="info-item">
                <strong>📞 Support</strong>
                <p>Contactez-nous en cas de problème : support@conference.com</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        article {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
        }
        header {
          text-align: center;
          margin-bottom: 3rem;
          border-bottom: 2px solid #0070f3;
          padding-bottom: 1.5rem;
        }
        h1 {
          color: #0070f3;
          margin-bottom: 0.5rem;
          font-size: 2.5rem;
        }
        .subtitle {
          font-size: 1.2rem;
          color: #666;
        }
        .payment-notice {
          background: #fff3cd;
          border: 2px solid #ffc107;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        .payment-notice h3 {
          color: #856404;
          margin-bottom: 0.5rem;
        }
        .payment-notice p {
          color: #856404;
          margin: 0;
        }
        .payment-notice code {
          background: rgba(0, 0, 0, 0.1);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
        }
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .plan-card {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }
        .plan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 112, 243, 0.15);
          border-color: #0070f3;
        }
        .plan-card.selected {
          border-color: #0070f3;
          background: #f0f7ff;
        }
        .plan-header {
          text-align: center;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .plan-header h2 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        .price {
          font-size: 2.5rem;
          font-weight: bold;
          color: #0070f3;
          margin-bottom: 0.5rem;
        }
        .plan-description {
          color: #666;
          font-size: 0.95rem;
        }
        .features-list {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }
        .features-list li {
          padding: 0.75rem 0;
          display: flex;
          align-items: center;
          color: #333;
        }
        .checkmark {
          color: #28a745;
          font-weight: bold;
          margin-right: 0.75rem;
          font-size: 1.2rem;
        }
        .pay-button {
          width: 100%;
          background: #0070f3;
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 6px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }
        .pay-button:hover:not(:disabled) {
          background: #0051cc;
        }
        .pay-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .info-section {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 2rem;
          margin-top: 3rem;
        }
        .info-section h3 {
          text-align: center;
          color: #333;
          margin-bottom: 2rem;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .info-item {
          text-align: center;
        }
        .info-item strong {
          display: block;
          color: #0070f3;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        .info-item p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }
        @media (max-width: 768px) {
          .container {
            padding: 1rem 0.5rem;
          }
          article {
            padding: 1rem;
          }
          h1 {
            font-size: 2rem;
          }
          .plans-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}
