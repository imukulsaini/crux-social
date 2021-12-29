import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { NavBar } from "../components/navbar/nav";
import "./Profile.styles.css";
import { FiBookmark, FiHeart, FiGrid } from "react-icons/fi";
import { getUserPosts } from "../../../features/post/PostAPI";



export function ProfileByUserName({ userProfileData , userProfileID , adminUserID }) {


    const { userID, token } = useSelector((state) => state.users);

    const { userPosts } = useSelector((state) => state.posts) ;
  
    const {
      followers,
      following,
      firstName,
      lastName,
      username,
      bio,
      website,
      avatar,
    } = userProfileData;
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getUserPosts({ userID: userProfileID, token }));
    }, [userProfileID, token]);
  
    return (
      <div className="profile-page">
        <NavBar />
  
        <section className="profile-page__main">
          <div className="profile-page__header">
            <div className="profile-page__user-avatar">
              <img
                className="profile-page__avatar"
                alt=""
                src={
                  avatar === null
                    ? "data:image/png;base64,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"
                    : avatar
                }
              />
            </div>
  
            <div className="profile-page__user-head">
              <div className="profile-page__head-container">
                <span className="profile__username">{username} </span>
  
                { userProfileID === adminUserID ? (
                  <button className="profile-page__edit-btn">
                    <Link to="/settings">Edit profile</Link>
                  </button>
                ) : (
                  <button className="profile-page__message-btn">Message</button>
                )}
  
              </div>
            </div>
  
            <div className="profile-page__user-data">
              <div className="profile-page__data-container">
                <div className="profile-page__data-posts flex-row">
                  <span className="profile-page__head-count">{totalPosts}</span>
                  <span className="profile-page__head-name">posts</span>
                </div>
  
                <div className="profile-page__data-followers flex-row">
                  <span className="profile-page__head-count">
                    {followers.length}
                  </span>
                  <span className="profile-page__head-name">followers</span>
                </div>
  
                <div className="profile-page__data-following flex-row">
                  <span className="profile-page__head-count">
                    {following.length}
                  </span>
                  <span className="profile-page__head-name">following</span>
                </div>
              </div>
            </div>
  
            <div className="profile-page__user-name">
              {firstName}
              {lastName}
            </div>
            <div className="profile-page__user-bio">
              <span className="profile-page__bio-info">
                <a href={website}>{website}</a>
                <br />
                {bio}
              </span>
            </div>
          </div>
  
          <div className="profile-page__route">
            <ul className="profile-page__route-list">
              <Link to="" className="profile-page__route-item">
                <span className="profile-page__route-info">
                  <span className="profile-page__route-icon">
                    {" "}
                    <FiGrid />
                  </span>
                  <span className="profile-page__route-name"> Posts</span>
                </span>
              </Link>
              {userProfileID === adminUserID && (
                <>
                  ({" "}
                  <Link to="bookmark" className="profile-page__route-item">
                    <span className="profile-page__route-info">
                      <span className="profile-page__route-icon">
                        {" "}
                        <FiBookmark />
                      </span>
                      <span className="profile-page__route-name"> Bookmark</span>
                    </span>
                  </Link>
                  <Link to="likes" className="profile-page__route-item">
                    <div className="profile-page__route-info">
                      <span className="profile-page__route-icon">
                        <FiHeart />
                      </span>
                      <span className="profile-page__route-name"> Likes</span>
                    </div>
                  </Link>
                  )
                </>
              )}
            </ul>
          </div>
  
          <div className="profile-page__posts">
            <div className="profile-page__route-posts">
              <Outlet />
            </div>
          </div>
        </section>
  
        <div className="profile-page__right"></div>
        <div className="profile-page__left"></div>
      </div>
    );
}