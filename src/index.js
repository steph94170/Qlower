// Importation de la bibliothèque React pour pouvoir utiliser JSX et créer des composants React.
import React from 'react';

// Importation de ReactDOM, utilisé pour manipuler le DOM et rendre les composants React.
import ReactDOM from 'react-dom/client';

// Importation du composant principal de l'application depuis le fichier App.js.
import App from './App';

// Création d'une racine React dans l'élément DOM avec l'ID 'root'.
// Cet élément est le conteneur où l'application React sera rendue.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu de l'application principale dans la racine React.
// Le composant App est rendu à l'intérieur d'un composant React.StrictMode pour activer des vérifications supplémentaires.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
