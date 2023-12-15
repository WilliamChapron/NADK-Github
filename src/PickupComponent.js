import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const PickupComponent = ({ pickupInfo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (pickupInfo) {
      setIsVisible(true);

      // Animation pour faire apparaître le popup avec une durée de 1 seconde
      controls.start({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.5 }, // Augmentez la durée de l'animation d'ouverture
      });

      // Masquer le composant après 3 secondes (ajustez la durée selon vos besoins)
      const timeout = setTimeout(() => {
        // Animation pour faire disparaître le popup
        controls.start({
          opacity: 0,
          x: 50,
          scale: 0.8,
        });
        
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [pickupInfo, controls]);

  const pickupStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '1010',
    background: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
  };

  const headingStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'white',
  };

  return (
    <motion.div
      style={{
        ...pickupStyle,
        opacity: 0,
        x: 50,
        scale: 0.8,
      }}
      animate={controls}
    >
      <p style={headingStyle}>You just picked up a {pickupInfo ? pickupInfo[0] + " !" : ''}</p>
      <p style={headingStyle}>Description: {pickupInfo ? pickupInfo[1] : ''}</p>
      <p style={headingStyle}>You just earned {pickupInfo ? pickupInfo[2] + " score points" : ''}</p>
    </motion.div>
  );
};

export default PickupComponent;
