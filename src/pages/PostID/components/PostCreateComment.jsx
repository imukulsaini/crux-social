import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { createNewComment } from "../../../api/post/PostCommentsApi";
import { newCommentAdded } from "../../../reducers/post/PostCommentsSlice";
import { useSocket } from "../../../context/socket";
import NoProfilePic from "../../../assets/NoProfilePic.png";
import { v4 as uuidv4 } from "uuid";

export function PostCreateComment({ postCommentRoom }) {
  const params = useParams();
  const { postsID } = useSelector((state) => state.posts);
  const { userID, token, userData } = useSelector((state) => state.users);
  const [comment, setComment] = useState("");
  const inputCommentRef = useRef();
  const dispatch = useDispatch();
  const { socket } = useSocket();

  useEffect(() => {
    inputCommentRef.current.focus();
  }, []);

  useEffect(() => {
    if (postCommentRoom && socket) {
      socket.on("newCommentAdded", (newComment) => {
        if (postsID._id === newComment.postID) {
          dispatch(newCommentAdded(newComment));
        }
      });
    }
    return () => {
      socket?.off("newCommentAdded");
    };
  }, [postCommentRoom, socket]);

  async function postComment() {
    if (comment.length > 0) {
      dispatch(
        createNewComment({ postID: params.postID, userID, token, comment })
      );
      socket.emit("addComment", {
        _id: uuidv4(),
        createdAt: Date.now(),
        text: comment,
        commentBy: userData,
        postID: params.postID,
      });
    }
    setComment("");
  }

  return (
    <div className="post__user-comment">
      <div className="post__avatar ">
        <img
          className="create-post__avatar-image user-comment-avatar"
          alt=""
          src={userData.avatar || NoProfilePic}
        />
      </div>

      <div className="post__comment-area">
        <input
          ref={inputCommentRef}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="comment your reply"
          className="post__input-comment"
        />
        <button
          disabled={!comment.length > 0}
          onClick={postComment}
          className="post__comment-btn"
        >
          Post
        </button>
      </div>
    </div>
  );
}
