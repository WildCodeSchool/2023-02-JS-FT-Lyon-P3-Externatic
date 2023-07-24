## Externatic - Projet LISEZMOI


## Introduction

Bienvenue sur Externatic ! Il s'agit d'une application qui sert de plateforme web et mobile pour les candidats, les employeurs et les administrateurs, complétant et soutenant l'expertise en recrutement de nos consultants. L'objectif principal d'Externatic est de connecter efficacement les demandeurs d'emploi et les employeurs, en offrant un partage d'emploi transparent et en permettant aux candidats de télécharger leur CV.

## Description du projet

Externatic est conçu comme une plateforme de marché qui s'adresse à différents niveaux d'utilisateurs, y compris les entreprises, les demandeurs d'emploi (candidats) et les administrateurs. Il est lié au site Externatic.fr et intégré à notre ATS (Applicant Tracking System), actuellement propulsé par CareerBuilder.

## Caractéristiques

Externalic offre les fonctionnalités clés suivantes :

1. **Accès entreprise** : les employeurs peuvent créer des comptes et accéder à la plateforme pour publier des offres d'emploi.
2. **Accès Candidat** : les demandeurs d'emploi peuvent s'inscrire, parcourir les offres d'emploi et postuler aux postes pertinents. Ils peuvent également télécharger leur CV pour augmenter la visibilité auprès des employeurs potentiels.
3. **Accès administrateur** : les administrateurs disposent d'un accès privilégié pour gérer la plate-forme, les comptes d'utilisateurs et superviser le bon fonctionnement de l'application.
4. **Partage d'emploi** : les employeurs peuvent partager leurs offres d'emploi sur la plateforme afin que les candidats potentiels puissent les découvrir.
5. **Téléchargement de CV** : les candidats peuvent télécharger leur CV, ce qui permet aux employeurs de trouver plus facilement des correspondances appropriées.


## Rôles d'utilisateur

Externatic distingue trois principaux rôles d'utilisateur :

1. **Admin** : les administrateurs ont un contrôle total sur la plate-forme. Ils peuvent gérer les comptes d'utilisateurs, consulter les offres d'emploi et assurer la sécurité et l'intégrité de la plateforme.
2. **Candidat** : les candidats sont des demandeurs d'emploi qui peuvent parcourir les offres d'emploi, postuler à des postes vacants et télécharger leur CV pour augmenter leurs chances d'être embauchés.
3. **Entreprise** : les entreprises ou les employeurs peuvent accéder à la plateforme pour publier des offres d'emploi et examiner les candidatures de candidats potentiels.

## Modèle de base de données

La base de données est un composant crucial d'Externatic et une attention particulière a été accordée à sa conception. Le modèle de base de données comprend des tables pour les utilisateurs (administrateur, candidat, entreprise), des offres d'emploi, des candidatures, des mappages consultant-candidat (fonction bonus) et d'autres entités pertinentes.

## Installation

Pour exécuter Externatic localement, procédez comme suit :


1. Dans VSCode, installez les plugins **Prettier - Code formatter** et **ESLint** et configurez-les
2. Cloner le dépôt depuis GitHub
3. Accédez au répertoire du projet.
4. Installez les dépendances requises en exécutant : `npm install` ou `yarn install`.
5. Si vous utilisez `yarn` ou `pnpm`, adaptez le `config/cli` dans `package.json`
6. Exécutez la commande "npm install"
7. _NB : Pour lancer le serveur principal, vous aurez besoin d'un fichier d'environnement avec les informations d'identification de la base de données. Vous trouverez un modèle dans `backend/.env.sample`_


## Commandes disponibles

- `migrate` : lance le script de migration de la base de données
- `dev` : Démarre les deux serveurs (frontend + backend) dans un terminal
- `dev-front` : Démarre le serveur frontal React
- `dev-back` : Démarre le serveur backend Express
- `lint` : exécute les outils de validation et refuse le code non propre (sera exécuté à chaque _commit_)
- `fix` : corrige les erreurs de linter (exécutez-le si `lint` grogne sur votre code !)


## Outils

- _Concurrently_ : permet à plusieurs commandes de s'exécuter simultanément dans la même CLI
- _Husky_ : Permet d'exécuter des commandes spécifiques qui se déclenchent sur des événements _git_
- _Vite_ : Alternative à _Create-React-App_, empaquetant moins d'outils pour une expérience plus fluide
- _ESLint_ : outil "Qualité du code", garantit que les règles choisies seront appliquées
- _Prettier_  : outil "Qualité du code" également, focus sur la charte graphique
- _ Airbnb Standard_ : L'un des "standards" les plus connus, même s'il n'est pas officiellement lié à ES/JS
- _Nodemon_ : Permet de redémarrer le serveur à chaque fois qu'un fichier .js est mis à jour


## Utilisation
Une fois l'application opérationnelle, les utilisateurs peuvent y accéder via leurs navigateurs Web ou leurs appareils mobiles. Les administrateurs peuvent se connecter au panneau d'administration pour gérer les utilisateurs et surveiller l'activité de la plateforme. Les entreprises peuvent créer des comptes et publier des offres d'emploi, tandis que les candidats peuvent parcourir les postes disponibles, postuler et télécharger leur CV.



## Licence

Externatic est sous licence [MIT License](LICENSE), permettant des contributions et une utilisation open source.

---

Merci d'avoir choisi Externalatic ! Nous espérons que cette application facilitera des connexions transparentes entre les demandeurs d'emploi et les employeurs, transformant ainsi l'expérience de recrutement. Si vous rencontrez des problèmes ou avez des questions, n'hésitez pas à nous contacter. Bon recrutement !