import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './Signup.scss';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const submitInfo = async (e) => {
    e.preventDefault();
    const login_resp = await axios.post('http://localhost:8080/user/signup',{
      email:email,
      password:password,
      userName:userName
    });
    if (login_resp.status === 200) {
      console.log(login_resp);
      navigate('/login');
    }
  }

  return (
    <div className='login'>
      <div className='login_form'>
        <h1>LogIn</h1>
        <form onSubmit={(e) => submitInfo(e)}>
          <label>
            Email : 
            <input
            placeholder='Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type='email'
            />
          </label>
          <label>
            Username : 
            <input
            placeholder='username'
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            type='text'
            />
          </label>
          <label>
            Password : 
            <input
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type='password'
            />
          </label>
          <button type='submit'>Submit</button>
        </form>
        <span> Already have an account? <a href='/login'>Login</a></span>
      </div>
    </div>
  )
}

export default Signup