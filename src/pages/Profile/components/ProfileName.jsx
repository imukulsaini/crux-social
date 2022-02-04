export function ProfileName({ firstName, lastName }) {
  return (
    <div className="profile-page__user-name">{`${firstName} ${lastName}`}</div>
  );
}
