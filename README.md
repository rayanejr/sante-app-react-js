
![Santé-App Interface](https://github.com/rayanejr/sante-app/blob/main/logo.png)

# À propos de Santé-App

Santé-APP est une application web développée avec React, conçue pour améliorer l'accès aux informations de santé et aux services médicaux pour les utilisateurs. Elle offre une plateforme intuitive pour la gestion des soins de santé, y compris la consultation des actes médicaux disponibles dans différents pays, l'estimation de l'empreinte carbone pour les voyages médicaux, et bien plus encore.

## Fonctionnalités Principales

- **Consultation des Soins de Santé** : Parcourez une liste de services de soins de santé disponibles dans divers pays, avec des détails sur les prix et les recommandations.
- **Estimation de l'Empreinte Carbone** : Calculez l'empreinte carbone de vos déplacements pour des soins médicaux à l'étranger.
- **Gestion des Recommandations** : Accédez à des recommandations personnalisées pour votre voyage de soins de santé et gérez-les selon vos besoins.
- **Réservation de Soins de Santé** : Réservez des services de soins de santé directement depuis l'application.
- **Interface Administrateur** : Une interface dédiée pour les administrateurs pour gérer les contenus de l'application.

## Technologies Utilisées

- `react` : Bibliothèque pour la création d'interfaces utilisateur.
- `@react-router-dom` : Pour la navigation dans l'application web.
- `axios` : Pour les requêtes HTTP.
- `leaflet` et `react-leaflet` : Pour intégrer des cartes dans une application web.

## Prerequis

Avant de commencer, assurez-vous que votre ordinateur est connecté à Internet. Cela est nécessaire pour accéder aux API et aux ressources externes. Ensuite, récupérez l'adresse IPV4 de votre ordinateur si nécessaire pour les requêtes API en développement.

Pour trouver l'adresse IPV4 de votre ordinateur :
- Sous Windows, ouvrez l'invite de commande et tapez `ipconfig`.
- Sous MacOS, allez dans Préférences Système > Réseau, et sélectionnez votre connexion Wi-Fi.
- Sous Linux, ouvrez le terminal et tapez `hostname -I`.

## Installation

Pour exécuter Santé-APP sur votre système local, suivez ces étapes :

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/votreUsername/sante-app.git
   cd sante-app
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```
   ```bash
   npm install @react-router-dom axios leaflet react-leaflet
   ```

3. **Lancez l'application** :
   ```bash
   npm start
   ```
