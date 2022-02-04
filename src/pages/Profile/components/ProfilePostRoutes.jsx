import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill, BsGridFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
export function ProfilePostRoutes({ isAdmin }) {
  return (
    <ul className="profile-page__route-list">
      <li to="" className="profile-page__route-item">
        <span className="profile-page__route-info">
          <NavLink
            className="post-routes__items"
            activeClassName="post-routes-likes__active"
            to=""
            exact="true"            end
          >
            <BsGridFill className="icon" size={"1.1rem"} />
            <span className="profile-page__route-name"> Posts</span>
          </NavLink>
        </span>
      </li>
      {isAdmin && (
        <>
          <li to="bookmark" className="profile-page__route-item">
            <span className="profile-page__route-info">
              <NavLink
                className="post-routes__items"
                activeClassName="post-routes-likes__active"
                to="bookmark"
                exact="true"              >
                <BsFillBookmarkFill className="icon" size={"1.1rem"} />
                <span className="profile-page__route-name">Bookmark</span>
              </NavLink>
            </span>
          </li>
          <li className="profile-page__route-item">
            <div className="profile-page__route-info">
              <NavLink
                className="post-routes__items"
                activeClassName="post-routes-likes__active"
                to="likes"
                exact="true"              >
                <AiFillHeart className="icon" size={"1.1rem"} />
                <span className="profile-page__route-name">Likes</span>
              </NavLink>
            </div>
          </li>
        </>
      )}
    </ul>
  );
}
