const Project = require('../models/Project');
const Task = require('../models/Task');
const { getMongoStatus } = require('../config/db');
const { projects, tasks, generateId } = require('../config/memoryStore');

// @desc    Get all projects for current user
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    if (getMongoStatus()) {
      let query = { owner: req.user._id };

      if (status && status !== 'All') {
        query.status = status;
      }

      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }

      const projectList = await Project.find(query).sort({ createdAt: -1 });

      // Add task counts
      const enriched = await Promise.all(
        projectList.map(async (p) => {
          const totalTasks = await Task.countDocuments({ project: p._id });
          const completedTasks = await Task.countDocuments({ project: p._id, status: 'Completed' });
          return {
            ...p.toObject(),
            totalTasks,
            completedTasks,
            progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
          };
        })
      );

      return res.status(200).json({
        success: true,
        count: enriched.length,
        data: enriched
      });
    } else {
      let userProjects = projects.filter(
        p => p.owner.toString() === req.user._id.toString() || req.user.role === 'admin'
      );

      if (status && status !== 'All') {
        userProjects = userProjects.filter(p => p.status === status);
      }

      if (search) {
        const s = search.toLowerCase();
        userProjects = userProjects.filter(p => p.title.toLowerCase().includes(s));
      }

      const enriched = userProjects.map(p => {
        const pTasks = tasks.filter(t => t.project && t.project.toString() === p._id.toString());
        const completed = pTasks.filter(t => t.status === 'Completed').length;
        const total = pTasks.length;
        return {
          ...p,
          totalTasks: total,
          completedTasks: completed,
          progress: total > 0 ? Math.round((completed / total) * 100) : 0
        };
      });

      return res.status(200).json({
        success: true,
        count: enriched.length,
        data: enriched
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
  try {
    const { title, description, category, status, deadline } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a project title.'
      });
    }

    if (getMongoStatus()) {
      const project = await Project.create({
        title: title.trim(),
        description: description ? description.trim() : '',
        category: category || 'Development',
        status: status || 'Active',
        deadline: deadline || null,
        owner: req.user._id
      });

      return res.status(201).json({
        success: true,
        data: project
      });
    } else {
      const newProj = {
        _id: generateId(),
        title: title.trim(),
        description: description ? description.trim() : '',
        category: category || 'Development',
        status: status || 'Active',
        deadline: deadline ? new Date(deadline) : null,
        owner: req.user._id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      projects.unshift(newProj);

      return res.status(201).json({
        success: true,
        data: newProj
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getMongoStatus()) {
      let project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found.'
        });
      }

      if (project.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this project.'
        });
      }

      project = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });

      return res.status(200).json({
        success: true,
        data: project
      });
    } else {
      const index = projects.findIndex(p => p._id.toString() === id.toString());
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Project not found.'
        });
      }

      const project = projects[index];
      if (project.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this project.'
        });
      }

      projects[index] = {
        ...project,
        ...req.body,
        updatedAt: new Date()
      };

      return res.status(200).json({
        success: true,
        data: projects[index]
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getMongoStatus()) {
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found.'
        });
      }

      if (project.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this project.'
        });
      }

      await project.deleteOne();
      await Task.deleteMany({ project: id });

      return res.status(200).json({
        success: true,
        message: 'Project and associated tasks deleted successfully.'
      });
    } else {
      const index = projects.findIndex(p => p._id.toString() === id.toString());
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Project not found.'
        });
      }

      const project = projects[index];
      if (project.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this project.'
        });
      }

      projects.splice(index, 1);
      // Remove tasks linked to project
      for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].project && tasks[i].project.toString() === id.toString()) {
          tasks.splice(i, 1);
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Project and associated tasks deleted successfully.'
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};
