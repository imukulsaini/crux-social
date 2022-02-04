import { useSelector } from "react-redux";

export function ProfilePostCount() {
  const { userPosts } = useSelector((state) => state.posts);

  return (
    <div className="profile-page__data-posts flex-row">
      <span className="profile-page__head-count">{userPosts.length}</span>
      <span className="profile-page__head-name">posts</span>
    </div>
  );
}
