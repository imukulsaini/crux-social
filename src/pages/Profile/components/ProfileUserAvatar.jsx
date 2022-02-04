import NoProfilePic from "../../../assets/NoProfilePic.png";

export function ProfileUserAvatar({ avatar }) {
  return (
    <div className="profile-page__user-avatar">
      <img
        className="profile-page__avatar"
        alt=""
        src={avatar || NoProfilePic}
      />
    </div>
  );
}
