import { NavBar } from "../components/navbar/nav";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser } from "../../../features/User/userApi";
import { useDispatch } from "react-redux";
import { useState } from "react";
export function SignUp() {
  //error handling  form spinner 
  const [firstName , setFirstName ] = useState('');
  const [lastName , setLastName ] = useState('');
  const [email , setEmail ] = useState('');
  const [password ,setPassword ] = useState('');
  const [cpassword ,setCPassword ] = useState('');
  const [username ,setUsername ] = useState('');






  const dispatch = useDispatch();

  const navigate = useNavigate();

async function signup(e){
  
e.preventDefault()
 const response = await dispatch(createNewUser({firstName,email,lastName,username,password}));
 if(response){
  navigate('/')

 }
}

  return (
    <div className="sign-up">
      <NavBar />
      <section className="sign-up__main">
        <div className="sign-up__main-container">
          <div className="sign-up__form">
            <div className="sign-up__main-header">
              <div className="brand__logo sign-up__logo">
                {/* <BrandLogo fill="#fc7551" stroke="white" /> */}
              </div>
              <h2 className="sign-in__header-name">Create An Account</h2>
            </div>

            <form className="sign-up__form-actions">
              <div className="sign-up__name">
                <div className="user__first-name">
                  <label className="user__name-label"> First name </label>
                  <input
                    value={firstName}
                    onChange={e=>setFirstName(e.target.value)}
                    name="firstName"
                    type="text"
                    placeholder="first name"
                    className="user__input-name"
                  />
                  {/* <span className="sign-up__error">
                  please fill out this field
                </span> */}
                </div>

                <div className="user__last-name">
                  <label className="user__name-label"> Last name </label>
                  <input
                    value={lastName}
                    onChange={e=>setLastName(e.target.value)}
                    name="lastName"
                    type="text"
                    placeholder="last name"
                    className="user__input-name"
                  />
                  {/* <span className="sign-up__error">
                  please fill out this field
                </span> */}
                </div>
              </div>

              <div className="user__email">
                <label className="sign-up__label email-lb">Email</label>
                <input
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  placeholder='mukul@xyz.com'

                  name="email"
                  type="email"
                  className="sign-up__input email-in"
                />
                {/* <span className="sign-up__error">please fill out this field</span> */}
              </div>

              <div className="user__username">
                <label className="sign-up__label username-lb">Username</label>
                <input
                  value={username}
                  onChange={e=>setUsername(e.target.value)}
                  placeholder='mukulxyz'
                  name="username"
                  type="text"
                  className="sign-up__input username-in"
                />
                {/* <span className="sign-up__error">please fill out this field</span> */}
              </div>

              <div className="user__password">
                <label className="sign-up__label password-lb">Password</label>
                <input
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  placeholder='********************'

                  name="password"
                  type="password"
                  className="sign-up__input password-in"
                />
                {/* <span className="sign-up__error">please fill out this field</span> */}
              </div>

              <div className="user__password">
                <label className="sign-up__label cpassword-lb">
                  Confirm password
                </label>
                <input
                  value={cpassword}
                  onChange={e=>setCPassword(e.target.value)}
                 placeholder='********************'
                  name="confirm-password"
                  type="password"
                  className="sign-up__input cpassword-in"
                />
                {/* <span className="sign-up__error">please fill out this field</span> */}
              </div>

              <button
              onClick={signup}
              type="submit" className="sign-up-button">
                Sign Up
              </button>
            </form>
            {/* {loading === "pending" && <h1>Loading....</h1>}
            {loading === "fulfilled" && <h1>Pass Ho Gya re </h1>}
            {loading === "rejected" && <h1>{error}</h1>}
            {formError && <span>{formError}</span>} */}
            <div className="login__action">
              <span className="login__action-choice">or</span>

              <span className="login__route-info">
                Already Register
                <Link to="/login" className="login__route">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="sign-up__right"></div>
      <div className="sign-up__left"></div>
    </div>
  );
}
