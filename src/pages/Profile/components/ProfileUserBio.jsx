
export function ProfileUserBio({ website, bio }) {
  return (
    <div className="profile-page__user-bio">
      <span className="profile-page__bio-info">
        <a
          href={`https://${website}`}
          rel="noreferrer noopener"
          target="_blank"
        >
          {website}
        </a>
        <br />
        {bio}
      </span>
    </div>
  );
}
