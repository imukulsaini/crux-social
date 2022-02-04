import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar/Nav.jsx";
import "./Account.styles.css";
import { AccountSideBarLeft } from "./components/AccountSideBar";

export function AccountSettings() {
  return (
    <div className="settings">
      <NavBar />
      <AccountSideBarLeft />
      <section className="settings__main">
        <div className="settings__main-contain">
          <Outlet />
        </div>
      </section>
      <section className="settings__right"></section>
    </div>
  );
}
