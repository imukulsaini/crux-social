import { useEffect } from "react";
import Modal from "react-modal";
import { ProfileUserUnFollowButton } from "../ProfileUserUnFollowButton/ProfileUserUnFollowButton";

export function UnfollowWarningModal({
  isUnFollowWarningModal,
  closeUnfollowWarningModal,
  username,
  userID,
}) {
  const unFollowModalStyles = {
    content: {
      top: "30%",
      left: "36%",
      right: "auto",
      bottom: "auto",
      width: "20rem",
      height: "20rem",
      border: "1px solid #eff1f3",
      backgroundColor: "#rgba(255,255,255,0.5",
    },
  };
  useEffect(() => {
    closeUnfollowWarningModal();
  }, [userID, username]);

  const OverlayStyles = {
    content: {
      backgroundColor: "#rgba(255,255,255,0.5",
      border: "12px solid #eff1f3",
    },
  };
  return (
    <Modal
      animationType="slide"
      isOpen={isUnFollowWarningModal}
      onRequestClose={closeUnfollowWarningModal}
      style={unFollowModalStyles}
      contentLabel="Unfollow Warning Modal"
      ariaHideApp={false}
      overlayClassName={{
        base: 'modal-overlay', 
        afterOpen: 'modal-overlay-in',
        beforeClose: 'modal-overlay-out'
      }}
      // overlayClassName={OverlayStyles}

    >
      <div className="user-unfollow__waring">
        <span className="unfollow__info-message">
          If you change your mind, you'll have to follow @{username} again.
        </span>
        <ProfileUserUnFollowButton profileID={userID} />
        <button
          onClick={() => closeUnfollowWarningModal()}
          className="unfollow__canel-btn"
        >
          cancel
        </button>
      </div>
    </Modal>
  );
}
