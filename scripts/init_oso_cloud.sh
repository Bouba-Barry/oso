#!/bin/bash

# Fonction pour vérifier et installer le CLI Oso
install_oso_cli() {
  echo "Vérification de l'installation d'Oso CLI..."
  if ! [ -x "$(command -v oso)" ]; then
    echo "Oso CLI n'est pas installé. Installation en cours..."
    curl -L https://cloud.osohq.com/install.sh | bash
    if [ $? -eq 0 ]; then
      echo "Oso CLI installé avec succès."
    else
      echo "Échec de l'installation d'Oso CLI." >&2
      exit 1
    fi
  else
    echo "Oso CLI est déjà installé."
  fi
}
  # Fonction pour charger la politique dans oso cloud.
load_oso_policy() {
  oso-cloud policy ../oso-policy/app.polar
  echo "Policy chargé dans oso dev server: "
}

install_oso_cli
sleep 5
load_oso_policy