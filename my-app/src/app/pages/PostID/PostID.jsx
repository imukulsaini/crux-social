import "./PostID.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { PostCard } from "../components/post/PostCard";
import { useParams } from "react-router";
import { NavBar } from "../components/navbar/nav";
import { getPostByID } from "../../../features/post/PostAPI";
import { PostCreateComment } from "../components/post/PostCreateComment";
import { PostComments } from "../components/post/PostComments";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";

export function PostID() {
  const { postsID ,postIDStatus } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { postID } = useParams();
  const { state } = useLocation();
  const { userID, token } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if(postIDStatus === 'idle'){

      dispatch(getPostByID({ userID, token, postID }));
    }
  }, [userID, token, postID,postIDStatus]) ;
  
  function PostCommentShow(postID) {
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
            <PostComments postID={postID} />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="post-id">
      <NavBar />
      <div className="post-id__left"></div>

      <section className="post-id__main">
        <div
          onClick={ () => navigate(state?.from ? state.from : "/") }
          className="back__action-btn"
        >
          <BiArrowBack />
        </div>
          { postIDStatus === "loading" && 'loading'}
          {postIDStatus === "fulfilled" &&
              <PostCard post={postsID}
              isBookmarkIconShow={true}
              isLikeIconShow={true}
              >
                <PostCreateComment postCommentRoom={true} />
                <PostCommentShow postID={postsID._id} />
              </PostCard> }
        
        
        
        
      </section>

      <div className="post-id__right"></div>
    </div>
  )
}
