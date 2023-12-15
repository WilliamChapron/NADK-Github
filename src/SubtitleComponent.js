import React, { useState, useEffect } from 'react';

const SubtitleComponent = ({ text, duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        borderRadius: '5px',
        display: isVisible ? 'block' : 'none',
        zIndex: '1000',
      }}
    >
      <p style={{ margin: '0' }}>{text}</p>
    </div>
  );
};

export default SubtitleComponent;