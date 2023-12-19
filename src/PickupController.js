import React, { useState, useEffect } from 'react';
import PickupComponent from './PickupComponent';

const PickupController = ({ pickupInfo, isVisible, onOpen, onClose }) => {
  const [pickupVisible, setPickupVisible] = useState(isVisible);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    setPickupVisible(isVisible);

    if (isVisible) {
      onOpen()
      const newTimeoutId = setTimeout(() => {
        setPickupVisible(false);
        onClose();
      }, 1000);

      setTimeoutId(newTimeoutId);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible, onClose, pickupInfo]);

  return pickupVisible && <PickupComponent pickupInfo={pickupInfo} />;
};

export default PickupController;