import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/socket";
import {
  clearMessages,
  newMessageReceived,
} from "../../reducers/message/MessageSlice";
import { getConversation } from "../../api/message/ConversationApi";
import { NavBar } from "../components/Navbar/Nav";
import { ConversationRoom } from "./components/ConversationRoom";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";
import { SendMessageBtn } from "./components/SendMessageBtn";
import { ShowUserMessage } from "./components/ShowUserMessage";
import { UserConversationProfileInfo } from "./components/UserConversationProfileInfo";
import "./Messages.css";

export function Messages() {
  const { conversationRoom } = useSelector((state) => state.conversation);
  const [conversationID, setConversationID] = useState("");
  const { socket } = useSocket();
  const messageInputRef = useRef();
  const { userID, token } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessages());
  }, []);
  function clearInputText() {
    messageInputRef.current.value = "";
  }

  useEffect(() => {
    if (userID && token) {
      dispatch(getConversation({ userID, token }));
    }
  }, [token, userID]);

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
    <div className="message">
      <NavBar />
      <section className="message__friends">
        <div className="message__friends-heading">conversation</div>

        {conversationRoom?.map((room, index) => {
          return (
            <div key={room._id} className="message__con-room">
              <ConversationRoom
                key={room.id}
                members={room.members}
                roomID={room._id}
                setID={setConversationID}
              />
            </div>
          );
        })}
      </section>

      <section className="message__conversation">
        <ShowUserMessage />
        <div className="message__conversation-input">
          <input
            ref={messageInputRef}
            className="conversation-input"
            placeholder="send message"
          />
          <SendMessageBtn
            inputValue={messageInputRef.current}
            conversationID={conversationID}
            clearInputText={clearInputText}
          />
        </div>
      </section>

      <section className="message__friend-profile">
        <UserConversationProfileInfo roomID={conversationID} />
      </section>
    </div>
  );
}
