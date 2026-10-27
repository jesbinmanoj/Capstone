# TaskTrack Pro — Enterprise Agile Project & Task Management System
### ICT Academy of Kerala (ICTAK) | Full Stack Application Development with ReactJS (MERN Stack)
### Summer Internship Capstone Project & Paatshala Submission

[![MERN Stack](https://img.shields.io/badge/Stack-MongoDB%20%7C%20Express%20%7C%20React%20%7C%20Node.js-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Frontend-Vite%20%2B%20React%2018-646cff.svg)](https://vitejs.dev)
[![Security](https://img.shields.io/badge/Security-JWT%20%2B%20Bcrypt%20Salted-green.svg)](https://jwt.io)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 1. Project Overview & Problem Statement

**Problem Statement:**  
Modern software engineering teams, interns, and academic cohorts often struggle with fragmented communication, missed sprint deadlines, and lack of real-time visibility into project deliverables when using traditional spreadsheets or bloated, subscription-gated enterprise platforms.

**Solution:**  
**TaskTrack Pro** is a responsive, secure, full-stack MERN application that provides a centralized Agile workspace for organizing project portfolios, tracking categorized deliverables, monitoring velocity through interactive KPI dashboards, and enforcing strict role-based access control (RBAC).

---

## 2. Key Features

- **🔐 Robust Authentication & RBAC:**
  - Secure registration & login powered by JSON Web Tokens (JWT) and salted `bcryptjs` password hashing.
  - Role-based authorization (`user` vs `admin`) with strict server-side ownership checks.
- **📊 Real-Time Analytics Dashboard:**
  - Aggregated KPIs: Total Tasks, Completed, In-Progress, Pending, Urgent/High Priority.
  - Interactive sprint progress meter calculating dynamic completion velocity.
  - Recent deliverables log with 1-click status cycling (`Pending` ➔ `In Progress` ➔ `Completed`).
- **📋 Sprint Task Board (Full CRUD):**
  - Create, read, update, and delete tasks with priority flags (`Low`, `Medium`, `High`, `Urgent`), deadline date pickers, project associations, and tag taxonomies.
  - Real-time search by keyword and multi-parameter filters (Status, Priority, Project).
- **📁 Project Workspaces:**
  - Multi-project grouping with categorization (`Development`, `Design`, `Research`, `Marketing`, `General`).
  - Progress percentage visualization computed dynamically from associated task completion ratios.
  - Cascading deletion handling ensuring database referential integrity.
- **🎨 Complete 4-State UI Implementation:**
  - **Loading State:** Polished spinners and responsive skeletons during asynchronous API calls.
  - **Success State:** Dynamic cards, tables, badges, and progress meters.
  - **Empty State:** Friendly illustrations and direct "Call to Action" buttons when no items match.
  - **Error State:** Non-technical alert banners with immediate "Retry" recovery buttons.

---

## 3. MERN Architecture

```
+-----------------------------------------------------------+
|                   Client Browser (React SPA)              |
|        Vite • React 18 • React Router DOM • Lucide        |
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

---

## 4. Project Directory Structure

```
CAP/
├── capstone.md                 # Complete Software Requirements Specification (SRS) & Report
├── capstone                    # Plain copy for submission compatibility
├── README.md                   # Project documentation & evaluator guide
├── start.bat                   # 1-Click launcher script for Windows
├── .gitignore                  # Git exclusion rules
│
├── server/                     # Node.js & Express REST API
│   ├── src/
│   │   ├── config/             # DB connection (MongoDB + intelligent in-memory fallback)
│   │   ├── controllers/        # Request processing & business logic
│   │   ├── middleware/         # JWT verification, role authorization, error handling
│   │   ├── models/             # Mongoose schemas (User, Project, Task)
│   │   ├── routes/             # REST URL route bindings
│   │   └── server.js           # Express app bootstrap
│   ├── .env.example            # Backend environment template
│   ├── .env                    # Active local environment
│   └── package.json
│
└── client/                     # React Single Page Application (Vite)
    ├── src/
    │   ├── components/         # Reusable UI widgets (Navbar, Sidebar, Modals, Spinners)
    │   ├── context/            # Global AuthContext & state provider
    │   ├── pages/              # Route views (Dashboard, Tasks, Projects, Profile, Auth)
    │   ├── services/           # Axios API client layer with Bearer token injection
    │   ├── App.jsx             # SPA router & route guards
    │   ├── index.css           # Modern design system
    │   └── main.jsx
    ├── .env.example            # Frontend environment template
    ├── .env                    # Active local environment
    ├── vite.config.js
    ├── index.html
    └── package.json
```

---

## 5. Quick Start & Local Setup

### Option A: One-Click Windows Launch (Recommended)
Simply double-click `start.bat` in the project root. This automatically starts both the Express server on port 5000 and the Vite development client on port 5173, and opens your browser.

---

### Option B: Manual Command Line Setup

#### Step 1: Start the Backend Server
```bash
cd server
npm install
npm run dev
```
*The server will start at `http://localhost:5000`.*  
*(Note: An intelligent built-in fallback store ensures the API runs seamlessly even if a local MongoDB service is not currently active).*

#### Step 2: Start the React Client
Open a second terminal window:
```bash
cd client
npm install
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

## 6. Pre-configured Evaluator Demo Credentials

For quick evaluation without filling registration forms:

| Role | Email Address | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **Intern Developer** | `intern@ictak.org` | `intern123` | Full CRUD on personal tasks and projects |
| **Lead Admin** | `admin@ictak.org` | `admin123` | Global workspace visibility & project supervision |

*(You can also register a brand new custom account anytime on the `/register` screen).*

---

## 7. REST API Contract

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes |
| `GET` | `/api/dashboard/stats` | Retrieve workspace KPIs and metrics | Yes |
| `GET` | `/api/projects` | List projects (with search/filter) | Yes |
| `POST` | `/api/projects` | Create a new project | Yes |
| `PUT` | `/api/projects/:id` | Update project metadata | Yes |
| `DELETE` | `/api/projects/:id` | Delete project and associated tasks | Yes |
| `GET` | `/api/tasks` | List tasks (pagination, filter, search) | Yes |
| `POST` | `/api/tasks` | Create new task deliverable | Yes |
| `GET` | `/api/tasks/:id` | Retrieve single task | Yes |
| `PUT` | `/api/tasks/:id` | Update task details | Yes |
| `PATCH` | `/api/tasks/:id/status` | Quick toggle/cycle task status | Yes |
| `DELETE` | `/api/tasks/:id` | Delete task deliverable | Yes |

---

## 8. Paatshala ICTAK Submission Checklist

As required by **ICT Academy of Kerala (ICTAK) Paatshala Submission Guidelines**:
- [x] **Software Requirements Specification (SRS):** Generated in `capstone.md` with complete functional, non-functional, and data model specifications.
- [x] **GitHub Repository:** Clean repository structure initialized with `.gitignore`, separated `client/` and `server/` trees, and meaningful commit messages.
- [x] **Live Architecture & Code Quality:** RESTful separation of concerns, JWT authorization, bcrypt hashing, and input validation.
- [x] **Four UI States:** Loading spinner, Success cards, Empty placeholder, and Error banners with retry actions verified.
- [x] **Security Compliance:** Zero committed credentials; environment parameters strictly isolated in `.env.example`.

---

ICT Academy of Kerala © 2026. Capstone Project Submission.
