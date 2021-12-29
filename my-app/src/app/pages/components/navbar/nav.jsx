import { useState, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiAccountBoxFill ,RiAccountBoxLine ,RiLogoutBoxRLine} from "react-icons/ri";


import {
  MdMessage,
  MdNotifications,
  MdHome,
  MdArrowDropDown,
} from "react-icons/md";

import "./nav.css";

export function NavBar() {
  const navigate = useNavigate();
  const [isDropDownShow , setDropDownShow ] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // function getSearchValue(productDispatch,searchValue) {
  //   productDispatch({
  //     type: "SEARCH_ITEMS",
  //     payload: searchValue,
  //   });
  // }

  const isUserLogin = false;
  return (
    <>
      <nav className="nav">
        <div className="nav__container">
          <div className="nav__main">
            {/* 1 */}
            <div className="nav__left-container">
              <div className="nav__logo">
                <Link to="/" className="nav__logo-action">
                  <div className="brand__logo">
                    {/* <BrandLogo fill="#fc7551" stroke="white" /> */}
                  </div>
                  <span className="brand__name">ScateBoard</span>
                </Link>
              </div>

              <div className="nav__search">
                <input
                  // onChange={(e)=>setSearchText(e.target.value)}
                  // value={searchText}
                  className="search__input"
                  type="text"
                  placeholder="Search"
                ></input>
                <Link
                  to="/"
                  // to={`/?${createSearchParams({'search':searchText})}`}

                  style={{ paddingLeft: ".5rem" }}
                  className="search__button"
                >
                  <BiSearch />
                </Link>
              </div>
            </div>

            <div className="nav__right-container">
              <div className="nav__menu">
                <ul className="nav__menu-items">
                  <NavLink
                    className="nav__items"
                    activeClassName="active"
                    to="/"
                  >
                    <MdHome className="icon" size="1.7rem"></MdHome>
                  </NavLink>

                  <NavLink
                    activeClassName="active"
                    className="nav__items"
                    to="/messages"
                  >
                    <MdMessage className="icon" size="1.5rem"></MdMessage>
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="nav__items"
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
                  <span className="nav__user-name">Mukul Saini</span>
                  <button
                    onClick={()=>setDropDownShow(isDropDownShow=>!isDropDownShow)}

                    className="nav__dropdown-btn"
                  >
                    <RiAccountBoxFill />
                    <MdArrowDropDown />
                  </button>

                  {isDropDownShow && ( //dropdown vala
                    <div className="nav__dropdown-option">
                      <div className="nav__dropdown-content">
                      <Link
                          to="/me"
                          className="nav__dropdown-item"
                        >
                          <RiAccountBoxLine color='#37393a' className='dropdown__item-icon' />
                          <span className="dropdown__item-name">
                            Profile
                          </span>
                        </Link>

                        <hr
                          style={{
                            color: "gray",
                            backgroundColor: "gray",
                            height: 2,
                          }}
                        />

                        <NavLink
                          to="/settings"
                          className="nav__dropdown-item"
                        >
                          <RiAccountBoxLine color='#37393a' className='dropdown__item-icon' />
                          <span className="dropdown__item-name">
                            General Settings
                          </span>
                        </NavLink>
                        <hr
                          style={{
                            color: "gray",
                            backgroundColor: "gray",
                            height: 2,
                          }}
                        />
                        <span
                          // onClick={logoutUser}
                          className="nav__dropdown-item"
                        >
                          <RiLogoutBoxRLine color='#37393a' className='dropdown__item-icon' />

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
