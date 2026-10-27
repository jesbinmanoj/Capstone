import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Calendar,
  Edit2,
  Trash2,
  Tag,
  FolderGit2,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorAlert from '../components/ErrorAlert';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {};
      if (search) params.search = search;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (priorityFilter !== 'All') params.priority = priorityFilter;
      if (projectFilter !== 'All') params.projectId = projectFilter;

      const [tasksRes, projectsRes] = await Promise.all([
        api.get('/tasks', { params }),
        api.get('/projects')
      ]);

      setTasks(tasksRes.data.data);
      setProjects(projectsRes.data.data);
    } catch (err) {
      setError(err.message || 'Failed to load task deliverables.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, priorityFilter, projectFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      await api.put(`/tasks/${editingTask._id}`, taskData);
    } else {
      await api.post('/tasks', taskData);
    }
    fetchData();
  };

  const handleDeleteTask = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/tasks/${deleteTarget._id}`);
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to delete task.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleToggleStatus = async (taskId, currentStatus) => {
    try {
      const nextStatus =
        currentStatus === 'Pending'
          ? 'In Progress'
          : currentStatus === 'In Progress'
          ? 'Completed'
          : 'Pending';
      await api.patch(`/tasks/${taskId}/status`, { status: nextStatus });
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to update task status.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Sprint Task Board</h1>
          <p className="page-subtitle">
            Manage your project deliverables, update deadlines, and track completion.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={16} />
          Create Task
        </button>
      </div>

      <ErrorAlert message={error} onRetry={fetchData} />

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search tasks by keyword..."
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
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="form-control"
            style={{ width: 'auto' }}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>

          <select
            className="form-control"
            style={{ width: 'auto' }}
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="All">All Projects</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>

          <button type="button" onClick={fetchData} className="btn btn-secondary">
            <Filter size={14} />
            Apply
          </button>
        </div>
      </div>

      {/* Main Task List */}
      {loading ? (
        <LoadingSpinner message="Fetching deliverables..." />
      ) : tasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No tasks match your criteria"
          description="Try clearing search filters or create a new sprint task deliverable."
          actionLabel="Add New Task"
          onAction={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {tasks.map((task) => (
            <div
              key={task._id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${
                  task.priority === 'Urgent'
                    ? '#ef4444'
                    : task.priority === 'High'
                    ? '#f97316'
                    : task.priority === 'Medium'
                    ? '#6366f1'
                    : '#94a3b8'
                }`
              }}
            >
              <div>
                {/* Header: Status and Priority */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className={`badge badge-${task.status.toLowerCase().replace(' ', '-')}`}>
                    {task.status}
                  </span>
                  <span className={`badge badge-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>

                {/* Task Title */}
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a' }}>
                  {task.title}
                </h3>

                {/* Description */}
                {task.description && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
                    {task.description}
                  </p>
                )}

                {/* Project Badge */}
                {task.project && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#0284c7', fontWeight: 600, marginBottom: '0.75rem' }}>
                    <FolderGit2 size={13} />
                    <span>{task.project.title}</span>
                  </div>
                )}

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
                    {task.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <Tag size={10} />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Due Date and Actions */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.875rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Calendar size={13} />
                    <span>
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Deadline'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleToggleStatus(task._id, task.status)}
                      className="btn btn-secondary btn-sm"
                      title="Cycle task status"
                    >
                      <CheckCircle2 size={13} />
                      Next
                    </button>
                    <button
                      onClick={() => {
                        setEditingTask(task);
                        setIsModalOpen(true);
                      }}
                      className="btn btn-secondary btn-sm"
                      title="Edit task"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(task)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444' }}
                      title="Delete task"
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

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        projects={projects}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteTask}
        title="Delete Task Deliverable"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default TasksPage;
