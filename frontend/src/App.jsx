import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Layout/Style Helpers
import DynamicBackground from './components/shared/DynamicBackground'

// Core Student & Platform Interfaces
import Home from './components/Home'
import StudentDashboard from './components/StudentDashboard'
import Jobs from './components/Jobs'
import JobDescription from './components/JobDescription'
import Profile from './components/Profile'
import Help from './components/Help'       
import Contact from './components/Contact' 

// Auth Nested Path Checks
import Login from './components/auth/Login'   
import Signup from './components/auth/Signup' 

// Recruiter Workspace Management Components
import RecruiterDashboard from './components/admin/RecruiterDashboard'
import CreateJob from './components/admin/CreateJob'
import Applicants from './components/admin/Applicants'

// Unified Function to inject the background container cleanly without duplicate boilerplate code blocks
const withBackground = (Component) => <DynamicBackground>{Component}</DynamicBackground>;

const appRouter = createBrowserRouter([
  { path: '/', element: withBackground(<Home />) },
  { path: '/login', element: withBackground(<Login />) },
  { path: '/signup', element: withBackground(<Signup />) },
  { path: '/dashboard', element: withBackground(<StudentDashboard />) },
  { path: '/jobs', element: withBackground(<Jobs />) },
  { path: '/jobs/description/:id', element: withBackground(<JobDescription />) },
  { path: '/profile', element: withBackground(<Profile />) },
  { path: '/help', element: withBackground(<Help />) },
  { path: '/contact', element: withBackground(<Contact />) },
  { path: '/admin/dashboard', element: withBackground(<RecruiterDashboard />) },
  { path: '/admin/jobs/create', element: withBackground(<CreateJob />) },
  { path: '/admin/jobs/:id/applicants', element: withBackground(<Applicants />) }
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App