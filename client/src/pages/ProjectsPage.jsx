import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Plus,
  Search,
  Calendar,
  CheckCircle2,
  Edit2,
  Trash2,
  Layers,
  Clock
} from 'lucide-react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorAlert from '../components/ErrorAlert';
import ProjectModal from '../components/ProjectModal';
import ConfirmModal from '../components/ConfirmModal';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (search) params.search = search;
      if (statusFilter !== 'All') params.status = statusFilter;

      const res = await api.get('/projects', { params });
      setProjects(res.data.data);
    } catch (err) {
      setError(err.message || 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  const handleSaveProject = async (projectData) => {
    if (editingProject) {
      await api.put(`/projects/${editingProject._id}`, projectData);
    } else {
      await api.post('/projects', projectData);
    }
    fetchProjects();
  };

  const handleDeleteProject = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/projects/${deleteTarget._id}`);
      fetchProjects();
    } catch (err) {
      alert(err.message || 'Failed to delete project.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Project Workspaces</h1>
          <p className="page-subtitle">
            Organize work streams, assign tasks, and monitor milestone completion.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <ErrorAlert message={error} onRetry={fetchProjects} />

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="filter-selects">
          <select
            className="form-control"
            style={{ width: 'auto' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Planning">Planning</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="button" onClick={fetchProjects} className="btn btn-secondary">
            Filter
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <LoadingSpinner message="Loading project portfolios..." />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No projects found"
          description="Create your first project repository to track deliverables and team milestones."
          actionLabel="Create Project"
          onAction={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {projects.map((proj) => (
            <div key={proj._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor: '#e0f2fe',
                      color: '#0369a1',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {proj.category}
                  </span>
                  <span className={`badge badge-${proj.status.toLowerCase().replace(' ', '-')}`}>
                    {proj.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a' }}>
                  {proj.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', minHeight: '40px', lineHeight: '1.4' }}>
                  {proj.description || 'No description provided.'}
                </p>

                {/* Progress Indicator */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem', fontWeight: 600 }}>
                    <span>Milestone Progress</span>
                    <span style={{ color: 'var(--primary)' }}>{proj.progress || 0}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${proj.progress || 0}%`,
                        height: '100%',
                        backgroundColor: '#0284c7',
                        borderRadius: '9999px',
                        transition: 'width 0.3s ease'
                      }}
                    ></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.375rem' }}>
                    <span>{proj.completedTasks || 0} of {proj.totalTasks || 0} deliverables completed</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Calendar size={13} />
                    <span>
                      {proj.deadline ? new Date(proj.deadline).toLocaleDateString() : 'No Deadline'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setEditingProject(proj);
                        setIsModalOpen(true);
                      }}
                      className="btn btn-secondary btn-sm"
                      title="Edit project"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(proj)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444' }}
                      title="Delete project"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        project={editingProject}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteProject}
        title="Delete Project & Associated Tasks"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? All associated sprint tasks will also be removed.`}
      />
    </div>
  );
};

export default ProjectsPage;
