import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser } from "../../../api/user/userFollowersApi";
import { useSocket } from "../../../context/socket";
import { unFollowProfile } from "../../../reducers/user/userSlice";

export function ProfileUserUnFollowButton({ profileID }) {
  const { userID, token, profileData } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("getUnfollowInfo", (result) => {
        dispatch(unFollowProfile({ result, profile: profileData }));
      });
    }
    return () => {
      socket?.off("getUnfollowInfo");
    };
  }, [socket]);

  function unfollowUserHandler() {
    socket.emit("unfollow", {
      followerID: userID,
      followingID: profileID,
    });

    dispatch(
      unfollowUser({
        token,
        profileID: profileID,
        userID: userID,
      })
    );
  }

  return (
    <button
      onClick={() => unfollowUserHandler()}
      className="profile-page__unfollow-btn"
    >
      unfollow
    </button>
  );
}
