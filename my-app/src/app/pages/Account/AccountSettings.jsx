import { useState } from "react";
import { updateUserPassword } from "../../../features/User/userApi";
import { useSelector, useDispatch } from "react-redux";
import { DeleteUserAccount } from "./DeleteAccount";

export function AccountProfileSetting() {
  const { userID, token } = useSelector((state) => state.users);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  async function updatePassword(e) {
    e.preventDefault();
    const newUserData = {
      newPassword,
      currentPassword,
    };

    dispatch(updateUserPassword({ userID, token, newUserData }));
  }

  return (
    <div className="setting__account-container">
      <div className="setting__main-header">
        <span className="setting__main-name"> Change password </span>
      </div>

      <form className="setting__account-form">
        <div className="setting__account-cpassword">
          <label className="setting__account-label">current password</label>
          <input
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
            className="setting__account-input"
            type="password"
          />
        </div>
        <div className="setting__account-newpass">
          <div className="setting__account-npassword">
            <label className="setting__account-label">new password</label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="setting__account-input"
              type="password"
            />
          </div>

          <div className="setting__account-ncpassword">
            <label className="setting__account-label">
              confirm new password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="setting__account-input"
              type="password"
            />
          </div>
        </div>

        <hr
          style={{
            width: "90%",
            marginLeft: "1rem",
            marginBottom: "1.5rem",
            marginTop: "1.5rem",
          }}
        />

        <button
          onClick={updatePassword}
          className="setting__save-btn setting-btn"
        >
          Save
        </button>
      </form>

      <DeleteUserAccount />
    </div>
  );
}
