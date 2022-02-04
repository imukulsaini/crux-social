import { createContext, useEffect, useContext, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { postIsLiked, postIsunLiked } from "../reducers/post/PostSlice";

const socketContext = createContext();

export default function SocketProvieder({ children }) {
  const [socket, setSocket] = useState(null);
  const { isUserLogin, userID } = useSelector((state) => state.users);
  const [activeUsers, setUsers] = useState(null);
  const dispatch = useDispatch();
  function isUserActive(checkUserID) {
    return activeUsers && activeUsers.some((a) => a.userID === checkUserID);
  }
  useEffect(() => {
    if (isUserLogin) {
      try {
        const socketConnection = io("https://media.imukulsaini.repl.co", {
          transports: ["websocket"],
        });
        if (socketConnection) {
          setSocket(socketConnection);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [isUserLogin]);

  useEffect(() => {
    if (socket && userID) {
      socket.emit("addUsers", userID);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket?.on("likeInfo", (likeInfo) => {
        dispatch(postIsLiked({ likeInfo }));
      });
    }
    return () => {
      socket?.off("likeInfo");
    };
  }, [isUserLogin, socket]);

  useEffect(() => {
    if (socket) {
      socket?.on("unLikeInfo", (unLikeInfo) => {
        dispatch(postIsunLiked({ unLikeInfo }));
      });
    }

    return () => {
      socket?.off("unLikeInfo");
    };
  }, [isUserLogin, socket]);

  useEffect(() => {
    socket &&
      socket.on("getOnlineUsers", (users) => {
        setUsers(users) ;
      });
  }, [socket, userID]);

  return (
    <socketContext.Provider
      value={{ socket, isUserActive, users: activeUsers }}
    >
      {children}
    </socketContext.Provider>
  );
}

export function useSocket() {
  return useContext(socketContext);
}
