import React from 'react';
import { User, Mail, Shield, Award, Calendar, CheckCircle, Code2, Server } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Developer Profile & Credentials</h1>
          <p className="page-subtitle">
            Internship candidate verification and system authentication metadata.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Profile Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 800
              }}
            >
              {user?.avatar || user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{user?.name}</h2>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  backgroundColor: user?.role === 'admin' ? '#fef3c7' : '#e0f2fe',
                  color: user?.role === 'admin' ? '#b45309' : '#0369a1',
                  textTransform: 'uppercase'
                }}
              >
                {user?.role === 'admin' ? 'Lead Administrator' : 'Intern Developer'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <Mail size={18} color="var(--text-muted)" />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Email Address</span>
                <span style={{ fontWeight: 600 }}>{user?.email}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <Shield size={18} color="var(--text-muted)" />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Access Level</span>
                <span style={{ fontWeight: 600 }}>{user?.role === 'admin' ? 'Full RBAC Administrator' : 'Standard Member'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <Calendar size={18} color="var(--text-muted)" />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Session Validity</span>
                <span style={{ fontWeight: 600 }}>30 Days JWT Token Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Program Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Award size={24} color="#0284c7" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Academic & Capstone Information</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Institution</span>
              <span style={{ fontWeight: 600 }}>Information & Communication Technology Academy of Kerala (ICTAK)</span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Course Track</span>
              <span style={{ fontWeight: 600 }}>Full Stack Application Development with ReactJS (MERN Stack)</span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Capstone Project</span>
              <span style={{ fontWeight: 600 }}>TaskTrack Pro — Agile Workspace with RBAC & Analytics</span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Evaluation Portal</span>
              <span style={{ fontWeight: 600, color: '#0284c7' }}>Paatshala LMS (`paatshala.ictkerala.org`)</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Specs Card */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>MERN Stack Architecture Specifications</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#10b981', fontWeight: 700 }}>
                <Server size={18} />
                MongoDB NoSQL
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                BSON persistence, Mongoose schemas, relational references between Users, Projects, and Tasks.
              </p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#0284c7', fontWeight: 700 }}>
                <Code2 size={18} />
                Express & Node.js
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Modular REST API endpoints, JWT bearer authorization, CORS origin isolation, centralized error handler.
              </p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6366f1', fontWeight: 700 }}>
                <CheckCircle size={18} />
                React 18 + Vite
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Fast SPA rendering, React Hooks, unified Axios API client layer, guaranteed 4-state UI lifecycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
