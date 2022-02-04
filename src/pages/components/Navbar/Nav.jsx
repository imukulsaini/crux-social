import { useEffect, useRef, useState } from "react";
import {
  MdArrowDropDown,
  MdHome,
  MdMessage,
  MdNotifications,
} from "react-icons/md";
import {
  RiAccountBoxFill,
  RiAccountBoxLine,
  RiLogoutBoxRLine,
  RiSettings2Line,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as BrandLogo } from "../../../assets/BrandLogo.svg";
import { useSocket } from "../../../context/socket";
import { logout } from "../../../reducers/user/userSlice";
import { SearchBar } from "../SearchBar/SearchBar";
import "./nav.css";

export function NavBar() {
  const navigate = useNavigate();
  const { isUserLogin, userData } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [isDropDownShow, setDropDownShow] = useState(false);
  const { socket } = useSocket();
  const menuRef = useRef();

  function logoutUser() {
    socket.disconnect();
    dispatch(logout());
    navigate("/login");
  }

  useEffect(() => {
    function clickDetectDropDownModal(e) {
      if (menuRef.current && menuRef?.current?.contains(e.target)) {
        setDropDownShow(false);
      }
    }
    document.addEventListener("click", clickDetectDropDownModal, false);
    return () => {
      document.removeEventListener("click", clickDetectDropDownModal, false);
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav__container">
          <div className="nav__main">
            <div className="nav__left-container">
              <div className="nav__logo">
                <Link to="/" className="nav__logo-action">
                  <div className="brand__logo">
                    <BrandLogo />
                  </div>
                  <span className="brand__name">Crux</span>
                </Link>
              </div>

              <SearchBar />
            </div>

            <div className="nav__right-container">
              <div className="nav__menu">
                <ul className="nav__menu-items">
                  <NavLink
                    className="nav__items"
                    activeClassName="nav__items-active"
                    to="/"
                    exact="true"                    end
                  >
                    <MdHome className="icon" size="1.7rem"></MdHome>
                  </NavLink>

                  <NavLink
                    exact="true"                    className="nav__items"
                    activeClassName="nav__items-active"
                    to="/messages"
                  >
                    <MdMessage className="icon" size="1.5rem"></MdMessage>
                  </NavLink>
                  <NavLink
                    exact="true"                    className="nav__items"
                    activeClassName="nav__items-active"
                    to="/notifications"
                  >
                    <MdNotifications
                      className="icon"
                      size="1.5rem"
                    ></MdNotifications>
                  </NavLink>
                </ul>
              </div>

              <div className="nav__account">
                <div className="nav__user">
                  <span className="nav__user-name">
                    {isUserLogin
                      ? `${userData?.firstName} ${userData?.lastName}`
                      : ""}
                  </span>
                  <button
                    onClick={() =>
                      setDropDownShow((isDropDownShow) => !isDropDownShow)
                    }
                    className="nav__dropdown-btn"
                  >
                    <RiAccountBoxFill />
                    <MdArrowDropDown />
                  </button>

                  {isDropDownShow && (
                    <div className="nav__dropdown-option">
                      <div ref={menuRef} className="nav__dropdown-content">
                        <Link
                          to={`/${userData?.username}`}
                          className="nav__dropdown-item"
                        >
                          <RiAccountBoxLine
                            color="#37393a"
                            className="dropdown__item-icon"
                          />
                          <span className="dropdown__item-name">Profile</span>
                        </Link>

                        <hr
                          style={{
                            color: "#e5e5e5",
                          }}
                        />

                        <NavLink to="/settings" className="nav__dropdown-item">
                          <RiSettings2Line
                            color="#37393a"
                            className="dropdown__item-icon"
                          />
                          <span className="dropdown__item-name">Settings</span>
                        </NavLink>
                        <hr
                          style={{
                            color: "#e5e5e5",
                          }}
                        />
                        <span
                          onClick={() => logoutUser()}
                          className="nav__dropdown-item"
                        >
                          <RiLogoutBoxRLine
                            color="#37393a"
                            className="dropdown__item-icon"
                          />

                          <span className="dropdown__item-name">Log out</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* mobile View */}
      </nav>
    </>
  );
}
