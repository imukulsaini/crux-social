import { useSelector } from "react-redux";
import { sortPost } from "../../../utils";
import { PostCard } from "../PostCard/PostCard";
import { LoadingSpinner } from "../Spinner/LoadingSpinner";

export function UserPostsShow() {
  const { userPosts, userPostStatus } = useSelector((state) => state.posts);

  const sortPosts = userPosts && sortPost(userPosts);

  return (
    <>
      {userPostStatus === "pending" && (
        <span className="spinner-indicator">
          <LoadingSpinner isDefaultCss={true} size={"25"} />
        </span>
      )}
      {userPostStatus === "fulfilled" &&
        sortPosts &&
        sortPosts?.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            isBookmarkIconShow={true}
            isLikeIconShow={true}
          />
        ))}
    </>
  );
}
