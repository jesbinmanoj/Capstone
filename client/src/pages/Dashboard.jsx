import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  AlertCircle,
  FolderGit2,
  TrendingUp,
  Plus,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import api from '../services/api';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorAlert from '../components/ErrorAlert';
import TaskModal from '../components/TaskModal';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsRes, projectsRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/projects')
      ]);
      setData(statsRes.data.data);
      setProjects(projectsRes.data.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCreateTask = async (taskData) => {
    await api.post('/tasks', taskData);
    fetchDashboardData();
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
      fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Failed to update task status.');
    }
  };

  if (loading) return <LoadingSpinner message="Aggregating workspace analytics..." />;

  const metrics = data?.metrics || {
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    urgentTasks: 0,
    highTasks: 0,
    totalProjects: 0,
    activeProjects: 0,
    completionRate: 0
  };

  const recentTasks = data?.recentTasks || [];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Workspace Dashboard</h1>
          <p className="page-subtitle">
            Welcome back! Here is your sprint velocity and task breakdown.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => setIsTaskModalOpen(true)} className="btn btn-primary">
            <Plus size={16} />
            New Task
          </button>
        </div>
      </div>

      <ErrorAlert message={error} onRetry={fetchDashboardData} />

      {/* KPI Stat Cards */}
      <div className="stat-grid">
        <StatCard
          title="Total Tasks"
          value={metrics.totalTasks}
          icon={CheckSquare}
          color="#0284c7"
          bgLight="#e0f2fe"
          subtitle={`${metrics.pendingTasks} pending`}
        />
        <StatCard
          title="In Progress"
          value={metrics.inProgressTasks}
          icon={Clock}
          color="#3b82f6"
          bgLight="#eff6ff"
          subtitle="Currently active"
        />
        <StatCard
          title="Completed"
          value={metrics.completedTasks}
          icon={CheckCircle2}
          color="#10b981"
          bgLight="#ecfdf5"
          subtitle={`${metrics.completionRate}% completion rate`}
        />
        <StatCard
          title="High / Urgent"
          value={metrics.urgentTasks + metrics.highTasks}
          icon={AlertCircle}
          color="#ef4444"
          bgLight="#fef2f2"
          subtitle="Requires attention"
        />
      </div>

      {/* Sprint Progress Bar Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Overall Sprint Progress</h3>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
            {metrics.completionRate}%
          </span>
        </div>
        <div style={{ width: '100%', height: '12px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${metrics.completionRate}%`,
              height: '100%',
              backgroundColor: '#0284c7',
              borderRadius: '9999px',
              transition: 'width 0.5s ease-in-out'
            }}
          ></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          <span>{metrics.completedTasks} of {metrics.totalTasks} deliverables completed</span>
          <span>{metrics.activeProjects} active projects</span>
        </div>
      </div>

      {/* Recent Deliverables Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Recent Sprint Tasks</h3>
          <button
            onClick={() => navigate('/tasks')}
            className="btn btn-secondary btn-sm"
          >
            View All Tasks
            <ArrowRight size={14} />
          </button>
        </div>

        {recentTasks.length === 0 ? (
          <EmptyState
            title="No sprint tasks created yet"
            description="Create your first task deliverable to populate the workspace dashboard."
            actionLabel="Create Task"
            onAction={() => setIsTaskModalOpen(true)}
          />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>STATUS</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>TASK TITLE</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>PROJECT</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>PRIORITY</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600, textAlign: 'right' }}>QUICK ACTION</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr
                    key={task._id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span className={`badge badge-${task.status.toLowerCase().replace(' ', '-')}`}>
                        {task.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: '#0f172a' }}>
                      {task.title}
                    </td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--text-muted)' }}>
                      {task.project?.title || 'General'}
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span className={`badge badge-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => handleToggleStatus(task._id, task.status)}
                        className="btn btn-secondary btn-sm"
                        title="Click to cycle status: Pending -> In Progress -> Completed"
                      >
                        Cycle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleCreateTask}
        projects={projects}
      />
    </div>
  );
};

export default Dashboard;
