import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostComments } from "../../../../features/post/PostCommentsApi";

export function PostComments({ postID }) {

  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.postComments);

  useEffect(() => {
    if (postID) {
      dispatch(getPostComments(postID));
    }
  }, [postID ]) ;

  return (
    <>
      {comments &&
        comments?.map((comment) => (
          <div className="post__comments-info">
            <div className="post__comments-container">
              <span className="post__comments-owner">
                {comment?.commentBy?.username}
              </span>
              <span className="post-comment">{comment?.comment}</span>
            </div>
            <span className="post__comments-time">2m</span>
          </div>
        ))}
    </>
  );
}
