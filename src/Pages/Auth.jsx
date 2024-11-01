import React, { useState,useContext } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { registerApi, loginApi } from '../Services/allApis';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../Context/TokenContext';

function Auth() {
  const [authStatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState({
    email: "", username: "", password: ""
  });
  const nav = useNavigate();
  const {tokenStatus,setTokenStatus}=useContext(tokenContext)

  const handleRegister = async () => {
    const { email, username, password } = user;
    if (!email || !username || !password) {
      toast.warning("Enter Valid Data");
    } else {
      const res = await registerApi(user);
      if (res.status === 200) {
        toast.success("Registration Successful");
        setUser({
          email: "", username: "", password: ""
        });
        changeAuth();
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (authStatus) {
        handleRegister();
      } else {
        handleLogin();
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = user;
    if (!email || !password) {
      toast.error("Login Failed");
    } else {
      const res = await loginApi(user);
      if (res.status === 200) {
        toast.success("Login Successful");
        setUser({
          email: "", username: "", password: ""
        });
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('username',res.data.username)
        sessionStorage.setItem('github',res.data.github)
        sessionStorage.setItem('linkedin',res.data.linkedin)
        sessionStorage.setItem('profile',res.data.profile)
        setTokenStatus(true)
        nav('/dash');
      } else {
        toast.error(res.response.data);
      }
    }
  };

  const changeAuth = () => {
    setAuthStatus(!authStatus);
    setUser({
      email: "", username: "", password: ""
    });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="w-75 border shadow p-4 row">
        <div className='col'>
          <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg" alt="" className='img-fluid' />
        </div>
        <div className="col bg-light">
          <h2>{authStatus ? 'User Registration' : 'Login'}</h2>
          <FloatingLabel controlId="floatingInput" label="Email address" className="my-3">
            <Form.Control
              type="email"
              value={user.email}
              placeholder="name@example.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              onKeyDown={handleKeyPress} 
            />
          </FloatingLabel>
          {authStatus && (
            <FloatingLabel controlId="floatingPassword" label="Username" className='mb-3'>
              <Form.Control
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                onKeyDown={handleKeyPress} 
              />
            </FloatingLabel>
          )}
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              onKeyDown={handleKeyPress} 
            />
          </FloatingLabel>
          <div className="d-flex justify-content-between mt-4">
            {authStatus ? (
              <button className="btn btn-success" onClick={handleRegister}>Register</button>
            ) : (
              <button className="btn btn-info" onClick={handleLogin}>Login</button>
            )}
            <button className="btn btn-link" onClick={changeAuth}>
              {authStatus ? 'Already a user?' : 'New user?'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
