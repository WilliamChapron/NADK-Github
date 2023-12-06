// MobileButtons.js
import React from 'react';

const MobileButtons = () => {
  const simulateKeyPress = (key) => {
    console.log(`Simulating key press: ${key}`);
    const event = new KeyboardEvent('keypress', { key });
    document.dispatchEvent(event);
  };

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <button onClick={() => simulateKeyPress('z')} style={styles.button}>Z</button>
        <button onClick={() => simulateKeyPress('q')} style={styles.button}>Q</button>
      </div>
      <div style={styles.row}>
        <button onClick={() => simulateKeyPress('s')} style={styles.button}>S</button>
        <button onClick={() => simulateKeyPress('d')} style={styles.button}>D</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 16,
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    margin: 8,
    padding: 12,
    fontSize: 16,
    touchAction: 'manipulation', // Permet de traiter les événements tactiles
  },
};

export default MobileButtons;
