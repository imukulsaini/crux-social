import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../../api/user/userApi";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";

export function DeleteUserAccount() {
  const dispatch = useDispatch();
  const {
    userID,
    token,
    deleteAccountStatus,
  } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteAccountStatus && deleteAccountStatus === "fulfilled") {
      //toast Ayega Account Has Been Deleted
      navigate("/login");
    }
  }, [deleteAccountStatus]);

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
            onClick={() => dispatch(deleteUserAccount({ userID, token }))}
            className="account__delete-btn setting-btn"
          >
            Delete my account
            {deleteAccountStatus === "pending" && (
              <span className="spinner-indicator">
                <LoadingSpinner
                  isDefaultCss={false}
                  color="white"
                  size={"12"}
                />
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
