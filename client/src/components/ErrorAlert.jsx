import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

const ErrorAlert = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="alert-banner alert-danger">
      <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-secondary btn-sm"
          style={{ background: '#ffffff', color: '#991b1b', border: '1px solid #fca5a5' }}
        >
          <RotateCcw size={14} />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
