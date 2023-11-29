// ProgressBar.js
import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ value, children }) => {
  const barStyles = {
    width: `${value}%`,
    height: '20px',
    backgroundColor: 'green',
    transition: 'width 0.3s ease-in-out',
  };

  const containerStyles = {
    position: 'absolute',
    top: '10px', // Ajustez la position verticale par rapport au canevas
    left: '10px', // Ajustez la position horizontale par rapport au canevas
  };

  return (
    <div style={containerStyles}>
      <div style={{ border: '1px solid #000', width: '200px', height: '20px' }}>
        <div style={barStyles}></div>
      </div>
      <div style={{ marginTop: '5px', textAlign: 'center' }}>
        {children}: {value}%
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProgressBar;
