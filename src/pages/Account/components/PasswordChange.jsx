import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../../api/user/userApi";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";
import { toast } from "react-toastify";

export function PasswordChange() {
  const { userID, token, passwordChangeStatus, error } = useSelector(
    (state) => state.users
  );
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();

  useEffect(()=>{
    if(passwordChangeStatus === "fulfilled"){
      toast.success("successfully password changed", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
      });
    }
  },[])
  function updatePassword(data) {
    const newUserData = {
      newPassword: data.password,
      currentPassword: data.currentPassword,
    };
    dispatch(updateUserPassword({ userID, token, newUserData }));
  }

  return (
    <div className="setting__account-container">
      <div className="setting__main-header">
        <span className="setting__main-name"> Change password </span>
      </div>

      <form
        className="setting__account-form"
        onSubmit={handleSubmit(updatePassword)}
      >
        <div className="setting__account-cpassword">
          <label className="setting__account-label">current password</label>
          <input
            {...register("currentPassword", {
              required: true,
            })}
            className="setting__account-input"
            type="password"
          />
        </div>
        <div className="setting__account-npassword">
          <label className="setting__account-label">new password</label>
          <input
            {...register("password", {
              required: true,
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                message:
                  "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character !",
              },
            })}
            className="setting__account-input"
            type="password"
          />
        </div>
        {errors.password && (
          <span className="account__error">{errors.password.message}</span>
        )}
        <div className="setting__account-ncpassword">
          <label className="setting__account-label">confirm new password</label>
          <input
            {...register("confirm", {
              required: true,
              validate: {
                passwordEqual: (value) =>
                  value === getValues("password") || "Password Dont Match",
              },
            })}
            className="setting__account-input"
            type="password"
          />
        </div>
        {errors.confirm && (
          <span className="account__error">{errors.confirm.message}</span>
        )}
        {passwordChangeStatus === "rejected" && (
          <span className="account__error txt-center">{error}</span>
        )}

        <button type="submit" className="setting__save-btn setting-btn">
          Save
          {passwordChangeStatus === "pending" && (
            <span className="spinner-indicator">
              <LoadingSpinner isDefaultCss={false} color="white" size={"12"} />
            </span>
          )}
        </button>
      </form>

    </div>
  );
}
