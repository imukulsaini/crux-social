import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NoProfilePic from "../../../assets/NoProfilePic.png";
import { UnfollowWarningModal } from "../Modal/UnFollowWarningModal";
import { ProfileUserFollowButton } from "../ProfileUserFollowButton/ProfileUserFollowButton";
import "./userinfocard.css";

export function UserInfoCard({
  isUserBioShow,
  firstName,
  lastName,
  bio,
  userID,
  avatar,
  username,
  isFollowBtnShow,
  isUserNameShow,
}) {
  const { userData } = useSelector((state) => state.users);
  const [isUserFollowByAdmin, setUserFollow] = useState(false);
  const [isUnFollowWarningModal, setUnFollowWarning] = useState(false);
  const [profileUserData, setProfileUserData] = useState({});

  useEffect(() => {
    setProfileUserData({
      _id: userID,
      avatar,
      username,
      firstName,
      lastName,
      bio,
    });
  }, []);

  useEffect(() => {
    setUnFollowWarning(false);
  }, [isUserFollowByAdmin]);

  useEffect(() => {
    if (userID && userData) {
      const result = userData?.following?.some((user) => user._id === userID);
      setUserFollow(result);
    }
  }, [userID, userData]);

  function closeUnfollowWarningModal() {
    setUnFollowWarning(false);
  }
  return (
    <>
      <UnfollowWarningModal
        isUnFollowWarningModal={isUnFollowWarningModal}
        closeUnfollowWarningModal={closeUnfollowWarningModal}
        username={username}
        userID={userID}
      />
      <div className="search__container">
        <div className="search__user-avatar">
          <img
            className="search__avatar-image"
            alt=""
            src={ avatar ||NoProfilePic}
          />
        </div>

        <div className="search__user-info">
          <div className="search__user-header">
            <div className="search__user">
              <span className="search__user-name">
                {`${firstName} ${lastName}`}
              </span>
              <Link to={`/${username}`} className="search__username">
                {username}
              </Link>
            </div>
            {userData._id !== userID && (
              <>
                {!isUserFollowByAdmin ? (
                  <ProfileUserFollowButton
                    profileID={userID}
                    profileData={profileUserData}
                  />
                ) : (
                  <button
                    onClick={() => setUnFollowWarning(true)}
                    className="following-indicator"
                  >
                    Following
                  </button>
                )}
              </>
            )}
          </div>

          {isUserBioShow && <span className="search__bio">{bio}</span>}
        </div>
      </div>
    </>
  );
}
