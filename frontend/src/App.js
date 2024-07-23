import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import {jwtDecode} from 'jwt-decode';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import Layout from './layout/Layout/Layout';
import Login from './auth/Login/Login';
import Get_courses from './Pages/Get_courses/Get_courses';
import Profile from './Pages/Profile/Profile';
import Add_course from './Pages/Add_course/Add_course';
import Edit_course from './Pages/Edit_course/Edit_course';
import Detailed_course from './Pages/Detailed_course/Detailed_course';
import Signup from './auth/Signup/Signup';
import NoteState from './context/noteState';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const decodedUser = jwtDecode(userCookie);
        setUser(decodedUser);
      } catch (error) {
        console.error('Error decoding user cookie:', error);
      }
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout ><Home /></Layout>,
    },
    {
      path: "/login",
      element: <Layout ><Login /></Layout>
    },
    {
      path: "/get_courses",
      element: <Layout ><Get_courses /></Layout>
    },
    {
      path: "/profile",
      element: <Layout ><Profile /></Layout>
    },
    {
      path: "/add_course",
      element: <Layout > <Add_course /> </Layout>
    },
    {
      path: "/edit_course/:id",
      element: <Layout > <Edit_course /> </Layout>
    },
    {
      path: "/detailed_course/:id",
      element: <Layout > <Detailed_course /> </Layout>
    },
    {
      path: "/signup",
      element: <Layout><Signup /></Layout>
    }
  ]);

  return (
    <NoteState>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </NoteState>
  );
}

export default App;
