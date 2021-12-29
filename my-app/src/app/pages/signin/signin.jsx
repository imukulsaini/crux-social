import { NavBar } from "../components/navbar/nav";
import { useNavigate, useLocation } from "react-router-dom";
import {useState } from "react";
import { useDispatch } from "react-redux";
import { checkUserCredentials } from "../../../features/User/userApi";
import { Link } from "react-router-dom";
import "./signin.css";

export function SignIn() {
  // error handling form spinner toast error 
  // const { token, status } = useSelector((state) => state.users);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  async function userLogin(event) {

  event.preventDefault();
  const response = await dispatch(checkUserCredentials({username,password}));
  if(response){

    navigate(state?.from  ? state.from : '/');
  }

  }


  return (
    <div className="sign-in">
      <NavBar />

      <section className="sign-in__main">
        <div className="sign-in__main-container">
          <div className="sign-in__form">
            <div className="sign-in__main-header">
              <div className="brand__logo sign__logo">
                {/* <BrandLogo fill="#fc7551" stroke="white" /> */}
              </div>
              <h2 className="sign-in__header-name">Login</h2>
            </div>

            <form className="sign-in__form-info">
              <div className="username-info">
                <span htmlFor="username" className="sign-in-label">
                  Username
                </span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="sign-in__input"
                  type="text"
                  id="login-username"
                />
                <span className="sign-in__error">Please Fill this field</span>
              </div>

              <div className="password-info">
                <span htmlFor="password" className="sign-in-label">
                  Password
                </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="password "
                  className="sign-in__input"
                  type="password"
                  id="login-password"
                />
                <span className="sign-in__error">Please Fill this field</span>
              </div>

              <button
                onClick={(e) => userLogin(e)}
                type="submit"
                className="sign-in__button"
              >
                Sign In
              </button>

              {/* {loading === "pending" && <h1>Loading....</h1>} */}
              {/* {loading === "fulfilled" && <h1>Pass Ho Gya re </h1>} */}
              {/* {loading === "rejected" && <h1>{error}</h1>} */}
            </form>
            <div className="register__action">
              <span className="register__action-info">or</span>
              <Link to="/register" className="create-account-action">
                create an account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="right"></div>
      <div className="left"></div>
    </div>
  );
}
