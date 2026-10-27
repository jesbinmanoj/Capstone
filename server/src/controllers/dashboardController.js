const Task = require('../models/Task');
const Project = require('../models/Project');
const { getMongoStatus } = require('../config/db');
const { tasks, projects } = require('../config/memoryStore');

// @desc    Get dashboard metrics & summary
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';

    if (getMongoStatus()) {
      const userFilter = isAdmin ? {} : { user: userId };
      const projectFilter = isAdmin ? {} : { owner: userId };

      const totalTasks = await Task.countDocuments(userFilter);
      const completedTasks = await Task.countDocuments({ ...userFilter, status: 'Completed' });
      const inProgressTasks = await Task.countDocuments({ ...userFilter, status: 'In Progress' });
      const pendingTasks = await Task.countDocuments({ ...userFilter, status: 'Pending' });
      const urgentTasks = await Task.countDocuments({ ...userFilter, priority: 'Urgent' });
      const highTasks = await Task.countDocuments({ ...userFilter, priority: 'High' });

      const totalProjects = await Project.countDocuments(projectFilter);
      const activeProjects = await Project.countDocuments({ ...projectFilter, status: 'Active' });

      const recentTasks = await Task.find(userFilter)
        .populate('project', 'title category')
        .sort({ createdAt: -1 })
        .limit(5);

      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return res.status(200).json({
        success: true,
        data: {
          metrics: {
            totalTasks,
            completedTasks,
            inProgressTasks,
            pendingTasks,
            urgentTasks,
            highTasks,
            totalProjects,
            activeProjects,
            completionRate
          },
          recentTasks
        }
      });
    } else {
      const userTasks = tasks.filter(
        t => t.user.toString() === userId.toString() || isAdmin
      );
      const userProjects = projects.filter(
        p => p.owner.toString() === userId.toString() || isAdmin
      );

      const totalTasks = userTasks.length;
      const completedTasks = userTasks.filter(t => t.status === 'Completed').length;
      const inProgressTasks = userTasks.filter(t => t.status === 'In Progress').length;
      const pendingTasks = userTasks.filter(t => t.status === 'Pending').length;
      const urgentTasks = userTasks.filter(t => t.priority === 'Urgent').length;
      const highTasks = userTasks.filter(t => t.priority === 'High').length;

      const totalProjects = userProjects.length;
      const activeProjects = userProjects.filter(p => p.status === 'Active').length;

      const recentTasks = [...userTasks]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(t => {
          const p = projects.find(proj => proj._id.toString() === (t.project || '').toString());
          return {
            ...t,
            project: p ? { title: p.title, category: p.category } : null
          };
        });

      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return res.status(200).json({
        success: true,
        data: {
          metrics: {
            totalTasks,
            completedTasks,
            inProgressTasks,
            pendingTasks,
            urgentTasks,
            highTasks,
            totalProjects,
            activeProjects,
            completionRate
          },
          recentTasks
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
