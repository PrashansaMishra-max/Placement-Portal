import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import DynamicBackground from './components/shared/DynamicBackground'
import IntroScreen from './components/IntroScreen'

import Home from './components/Home'
import StudentDashboard from './components/StudentDashboard'
import Jobs from './components/Jobs'
import JobDescription from './components/JobDescription'
import Profile from './components/Profile'
import Help from './components/Help'
import Contact from './components/Contact'

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

import RecruiterDashboard from './components/admin/RecruiterDashboard'
import CreateJob from './components/admin/CreateJob'
import Applicants from './components/admin/Applicants'

const withBackground = (Component) => <DynamicBackground>{Component}</DynamicBackground>;

const appRouter = createBrowserRouter([
  { path: '/', element: <IntroScreen /> },
  { path: '/home', element: withBackground(<Home />) },
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
  { path: '/admin/jobs/:id/applicants', element: withBackground(<Applicants />) },
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App