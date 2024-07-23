import React, {useContext } from 'react';
import noteContext from '../../context/noteContext';
import { CgProfile } from 'react-icons/cg';
import Cookies from 'js-cookie'; // Import js-cookie

import './Navbar.scss';
const Navbar = () => {
  
  const user = useContext(noteContext).user_login;
  const handleLogout = () => {
    Cookies.remove('user'); 
    window.location.reload(); 
  };

  return (
    <div className="navbar">
      <div className="company_name">
        <h1>CourseMate</h1>
        <img alt="study" src="/study.png" />
      </div>
      <div className="links">
        <a href="/get_courses"><span>Courses</span></a>
        {user === null ? (
          <a href="/login"><span>Login</span></a>
        ) : (
          <>
            <a href="/profile"><span><CgProfile /></span></a>
            <a href="#logout" onClick={handleLogout}>Logout</a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
