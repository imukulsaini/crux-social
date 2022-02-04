import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserBookmark } from "../../../api/user/userBookmarkApi";
import { sortPost } from "../../../utils";
import { PostCard } from "../../components/PostCard/PostCard";
import { LoadingSpinner } from "../Spinner/LoadingSpinner";



export function UserBookmarkShow() {
  const { userID, token } = useSelector((state) => state.users);

  const { userBookmark, getBookmarkStatus } = useSelector(
    (state) => state.userBookmark
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBookmark({ userID, token }));
  }, [userID, token]);

  const sortBookmarks = userBookmark && sortPost(userBookmark);

  return (
    <>
      {getBookmarkStatus === "pending" && (
        <span className="spinner-indicator">
          <LoadingSpinner isDefaultCss={true} size={"25"} />
        </span>
      )}
      {getBookmarkStatus === "fulfilled" &&
        sortBookmarks &&
        sortBookmarks?.map((post) => (
          <PostCard
            post={post}
            key={post._id}

            isBookmarkIconShow={true}
            isLikeIconShow={false}
          />
        ))}
    </>
  );
}
