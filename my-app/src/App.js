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
import { ProfileByUserName } from "./app/pages/Profile/ProfileByUsername";

function App() {
  const { token, status, isUserLogin } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {

    const getCurrentUrl = window.location;
    
    (async function (){
      if ((status === "idle") | (isUserLogin === false)) {
        // console.log(getCurrentUrl.pathname)
        console.log(state)

    

        if (token) {

          const { userID } = jwt_decode(token);

         const response =  await dispatch(getUserData({ userID, token }));
          if(response){
            const url=state?.from;
            navigate('/')
          }
         
        }
      }
    })()
 
  }, []);


  function PrivateRoute({ path, ...props }) {

    return isUserLogin === true ? (
      <Route path={path} {...props} />
    ) : (
      <Navigate

        state = {{
          from: path ,
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
        <Route path="/:username" element={<ProfileByUserName/>}/>

        {/* private Route pages */}
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/post/:postID" element={<PostID />} />

        <PrivateRoute path="/messages" element={<Messages />} />
        <PrivateRoute path="/notifications" element={<Notification />} />

        <PrivateRoute path="/:username" element={<ProfilePage />}>
          <Route path="/" element={<UserPosts />} />
          <Route path="/likes" element={<UserLikes />} />
          <Route path="/bookmark" element={<UserBookmark />} />
        </PrivateRoute>

        <Route path="/settings" element={<AccountSettings />}>
          <PrivateRoute path="/" element={<ProfileSettings />} />
          <PrivateRoute path="/account" element={<AccountProfileSetting />} />
          <PrivateRoute path="*" element={<NoMatch />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
