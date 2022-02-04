import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { getPostByID } from "../../api/post/PostAPI";
import { NavBar } from "../components/Navbar/Nav";
import { PostCard } from "../components/PostCard/PostCard";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";
import { PostCommentShow } from "./components/PostCommentShow";
import { PostCreateComment } from "./components/PostCreateComment";
import "./PostID.css";

export function PostID() {
  const { postsID, postIDStatus } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { postID } = useParams();
  const { token } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostByID({ token, postID }));
  }, [token, postID]) ;


 console.log("postID page")


  return (
    <div className="post-id">
      <NavBar />
      <div className="post-id__left"></div>

      <section className="post-id__main">
        <div onClick={() => navigate(-1)} className="back__action-btn">
          <BiArrowBack />
        </div>
        {postIDStatus === "pending" && (
          <span className="spinner-indicator">
            <LoadingSpinner isDefaultCss={true} size={"25"} />
          </span>
        )}

        {postIDStatus === "fulfilled" && (
          <PostCard
            post={postsID}
            isBookmarkIconShow={true}
            isLikeIconShow={true}
          >
            <PostCreateComment
            postCommentRoom={true} />
            <PostCommentShow postID={postsID._id} />
          </PostCard>
        )}
      </section>
      <div className="post-id__right"></div>
    </div>
  );
}
