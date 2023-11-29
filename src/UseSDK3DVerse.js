// useSDK3DVerse.js

import { useScript } from '@uidotdev/usehooks';

const UseSDK3DVerse = () => {
  const status = useScript([
    'https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js',
  ]);

  return status;
};

export default UseSDK3DVerse;
