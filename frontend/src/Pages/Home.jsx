import React, { useState, useEffect,useContext } from 'react';
import noteContext from '../context/noteContext';
import Cookies from 'js-cookie'; // Import js-cookie
import {jwtDecode} from 'jwt-decode';
const Home = () => {
  const a = useContext(noteContext);
  const update_fun = a.setUserLogin;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const decodedUser = jwtDecode(userCookie);
        setUser(decodedUser);
        update_fun(decodedUser);
      } catch (error) {
        console.error('Error decoding user cookie:', error);
      }
    }
  }, []);

    return (
        <div className='home'>
            <h1>Welcome to Home Page</h1>
            {user ? (
                <div>
                    <p>Email: {user.email}</p>
                    <p>userName: {user.userName}</p>
                </div>
            ) : (
                <p>Please log in to view this content</p>
            )}
        </div>
    );
}

export default Home;
