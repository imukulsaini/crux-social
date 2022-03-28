import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAvatar,
  changeUpdateStatus,
} from "../../../reducers/user/userSlice";
import { updateUserData } from "../../../api/user/userApi";
import { uploadPicOnCloudnary } from "../../../api/cloudnary/cloudnary";
import { CLOUDNARY_PRESET } from "../../../utils";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";
import { toast } from "react-toastify";
import NoProfilePic from "../../../assets/NoProfilePic.png";

export function ProfileSettings() {
  const { setValue, handleSubmit, register, getValues } = useForm();
  const [uploadLoading, setLoading] = useState("idle");
  const { userData, userID, token, profileUpdateStatus, error } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("bio", userData.bio);
      setValue("website", userData.website);
    }
  }, [userData]);

  useEffect(() => {
    if (profileUpdateStatus === "fulfilled") {
      toast.success("profile updated", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
      });
      dispatch(changeUpdateStatus("idle"));
    }
  }, [profileUpdateStatus]);

  function updateProfile(data) {
    const newUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      website: data.website,
      bio: data.bio,
      avatar: userData.avatar,
    };
    dispatch(updateUserData({ userID, token, newUserData }));
  }

  async function uploadProfilePic() {
    setLoading("pending");
    let data = new FormData();
    const getImage = getValues("profilePic");
    data.append("file", getImage[0]);
    data.append("upload_preset", CLOUDNARY_PRESET);
    try {
      const result = await dispatch(
        uploadPicOnCloudnary({ formData: data })
      ).unwrap();
      dispatch(changeAvatar(result.secure_url));
      setLoading("fulfilled");
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
      setLoading("rejected");
    }
  }
  return (
    <div className="setting__profile-info">
      <div className="setting__profile-container">
        <div className="setting__main-header">
          <span className="setting__main-name"> Change Profile </span>
        </div>
        <form
          className="setting__profile-form"
          onSubmit={handleSubmit(updateProfile)}
        >
          <div className="setting__avatar">
            <div className="setting__profile-avatar">
              <img
                className="create-post__avatar-image"
                alt=""
                src={userData.avatar || NoProfilePic}
              />
            </div>
            <input type="file" {...register("profilePic")} />
            <button
              type="button"
              onClick={uploadProfilePic}
              className="setting__upload"
            >
              upload
              {uploadLoading === "pending" && (
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
          <div className="setting__profile-name">
            <div className="setting__profile-fname">
              <label className="setting__name-label">First Name</label>
              <input
                {...register("firstName")}
                className="setting__name-input"
                type="text"
              />
            </div>

            <div className="setting__profile-lname">
              <label className="setting__name-label">last Name</label>
              <input
                {...register("lastName")}
                className="setting__name-input"
                type="text"
              />
            </div>
          </div>

          <div className="setting__profile-bio">
            <label className="setting__bio-head">Brief Bio</label>
            <textarea
              {...register("bio")}
              className="setting__bio-text"
            ></textarea>
          </div>

          <div className="setting__profile-web">
            <label className="setting__web-head">Website</label>
            <input
              {...register("website")}
              className="setting__webinput"
              type="text"
            />
          </div>

          {profileUpdateStatus === "rejected" && (
            <span className="upload__error txt-center">{error}</span>
          )}
          <button type="submit" className="setting__save-btn setting-btn">
            Save
            {profileUpdateStatus === "pending" && (
              <span className="spinner-indicator">
                <LoadingSpinner
                  isDefaultCss={false}
                  color="white"
                  size={"12"}
                />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
