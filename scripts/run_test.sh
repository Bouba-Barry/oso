#!/bin/bash

# Définir la racine du projet
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

start_application() {
  echo "Démarrage de l'application Node.js..."
  node "$PROJECT_ROOT/app/test.js"
}

# Appeler la fonction pour démarrer l'application
start_application
