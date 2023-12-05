const fs = require('fs');

// Fonction pour obtenir la position du personnage (à remplacer par votre propre logique)
function getPlayerPosition() {
  // Mettez votre logique pour obtenir la position du personnage ici
  // Exemple : retourner une position factice pour cet exemple
  return { x: 10, y: 20, z: 30 };
}

// Fonction pour écrire la position dans le fichier JSON
function writePositionToFile(position) {
  const data = JSON.stringify(position);

  fs.writeFile('player_position.json', data, (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture dans le fichier :', err);
    } else {
      console.log('Position enregistrée dans player_position.json');
    }
  });
}

// Intervalle pour capturer la position et l'écrire toutes les 1000 millisecondes (1 seconde)
const captureInterval = setInterval(() => {
  const playerPosition = getPlayerPosition();
  writePositionToFile(playerPosition);
}, 1000);

// Arrêtez l'intervalle après une certaine période (par exemple, 10 secondes pour cet exemple)
setTimeout(() => {
  clearInterval(captureInterval);
  console.log('Arrêt de la capture de position.');
}, 10000);
