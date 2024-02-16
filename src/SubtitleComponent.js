// SubtitleComponent.js
import React, { useState, useEffect } from 'react';
import './SubtitleComponent.css';

const SubtitleComponent = ({ text, duration, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  return isVisible && (
    <div className="subtitle-container">
      <div className="subtitle-content">
        <div className="subtitle-text">{text} ...</div>
      </div>
    </div>
  );
};

export default SubtitleComponent;
