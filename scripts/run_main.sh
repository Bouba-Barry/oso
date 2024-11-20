#!/bin/bash

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Vérifiez si les dépendances Node.js sont installées
install_node_dependencies() {
  if ! [ -d "node_modules" ]; then
    echo "Installation des dépendances Node.js..."
    npm install
  else
    echo "Les dépendances Node.js sont déjà installées."
  fi
}

# Fonction pour démarrer l'application principale
start_application() {
  echo "Démarrage de l'application Node.js..."
    node "$PROJECT_ROOT/app/main.js"
}


install_node_dependencies
sleep 5

start_application
