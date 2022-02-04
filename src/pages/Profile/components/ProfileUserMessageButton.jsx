import { useEffect, useState } from "react";
import { MessageModal } from "../../components/Modal/MessageModal";

export function ProfileUserMessageButton({ receiverID }) {
  const [isMessageModal, setMessageModal] = useState(false);

  useEffect(() => {
    setMessageModal(false);
  }, [receiverID]);

  function closeMessageModal() {
    setMessageModal(false);
  }
  return (
    <>
      <MessageModal
        isMessageModal={isMessageModal}
        receiverID={receiverID}
        closeMessageModal={closeMessageModal}
      />
      <button
        onClick={() => setMessageModal(true)}
        className="profile-page__message-btn"
      >
        Message
      </button>
    </>
  );
}
