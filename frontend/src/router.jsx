import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/common/ScrollToTop'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <ScrollToTop />
          <Landing />
        </>
      )
    },
    {
      path: '/dashboard/*',
      element: (
        <>
          <ScrollToTop />
          <Dashboard />
        </>
      )
    },
    {
      path: '/auth/login',
      element: (
        <>
          <ScrollToTop />
          <Login />
        </>
      )
    },
    {
      path: '/auth/signup',
      element: (
        <>
          <ScrollToTop />
          <Signup />
        </>
      )
    },
    {
      path: '*',
      element: (
        <>
          <ScrollToTop />
          <NotFound />
        </>
      )
    }
  ])

  return <RouterProvider router={router} />
}

export default Router