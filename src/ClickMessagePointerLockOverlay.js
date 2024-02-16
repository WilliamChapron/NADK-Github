import React, { useState } from 'react';

const ClickMessagePointerLockOverlay = ({ onClick }) => {
  const [showUserGuide, setShowUserGuide] = useState(false);

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fond semi-transparent
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff', // Couleur du texte
    fontSize: '16px',
    fontFamily: 'Press Start 2P, cursive', // Police de caractères de style jeux vidéos
    cursor: 'pointer', // Curseur indiquant que c'est cliquable
    padding: '20px', // Espacement interne
    boxSizing: 'border-box', // Inclure le padding dans la largeur/hauteur
  };

  const guideStyle = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    marginTop: '20px',
  };

  const clickStyle = {
    fontSize: '30px',
  };


  const toggleUserGuide = () => {
    setShowUserGuide(!showUserGuide);
  };

  return (
    <div style={overlayStyle} onClick={onClick}>


      <div style={guideStyle}>
        <h2>Guide Utilisateur</h2>
        <p>Utilisez Z-Q-S-D ou W-A-S-D pour vous déplacer </p>
        <p>Utilisez la souris pour changer la direction de la caméra.</p>
        <p>Intéragissez avec les objets en pressant la touche E</p>
        <p>Cliquez pour passer les messages de dialogue.</p>
      </div>
      <p style={clickStyle}> Cliquez pour jouer</p>
    </div>
  );
};

export default ClickMessagePointerLockOverlay;
