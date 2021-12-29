// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';







import React, { useEffect } from "react";
import { Home } from "./app/pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router";
import {
  ProfilePage,
  UserBookmark,
  UserLikes,
  UserPosts,
} from "./app/pages/Profile/Profile";
import { SignIn } from "./app/pages/signin/signin";
import { SignUp } from "./app/pages/signup/signup";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "./features/User/userApi";
import jwt_decode from "jwt-decode";
import { Messages } from "./app/pages/components/Messages/Messages";
import { Notification } from "./app/pages/components/notification/Notification";
import { AccountSettings } from "./app/pages/Account/Account";
import { ProfileSettings } from "./app/pages/Account/ProfileSettings";
import { AccountProfileSetting } from "./app/pages/Account/AccountSettings";
import "./App.css";
import { PostID } from "./app/pages/PostID/PostID";

function App() {
  const { token, status, isUserLogin } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {

    if ((status === "idle") | (isUserLogin === false)) {
      if (token) {
        const { userID } = jwt_decode(token);

        dispatch(getUserData({ userID, token }));

        // navigate(state?.from ? state.from : "/");
      } else {
        navigate("/login");
      }
    }
  }, []);



  function PrivateRoute({ path, ...props }) {
    return isUserLogin === true ? (
      <Route path={path} {...props} />
    ) : (
      <Navigate

        state={{
          from: path,
        }}
        replace
        to="/login"
      />
    );
  }


  function NoMatch() {
    return <> 404 found </>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {/* private Route pages */}
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/post/:postID" element={<PostID />} />

        <PrivateRoute path="/messages" element={<Messages />} />
        <PrivateRoute path="/notifications" element={<Notification />} />

        <PrivateRoute path="/me" element={<ProfilePage />}>
          <PrivateRoute path="/" element={<UserPosts />} />
          <PrivateRoute path="likes" element={<UserLikes />} />
          <PrivateRoute path="bookmark" element={<UserBookmark />} />
        </PrivateRoute>

        <PrivateRoute path="/settings" element={<AccountSettings />}>
          <PrivateRoute path="/" element={<ProfileSettings />} />
          <PrivateRoute path="account" element={<AccountProfileSetting />} />
          <PrivateRoute path="*" element={<NoMatch />} />
        </PrivateRoute>
      </Routes>
    </div>
  );
}

export default App;
