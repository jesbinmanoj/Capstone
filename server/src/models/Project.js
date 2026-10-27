const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    enum: ['Development', 'Design', 'Marketing', 'Research', 'General'],
    default: 'Development'
  },
  status: {
    type: String,
    enum: ['Planning', 'Active', 'Completed', 'On Hold'],
    default: 'Active'
  },
  deadline: {
    type: Date
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
