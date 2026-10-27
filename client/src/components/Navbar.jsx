import React from 'react';
import { ShieldCheck, Calendar, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.25rem 0.625rem',
            borderRadius: '9999px',
            backgroundColor: '#e0f2fe',
            color: '#0369a1',
            fontSize: '0.75rem',
            fontWeight: 700
          }}
        >
          <ShieldCheck size={14} />
          MERN Capstone • Verified Environment
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
          <Calendar size={15} />
          <span>{currentDate}</span>
        </div>

        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</span>
          <span
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              backgroundColor: user?.role === 'admin' ? '#fef3c7' : '#f1f5f9',
              color: user?.role === 'admin' ? '#b45309' : '#475569',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
          >
            {user?.role}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
