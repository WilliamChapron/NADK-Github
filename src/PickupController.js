// PickupController.js
import React, { useState, useEffect } from 'react';
import PickupComponent from './PickupComponent';

const PickupController = ({ pickupInfo, isVisible, onClose }) => {
  const [pickupVisible, setPickupVisible] = useState(isVisible);

  useEffect(() => {
    setPickupVisible(isVisible);

    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setPickupVisible(false);
        onClose();
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isVisible, onClose, pickupInfo]);

  return pickupVisible && <PickupComponent pickupInfo={pickupInfo} />;
};

export default PickupController;
