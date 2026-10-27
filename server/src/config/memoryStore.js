const bcrypt = require('bcryptjs');

// Intelligent in-memory fallback store
const users = [];
const projects = [];
const tasks = [];

let initialized = false;

const initSeedData = async () => {
  if (initialized) return;

  const adminPass = await bcrypt.hash('admin123', 10);
  const internPass = await bcrypt.hash('intern123', 10);

  const adminUser = {
    _id: '65e000000000000000000001',
    name: 'ICTAK Lead Admin',
    email: 'admin@ictak.org',
    password: adminPass,
    role: 'admin',
    avatar: 'A',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const internUser = {
    _id: '65e000000000000000000002',
    name: 'ICTAK Intern Developer',
    email: 'intern@ictak.org',
    password: internPass,
    role: 'user',
    avatar: 'I',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  users.push(adminUser, internUser);

  const proj1 = {
    _id: '65e100000000000000000001',
    title: 'Full Stack MERN Capstone',
    description: 'Core project tracking web portal for ICT Academy of Kerala Internship.',
    category: 'Development',
    status: 'Active',
    deadline: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    owner: internUser._id,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const proj2 = {
    _id: '65e100000000000000000002',
    title: 'Cloud Deployment & DevOps Pipeline',
    description: 'Setting up continuous deployment and environment configurations.',
    category: 'Research',
    status: 'Planning',
    deadline: new Date(Date.now() + 14 * 24 * 3600 * 1000),
    owner: internUser._id,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  projects.push(proj1, proj2);

  tasks.push(
    {
      _id: '65e200000000000000000001',
      title: 'Design Software Requirements Specification (SRS)',
      description: 'Detail functional and non-functional requirements, user stories, and API contract.',
      project: proj1._id,
      priority: 'High',
      status: 'Completed',
      dueDate: new Date(Date.now() - 1 * 24 * 3600 * 1000),
      user: internUser._id,
      tags: ['Documentation', 'SRS', 'ICTAK'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '65e200000000000000000002',
      title: 'Implement Express REST API with JWT Auth',
      description: 'Construct controllers, route guards, bcrypt password hashing, and error middleware.',
      project: proj1._id,
      priority: 'Urgent',
      status: 'In Progress',
      dueDate: new Date(Date.now() + 2 * 24 * 3600 * 1000),
      user: internUser._id,
      tags: ['Backend', 'Security', 'JWT'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '65e200000000000000000003',
      title: 'Build React Vite Single Page App with 4 UI States',
      description: 'Create responsive UI screens handling Loading, Success, Empty, and Error states.',
      project: proj1._id,
      priority: 'High',
      status: 'In Progress',
      dueDate: new Date(Date.now() + 4 * 24 * 3600 * 1000),
      user: internUser._id,
      tags: ['Frontend', 'React', 'UI/UX'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '65e200000000000000000004',
      title: 'Prepare Final Submission Report & Git Screenshots',
      description: 'Document architecture, API test verification, and complete ICTAK checklist.',
      project: proj1._id,
      priority: 'Medium',
      status: 'Pending',
      dueDate: new Date(Date.now() + 6 * 24 * 3600 * 1000),
      user: internUser._id,
      tags: ['Report', 'Submission'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );

  initialized = true;
};

initSeedData();

module.exports = {
  users,
  projects,
  tasks,
  generateId: () => Date.now().toString(16) + Math.random().toString(16).substring(2, 10)
};
