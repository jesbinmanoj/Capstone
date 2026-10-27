# CAPSTONE PROJECT DOCUMENTATION & SPECIFICATION
## ICT Academy of Kerala (ICTAK) — Full Stack Application Development with ReactJS / MERN
---

### Project Title:
**TaskTrack Pro — Enterprise Agile Project & Task Management System**

### Academic Program:
**ICTAK Summer Internship Report & Capstone Submission**  
**Course:** Full Stack Application Development with ReactJS (MERN Stack)  
**Portal:** Paatshala ICTAK (`paatshala.ictkerala.org`)  
**Submission Category:** Software Requirements Specification (SRS) & Final Capstone Project Report  

---

## TABLE OF CONTENTS
1. [Executive Summary](#1-executive-summary)
2. [Introduction & Background](#2-introduction--background)
3. [Project Objectives](#3-project-objectives)
4. [Scope and Deliverables](#4-scope-and-deliverables)
5. [Software Requirements Specification (SRS)](#5-software-requirements-specification-srs)
   - 5.1 Overall Description
   - 5.2 Target User Personas & Roles
   - 5.3 Functional Requirements
   - 5.4 Non-Functional Requirements
   - 5.5 User Stories & Acceptance Criteria
6. [MERN System Architecture & Data Model](#6-mern-system-architecture--data-model)
   - 6.1 Architectural Overview
   - 6.2 Data Models & Schema Design (Mongoose)
   - 6.3 RESTful API Contract & Endpoints
7. [Methodology & Development Workflow](#7-methodology--development-workflow)
8. [Project Activities & Implementation Milestones](#8-project-activities--implementation-milestones)
9. [Four Core UI States Implementation](#9-four-core-ui-states-implementation)
10. [Security, Privacy & Best Practices](#10-security-privacy--best-practices)
11. [Testing, Quality Assurance & Debugging](#11-testing-quality-assurance--debugging)
12. [Results, Findings & Metrics](#12-results-findings--metrics)
13. [Hosting & Deployment Guide](#13-hosting--deployment-guide)
14. [Conclusion & Future Enhancements](#14-conclusion--future-enhancements)
15. [Self-Review & Compliance Checklist](#15-self-review--compliance-checklist)
16. [Appendix](#16-appendix)

---

## 1. EXECUTIVE SUMMARY

Modern software development and business operations require teams to coordinate work across diverse projects, track deadlines, prioritize critical bugs, and monitor task completion in real-time. Without centralized task tracking, distributed teams suffer from missed deadlines, ambiguous ownership, fragmented communication, and lack of visibility into progress.

**TaskTrack Pro** is a full-featured, responsive, and secure MERN Stack (MongoDB, Express.js, React.js, Node.js) web application designed and built under the ICT Academy of Kerala (ICTAK) Internship Program. The system delivers:
- Secure role-based authentication and authorization using JSON Web Tokens (JWT) and salted password hashing with `bcryptjs`.
- An intuitive Agile Kanban and list-based Project & Task Workspace supporting complete CRUD operations (Create, Read, Update, Delete) with priority flags, status pipelines, due-date tracking, and tag taxonomies.
- An analytical dashboard providing real-time KPI metrics, task velocity, status distributions, and team progress indicators.
- Seamless frontend-to-backend communication adhering to strict REST architectural constraints, environment-based dynamic API routing, robust input validation, centralized error handling, and complete handling of the four essential UI states (Loading, Success, Empty, Error).

The project successfully demonstrates end-to-end full stack development capabilities from requirement gathering, schema modeling, REST API engineering, responsive React interface design, to deployment readiness.

---

## 2. INTRODUCTION & BACKGROUND

### 2.1 Context and Problem Statement
In academic, internship, and corporate settings, effective task and project management directly dictates team productivity. Traditional communication tools (email, messaging apps, and static spreadsheets) lack atomic state management, ownership enforcement, automated validation, and actionable visual metrics.

Existing commercial solutions (such as Jira, Asana, or Monday.com) are often overly complex, heavyweight, subscription-gated, and difficult for small-to-medium teams or student groups to rapidly adopt. 

**TaskTrack Pro** solves this problem by providing a lean, high-performance, and responsive web platform that combines simplicity with enterprise-grade security standards.

### 2.2 Technology Stack Justification (MERN)
- **MongoDB (Database):** Document-oriented NoSQL database providing flexible JSON-like BSON documents, horizontal scalability, dynamic schema validation via Mongoose, and rapid indexing on task priorities, user references, and deadlines.
- **Express.js (Backend Framework):** Minimalist and performant web application framework for Node.js, providing robust middleware pipelines for token verification, request sanitization, and structured error responses.
- **React.js (Frontend Library):** Component-based client library utilizing a Virtual DOM, hooks (`useState`, `useEffect`, `useContext`, `useMemo`), single-page application (SPA) routing via `react-router-dom`, and modular UI styling for high responsiveness.
- **Node.js (Runtime Environment):** Event-driven, asynchronous I/O runtime powering the server-side JavaScript environment, enabling high-concurrency request handling with low memory overhead.

---

## 3. PROJECT OBJECTIVES

1. **Full Stack Architectural Proficiency:** Design and build an end-to-end MERN application that adheres strictly to the ICTAK Internship Guidelines and clean code principles (Separation of Concerns).
2. **Security & Authentication:** Implement secure user onboarding with token-based authentication (JWT), encrypted credential storage, route guarding on both frontend and backend, and strict server-side resource ownership validation.
3. **Data Integrity & Validation:** Implement multi-tier validation (client-side form validation for enhanced UX and server-side schema validation for data protection against injection attacks).
4. **Agile Task & Project Lifecycle Management:** Enable users to organize projects, create categorized tasks, filter by multi-criteria attributes (status, priority, search keywords), and update task milestones in real time.
5. **Responsive and Accessible UI/UX:** Create a mobile-first, semantic, and accessible user interface handling all four states (Loading, Success, Empty, Error) with fluid transitions and informative feedback.
6. **Deployment & DevOps Readiness:** Prepare the application for production hosting with container-ready structure, environment variable isolation (`.env.example`), production build pipelines, and automated testability.

---

## 4. SCOPE AND DELIVERABLES

### 4.1 In-Scope Deliverables
1. **Source Code Repository:**
   - `client/`: Production-ready React application initialized with Vite, featuring modular components, pages, context providers, and an API service layer.
   - `server/`: Structured Node.js/Express REST API adhering to MVC architecture (Models, Views/Responses, Controllers) with route mapping and middleware.
2. **Software Requirements Specification (SRS):** Detailed requirement specifications, user stories, acceptance criteria, wireframe diagrams, and API contracts.
3. **Project Documentation & User Manual:** Detailed installation, setup, configuration, and troubleshooting guide in `README.md`.
4. **Environment Configurations:** Pre-configured `.env.example` templates ensuring zero hardcoded secrets.
5. **Interactive Verification Data:** Pre-populated sample seeds for users, projects, and tasks for immediate evaluation.

### 4.2 Out-of-Scope (Future Enhancements)
- Third-party OAuth integrations (Google, GitHub SSO) — reserved for v2.0.
- WebSockets for real-time multi-cursor collaboration.
- Integrated payment gateway for premium workspace tiers.

---

## 5. SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

### 5.1 Product Perspective
TaskTrack Pro operates as a Single Page Application (SPA) in modern web browsers, communicating via asynchronous JSON HTTP requests over TLS/HTTPS with a dedicated RESTful API server connected to a MongoDB document store.

```
+-----------------------------------------------------------+
|                   Client Browser (React SPA)              |
|   [AuthContext] -> [Pages / Components] -> [API Service]  |
+-----------------------------------------------------------+
                             |
                   HTTP JSON Requests (CORS)
                             v
+-----------------------------------------------------------+
|               Express.js / Node.js API Server             |
|   [CORS / Logger] -> [Auth Middleware] -> [Controllers]   |
+-----------------------------------------------------------+
                             |
                     Mongoose ODM (BSON)
                             v
+-----------------------------------------------------------+
|                  MongoDB Database Cluster                 |
|             (Users, Projects, Tasks Collections)          |
+-----------------------------------------------------------+
```

### 5.2 Target User Personas & Roles
1. **Regular Member / Developer (`user`):**
   - Can register and manage personal profile.
   - Can create, read, update, and delete their own projects and assigned tasks.
   - Can filter, search, and track personal productivity statistics on the dashboard.
2. **Project Lead / Administrator (`admin`):**
   - Has elevated visibility across workspace projects.
   - Can assign tasks to team members, inspect cross-team metrics, and archive completed projects.

### 5.3 Functional Requirements

| Req ID | Module | Feature Description |
| :--- | :--- | :--- |
| **FR-01** | Auth | User registration with name, email, role, and password validation. |
| **FR-02** | Auth | User login with credential validation, returning a signed JWT token and user profile. |
| **FR-03** | Auth | Session persistence via secure local storage / token headers with automated logout on token expiration. |
| **FR-04** | Dashboard | Analytical overview showing Total Tasks, Completed Tasks, In-Progress Tasks, High Priority Tasks, and completion percentage. |
| **FR-05** | Projects | Create new projects with name, description, category, deadline, and status. |
| **FR-06** | Projects | View list of projects with search, status filters, and task count aggregation. |
| **FR-07** | Projects | Edit project metadata and delete/archive projects with cascading checks. |
| **FR-08** | Tasks | Create tasks assigned to projects with title, description, priority (`Low`, `Medium`, `High`, `Urgent`), status (`Pending`, `In Progress`, `Completed`), and due date. |
| **FR-09** | Tasks | Task list with keyword search, priority filter, status tabs, and pagination support. |
| **FR-10** | Tasks | One-click status cycle / inline update for rapid workflow transitions. |
| **FR-11** | Tasks | Update and delete individual tasks with strict ownership verification. |
| **FR-12** | Profile | View user details, assigned role, joined date, and activity statistics. |

### 5.4 Non-Functional Requirements (NFR)
- **NFR-01: Performance:** API response times under 200ms for typical read/write operations under standard network conditions; client bundle size optimized via Vite code splitting.
- **NFR-02: Security:** All passwords hashed with bcrypt (salt rounds = 10); JWT tokens signed with SHA-256 HMAC secrets; NoSQL injection defenses in query sanitization.
- **NFR-03: Reliability:** Graceful database fallback mechanism preventing server crashes during temporary connectivity interruptions.
- **NFR-04: Usability & Accessibility:** Semantic HTML5 elements, ARIA labels for modal dialogs and buttons, minimum 4.5:1 contrast ratios compliant with WCAG 2.1 AA standards.
- **NFR-05: Responsiveness:** Mobile-first layout fully functional on mobile devices (>= 320px width), tablets, and high-resolution desktop monitors.

### 5.5 User Stories & Acceptance Criteria

#### User Story 1: User Authentication
- **As a** new intern/developer,
- **I want to** create a secure account and log in with my email and password,
- **So that** my personal tasks and projects are protected and isolated from other users.
- **Acceptance Criteria:**
  - Form validates that email is properly formatted and password is at least 6 characters.
  - Submitting duplicate email returns an HTTP 409 Conflict with a clear error prompt.
  - Successful login stores the JWT token and redirects to the Dashboard.

#### User Story 2: Task Creation & Tracking
- **As a** logged-in team member,
- **I want to** add a new task with a title, priority, due date, and associated project,
- **So that** I can organize my daily sprint deliverables.
- **Acceptance Criteria:**
  - Empty title is rejected with an inline validation error.
  - Priority selector defaults to "Medium" if unspecified.
  - Created task appears dynamically in the task list without requiring a manual browser refresh.
  - Users cannot view, modify, or delete tasks belonging to other accounts unless granted admin role.

---

## 6. MERN SYSTEM ARCHITECTURE & DATA MODEL

### 6.1 Architectural Separation of Concerns
Following Section 4 of the ICTAK Student Reference Guide:
- **`client/` (Frontend):**
  - `src/components/`: Modular reusable UI widgets (Navbar, Sidebar, StatCard, TaskModal, ProjectModal, ConfirmModal, Alert, Spinner, EmptyState).
  - `src/pages/`: Route-level screens (Dashboard, Tasks, Projects, Profile, Login, Register, NotFound).
  - `src/services/api.js`: Unified HTTP client intercepting requests, injecting Bearer tokens, and centralizing error formatting.
  - `src/context/AuthContext.jsx`: Application-wide authentication state provider.
- **`server/` (Backend):**
  - `src/routes/`: URL endpoints and HTTP method mappings only.
  - `src/controllers/`: Business logic, request payload extraction, database interaction, and response serialization.
  - `src/models/`: Mongoose schemas defining constraints, types, defaults, and relations.
  - `src/middleware/`: Reusable request pipelines (`authMiddleware.js`, `errorMiddleware.js`).
  - `src/config/`: Database connection routines with fallback resilience.

### 6.2 Data Models & Schema Design (Mongoose)

#### 1. User Model (`User.js`)
```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

#### 2. Project Model (`Project.js`)
```javascript
{
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'General' },
  status: { type: String, enum: ['Planning', 'Active', 'Completed', 'On Hold'], default: 'Active' },
  deadline: { type: Date },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

#### 3. Task Model (`Task.js`)
```javascript
{
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### 6.3 RESTful API Contract & Endpoints

| Method | Endpoint | Description | Auth Required | Success Status | Error Statuses |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | No | 201 Created | 400, 409 |
| `POST` | `/api/auth/login` | Authenticate and return JWT | No | 200 OK | 400, 401 |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes | 200 OK | 401, 404 |
| `GET` | `/api/dashboard/stats` | Aggregate dashboard KPI metrics | Yes | 200 OK | 401, 500 |
| `GET` | `/api/projects` | List projects (with search & filter) | Yes | 200 OK | 401 |
| `POST` | `/api/projects` | Create a new project | Yes | 201 Created | 400, 401 |
| `PUT` | `/api/projects/:id` | Update project details | Yes | 200 OK | 400, 403, 404 |
| `DELETE` | `/api/projects/:id` | Delete project and cascade tasks | Yes | 200 OK | 403, 404 |
| `GET` | `/api/tasks` | List tasks (pagination, filter, query) | Yes | 200 OK | 401 |
| `POST` | `/api/tasks` | Create a new task | Yes | 201 Created | 400, 401 |
| `GET` | `/api/tasks/:id` | Get single task details | Yes | 200 OK | 403, 404 |
| `PUT` | `/api/tasks/:id` | Update task details | Yes | 200 OK | 400, 403, 404 |
| `PATCH` | `/api/tasks/:id/status`| Quick status toggle/update | Yes | 200 OK | 400, 403, 404 |
| `DELETE` | `/api/tasks/:id` | Delete task | Yes | 200 OK | 403, 404 |

---

## 7. METHODOLOGY & DEVELOPMENT WORKFLOW

The project followed the **Agile Iterative Lifecycle** divided into 4 sequential sprints:
1. **Sprint 1 (Analysis & Wireframing):** Define problem, specify user stories, establish data schemas, and design screen mockups.
2. **Sprint 2 (Backend Engineering):** Initialize Node/Express server, configure database connection routines, establish authentication controllers, build task/project endpoints, and verify via Postman.
3. **Sprint 3 (Frontend Interface & State Integration):** Scaffold Vite React application, establish routing tree, construct reusable component library, integrate API service, and implement global AuthContext.
4. **Sprint 4 (Testing, Polish & Documentation):** End-to-end integration testing, UI state verification (Loading, Empty, Error, Success), responsiveness auditing across devices, and comprehensive SRS/documentation authoring.

---

## 8. PROJECT ACTIVITIES & IMPLEMENTATION MILESTONES

Following Section 12 of the ICTAK Student Reference Guide:

- **Milestone 1 (Project Defined):** Problem statement, MVP scope, user stories, data schemas, and API contracts formulated.
- **Milestone 2 (Repository & Skeleton):** Initialized Git version control, configured `.gitignore`, crafted `.env.example`, and structured `client/` and `server/` trees.
- **Milestone 3 (Database & API Engine):** Built Mongoose schemas for User, Project, and Task; constructed Express route controllers with input validation.
- **Milestone 4 (Authentication & Security):** Integrated JWT signing and verification, bcrypt hashing, and route protection middleware.
- **Milestone 5 (Frontend Screens):** Engineered Dashboard, Task Board, Project Management, User Profile, and Authentication screens.
- **Milestone 6 (API Client Integration):** Connected React components to backend endpoints through Axios/Fetch services using `VITE_API_URL`.
- **Milestone 7 (Quality Assurance & Hardening):** Verified CORS policies, deep link refreshes, input sanitization, and responsive breakpoints.
- **Milestone 8 (Packaging & Documentation):** Prepared `capstone.md`, `README.md`, setup scripts, and submission artifacts.

---

## 9. FOUR CORE UI STATES IMPLEMENTATION

In strict accordance with **Section 7.3 of the ICTAK Guide ("Every screen needs four states")**, the user interface guarantees full coverage across all states:

1. **Loading State:**
   - Visual skeletons and clean spinners are displayed while asynchronous HTTP requests are in flight.
   - Action buttons (e.g., "Saving...", "Logging in...") are disabled during submission to prevent duplicate transactions.
2. **Success State:**
   - Seamless presentation of structured data cards, interactive task lists, and analytical metric counters once data arrives.
   - Color-coded badges for status (`Completed` = green, `In Progress` = blue, `Pending` = amber) and priority (`Urgent` = red, `High` = orange, `Medium` = indigo, `Low` = slate).
3. **Empty State:**
   - When no records exist (e.g., a newly registered user with zero tasks or projects), a welcoming illustrative empty banner is rendered explaining what to do next with an instant "Create Your First Task" call-to-action button.
4. **Error State:**
   - Graceful alert banners and toast notifications displaying user-friendly, non-technical explanations whenever network drops or validations fail, coupled with a one-click "Retry" button.

---

## 10. SECURITY, PRIVACY & BEST PRACTICES

1. **Credential Protection:** Passwords are never stored in plain text; salted bcrypt hashes with 10 rounds are generated prior to saving.
2. **Ownership Enforcement:** Users are prevented from reading, updating, or deleting resources created by other users at the controller level (`if (task.user.toString() !== req.user._id.toString()) return res.status(403)...`).
3. **Environment Isolation:** Zero credentials or secrets in Git. Backend secrets (`PORT`, `MONGODB_URI`, `JWT_SECRET`) live strictly in `.env`.
4. **Input Sanitization & Injection Defense:** Parameter checks and sanitization prevent MongoDB query injection.
5. **CORS Whitelisting:** Express CORS middleware configured to authorize requests strictly from the designated frontend host.

---

## 11. TESTING, QUALITY ASSURANCE & DEBUGGING

| Test Suite | Scope | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Auth Test** | Registration with duplicate email | HTTP 409 Conflict with error message | 409 Conflict returned | **PASSED** |
| **Auth Test** | Login with invalid credentials | HTTP 401 Unauthorized | 401 Unauthorized returned | **PASSED** |
| **Auth Test** | Access protected route without token | HTTP 401 Access Denied | 401 Access Denied returned | **PASSED** |
| **Task Test** | Create task without required title | HTTP 400 Bad Request with validation message | 400 Bad Request returned | **PASSED** |
| **Task Test** | User A tries to delete User B's task | HTTP 403 Forbidden | 403 Forbidden returned | **PASSED** |
| **UI Test** | Toggle task status inline | Status updates immediately on card & dashboard | Dynamic re-render observed | **PASSED** |
| **UI Test** | Search filter by keyword | Real-time filtering matching task titles | Filters accurately | **PASSED** |
| **UI Test** | Deep-link page refresh (`/tasks`) | SPA route resolves without 404 error | Route loads successfully | **PASSED** |

---

## 12. RESULTS, FINDINGS & METRICS

1. **Comprehensive Task Management:** Users can manage multi-project task streams with zero lag.
2. **Productivity Metric Insights:** The dashboard aggregates task counts, computes completion ratios, and highlights overdue or urgent items.
3. **Clean Developer Experience:** The project architecture cleanly separates presentation, business logic, and persistence layers, ensuring frictionless maintainability.
4. **Resilient Local Execution:** The server includes an intelligent data layer that operates smoothly whether connected to MongoDB Atlas, local MongoDB, or standalone developer mode, guaranteeing that evaluators can run the solution without environment hurdles.

---

## 13. HOSTING & DEPLOYMENT GUIDE

Following Section 9 of the ICTAK Guide:
- **Frontend Hosting (Vercel / Netlify / Render):**
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Environment variable: `VITE_API_URL=https://your-api-domain.com`
  - SPA Rewrites rule (`_redirects` or `vercel.json`): `/* /index.html 200`
- **Backend API Hosting (Render / Railway / AWS):**
  - Build command: `npm install`
  - Start command: `node src/server.js`
  - Environment variables: `PORT=5000`, `MONGODB_URI=<Atlas_Connection_String>`, `JWT_SECRET=<Strong_Secret>`, `CLIENT_ORIGIN=https://your-frontend-domain.com`
- **Database (MongoDB Atlas):**
  - M0 Free Tier Cluster, network access whitelisted (0.0.0.0/0 or specific host IPs), dedicated application user credentials.

---

## 14. CONCLUSION & FUTURE ENHANCEMENTS

The **TaskTrack Pro** Capstone project fulfills all requirements established by the ICT Academy of Kerala (ICTAK) Full Stack Development Curriculum. The resulting application demonstrates mastery of the MERN architecture, secure authentication, reactive state management, and modern software engineering practices.

### Future Roadmap:
- **v1.1:** Real-time web socket notifications for multi-user collaboration.
- **v1.2:** File attachment support for task cards via AWS S3 / Cloudinary.
- **v1.3:** Calendar Gantt chart timeline view for visual sprint planning.

---

## 15. SELF-REVIEW & COMPLIANCE CHECKLIST

Based on Section 14 of the ICTAK Student Reference Guide:
- [x] **Can I explain the problem my project solves and who it is for in two sentences?** Yes: TaskTrack Pro provides an agile, role-based project and task workspace for developers and teams to track deliverables, deadlines, and real-time sprint metrics without the bloat of enterprise systems.
- [x] **Does the MVP work from start to finish without manual workarounds?** Yes: Full registration, login, project creation, task management, filtering, and dashboard analytics operate seamlessly.
- [x] **Can I trace one request from the React component to the database and back?** Yes: Form click -> React State -> `api.js` Axios call -> Express Route (`/api/tasks`) -> JWT Auth Middleware -> Task Controller -> Mongoose Model Query -> MongoDB BSON persistence -> JSON Response -> React State Update.
- [x] **What happens if the user enters bad input, loses internet, or the API fails?** Inline form feedback halts invalid payloads; centralized API error handlers display non-technical alert banners with retry buttons.
- [x] **Which data is protected, and how do I stop one user from reaching another user's data?** All private endpoints require valid JWT headers; controllers enforce strict equality between `req.user._id` and document owner IDs.
- [x] **Where are my secrets stored, and could anyone find them in the browser or on GitHub?** Secrets reside exclusively in server `.env` files which are strictly excluded via `.gitignore`.
- [x] **Does it work well on a phone and with a keyboard only?** Yes: Full responsive flex/grid layouts with accessible form labels and keyboard navigation.

---

## 16. APPENDIX

### Quick Start Commands
```bash
# Server setup
cd server
npm install
npm run dev

# Client setup
cd client
npm install
npm run dev
```

ICT Academy of Kerala © 2026. All rights reserved.
