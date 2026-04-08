import './App.css'
import Home from '../pages/Home'
import Tours from '../pages/Tours';

import HomeFooter from "../components/HomeFooter";
import Navbar from "../components/NavBar";
import TourDetails from '../pages/TourDetails'
import TourBookings from '../pages/TourBookings'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import About from '../pages/About'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Register from '../pages/Register'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Navbar />
        {/* Change this: wrap Outlet in a div with mt-20 or margin-top */}
        <div style={{ marginTop: '100px', }}>
          <Outlet />
        </div>
        <HomeFooter />
      </>,
      children: [
        { path: '/', element: <Home /> },
        { path: 'tour', element: <Tours /> },
        { path: 'tour/:id', element: <TourDetails /> },
        { path: 'bookings', element: <TourBookings  /> },
        { path:  'about', element: <About/> },
        { path:'contact',element: <Contact/>},
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> }
      ]
    }
  ])

  return (

    <RouterProvider router={router} />

  )
}

export default App
