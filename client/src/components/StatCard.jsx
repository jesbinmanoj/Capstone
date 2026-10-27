import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'var(--primary)', bgLight = 'var(--primary-light)', subtitle }) => {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '12px',
          backgroundColor: bgLight,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Icon size={28} />
      </div>
      <div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '2px', color: '#0f172a' }}>
          {value}
        </h3>
        {subtitle && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '2px' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
