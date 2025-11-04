import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";

export default function SubmitAbstract() {
  return (
    <Layout>
      <BasicMeta url="/submit-abstract" />
      <div className="container">
        <h1>Soumettre un résumé</h1>
        <p>
          Fenêtre de soumission : 01/10/2025 → 31/12/2025.<br />
          <strong>Résumé ≤ 300 mots (FR/EN)</strong>, Times 11, interligne 1,15<br />
          Sections obligatoires : Introduction, Méthodes, Résultats, Conclusion<br />
          Indiquer <strong>orale</strong> ou <strong>poster (80×110 cm)</strong>
        </p>
        <form>
          <div>
            <label htmlFor="titre">Titre du résumé</label><br />
            <input type="text" id="titre" name="titre" required />
          </div>
          <div>
            <label htmlFor="auteur">Auteur(s)</label><br />
            <input type="text" id="auteur" name="auteur" required />
          </div>
          <div>
            <label htmlFor="resume">Résumé</label><br />
            <textarea id="resume" name="resume" rows={5} maxLength={300} required />
          </div>
          <div>
            <label htmlFor="type">Type</label><br />
            <select id="type" name="type" required>
              <option value="">Sélectionner</option>
              <option value="orale">Orale</option>
              <option value="poster">Poster (80×110 cm)</option>
            </select>
          </div>
          <button type="submit">Déposer maintenant</button>
        </form>
      </div>
    </Layout>
  );
}
