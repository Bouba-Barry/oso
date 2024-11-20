const fs = require("fs");

// Charger les data
const users = JSON.parse(fs.readFileSync("../data/Users.json", "utf8"));
const organisations = JSON.parse(fs.readFileSync("../data/Org.json", "utf8"));
const dms = JSON.parse(fs.readFileSync("../data/DM.json", "utf8"));

function buildContextFacts(users, organisations, dms) {
  let contextFacts = [];

  // Ajout des roles pour les utilisateurs
  users.forEach((user) => {
    contextFacts.push([
      "has_role",
      { type: "User", id: user.id },
      user.role,
      { type: "Organization", id: user.affectation[0] },
    ]);
    user.affectation.forEach((affectation) => {
      contextFacts.push([
        "has_relation",
        { type: "User", id: user.id },
        "affectation",
        { type: "Organization", id: affectation },
      ]);
    });
  });

  // Ajout des relations pour les organisations
  organisations.forEach((org) => {
    org.services.forEach((service) => {
      contextFacts.push([
        "has_relation",
        { type: "Organization", id: org.id },
        "service",
        { type: "Service", id: service },
      ]);
    });
  });

  // Ajout des relations pour les DMs
  dms.forEach((dm) => {
    contextFacts.push(["is_public", { type: "DM", id: dm.id }, dm.is_public]);
    contextFacts.push(["is_locked", { type: "DM", id: dm.id }, dm.is_locked]);
    contextFacts.push([
      "has_relation",
      { type: "User", id: dm.medecin },
      "medecin",
      { type: "DM", id: dm.id },
    ]);
    contextFacts.push([
      "has_relation",
      { type: "Service", id: dm.service },
      "dm",
      { type: "DM", id: dm.id },
    ]);
    contextFacts.push([
      "has_relation",
      { type: "Specialite", id: dm.specialite },
      "dm",
      { type: "DM", id: dm.id },
    ]);
  });

  return contextFacts;
}
// exporter comme module pur utiliser dans nos requêtes vers oso
const contextFacts = buildContextFacts(users, organisations, dms);
module.exports = contextFacts;
