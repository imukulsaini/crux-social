import { NavBar } from "../components/Navbar/Nav";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { checkUserCredentials } from "../../api/user/userApi";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { ReactComponent as BrandLogo } from "../../assets/BrandLogo.svg";
import "./signin.css";

export function SignIn() {
  const { error, loginStatus } = useSelector((state) => state.users);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const checkautoBox = watch("autoFill");

  useEffect(() => {
    if (loginStatus === "fulfilled") {
      navigate(state?.from ? state.from : "/");
    }
  }, [loginStatus]);

  useEffect(() => {
    if (checkautoBox === "yes") {
      setValue("username", process.env.REACT_APP_USERNAME);
      setValue("password", process.env.REACT_APP_PASSWORD);
    } else {
      setValue("username", "");
      setValue("password", "");
    }
  }, [checkautoBox]);

  function userLogin(data) {
    const { username, password } = data;

    dispatch(checkUserCredentials({ username, password }));
  }

  return (
    <div className="sign-in">
      <section className="sign-in__main">
        <div className="sign-in__main-container">
          <div className="sign-in__form">
            <div className="sign-in__main-header">
              <div className="brand__logo sign__logo">
                <BrandLogo />
              </div>
              <h2 className="sign-in__header-name">Login</h2>
            </div>

            <form
              className="sign-in__form-info"
              onSubmit={handleSubmit(userLogin)}
            >
              <div className="username-info">
                <label htmlFor="username" className="sign-in-label">
                  Username
                </label>
                <input
                  placeholder="johnwick"
                  className="sign-in__input"
                  type="text"
                  id="login-username"
                  {...register("username", {
                    required: "This field is required",
                  })}
                />
                {errors.username && (
                  <span className="sign-in__error">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="password-info">
                <label htmlFor="password" className="sign-in-label">
                  Password
                </label>

                <input
                  {...register("password", {
                    required: "This field is required",
                  })}
                  placeholder="**************"
                  className="sign-in__input"
                  type="password"
                  id="login-password"
                />
                {errors.password && (
                  <span className="sign-in__error">
                    {errors.password.message}
                  </span>
                )}
              </div>
              {loginStatus === "rejected" && (
                <span className="sign-in__error txt-center">{error}</span>
              )}
              <div className="auto-fill__data">
                <input
                  type="checkbox"
                  name="auto-fill__input"
                  value="yes"
                  {...register("autoFill")}
                />
                <label htmlFor="auto-fill">Auto Fill</label>
              </div>
              <button type="submit" className="sign-in__button">
                Sign In
                {loginStatus === "pending" && (
                  <span className="spinner-indicator">
                    <LoadingSpinner
                      isDefaultCss={false}
                      color="white"
                      size={"12"}
                    />
                  </span>
                )}
              </button>
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
