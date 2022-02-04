import { NavLink } from "react-router-dom";
export function AccountSideBarLeft() {
  return (
    <section className="settings__left">
      <h3 className="settings__header">Settings </h3>
      <div className="settings__left-contain">
        <ul className="settings__left-list">
          <NavLink
            to=""
            activeClassName="settings__left-item-active"
            className="settings__left-item"
            exact="true"            end
          >
            General
          </NavLink>
          <NavLink
            to="password"
            activeClassName="settings__left-item-active"
            className="settings__left-item"
            exact="true"          >
            Change Password
          </NavLink>
          <NavLink
            to="delete"
            activeClassName="settings__left-item-active"
            className="settings__left-item"
            exact="true"          >
            Delete Account
          </NavLink>
        </ul>
      </div>
    </section>
  );
}
