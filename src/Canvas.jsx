import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';

export const Canvas = () => {
  const status = useScript(
    `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
    {
      removeOnUnmount: false,
    }
  );

  return (
    <>
      <canvas
        id='display-canvas'
        style={{
          height: '100vh',
          width: '100vw',
          verticalAlign: 'middle',
        }}
        tabIndex="1"
        onContextMenu={event => event.preventDefault()}
      ></canvas>
    </>
  );
};
