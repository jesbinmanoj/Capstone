import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '6rem 1.5rem', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ width: '64px', height: '64px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <HelpCircle size={36} />
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        The route or deliverable you are seeking does not exist or has been relocated.
      </p>
      <Link to="/" className="btn btn-primary">
        <Home size={16} />
        Return to Workspace
      </Link>
    </div>
  );
};

export default NotFoundPage;
