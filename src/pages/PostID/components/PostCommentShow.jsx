import { PostComments } from "./PostComments";
import { useState } from "react";

export function PostCommentShow(postID) {
  const [isPostCommentShow, setPostCommentsShow] = useState(false);

  return (
    <>
      {isPostCommentShow ? (
        <div
          onClick={() => setPostCommentsShow(false)}
          className="comments__view-action"
        >
          hide comments
        </div>
      ) : (
        <div
          onClick={() => setPostCommentsShow(true)}
          className="comments__view-action"
        >
          view comments
        </div>
      )}

      {isPostCommentShow && (
        <div className="post__comments-show">
          <PostComments 
          postID={postID} />
        </div>
      )}
    </>
  );
}
