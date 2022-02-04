import { BiBookmark } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { removeBookmark } from "../../../..//api/user/userBookmarkApi";
import { useSocket } from "../../../../context/socket";

export function RemoveBookmark({ postID }) {
  const { userID, token } = useSelector((state) => state.users);
  const { socket } = useSocket() ;

  function removeBookmarkNotification(){

    socket.emit("removeBookmark", {
      userID: userID,
      postID: postID,
    });

  }
  const dispatch = useDispatch();

  return (
    <div className="post__actions-saved pst-action">
      <button
        onClick={() => {
          removeBookmarkNotification()
          dispatch(removeBookmark({ userID, token, postID }));
        }}
        className="post__actions-save-btn icon-bd-none"
      >
        <BiBookmark size="1.5rem" color="red" />
      </button>
      <span className="post__actions-name pst-action-name">Saved</span>
    </div>
  );
}
