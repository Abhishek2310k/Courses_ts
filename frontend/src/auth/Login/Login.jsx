import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './Login.scss';
const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const submitInfo = async (e) => {
    e.preventDefault();
    const login_resp = await axios.post('http://localhost:8080/user/login',{
      email:email,
      password:password
    });
    if (login_resp.status === 200) {
      console.log(login_resp);
      // window.location.href = "/";
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
      </div>
    </div>
  )
}

export default Login