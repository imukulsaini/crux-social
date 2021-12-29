import { NavBar } from "../components/navbar/nav";
import { CreatePost } from "../components/createPost/CreatePost";
import { PostCard } from "../components/post/PostCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTimelinePosts } from "../../../features/post/PostAPI";
import "./Home.styles.css";
import { MutualFollowers } from "../components/MutualFollowers/MutualFollowers";


export function Home() {

  const dispatch = useDispatch();

  const { token, userID, status } = useSelector((state) => state.users);
  const { timelinePosts } = useSelector((state) => state.posts);

  useEffect(() => {
    if (userID) {
      console.log("fetch user posts");
      dispatch(getTimelinePosts({ token, userID }));
    }
  }, [status, userID, token]) ;

  return (
    <div className="home-page">
      <NavBar />
      <section className="home-page__main">
        <CreatePost />

        <div className="home-page__timeline">
          {timelinePosts &&
            timelinePosts.map((post) => {
              return (
                
                <div className="timeline__post-wrapper">
                  <PostCard post={post} 
                  isBookmarkIconShow={true}
                  isLikeIconShow={true}
                  >
                
                  </PostCard>
                </div>
              );
            })}
        </div>
      </section>

      <section className="home-page__right">
        <div className="home-page__main-follow">
          <div className="main-follow__header">
            <span className="main-follow__heading-name">Who to Follow</span>
          </div>

          <MutualFollowers />
          <MutualFollowers />
          <MutualFollowers />
          <MutualFollowers />
        </div>
      </section>

      <section className="home-page__left"></section>
    </div>
  );
}
