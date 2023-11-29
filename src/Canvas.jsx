// Canvas.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UseSDK3DVerse from './UseSDK3DVerse';
import { HandleKeyDown } from './HandleKeyDown';
import ProgressBar from './ProgressBar';
import DialogController from './DialogController';

export const Canvas = () => {
  const status = UseSDK3DVerse();
  const canvasRef = useRef(null);
  const [lastKeyPressed, setLastKeyPressed] = useState(null);

  const initApp = useCallback(async () => {
    if (canvasRef.current && status === 'ready') {
      const SDK3DVerse = window.SDK3DVerse;
      await SDK3DVerse.joinOrStartSession({
        userToken: 'public_iTYTst3Y4cmY3ca-',
        sceneUUID: '69497f59-c5c6-4c05-a77d-4b4f5d10454a',
        canvas: canvasRef.current,
        viewportProperties: {
          defaultControllerType: SDK3DVerse.controller_type.editor,
        },
      });
    }
  }, [status]);

  useEffect(() => {
    initApp();
    window.addEventListener('keydown', async (event) => {
      const key = await HandleKeyDown(event);
      if (key) {
        setLastKeyPressed(key);
      }
    });
  }, [initApp]);

  useEffect(() => {
    console.log('lastKeyPressed a changé :', lastKeyPressed);
  }, [lastKeyPressed]);

  // Fonction pour réinitialiser lastKeyPressed
  const resetLastKeyPressed = () => {
    setLastKeyPressed(null);
  };

  return (
    <div>
      <DialogController dialogOpenProp={lastKeyPressed === 'e'} onClose={resetLastKeyPressed} />
      <ProgressBar value={50}>Kevlar</ProgressBar>
      <canvas
        ref={canvasRef}
        id='display-canvas'
        style={{
          height: '100vh',
          width: '100vw',
          verticalAlign: 'middle',
        }}
      ></canvas>
    </div>
  );
};
