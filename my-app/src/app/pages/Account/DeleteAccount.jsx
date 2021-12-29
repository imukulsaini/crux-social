import { deleteUserAccount } from "../../../features/User/userApi";
import { useSelector, useDispatch } from "react-redux";

export function DeleteUserAccount() {
  const dispatch = useDispatch();
  const { userID, token } = useSelector((state) => state.users);

  return (
    <>
      <div className="setting__account-delete">
        <div className="setting__main-header">
          <span className="setting__main-name"> Delete account </span>
        </div>

        <div className="account__delete-container">
          <span className="account__delete-text">
            Delete your account and account data . This can't be undone !
          </span>

          <button
            onClick={dispatch(deleteUserAccount({ userID, token }))}
            className="account__delete-btn setting-btn"
          >
            Delete my account
          </button>
        </div>
      </div>
    </>
  );
}
