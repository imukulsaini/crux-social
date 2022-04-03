import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostComments } from "../../../api/post/PostCommentsApi";
import { format } from "timeago.js";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";

export function PostComments({ postID }) {
  const dispatch = useDispatch();
  const { comments, getStatus } = useSelector((state) => state.postComments);
  useEffect(() => {
    if (postID) {
      dispatch(getPostComments(postID));
    }
  }, [postID]); 
  return (
    <>
      {getStatus === "pending" && (
        <span key={"commentsShow"} className="spinner-indicator">
          <LoadingSpinner isDefaultCss={false} color={"black"} size={"15"} />
        </span>
      )}
      {getStatus === "fulfilled" &&
        comments?.map((comment) => (
          <div key={comment._id} className="post__comments-info">
            <div className="post__comments-container">
              <span className="post__comments-owner">
                {comment?.commentBy?.username}
              </span>
              <span className="post-comment">{comment?.comment}</span>
            </div>
            <span className="post__comments-time">
              {format(comment?.createdAt)}
            </span>
          </div>
        ))}
    </>
  );
}
