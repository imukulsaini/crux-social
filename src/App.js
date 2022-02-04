import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Route, Routes } from "react-router-dom";
import { getUserData } from "./api/user/userApi";
import { useSocket } from "./context/socket";
import { PrivateRoute } from "./pages/components/PrivateRoute/PrivateRoute";
import { toast } from "react-toastify";
import "./App.css";

import {
  AccountSettings,
  DeleteUserAccount,
  Home,
  Messages,
  NoMatch,
  Notification,
  PasswordChange,
  PostID,
  ProfilePage,
  ProfileSettings,
  Search,
  SignIn,
  SignUp,
  UserBookmarkShow,
  UserLikesShow,
  UserPostsShow,
} from "./pages/index.js";
import { checkExpToken } from "./utils";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { token, refreshUserStatus, isUserLogin } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = useLocation();
  const { socket } = useSocket();
  toast.configure();

  useEffect(() => {
    if (isUserLogin && socket) {
      socket.on("getNewNotification", (notification) => {
        toast(`${notification}`, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          style: {
            backgroundColor: "#fafafa",
          },
        });
      });
    }
    return () => {
      socket?.off("getNewNotification");
    };
  }, [isUserLogin, socket]);

  useEffect(() => {
    (async function () {
      if ((refreshUserStatus === "idle") | (isUserLogin === false)) {
        if (token) {
          const { exp, userID } = jwt_decode(token);
          const expToken = checkExpToken(exp);
          if (!expToken) {
            try {
              const response = await dispatch(
                getUserData({ userID, token })
              ).unwrap();

              navigate(
                state?.from
                  ? state.from
                  : `${location.pathname}${location.search}` || "/"
              );
            } catch (error) {
              navigate("/login");
            }
          }
        }
      }
    })();
  }, [refreshUserStatus, isUserLogin]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/post/:postID" element={<PostID />} />
        <PrivateRoute path="/messages" element={<Messages />} />
        <PrivateRoute path="/notifications" element={<Notification />} />
        <PrivateRoute path="/search" element={<Search />} />

        <PrivateRoute path="/settings" element={<AccountSettings />}>
          <Route index element={<ProfileSettings />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="password" element={<PasswordChange />} />
          <Route path="delete" element={<DeleteUserAccount />} />
          <Route path="*" element={<NoMatch />} />
        </PrivateRoute>

        <Route path="/:username" element={<ProfilePage />}>
          <Route index element={<UserPostsShow />} />
          <PrivateRoute path="bookmark" element={<UserBookmarkShow />} />
          <PrivateRoute path="likes" element={<UserLikesShow />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
