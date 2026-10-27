const Task = require('../models/Task');
const { getMongoStatus } = require('../config/db');
const { tasks, generateId } = require('../config/memoryStore');

// @desc    Get all tasks for current user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, projectId, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    if (getMongoStatus()) {
      let query = { user: req.user._id };

      if (status && status !== 'All') {
        query.status = status;
      }

      if (priority && priority !== 'All') {
        query.priority = priority;
      }

      if (projectId && projectId !== 'All') {
        query.project = projectId;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const total = await Task.countDocuments(query);
      const taskList = await Task.find(query)
        .populate('project', 'title category status')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

      return res.status(200).json({
        success: true,
        count: taskList.length,
        pagination: {
          total,
          page: pageNum,
          pages: Math.ceil(total / limitNum) || 1
        },
        data: taskList
      });
    } else {
      let userTasks = tasks.filter(
        t => t.user.toString() === req.user._id.toString() || req.user.role === 'admin'
      );

      if (status && status !== 'All') {
        userTasks = userTasks.filter(t => t.status === status);
      }

      if (priority && priority !== 'All') {
        userTasks = userTasks.filter(t => t.priority === priority);
      }

      if (projectId && projectId !== 'All') {
        userTasks = userTasks.filter(t => t.project && t.project.toString() === projectId.toString());
      }

      if (search) {
        const s = search.toLowerCase();
        userTasks = userTasks.filter(
          t => t.title.toLowerCase().includes(s) || (t.description && t.description.toLowerCase().includes(s))
        );
      }

      const total = userTasks.length;
      const paginated = userTasks.slice(skip, skip + limitNum);

      return res.status(200).json({
        success: true,
        count: paginated.length,
        pagination: {
          total,
          page: pageNum,
          pages: Math.ceil(total / limitNum) || 1
        },
        data: paginated
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getMongoStatus()) {
      const task = await Task.findById(id).populate('project', 'title category');
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this task.'
        });
      }

      return res.status(200).json({
        success: true,
        data: task
      });
    } else {
      const task = tasks.find(t => t._id.toString() === id.toString());
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this task.'
        });
      }

      return res.status(200).json({
        success: true,
        data: task
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, project, priority, status, dueDate, tags } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a task title.'
      });
    }

    if (getMongoStatus()) {
      const task = await Task.create({
        title: title.trim(),
        description: description ? description.trim() : '',
        project: project || null,
        priority: priority || 'Medium',
        status: status || 'Pending',
        dueDate: dueDate || null,
        user: req.user._id,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : [])
      });

      return res.status(201).json({
        success: true,
        data: task
      });
    } else {
      const newTask = {
        _id: generateId(),
        title: title.trim(),
        description: description ? description.trim() : '',
        project: project || null,
        priority: priority || 'Medium',
        status: status || 'Pending',
        dueDate: dueDate ? new Date(dueDate) : null,
        user: req.user._id,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      tasks.unshift(newTask);

      return res.status(201).json({
        success: true,
        data: newTask
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getMongoStatus()) {
      let task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this task.'
        });
      }

      task = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });

      return res.status(200).json({
        success: true,
        data: task
      });
    } else {
      const index = tasks.findIndex(t => t._id.toString() === id.toString());
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      const task = tasks[index];
      if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this task.'
        });
      }

      tasks[index] = {
        ...task,
        ...req.body,
        updatedAt: new Date()
      };

      return res.status(200).json({
        success: true,
        data: tasks[index]
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Quick status update
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be Pending, In Progress, or Completed.'
      });
    }

    if (getMongoStatus()) {
      let task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this task.'
        });
      }

      task.status = status;
      await task.save();

      return res.status(200).json({
        success: true,
        data: task
      });
    } else {
      const index = tasks.findIndex(t => t._id.toString() === id.toString());
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      const task = tasks[index];
      if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this task.'
        });
      }

      tasks[index].status = status;
      tasks[index].updatedAt = new Date();

      return res.status(200).json({
        success: true,
        data: tasks[index]
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getMongoStatus()) {
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this task.'
        });
      }

      await task.deleteOne();

      return res.status(200).json({
        success: true,
        message: 'Task deleted successfully.'
      });
    } else {
      const index = tasks.findIndex(t => t._id.toString() === id.toString());
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Task not found.'
        });
      }

      const task = tasks[index];
      if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this task.'
        });
      }

      tasks.splice(index, 1);

      return res.status(200).json({
        success: true,
        message: 'Task deleted successfully.'
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
};
