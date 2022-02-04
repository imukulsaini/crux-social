import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../../api/user/userFollowersApi";

import { useSocket } from "../../../context/socket";

export function ProfileUserFollowButton({ profileID, profileData }) {
  const { userID, token, userData } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  function followUserHandler() {
    socket.emit("follow", {
      followerID: userID,
      followingID: profileID,
      profile: {
        _id: profileData._id,
        username: profileData.username,
        avatar: profileData.avatar,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      },
    });
    if (profileID !== userID) {
      socket.emit("sendNotification", {
        message: `${userData.username} followed you`,
        targetUser: profileID,
      });
    }

    dispatch(
      followUser({
        token,
        profileID: profileID,
        userID: userID,
      })
    );
  }

  return (
    <button
      onClick={() => followUserHandler()}
      className="profile-page__follow-btn"
    >
      Follow
    </button>
  );
}
