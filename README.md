# Oso Authorization with Local Server and Cloud API

Ce projet montre comment utiliser Oso pour l'autorisation en définissant des règles dans un fichier `.polar` et en vérifiant les autorisations via des _context facts_. Le projet propose deux options :

- Utiliser un serveur Oso en local.
- Travailler avec l'API Cloud d'Oso.

Le projet contient un serveur (`main.js`) et des tests (`test.js`) pour valider les fonctionnalités d'autorisation.

---

## **Installation et Utilisation**

### **Prérequis**

- [Node.js](https://nodejs.org/) et npm.
- Un compte sur [Oso Cloud](https://www.osohq.com/).
- (Optionnel) Accès à un serveur Oso local.
- [Docker](https://www.docker.com/) pour le cas du serveur local

---

### **Structure des dossiers**

- `scripts/` : Contient les scripts pour démarrer le serveur Oso local ou se connecter à l'API Oso Cloud.
- `oso-polar/` : Contient le fichier de règles `.polar`.
- `.env` : Contient les variables d'environnement nécessaires, notamment la clé API pour Oso Cloud.
- `main.js` : Le serveur principal.
- `test.js` : Les tests d'autorisation.

---

### **Étapes d'installation**

1. **Cloner le dépôt :**

   ```bash
   git clone <URL_DU_PROJET>
   cd OSO
   ```

2. **Donner les permissions nécessaires aux scripts :**

   ```bash
   chmod +x scripts/start_oso_server_localy.sh
   chmod +x scripts/start_oso_cloud_api.sh
   chmod +x scripts/run_main.sh
   chmod +x scripts/run_tests.sh
   ```

3. **Installer les dépendances :**

   ```bash
   npm install
   ```

---

## **Option 1 : Utiliser un serveur Oso en local**

### Étapes :

1. **Démarrer le serveur Oso localement :**

   Exécutez le script suivant pour démarrer le serveur Oso local :

   ```bash
   ./scripts/start_oso_server_localy.sh
   ```

2. **Configurer le fichier `.env`** : Renomer .env.example en .env puis ajoutez l'url dans le fichier `.env` .

   Exemple de configuration du fichier `.env` :

   ```bash
   OSO_URL=http://localhost:8080
   ```

3. **Lancer le serveur :**

   Exécutez le script suivant pour démarrer le serveur avec la configuration locale :

   ```bash
   ./scripts/run_main.sh
   ```

4. **Tester le projet :**

   Depuis un autre terminal, lancez les tests :

   ```bash
   ./scripts/run_test.sh
   ```

---

## **Option 2 : Travailler avec l'API Oso Cloud**

### Étapes :

1. **Démarrer le CLI pour Oso Cloud :**

   Exécutez ce script pour installer le CLI Oso et interagir avec l'api:

   ```bash
   ./scripts/start_oso_cloud_api.sh
   ```

1. **Se connecter à Oso Cloud et obtenir la clé API :**

   Une fois connecté avec le CLI, vous obtiendrez une clé d'API. Remplacez l'ancienne clé dans le fichier `.env` par celle que vous avez obtenue.

   Exemple de fichier `.env` après modification :

   ```bash
   OSO_API_KEY=your_cloud_api_key
   ```

1. **Configurer l'URL Oso Cloud :**

   Assurez-vous que l'URL Oso Cloud est bien configurée dans le fichier `.env` :

   ```bash
   OSO_API_URL=https://cloud.osohq.com
   ```

1. **Lancer le serveur avec les nouvelles configurations :**

   Exécutez le script pour démarrer le serveur avec la configuration de l'API Cloud :

   ```bash
   ./scripts/run_main.sh
   ```

1. **Tester le projet :**

   Depuis un autre terminal, exécutez les tests :

   ```bash
   ./scripts/run_tests.sh
   ```

---

## **Fichiers principaux**

- **`oso-polar/app.polar`** : Contient les règles d'autorisation Oso.
- **`contextFacts`** : Génère les données à partir des fichiers json pour les envoyées à l'api d'oso lors de la requête .
- **`.env`** : Fichier de configuration contenant la clé API et l'URL du serveur Oso.

---

## **Problèmes courants**

- **Erreur ENOENT (dossier ou fichier introuvable)** : Si vous obtenez cette erreur, assurez-vous que vous exécutez les commandes dans le bon répertoire.
- **Connexion refusée à l'API Oso Cloud** : Vérifiez que la clé d'API est correcte et configurée dans le fichier `.env`.

---

## **Contact**

Pour toute question ou problème, veuillez créer une _issue_ sur le dépôt Git ou me contacter.
