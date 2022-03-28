import { useDispatch, useSelector } from "react-redux";
import { sendNewMessage } from "../../../api/message/MessageApi";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSocket } from "../../../context/socket";

export function SendMessageBtn({ inputValue, conversationID, clearInputText }) {
  const { socket } = useSocket();

  const { conversationRoom, status } = useSelector(
    (state) => state.conversation
  );

  const {
    userID,
    token,
    userData: { avatar, username },
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  function sendMessage() {
    const text = inputValue.current.value;
    const a = conversationRoom.filter((con) => con._id == conversationID);
    const { members } = a[0];
    const getReceiverID = members.filter((user) => user._id !== userID);

    if (text != null && text.length > 0) {
      socket.emit("sendMessage", {
        senderID: {
          avatar: avatar,
          _id: userID,
        },
        conversationID: conversationID,
        message: text,
        createdAt: Date.now(),
        receiverID: getReceiverID[0]._id,
      });
      if (getReceiverID[0]._id !== userID) {
        socket.emit("sendNotification", {
          message: `New Message from ${username} : ${text} `,
          targetUser: getReceiverID[0]._id,
        });
      }

      dispatch(
        sendNewMessage({
          conversationID: conversationID,
          userID,
          token,
          text,
        })
      );
      clearInputText();
    }
  }

  return (
    <button
      disabled={!conversationID}
      onClick={() => sendMessage()}
      className="conversation-send__btn"
    >
      <RiSendPlaneFill color="blue" size="1.5rem" />
    </button>
  );
}
