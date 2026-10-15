# 📝 techNotes Frontend — Service Desk Dashboard

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

> techNotes is a modern service desk and note management application for employees. It provides secure authentication, role-based access control, and a clean interface for managing notes and team users.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [🧭 Application Flow](#-application-flow)
- [🌐 Deployment](#-deployment)

---

## ✨ Features

- Secure employee login with JWT-based authentication.
- Protected routes and role-based authorization for employees, managers, and administrators.
- Notes dashboard with create, view, edit, and delete actions.
- User management for administrators and managers.
- Persistent login support with a trusted-device option.
- Responsive layout for desktop and mobile usage.
- Light and dark mode support with preference persistence.
- Integrated API refresh flow for expired access tokens.
- Clean service-desk interface designed for day-to-day operations.

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Frontend Framework | React 19 |
| Build Tool | Vite |
| State Management | Redux Toolkit |
| API Layer | RTK Query |
| Routing | React Router DOM |
| Styling | Custom CSS |
| Authentication | JWT + secure backend API |
| Deployment | Vercel |
| Testing | Jest + React Testing Library |

## 📁 Project Structure

```text
.
├── public/
│   ├── favicon.svg                 # Browser tab icon
│   └── icons.svg                   # Additional icon asset
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── apiSlice.js         # Base RTK Query config, auth header injection, refresh logic
│   │   └── store.js                # Redux store configuration and middleware setup
│   ├── assets/
│   │   ├── hero.png                # Landing-page visual asset
│   │   ├── react.svg               # React logo asset
│   │   └── vite.svg                # Vite logo asset
│   ├── components/
│   │   ├── DashFooter.jsx          # Dashboard footer for protected pages
│   │   ├── DashHeader.jsx          # Top navigation for the dashboard
│   │   ├── DashLayout.jsx          # Dashboard wrapper layout
│   │   ├── Layout.jsx              # Shared outlet-based page layout
│   │   ├── Public.jsx              # Public landing page before login
│   │   └── Public.test.jsx         # Test for the public landing page
│   ├── config/
│   │   └── roles.js                # Role constants: Employee, Manager, Admin
│   ├── features/
│   │   ├── auth/
│   │   │   ├── Login.jsx           # Employee login form and authentication flow
│   │   │   ├── PersistLogin.jsx    # Rehydrates login state for trusted devices
│   │   │   ├── Prefetch.jsx        # Loads relevant data before protected routes render
│   │   │   ├── RequireAuth.jsx     # Role-based route guard
│   │   │   ├── Welcome.jsx         # Dashboard welcome screen after login
│   │   │   ├── Welcome.test.jsx    # Test for welcome page behavior
│   │   │   ├── authApiSlice.js     # RTK Query auth endpoints (login/logout/refresh)
│   │   │   └── authSlice.js        # Redux slice for auth token state
│   │   ├── notes/
│   │   │   ├── EditNote.jsx        # Edit-note page route
│   │   │   ├── EditNoteForm.jsx    # Form for updating note data
│   │   │   ├── NewNote.jsx         # New-note page route
│   │   │   ├── NewNoteForm.jsx     # Form for creating notes
│   │   │   ├── Note.jsx            # Individual note display component
│   │   │   ├── NotesList.jsx       # Main note list and note management UI
│   │   │   └── notesApiSlice.js    # RTK Query endpoints for note CRUD
│   │   └── users/
│   │       ├── EditUser.jsx        # Edit-user page route
│   │       ├── EditUserForm.jsx    # Form for updating user data
│   │       ├── NewUserForm.jsx     # User creation form
│   │       ├── User.jsx            # Individual user row/card component
│   │       ├── UsersList.jsx       # User management list screen
│   │       └── usersApiSlice.js    # RTK Query endpoints for user CRUD
│   ├── hooks/
│   │   ├── useAuth.js              # Hook for reading current auth state
│   │   ├── usePersist.js           # Persists login trust preference in localStorage
│   │   └── useTitle.js             # Updates browser document title by route
│   ├── App.css                     # Custom component styling
│   ├── App.jsx                     # Top-level route configuration and protected app flow
│   ├── index.css                   # Global styles, theme variables, layout, forms, and utilities
│   └── main.jsx                    # React application bootstrap and router/provider setup
├── .gitignore                      # Git ignore rules
├── babel.config.cjs                # Babel config for Jest and JSX transpilation
├── eslint.config.js                # ESLint config for JS/React linting
├── index.html                      # App entry HTML document
├── jest.config.cjs                 # Jest test configuration
├── jest.setup.cjs                  # Jest environment setup file
├── package-lock.json               # Locked dependency versions
├── package.json                    # Project scripts and dependencies
├── README.md                       # Project documentation
├── UserStories.md                  # Business/user story requirements
├── vercel.json                     # Vercel SPA rewrite configuration
├── vite.config.js                  # Vite configuration
└── .venv                           # Local Python environment (not part of app runtime)
```

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or another package manager

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The application will start in development mode and is usually available at:

```text
http://localhost:5173
```

### Production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🔐 Environment Variables

This frontend connects to the backend API. The current project is configured with a backend base URL in `src/app/api/apiSlice.js`.

If you want to externalize the API URL, add a variable like this to a `.env` file:

```env
VITE_API_URL=https://your-backend-api-url.com
```

Then update the base query configuration to use it instead of the hardcoded URL.

## 🧭 Application Flow

### Public access

- Landing page
- Employee login page

### Protected dashboard

Once authenticated, users can access the main dashboard and features based on their role:

- `Employee`: view and manage assigned notes
- `Manager`: manage notes and team users
- `Admin`: full system access, including user administration

### Main sections

- Dashboard welcome view
- Notes management
- User management
- Role-aware access control
- Persistent session handling

## 🌐 Deployment

This project is configured for deployment on Vercel.

The root `vercel.json` file ensures the app handles client-side routing correctly:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploy steps

1. Push the project to your GitHub repository.
2. Import the repository in Vercel.
3. Select the project root as the deployment directory.
4. Deploy the app.
5. Ensure the backend API URL is configured correctly for production.

---

## 📌 Notes

This frontend application is designed to work with the techNotes backend API. For full functionality, the backend must be running and accessible, including authentication and refresh-token endpoints.

For more product context, see the project user stories in `UserStories.md`.

---

Developed with ❤️ to deliver a seamless and empowering service experience for modern teams.
