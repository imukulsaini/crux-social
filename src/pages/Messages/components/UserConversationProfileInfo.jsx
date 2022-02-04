import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/socket";
import NoProfilePic from "../../../assets/NoProfilePic.png";
export function UserConversationProfileInfo({ roomID }) {
  const { conversationRoom } = useSelector((state) => state.conversation);
  const {
    userID,
    userData: { firstName, lastName, avatar, username },
  } = useSelector((state) => state.users);
  const [userInfo, setUser] = useState(null);
  const navigate = useNavigate();
  const { isUserActive ,users} = useSocket();
  const [checkUserActive ,setStatus] = useState(false);


  function getUserProfileInfo() {


    const getConversationRoom = conversationRoom?.find(
      (room) => room._id === roomID
    );
    const getUserInfo =
      getConversationRoom &&
      getConversationRoom?.members?.find((user) => user._id != userID);
    return getUserInfo;
  }
  useEffect(() => {
    if (roomID) {
      const result = getUserProfileInfo();
      if (result) {
        setUser(result);
      }
    }
  }, [roomID]);


  useEffect(() => {
    if(userInfo){
      const isActive=  userInfo && isUserActive(userInfo._id);
      setStatus(isActive)
    }
  }, [users, userInfo]);
  return (
    <>
      <div className="message__friend-avatar">
        <img
          className="friend-avatar"
          alt="user"
          src={userInfo?.avatar || NoProfilePic}
        />
      </div>
      <div className="message__friend-name">
        <span className="friend-name">
          {userInfo
            ? `${userInfo?.firstName} ${userInfo?.lastName}`
            : `${firstName} ${lastName}`}
        </span>
      </div>

      {checkUserActive && (
        <span className="message__friend-status-active txt-center">Active</span>
      )}
      {!checkUserActive&&
      (
        <span
        hidden={userInfo === null}
        className="message__friend-status-offline txt-center">Offline</span>
      )}
      <div className="message__friend-actions">
        <button
          onClick={() =>
            navigate(`/${userInfo ? userInfo.username : username}`)
          }
          className="show-profile-btn"
        >
          View full profile
        </button>
      </div>
    </>
  );
}
