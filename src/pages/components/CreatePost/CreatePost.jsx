import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsImage } from "react-icons/bs";
import { GrEmoji } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicOnCloudnary } from "../../../api/cloudnary/cloudnary";
import { createNewPost } from "../../../api/post/PostAPI";
import { CLOUDNARY_PRESET } from "../../../utils";
import { LoadingSpinner } from "../Spinner/LoadingSpinner";
import NoProfilePic from "../../../assets/NoProfilePic.png";
import "./createPost.css";

export function CreatePost() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const { token, userID, userData } = useSelector((state) => state.users);
  const { createPostStatus } = useSelector((state) => state.posts);
  const [imageFileName, setImageFileName] = useState("");
  const [emojiClick, setEmojiClick] = useState(false);
  const [loading, setLoading] = useState("idle");

  function imageFileHandler() {
    const getImageValue = getValues("postImage");
    setImageFileName(getImageValue[0]?.name);
  }

  function onEmojiClick(emojiObject) {
    const captionValue = getValues("caption");
    const newCaption = `${captionValue}${emojiObject.native}`;
    setValue("caption", newCaption);
  }

  useEffect(() => {
    if (createPostStatus === "fulfilled") {
      setLoading("fulfilled");
      setValue("caption", "");
      setValue("postImage", []);
      setImageFileName("");
    }
    if (createPostStatus === "rejected") {
      setLoading("rejected");
    }
  }, [createPostStatus]);

  async function createPost() {
    setLoading("pending");
    const getCaptionValue = getValues("caption");
    const data = new FormData();
    const getImage = getValues("postImage");
    data.append("file", getImage[0]);
    data.append("upload_preset", CLOUDNARY_PRESET);
    try {
      const result =
        getImage.length === 1
          ? await dispatch(uploadPicOnCloudnary({ formData: data })).unwrap()
          : false;
      dispatch(
        createNewPost({
          token,
          userID,
          caption: getCaptionValue,
          imageUrl: result === false ? "" : result.secure_url,
        })
      );
    } catch (rejectedValueOrSerializedError) {
      setLoading("rejected");
      console.log("value error");
    }
  }

  return (
    <div className="create-post">
      <div className="create-post__header">
        <span className="create-post__heading-name">Share Something  </span>
      </div>
      <form className="create-post__form" onSubmit={handleSubmit(createPost)}>
        <article className="create-post__main">
          <div className="create-post__avatar">
            <img
              className="create-post__avatar-image"
              alt=""
              src={userData.avatar || NoProfilePic}
            />
          </div>

          <div className="create-post__actions">
            <div className="create-post__tweet-area">
              <textarea
                className="create-post__input-tweet"
                {...register("caption", {
                  required: true,
                })}
                placeholder="what's Happening "
              ></textarea>
            </div>
            <div className="create-post__actions-input">
              <div className="create-post__actions-button">
                <div className="create-post__input-file">
                  <label
                    className="create-post__input-icon icon-bd-none"
                    htmlFor="file-input"
                  >
                    <BsImage size="1rem" />
                  </label>
                  <input
                    {...register("postImage", {
                      onChange: imageFileHandler,
                    })}
                    id="file-input"
                    type="file"
                  />
                  {imageFileName && (
                    <span className="file-input__name">{imageFileName}</span>
                  )}
                </div>

                <div className="create-post__emoji-input">
                  <label
                    onClick={() => setEmojiClick(!emojiClick)}
                    className="create-post__emoji-icon icon-bd-none"
                    htmlFor="emoji-input"
                  >
                    <GrEmoji size="1rem" />
                  </label>
                  {emojiClick && (
                    <Picker
                      theme="light"
                      style={{
                        position: "absolute",
                        width: "20%",
                        marginLeft: "1rem",
                      }}
                      id="emoji-picker"
                      onSelect={onEmojiClick}
                    />
                  )}
                </div>
              </div>
              <div className="create-post__actions-tweet">
                <button type="submit" className="crete-post__tweet-button">
                  Share
                  {loading === "pending" && (
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
          </div>
        </article>
      </form>
    </div>
  );
}
