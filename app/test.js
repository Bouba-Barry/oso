const axios = require("axios");

const BASE_URL = "http://localhost:4000"; // URL de votre serveur

/**
 * Fonction pour tester une action sur un DM.
 * @param {string} userId - ID de l'utilisateur.
 * @param {string} dmId - ID du DM.
 * @param {string} action - Action à tester (e.g., "lire_DM", "archiver_DM").
 */
async function testAction(userId, dmId, action) {
  try {
    const response = await axios.post(
      `${BASE_URL}/dm`,
      { user_id: userId, action, dm_id: dmId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(
      `Succès: L'utilisateur ${userId} a exécuté l'action ${action} sur le DM ${dmId}`
    );
    console.log("Réponse du serveur:", response.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log(
        `Erreur: L'utilisateur ${userId} n'est pas autorisé à exécuter l'action ${action} sur le DM ${dmId}`
      );
    } else {
      console.error("Erreur inattendue:", error.message);
    }
  }
}

/**
 * Fonction principale pour tester plusieurs scénarios.
 */
async function runTests() {
  const testCases = [
    { userId: "drmar", dmId: "dm0001", action: "lire_dm" },
    { userId: "drmar", dmId: "dm0001", action: "ecrire_dm" },
    { userId: "drmar", dmId: "dm0001", action: "arhiver_dm" },
  ];

  for (const { userId, dmId, action } of testCases) {
    console.log(
      `\nTest: Utilisateur ${userId} tente de ${action} sur DM ${dmId}`
    );
    await testAction(userId, dmId, action);
  }
}

runTests();
