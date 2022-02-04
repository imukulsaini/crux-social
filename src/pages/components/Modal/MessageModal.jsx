import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../context/socket";
import { newMessageReceived } from "../../../reducers/message/MessageSlice";
import { makeAConversation } from "../../../api/message/ConversationApi";
import { getUserMessage } from "../../../api/message/MessageApi";
import { SendMessageBtn } from "../../Messages/components/SendMessageBtn";
import { ShowUserMessage } from "../../Messages/components/ShowUserMessage";
import { LoadingSpinner } from "../Spinner/LoadingSpinner";
export function MessageModal({
  receiverID,
  isMessageModal,
  closeMessageModal,
}) {
  const messageModalStyles = {
    content: {
      top: "10%",
      left: "30%",
      right: "10%",
      bottom: "auto",
      width: "40%",
      height: "82%",
      display: "flex",
      flexDirection: "column",
      border: "1px solid #eff1f3",
      backgroundColor: "#ffffff",
    },
  };

  const { conversationRoom, createStatus } = useSelector(
    (state) => state.conversation
  );
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const { userID, token } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messageInputModalRef = useRef();

  function clearInputText() {
    messageInputModalRef.current.value = "";
  }
  useEffect(() => {
    if (isMessageModal === true) {
      setLoading("pending");
      dispatch(
        makeAConversation({
          receiverID: receiverID,
          senderID: userID,
          userID,
          token,
        })
      );
    }
  }, [isMessageModal]);

  useEffect(() => {
    if (createStatus === "fulfilled") {
      try {
        dispatch(
          getUserMessage({
            conversationID: conversationRoom[0]?._id,
            userID,
            token,
          })
        ).unwrap();
        setLoading("fulfilled");
      } catch (error) {
        setError(error);
        setLoading("rejected");
      }
    }
  }, [createStatus]);

  useEffect(() => {
    if (socket) {
      socket.on("getNewMessage", (newMessage) => {
        dispatch(newMessageReceived(newMessage));
      });
    }
    return () => {
      socket?.off("getNewMessage");
    };
  }, [socket]);
  return (
    <Modal
      isOpen={isMessageModal}
      onRequestClose={closeMessageModal}
      style={messageModalStyles}
      contentLabel="Message Modal"
      ariaHideApp={false}
    >
      <h3 className="Modal__heading"> Messages </h3>
      {loading === "pending" && (
        <span className="spinner-indicator">
          <LoadingSpinner isDefaultCss={true} size={"25"} />
        </span>
      )}
      {loading === "fulfilled" && conversationRoom && (
        <>
          <ShowUserMessage />
          <div className="message__conversation-input">
            <input
              ref={messageInputModalRef}
              className="conversation-input"
              placeholder="send message"
            />
            <SendMessageBtn
              inputValue={messageInputModalRef}
              conversationID={conversationRoom[0]?._id}
              clearInputText={clearInputText}
            />
          </div>
        </>
      )}
    </Modal>
  );
}
