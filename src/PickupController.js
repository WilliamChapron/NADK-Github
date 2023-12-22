import React, { useState, useEffect, useRef } from 'react';
import PickupComponent from './PickupComponent';

const PickupController = ({ pickupInfo, onOpen, onClose }) => {
  const timeoutIdRef = useRef(null);

  useEffect(() => {

    if (window.lastPickupComponentState == 1) {
      onOpen();
      const timeoutPromise = new Promise(resolve => { setTimeout(() => {
          onClose();
        }, 8000);
      });

    }

    
    
    
  }, [onClose, onOpen, pickupInfo]);


  return window.lastPickupComponentState && <PickupComponent pickupInfo={pickupInfo} />;
};

export default PickupController;
