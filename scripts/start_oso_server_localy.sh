#!/bin/bash

# Vérifiez si Docker est installé
if ! [ -x "$(command -v docker)" ]; then
  echo "Erreur : Docker n'est pas installé. Veuillez l'installer." >&2
  exit 1
fi

# Construire l'image Docker
echo "Construction de l'image Docker..."
docker build -t oso-server-image .

# Vérifiez si un conteneur existant tourne déjà
if docker ps | grep -q "oso-dev-server"; then
  echo "Arrêt du conteneur existant..."
  docker stop oso-dev-server && docker rm oso-dev-server
fi

# Lancer le conteneur Docker avec les bonnes configurations
echo "Démarrage du conteneur Docker..."
docker run -d --name oso-dev-server -p 8080:8080 --env-file .env oso-server-image

# Attendre quelques secondes pour que le serveur soit prêt
echo "Environnement local démarré avec succès. Serveur Oso accessible sur http://localhost:8080."