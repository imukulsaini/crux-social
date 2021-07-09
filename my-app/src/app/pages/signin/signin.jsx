import { NavBar } from "../components/navbar/nav";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { checkUserCredentials } from "../../../features/User/userApi";

import "./signin.css";

export function SignIn() {

  const [loginForm , setLoginForm] = useState({
    username:'',
    password:''
  });

  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

async function userLogin(event){
event.preventDefault();
await dispatch(checkUserCredentials(loginForm))
navigate('/me')
}

  return (
    <div className="sign-in">
      <NavBar />

      <section className="sign-in__main">
        <div className="sign-in__main-header">
          <h2 className="sign-in__header-name">Login</h2>
        </div>
        <div className="sign-in__form">
          <form className="sign-in__form-info flx-cl gp-1">
            <div className="username-info flx-cl">
              <label
              
              htmlFor="username" className="username-label lbl-fm">
                username
              </label>
              <input
                onChange={(event)=>setLoginForm({...loginForm , username:event.target.value})}
                value={loginForm.username}
                placeholder="user name"
                className="input-info"
                type="text"
                id="login-username"
              />
            </div>

            <div className="password-info flx-cl">
              <label htmlFor="password" className="password-label lbl-fm">
                password
              </label>
              <input
               onChange={(event)=>setLoginForm({...loginForm , password:event.target.value})}
               value={loginForm.password}
                placeholder="password "
                className="input-info"
                type="password"
                id="login-password"
              />{" "}
            </div>

            <div className="sign-in__button-info">
              <button 
              onClick={(event)=>userLogin(event)}
              type="submit" className="sign-in-button btn-form fcs-btn">
                Sign In
              </button>
              <button type="submit" className="sign-up-button btn-form ">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}


