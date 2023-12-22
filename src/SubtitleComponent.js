import React, { useState, useEffect } from 'react';

const SubtitleComponent = ({ text, duration, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Appel de la fonction onClose lorsque le composant se ferme automatiquement
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  return isVisible && (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '15px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: '1000',
        animation: 'fadeInOut 1s ease-in-out',
      }}
    >
      <div style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic' }}>{text} ...</div>
    </div>
  );
};

export default SubtitleComponent;
