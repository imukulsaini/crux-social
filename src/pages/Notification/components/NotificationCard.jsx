import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { RiUserFollowLine } from "react-icons/ri";
import { format } from "timeago.js";

import { useNavigate } from "react-router-dom";
import { readNotification } from "../../../api/notification/notificationApi";
import { useDispatch, useSelector } from "react-redux";

export function NotificationCard({
  read,
  user,
  message,
  type,
  postID,
  notificationID,
  createdAt,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userID, token } = useSelector((state) => state.users);

  return (
    <>
      <div
        onClick={() => {
          dispatch(readNotification({ userID, token, notificationID }));
          {
            type != "follow"
              ? navigate(`/post/${postID}`)
              : navigate(`/${user.username}`);
          }
        }}
        className={
          read
            ? "notification__container read-notify"
            : "notification__container"
        }
      >
        {type === "like" && <AiOutlineLike size={"1.1rem"} />}
        {type === "follow" && <RiUserFollowLine size={"1.1rem"} />}
        {type === "comment" && <AiOutlineComment size={"1.1rem"} />}
        <span className="notification__message">
          {`${user.username} 
            ${message}`}
        </span>
        <span className="notification__time">{format(createdAt)}</span>
      </div>
    </>
  );

  
}
