import React, { useState, useEffect, useRef } from 'react';
import PickupComponent from './PickupComponent';

const PickupController = ({ pickupInfo, onOpen, onClose }) => {
  const timeoutIdRef = useRef(null);

  useEffect(() => {

    onOpen();

    const timeoutPromise = new Promise(resolve => { setTimeout(() => {
        onClose();
      }, 6000);
    });
    
    
  }, [onClose, onOpen, pickupInfo]);


  return <PickupComponent pickupInfo={pickupInfo} />;
};

export default PickupController;
