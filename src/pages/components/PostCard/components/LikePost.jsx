import { BiHeart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../../../api/user/userLikesApi";
import { useSocket } from "../../../../context/socket";

export function LikePost({ postID, postBy, checkIsPostLikeByUser }) {
  const {
    userID,
    token,
    userData: { username },
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  function likePostNotification() {
    if (postBy._id !== userID) {
      socket.emit("sendNotification", {
        message: `${username} Liked your post `,
        targetUser: postBy._id,
      });
    }

    socket.emit("likePost", {
      userID: userID,
      postID: postID,
    });
  }

  return (
    <div
      onClick={() => {
        !checkIsPostLikeByUser && likePostNotification();
        dispatch(likePost({ userID, token, postID }));
      }}
      className="post__actions-likes pst-action"
    >
      <button className="post__actions-like-btn icon-bd-none">
        <BiHeart size="1.5rem" />
      </button>
      <span className="post__actions-name pst-action-name">Like</span>
    </div>
  );
}
