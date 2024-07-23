import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);

  const submitInfo = async (e) => {
    e.preventDefault();
    try {
      const login_resp = await axios.post('http://localhost:8080/user/login', {
        email: email,
        password: password
      });

      if (login_resp.status === 200) {
        console.log(login_resp);
        if (login_resp.data.error === true) {
          alert(login_resp.data.message);
        } else {
          setCookie('user', login_resp.data.data, { path: '/' });
          alert('Login successful');
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  // Navigate to home page if login is successfu
  return (
    <div className='login'>
      <div className='login_form'>
        <h1>Log In</h1>
        <form onSubmit={submitInfo}>
          <label>
            Email:
            <input
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
            />
          </label>
          <label>
            Password:
            <input
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
          </label>
          <button type='submit'>Submit</button>
        </form>
        <span>Don't have an account? <a href='/signup'>Signup</a></span>
      </div>
    </div>
  );
};

export default Login;
