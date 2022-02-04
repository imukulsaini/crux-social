import { useEffect, useState } from "react";
import { GoComment } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { useSocket } from "../../../context/socket";
import {
  postAddedInBookMark,
  postRemoveFromBookmark,
} from "../../../reducers/post/PostSlice";

import { LikePost } from "./components/LikePost";
import { RemoveBookmark } from "./components/RemoveBookmark";
import NoProfilePic from "../../../assets/NoProfilePic.png";
import { SaveBookMark } from "./components/SaveBookmark";
import { UnLikePost } from "./components/UnLikePost";
import "./PostCard.css";

export function PostCard({
  post,
  isBookmarkIconShow,
  isLikeIconShow,
  children,
}) {
  const { userID, isUserLogin } = useSelector((state) => state.users);
  const [isLikeModal, setLikeModal] = useState(false);
  const [checkIsPostSavedByUser, setSavePost] = useState(false);
  const [checkIsPostLikeByUser, setPostLike] = useState(false);
  const { socket } = useSocket();
  const {
    caption,
    imageUrl,
    createdAt,
    postBy: { avatar, username },
  } = post;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function openLikeModal() {
    setLikeModal(true);
  }

  useEffect(() => {
    if (post && userID) {
      const isPostLike = post && post?.likeBy?.includes(userID);
      const isBookMark = post && post?.bookmarkBy?.includes(userID);
      setPostLike(isPostLike);
      setSavePost(isBookMark);
    }
  }, [post, userID]);

  useEffect(() => {
    if (socket && isUserLogin) {
      socket.on("addBookmarkInfo", (bookmarkInfo) => {
        dispatch(postAddedInBookMark({ bookmarkInfo }));
      });

      return () => {
        socket?.off("addBookmarkInfo");
      };
    }
  }, [isUserLogin, socket]);

  useEffect(() => {
    if (socket && isUserLogin) {
      socket.on("removeBookmarkInfo", (bookmarkInfo) => {
        dispatch(postRemoveFromBookmark({ bookmarkInfo }));
      });
    }
    return () => {
      socket?.off("removeBookmarkInfo");
    };
  }, [isUserLogin, socket]);
  return (
    <>
      <div className="post">
        <div className="post__header-user">
          <div className="post__avatar">
            <img
              className="create-post__avatar-image"
              alt="avatar"
              src={avatar || NoProfilePic}
            />
          </div>

          <div className="post__user-info">
            <span 
            onClick={()=>navigate(`/${username}`)}
            className="post__owner-name">{username}</span>
            <span className="post__created-at">{format(createdAt)}</span>
          </div>
        </div>

        <div className="post__header-caption">
          <span className="post-captions">{caption}</span>
        </div>

        <div className="post__image-info">
          {imageUrl !== null && (
            <Link to={`/post/${post._id}`} className="post__image-info">
              <img className="post__image" alt="" src={imageUrl} />
            </Link>
          )}
        </div>

        <div onClick={openLikeModal} className="post__info">
          <span className="post__likes-count">{post.likesCount} likes</span>
        </div>

        <div className="post__actions-info ">
          <div className="post__actions-comments pst-action">
            <Link
              to={`/post/${post._id}`}
              className="post__actions-comments-btn icon-bd-none"
            >
              <GoComment size="1.5rem" />
            </Link>
            <span className="post__actions-name pst-action-name">Comments</span>
          </div>

          {isLikeIconShow && (
            <>
              {checkIsPostLikeByUser ? (
                <UnLikePost postLikes={post.likesCount} postID={post._id} />
              ) : (
                <LikePost
                  checkIsPostLikeByUser={checkIsPostLikeByUser}
                  postID={post._id}
                  postBy={post.postBy}
                />
              )}
            </>
          )}

          {isBookmarkIconShow && (
            <>
              {checkIsPostSavedByUser ? (
                <RemoveBookmark postID={post._id} />
              ) : (
                <SaveBookMark postID={post._id} />
              )}
            </>
          )}
        </div>
        {children}
      </div>
    </>
  );
}
