import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserNotifications } from "../../api/notification/notificationApi";
import { NavBar } from "../components/Navbar/Nav";

import { sortPost } from "../../utils";
import "./notification.css";
import { NotificationCard } from "./components/NotificationCard";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";

export function Notification() {
  const { notifications, status } = useSelector((state) => state.notifications);
  const { userID, token } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserNotifications({ userID, token }));
  }, []);
  const sortNotification = notifications && sortPost(notifications);
  return (
    <div className="notification">
      <NavBar 
      />
      <section className="notification__main">
        <div className="notification__header">
          <h3 className="notification__heading">Notifications</h3>
        </div>
        {status === "pending" && (
          <span className="spinner-indicator">
            <LoadingSpinner isDefaultCss={true} size={"25"} />
          </span>
        )}
        {sortNotification &&
          status === "fulfilled" &&
          sortNotification?.map((data) => {
            return (
              data.target === userID &&
              data?.user?._id !== userID && (
                <>
                  <NotificationCard
                    key={data._id}
                    read={data.read}
                    postID={data.postID}
                    message={data.message}
                    user={data.user}
                    type={data.type}
                    notificationID={data._id}
                    createdAt={data.createdAt}
                  />
                </>
              )
            );
          })}
      </section>
      <section className="notification__left-side"></section>
      <section className="notification__right-side"></section>
    </div>
  );
}
