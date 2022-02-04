import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FollowingModal } from "../../components/Modal/FollowingModal";
import { checkAdmin } from "../utils";


export function ProfileUserFollowing() {
  const { username } = useParams();
  const { userData, profileData } = useSelector((state) => state.users);

  const [isFollowingModal, setFollowingModal] = useState(false);
  const isAdminProfile = checkAdmin(username, userData);

  function closeFollowingModal() {
    setFollowingModal(false);
  }

  return (
    <>
      <FollowingModal
        following={isAdminProfile ? userData.following : profileData.following}
        closeFollowingModal={closeFollowingModal}
        isFollowingModal={isFollowingModal}
      />
      <div
        onClick={() => setFollowingModal(true)}
        className="profile-page__data-following flex-row"
      >
        <span className="profile-page__head-count">
          {isAdminProfile
            ? userData.following.length
            : profileData.following.length}
        </span>
        <span className="profile-page__head-name">following</span>
      </div>
    </>
  );
}
