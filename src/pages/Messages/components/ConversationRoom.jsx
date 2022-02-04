import { useDispatch, useSelector } from "react-redux";
import { getUserMessage } from "../../../api/message/MessageApi";
import NoProfilePic from "../../../assets/NoProfilePic.png";

export function ConversationRoom({ members, roomID, setID }) {
  const { userID, token } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  function getUserMessageAndDetails() {
    dispatch(getUserMessage({ conversationID: roomID, userID, token }));
    setID(roomID);
  }

  return members
    ?.filter((fri) => fri._id !== userID)
    ?.map((friend) => {
      return (
          <div
            key={roomID}
            onClick={getUserMessageAndDetails}
            className="message__friends-info"
          >
            <div className="message__friends-avatar">
              <img
                className="friend-info__friends-avatar"
                alt=""
                src={friend.avatar || NoProfilePic}
              />
            </div>
            <div className="message__friends-name">
              <span className="friends-name">{`${friend.firstName} ${friend.lastName}`}</span>
            </div>
          </div>
      );
    });
}
