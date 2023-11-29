import React, { useCallback, useEffect, useRef } from 'react';
import { useScript } from '@uidotdev/usehooks';

export const Canvas = () => {
  const status = useScript([
    'https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js',
  ]);

  const canvasRef = useRef(null);

  const initApp = useCallback(async () => {
    if (canvasRef.current) {
      await SDK3DVerse.joinOrStartSession({
        userToken: 'public_iTYTst3Y4cmY3ca-',
        sceneUUID: '69497f59-c5c6-4c05-a77d-4b4f5d10454a',
        canvas: canvasRef.current,
        viewportProperties: {
          defaultControllerType: SDK3DVerse.controller_type.editor,
        },
      });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const viewports = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports();
      const camera = viewports[0].getCamera();
      const moveSpeed = 0.1;

      const key = event.key.toLowerCase();

      switch (key) {
        case 'z':
          console.log("it's")
          moveCamera(camera, 0, 0, -moveSpeed);
          break;
        case 'q':
          moveCamera(camera, -moveSpeed, 0, 0);
          break;
        case 's':
          moveCamera(camera, 0, 0, moveSpeed);
          break;
        case 'd':
          moveCamera(camera, moveSpeed, 0, 0);
          break;
        default:
          break;
      }

      SDK3DVerse.engineAPI.propagateChanges();
    };

    const moveCamera = (camera, x, y, z) => {
      // const cameraPos = camera.getGlobalTransform().position;
      // camera.setGlobalTransform({
      //   position: [cameraPos.x + x, cameraPos.y + y, cameraPos.z + z],
      //   rotation: [0, 0, 0, 1], // Assuming no rotation for simplicity
      //   scale: [1, 1, 1], // Assuming no scaling for simplicity
      // });
    };

    if (status === 'ready') {
      initApp();

      document.addEventListener('keydown', handleKeyDown);

    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [status, initApp]);

  return (
    <canvas
      ref={canvasRef}
      id='display-canvas'
      style={{
        height: '100vh',
        width: '100vw',
        verticalAlign: 'middle',
      }}
    ></canvas>
  );
};
