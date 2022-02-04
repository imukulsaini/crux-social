import { useEffect, useState } from "react";
import { FollowersModal } from "../../components/Modal/FollowersModal";

export function ProfileUserFollowers({ followers, isAdmin }) {
  const [isFollowerModal, setFollowerModal] = useState(false);

  useEffect(() => {
    setFollowerModal(false);
  }, [followers]);
  function closeFollowerModal() {
    setFollowerModal(false);
  }

  return (
    <>
      <FollowersModal
        isAdmin={isAdmin}
        followers={followers}
        closeFollowerModal={closeFollowerModal}
        isFollowerModal={isFollowerModal}
      />
      <div
        onClick={() => setFollowerModal(true)}
        className="profile-page__data-followers flex-row"
      >
        <span className="profile-page__head-count">{followers.length}</span>
        <span className="profile-page__head-name">followers</span>
      </div>
    </>
  );
}
