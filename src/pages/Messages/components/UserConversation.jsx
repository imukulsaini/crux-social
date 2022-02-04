import { format } from "timeago.js";
import NoProfilePic from "../../../assets/NoProfilePic.png";
export function UserConversations({ user, messages ,avatar}) {
    const { message, createdAt } = messages;

    return (
      <>
        <div
          className={
            user
              ? "message__conversation-info user"
              : "message__conversation-info "
          }
        >
          <div className="message__user-avatar-info">
            <img
              alt=""
              className="message__user-image"
              src={avatar || NoProfilePic}
            />
          </div>
          <span className="message__user-conversation">{message}</span>
        </div>
        <div
          className={
            user
              ? "message__conversation-time user"
              : "message__conversation-time"
          }
        >
          {format(createdAt)}
        </div>
      </>
    );
  }