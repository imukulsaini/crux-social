import { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowers } from "../../../api/user/userFollowersApi";
import { LoadingSpinner } from "../Spinner/LoadingSpinner";
import { UserInfoCard } from "../UserInfoCard/UserInfoCard";

export function FollowersModal({
  isAdmin,
  followers,
  isFollowerModal,
  closeFollowerModal,
}) {
  const { userFollowers, status } = useSelector((state) => state.followers);

  const { userID, token } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin && isFollowerModal === true) {
      dispatch(getUserFollowers({ userID, token }));
    }
  }, [isAdmin, isFollowerModal]);

  const customStyles = {
    content: {
      top: "10%",
      left: "36%",
      right: "auto",
      bottom: "auto",
      width: "30%",
      height: "40rem",
      border: "1px solid #eff1f3",
      backgroundColor: "#ffffff",
    },
  };

  const followerList =
    status === "fulfilled" && isAdmin ? userFollowers : followers;

  return (
    <Modal
      isOpen={isFollowerModal}
      onRequestClose={closeFollowerModal}
      style={customStyles}
      contentLabel="Users Followers Show Modal"
      ariaHideApp={false}

    >
      <h3 className="Modal__heading">Followers</h3>

      {status === "pending" && (
        <span className="spinner-indicator">
          <LoadingSpinner isDefaultCss={true} size={"18"} />
        </span>
      )}
      {status === "fulfilled" && (
        <>
          {followerList &&
            followerList?.map((user) => {
              return (
                <UserInfoCard
                key={user._id}
                  isUserBioShow={false}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  username={user.username}
                  isFollowBtnShow={true}
                  avatar={user.avatar}
                  userID={user._id}
                />
              );
            })}
        </>
      )}
    </Modal>
  );
}
