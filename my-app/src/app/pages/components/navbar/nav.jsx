import { useState, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";

import {
  MdMessage,
  MdNotifications,
  MdHome,
  MdArrowDropDown,
} from "react-icons/md";

import "./nav.css";

export function NavBar() {
  const navigate = useNavigate();

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
        <div onClick={() => navigate("/")} className="nav__logo">
          skateboard
          {/* <img src="" alt="" /> */}
        </div>
        <div className="search">
          <input
            className="search__input"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <button
            // onClick={()=>getSearchValue(productDispatch,searchValue)}

            className="search__button"
          >
            <BiSearch />
          </button>
        </div>

        <div className="nav__menu">

          <nav className="nav__menu-items">
            <li className="nav__items">
              <NavLink activeClassName="active" className="nav__items" to="/">
                <MdHome className="icon" size="1.7rem"></MdHome>
              </NavLink>
            </li>

            <li className="nav__items">
              <NavLink
                activeClassName="active"
                className="nav__items-link"
                to="/messages"
              >
                <MdMessage className="icon" size="1.5rem"></MdMessage>
              </NavLink>
            </li>

            <li className="nav__items">
              <NavLink
              activeClassName="active"

              className="nav__items-link" to="/notification">
                <MdNotifications
                  className="icon"
                  size="1.7rem"
                ></MdNotifications>
              </NavLink>
            </li>
          </nav>


        </div>

        <div onClick={() => navigate("/me")} className="nav__avatar avatar">
          {/* <img
                className="nav__avatar-image"
                alt=""
                src="https://pbs.twimg.com/profile_images/1372310949458112512/Isl5HmGT_400x400.jpg"
              /> */}

          <span className="nav__avatar-name">Mukul Saini </span>
        </div>

        <button
          // onClick={()=>logout()}
          className="nav__dropdown-menu"
        >
          <IoMdArrowDropdown />
        </button>
      </nav>
    </>
  );
}
