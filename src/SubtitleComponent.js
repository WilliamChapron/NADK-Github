import React, { useState, useEffect } from 'react';

const SubtitleComponent = ({ text, duration, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      console.log("CLOSE")
      onClose(); // Appel de la fonction onClose lorsque le composant se ferme
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration, onClose]); // Ajout de onClose comme dépendance

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '15px', // Augmentation de la taille du padding
        background: 'rgba(0, 0, 0, 0.7)', // Fond plus sombre
        color: '#fff',
        borderRadius: '8px', // Coins plus arrondis
        display: isVisible ? 'flex' : 'none', // Utilisation de flex pour centrer le texte
        flexDirection: 'column', // Afficher le texte en colonnes
        alignItems: 'center', // Centrer le texte horizontalement
        zIndex: '1000',
        animation: 'fadeInOut 1s ease-in-out', // Ajout d'une animation de fondu
      }}
    >
      <div style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic' }}>{text} ...</div>
    </div>
  );
};

export default SubtitleComponent;
