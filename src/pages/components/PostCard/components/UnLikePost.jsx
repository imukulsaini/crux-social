import { BiHeart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { unLikePost } from "../../../../api/user/userLikesApi";
import { useSocket } from "../../../../context/socket";

export function UnLikePost({ postID, postLikes }) {
  const { userID, token } = useSelector((state) => state.users);
  const { socket } = useSocket();
  const dispatch = useDispatch();
  
  function unlikeNotification() {
    socket.emit("unLikePost", {
      userID: userID,
      postID: postID,
    });
  }
  return (
    <div className="post__actions-likes pst-action">
      <button
        // disabled={postLikes <= 0}
        onClick={() => {
          unlikeNotification();
          dispatch(unLikePost({ userID, token, postID }));
        }}
        className="post__actions-like-btn icon-bd-none"
      >
        <BiHeart size="1.5rem" color="red" />
      </button>
      <span className="post__actions-name pst-action-name">Liked</span>
    </div>
  );
}
