# P7_creez_un_reseau_social_dentreprise

Il s'agit du projet n°7 d'OpenClassrooms où l'on doit créer un réseau social d'entreprise pour la société Groupomania.

## Technologie utilisée 

- HTML
- CSS
- JS

## Frameworks

- Mongo DB
- Express
- React
- Node.js

## Pour lancer le projet 

### Backend :

- Créer un fichier .env dans le backend avec les informations suivantes :
  - SECRET_DB="mongodb+srv://Admin:ApY4h2Gvjcl90AyA@cluster0.zma24rz.mongodb.net/groupomania"
  - TOKEN_SECRET="df5d04b8gdb407t8b04f5b0VFfg6fd+5gd0vc5b6dh8+b90bfg90DVDFV045045df05"
  - CLIENT_URL="http://localhost:3000"
- Dans le terminal :
  - cd backend
  - npm install
  - npm start

### Frontend :

- Dans frontend/client, créer un fichier .env avec les informations suivantes :
  - REACT_APP_API_URL=http://localhost:5000/
  - REACT_APP_ADMIN="6321a9a08f03772f1e87c2d9"
- Dans un nouveau terminal :
  - cd frontend/client
  - npm install
  - npm start
