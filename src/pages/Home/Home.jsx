import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../api/post/PostAPI";
import { CreatePost } from "../components/CreatePost/CreatePost";
import { NavBar } from "../components/Navbar/Nav";
import { PostCard } from "../components/PostCard/PostCard";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";
import "./home.css";
import { sortPost } from "../../utils";

export function Home() {
  const dispatch = useDispatch();
  const { token, userID, refreshUserStatus } = useSelector(
    (state) => state.users
  );
  const { timelinePosts, timelineStatus } = useSelector((state) => state.posts);
  useEffect(() => {
    if (userID && token) {
      dispatch(getTimelinePosts({ token, userID }));
    }
  }, [userID, token]);
  const sortTimelinePosts = timelinePosts && sortPost(timelinePosts);

  return (
    <div className="home-page">
      <NavBar />
      <section className="home-page__main">
        <CreatePost />

        {(timelineStatus === "pending" || refreshUserStatus === "pending") && (
          <span
          className="spinner-indicator">
            <LoadingSpinner isDefaultCss={true} size={"25"} />
          </span>
        )}

        {timelineStatus === "fulfilled" && (
          <div className="home-page__timeline">
            {sortTimelinePosts &&
              sortTimelinePosts.map((post) => {
                return (
                  <div 
                  key={post._id}
                  className="timeline__post-wrapper">
                    <PostCard
                      post={post}
                      isBookmarkIconShow={true}
                      isLikeIconShow={true}
                    ></PostCard>
                  </div>
                );
              })}
          </div>
        )}
      </section>

      <section className="home-page__right"></section>
      <section className="home-page__left"></section>
    </div>
  );
}
