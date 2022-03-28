import { BiBookmark } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { saveBookmark } from "../../../../api/user/userBookmarkApi";
import { useSocket } from "../../../../context/socket";

export function SaveBookMark({ postID }) {
  const dispatch = useDispatch();
  const { userID, token } = useSelector((state) => state.users);
  const { socket } = useSocket();
  function addBookmarkNotification() {
    socket.emit("addBookmark", {
      userID: userID,
      postID: postID,
    });
  }
  return (
    <div
    onClick={() => {
      addBookmarkNotification();
      dispatch(saveBookmark({ userID, token, postID }));
    }}
    className="post__actions-saved pst-action">
      <button

        className="post__actions-save-btn icon-bd-none"
      >
        <BiBookmark size="1.5rem" />
      </button>
      <span className="post__actions-name pst-action-name">Save</span>
    </div>
  );
}
