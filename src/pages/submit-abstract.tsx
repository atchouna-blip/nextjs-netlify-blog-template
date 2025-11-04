import React from 'react';
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';

export default function SubmitAbstract() {
  return (
    <Layout>
      <BasicMeta url="/submit-abstract" title="Soumettre un Résumé Scientifique" />
      <OpenGraphMeta url="/submit-abstract" title="Soumettre un Résumé Scientifique" />
      <TwitterCardMeta url="/submit-abstract" title="Soumettre un Résumé Scientifique" />
      <div className="container">
        <article>
          <header>
            <h1>Soumettre un Résumé Scientifique</h1>
            <p>Veuillez remplir le formulaire ci-dessous pour soumettre votre résumé scientifique.</p>
          </header>
          
          {/* Netlify Forms - Important: name attribute connects to Netlify */}
          <form 
            name="abstract-submission" 
            method="POST" 
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="abstract-form"
          >
            {/* Hidden fields for Netlify Forms */}
            <input type="hidden" name="form-name" value="abstract-submission" />
            <p style={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            {/* Author Information */}
            <div className="form-section">
              <h2>Informations sur l'Auteur</h2>
              
              <div className="form-group">
                <label htmlFor="author-name">
                  Nom complet de l'auteur principal *
                </label>
                <input 
                  type="text" 
                  id="author-name" 
                  name="author-name" 
                  required 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="author-email">
                  Email *
                </label>
                <input 
                  type="email" 
                  id="author-email" 
                  name="author-email" 
                  required 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="author-affiliation">
                  Affiliation (Institution/Université) *
                </label>
                <input 
                  type="text" 
                  id="author-affiliation" 
                  name="author-affiliation" 
                  required 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="co-authors">
                  Co-auteurs (Noms et affiliations séparés par des virgules)
                </label>
                <textarea 
                  id="co-authors" 
                  name="co-authors" 
                  rows={3}
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Abstract Details */}
            <div className="form-section">
              <h2>Détails du Résumé</h2>
              
              <div className="form-group">
                <label htmlFor="abstract-title">
                  Titre du résumé *
                </label>
                <input 
                  type="text" 
                  id="abstract-title" 
                  name="abstract-title" 
                  required 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="abstract-category">
                  Catégorie *
                </label>
                <select 
                  id="abstract-category" 
                  name="abstract-category" 
                  required
                  className="form-select"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="biologie">Biologie</option>
                  <option value="chimie">Chimie</option>
                  <option value="physique">Physique</option>
                  <option value="medecine">Médecine</option>
                  <option value="informatique">Informatique</option>
                  <option value="mathematiques">Mathématiques</option>
                  <option value="sciences-sociales">Sciences Sociales</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="keywords">
                  Mots-clés (séparés par des virgules) *
                </label>
                <input 
                  type="text" 
                  id="keywords" 
                  name="keywords" 
                  required 
                  placeholder="ex: génétique, recherche, ADN"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="abstract-text">
                  Résumé (300 mots maximum) *
                </label>
                <textarea 
                  id="abstract-text" 
                  name="abstract-text" 
                  rows={10}
                  required
                  placeholder="Entrez votre résumé scientifique ici..."
                  className="form-textarea"
                />
                <small>Veuillez inclure: objectifs, méthodologie, résultats principaux et conclusions</small>
              </div>

              <div className="form-group">
                <label htmlFor="presentation-type">
                  Type de présentation souhaité *
                </label>
                <select 
                  id="presentation-type" 
                  name="presentation-type" 
                  required
                  className="form-select"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="oral">Présentation orale</option>
                  <option value="poster">Poster</option>
                  <option value="no-preference">Pas de préférence</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div className="form-section">
              <h2>Informations Complémentaires</h2>
              
              <div className="form-group">
                <label htmlFor="funding-source">
                  Source de financement (si applicable)
                </label>
                <input 
                  type="text" 
                  id="funding-source" 
                  name="funding-source" 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="ethical-approval">
                  Numéro d'approbation éthique (si applicable)
                </label>
                <input 
                  type="text" 
                  id="ethical-approval" 
                  name="ethical-approval" 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="comments">
                  Commentaires ou remarques supplémentaires
                </label>
                <textarea 
                  id="comments" 
                  name="comments" 
                  rows={4}
                  className="form-textarea"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="terms-accepted" 
                    value="yes"
                    required
                  />
                  J'accepte les conditions de soumission et confirme l'originalité de ce travail *
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Soumettre le Résumé
              </button>
            </div>
          </form>
        </article>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        article {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        header {
          margin-bottom: 2rem;
          border-bottom: 2px solid #0070f3;
          padding-bottom: 1rem;
        }
        h1 {
          color: #0070f3;
          margin-bottom: 0.5rem;
        }
        h2 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }
        .abstract-form {
          width: 100%;
        }
        .form-section {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f9f9f9;
          border-radius: 6px;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }
        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.3s;
        }
        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
        }
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }
        small {
          display: block;
          margin-top: 0.5rem;
          color: #666;
          font-size: 0.875rem;
        }
        .checkbox-group label {
          display: flex;
          align-items: center;
          font-weight: normal;
        }
        .checkbox-group input[type="checkbox"] {
          width: auto;
          margin-right: 0.5rem;
        }
        .form-actions {
          text-align: center;
          margin-top: 2rem;
        }
        .submit-button {
          background: #0070f3;
          color: white;
          padding: 1rem 3rem;
          border: none;
          border-radius: 6px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }
        .submit-button:hover {
          background: #0051cc;
        }
        @media (max-width: 768px) {
          .container {
            padding: 1rem 0.5rem;
          }
          article {
            padding: 1rem;
          }
          .form-section {
            padding: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
}
