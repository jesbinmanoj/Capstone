import React from 'react';

const LoadingSpinner = ({ message = 'Loading data, please wait...' }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
