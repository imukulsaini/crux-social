import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchUser } from "../../api/user/userApi";
import { useSocket } from "../../context/socket";
import { followProfile } from "../../reducers/user/userSlice";
import { NavBar } from "../components/Navbar/Nav";
import { NoMatch } from "../components/NoMatch/NoMatch";
import { LoadingSpinner } from "../components/Spinner/LoadingSpinner";
import { UserInfoCard } from "../components/UserInfoCard/UserInfoCard";
import "./search.css";

export function Search() {
  const [searchParams] = useSearchParams();
  const { token, searchStatus, userID, userSearchData } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const getSearchValue = searchParams.get("q");
  const { socket } = useSocket();

  useEffect(() => {
    if (getSearchValue && token && userID) {
      dispatch(searchUser({ value: getSearchValue, token }));
    }
  }, [getSearchValue, token, userID]);

  useEffect(() => {
    socket.on("getFollowInfo", (result) => {
      dispatch(
        followProfile({
          result,
          profile: result.profile,
        })
      );
    });
    return () => {
      socket.off("getFollowInfo");
    };
  }, [socket]);
  return (
    <div className="search-page">
      <NavBar />

      <section className="search-page__main">
        <h3 className="search__heading">People</h3>
        {searchStatus === "fulfilled" &&
          userSearchData &&
          userSearchData.length >= 1 &&
          userSearchData?.map((user) => {
            return (
              <UserInfoCard
                key={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
                bio={user.bio}
                userID={user._id}
                avatar={user.avatar}
                isFollowBtnShow={true}
                username={user.username}
                isUserBioShow={true}
              />
            );
          })}
        {searchStatus === "fulfilled" && userSearchData?.length === 0 && (
          <NoMatch text={"No User Found"} isButtonShow={true} />
        )}

        {searchStatus === "pending" && (
          <span className="spinner-indicator">
            <LoadingSpinner isDefaultCss={true} size={"20"} />
          </span>
        )}
      </section>
      <section className="search-page__left"></section>
      <section className="search-page__right"></section>
    </div>
  );
}
