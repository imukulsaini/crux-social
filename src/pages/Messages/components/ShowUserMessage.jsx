import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { UserConversations } from "./UserConversation";

export function ShowUserMessage() {
  const { messages } = useSelector((state) => state.messages);
  const {
    userID,
    userData: { avatar },
  } = useSelector((state) => state.users);

  const scrollLastMessage = useRef();

  useEffect(() => {
    scrollLastMessage?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return ( 
    <div className="message__wrapper">
      {messages?.map((message) => {
        return message.senderID._id === userID ? (
          <div key={message._id} ref={scrollLastMessage}>
            <UserConversations messages={message} user={true} avatar={avatar} />
          </div>
        ) : (
          <div key={message._id} ref={scrollLastMessage}>
            <UserConversations
              messages={message}
              avatar={message.senderID.avatar}
            />
          </div>
        );
      })}
    </div>
  );
}
