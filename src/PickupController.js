import React, { useState, useEffect, useRef } from 'react';
import PickupComponent from './PickupComponent';

const PickupController = ({ pickupInfo, onOpen, onClose }) => {
  const timeoutIdRef = useRef(null);

  useEffect(() => {

    onOpen();

    const timeoutPromise = new Promise(resolve => { setTimeout(() => {
        console.log('PickupController - useEffect: Timeout completed, closing...');
        onClose();
      }, 2000);
    });
    
    
  }, [onClose, onOpen, pickupInfo]);

  console.log('PickupController: Render');

  return <PickupComponent pickupInfo={pickupInfo} />;
};

export default PickupController;
