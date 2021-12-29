import { useEffect } from "react";
import { NavBar } from "../components/navbar/nav";
import "./Profile.styles.css";
import { FiBookmark, FiHeart, FiGrid } from "react-icons/fi";
import { PostCard } from "../components/post/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { getUserPosts } from "../../../features/post/PostAPI";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { getUserBookmark } from "../../../features/User/userBookmarkApi";
import { getUserLikes } from "../../../features/User/userLikesApi";

export function UserPosts() {
  const { userPosts } = useSelector((state) => state.posts);

  return (
    userPosts &&
    userPosts.map((post) => {
      return (
        <PostCard post={post} isBookmarkIconShow={true} isLikeIconShow={true} />
      );
    })
  );
}

export function UserLikes() {
  console.log("user like vala comp");
  const { userID, token } = useSelector((state) => state.users);

  const { userLikes } = useSelector((state) => state.userLikes);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("uer like comp");
    dispatch(getUserLikes({ userID, token }));
  }, [userID, token]);

  return userLikes
    ? userLikes?.map((post) => {
        return (
          <PostCard
            post={post}
            isBookmarkIconShow={false}
            isLikeIconShow={true}
          />
        );
      })
    : null;
}
export function UserBookmark() {
  const { userID, token } = useSelector((state) => state.users);

  const { userBookmark } = useSelector((state) => state.userBookmark);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBookmark({ userID, token }));
  }, [userID, token]);

  return userBookmark
    ? userBookmark?.map((post) => {
        return (
          <PostCard
            post={post}
            isBookmarkIconShow={true}
            isLikeIconShow={false}
          />
        );
      })
    : null;
}

export function ProfilePage({ }) {

  
}
