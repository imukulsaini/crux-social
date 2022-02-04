import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import { getUserPosts } from "../../api/post/PostAPI";
import { getUserInfoByUsername } from "../../api/user/userApi";
import {
  updateProfileData,
  followProfile,
} from "../../reducers/user/userSlice";
import { UnfollowWarningModal } from "../components/Modal/UnFollowWarningModal";
import { NavBar } from "../components/Navbar/Nav";
import { ProfileUserFollowButton } from "../components/ProfileUserFollowButton/ProfileUserFollowButton";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";
import {
  ProfileName,
  ProfilePostCount,
  ProfilePostRoutes,
  ProfileUserAvatar,
  ProfileUserBio,
  ProfileUserFollowers,
  ProfileUserFollowing,
  ProfileUserMessageButton,
} from "./components/index.js";
import { checkAdmin } from "./utils";
import "./Profile.styles.css";
import { useSocket } from "../../context/socket";
import { NoMatch } from "../components/NoMatch/NoMatch";


export function ProfilePage() {
  const { userData, profileData, profileStatus ,token } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState("idle");
  const [isUserFollowByAdmin, setUserFollow] = useState(false);
  const [isUnfollowWarningModal, setUnfollowWarningModal] = useState(false);
  const { username } = useParams();
  const isAdminProfile = checkAdmin(username, userData);
  const { socket } = useSocket();

  useEffect(() => {
    if (profileStatus === "fulfilled") {
      setLoading("fulfilled");
    }
    if (profileStatus === "rejected") {
      setLoading("rejected");
    }
  }, [profileStatus]);

  useEffect(() => {
    if (profileData) {
      dispatch(getUserPosts({ userID: profileData._id }));
    }
  }, [profileData]);
  useEffect(() => {
    if (socket) {
      socket.on("getFollowInfo", (result) => {
        dispatch(
          followProfile({
            result,
            profile: result.profile,
          })
        );
      });
    }
    return () => {
      socket?.off("getFollowInfo");
    };
  }, [socket]);

  useEffect(() => {
    if (userData && isAdminProfile === false && profileData) {
      const result = userData?.following?.some(
        (user) => user._id === profileData._id
      );
      setUserFollow(result);
    }
  }, [userData, profileData, isAdminProfile]);

  useEffect(() => {
    setUnfollowWarningModal(false);
  }, [isUserFollowByAdmin]);

  useEffect(async () => {
    setLoading("pending");
    if (isAdminProfile === true) {
      dispatch(updateProfileData({ data: userData }));
      setLoading("fulfilled");
    }
    if (isAdminProfile === false) {
      dispatch(getUserInfoByUsername({ username ,token}));
    }
  }, [isAdminProfile, username]);

  function closeUnfollowWarningModal() {
    setUnfollowWarningModal(false);
  }
  return (
    <>
      <UnfollowWarningModal
        isUnFollowWarningModal={isUnfollowWarningModal}
        closeUnfollowWarningModal={closeUnfollowWarningModal}
        username={profileData?.username}
        userID={profileData?._id}
      />
      <div className="profile-page">
        <NavBar />
        <section className="profile-page__main">
          {loading === "pending" && (
            <span className="spinner-indicator">
              <LoadingSpinner isDefaultCss={true} size={"25"} />
            </span>
          )}

          {loading === "fulfilled" && profileData && (
            <>
              <div className="profile-page__header">
                <ProfileUserAvatar avatar={profileData.avatar} />

                <div className="profile-page__user-head">
                  <div className="profile-page__head-container">
                    <span className="profile__username">
                      {profileData.username}
                    </span>
                    {isAdminProfile ? (
                      <button
                        onClick={() => navigate("/settings")}
                        className="profile-page__edit-btn"
                      >
                        Edit profile
                      </button>
                    ) : (
                      <>
                        <ProfileUserMessageButton
                          receiverID={profileData._id}
                        />

                        {isUserFollowByAdmin ? (
                          <button
                            onClick={() => setUnfollowWarningModal(true)}
                            className="following-indicator"
                          >
                            Following
                          </button>
                        ) : (
                          <ProfileUserFollowButton
                            profileID={profileData._id}
                            profileData={profileData}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="profile-page__user-data">
                  <div className="profile-page__data-container">
                    <ProfilePostCount />
                    <ProfileUserFollowers
                      isAdmin={isAdminProfile}
                      followers={profileData?.followers}
                    />
                    <ProfileUserFollowing isAdminProfile={isAdminProfile} />
                  </div>
                </div>

                <ProfileName
                  firstName={profileData.firstName}
                  lastName={profileData.lastName}
                />

                <ProfileUserBio
                  website={profileData.website}
                  bio={profileData.bio}
                />
              </div>

              <div className="profile-page__route">
                <ProfilePostRoutes isAdmin={isAdminProfile} />
              </div>

              <div className="profile-page__posts">
                <div className="profile-page__route-posts">
                  <Outlet />
                </div>
              </div>
            </>
          )}

          {loading === "rejected" && (
            <NoMatch text={"Error Try Again Later"} isButtonShow={true} />
          )}
          {loading === "fulfilled" && profileData === null && (
            <NoMatch text={"No User Found"} isButtonShow={true} />
          )}
        </section>

        <div className="profile-page__right"></div>
        <div className="profile-page__left"></div>
      </div>
    </>
  );
}
