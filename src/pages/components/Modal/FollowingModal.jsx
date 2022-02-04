import Modal from "react-modal";
import { UserInfoCard } from "../UserInfoCard/UserInfoCard";

export function FollowingModal({
  following,
  closeFollowingModal,
  isFollowingModal,
}) {
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

  return (
    <Modal
      isOpen={isFollowingModal}
      onRequestClose={closeFollowingModal}
      style={customStyles}
      contentLabel="Users Following Show Modal"
      ariaHideApp={false}
    >
      <h3 className="Modal__heading">Following </h3>
      {following &&
        following?.map((user) => {
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
    </Modal>
  );
}
