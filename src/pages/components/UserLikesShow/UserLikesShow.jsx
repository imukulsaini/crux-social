import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikes } from "../../../api/user/userLikesApi";
import { sortPost } from "../../../utils";
import { PostCard } from "../PostCard/PostCard";
import { LoadingSpinner } from "../Spinner/LoadingSpinner";

export function UserLikesShow() {
  const { userID, token } = useSelector((state) => state.users);

  const { userLikes, getLikesStatus } = useSelector((state) => state.userLikes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLikes({ userID, token }));
  }, [userID, token]);

  const sortLikes = userLikes && sortPost(userLikes);

  return (
    <>
      {getLikesStatus === "pending" && (
        <span className="spinner-indicator">
          <LoadingSpinner isDefaultCss={true} size={"25"} />
        </span>
      )}
      {getLikesStatus === "fulfilled" &&
        sortLikes &&
        sortLikes?.map((post) => (
          <PostCard
            post={post}
            key={post._id}

            isBookmarkIconShow={false}
            isLikeIconShow={true}
          />
        ))}
    </>
  );

  
}
