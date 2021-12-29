import "./Account.styles.css";
import { NavBar } from "../components/navbar/nav";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";


export function AccountLeftBar(){
  return (
    <section className="settings__left">
    <div className="settings__left-contain">
      <ul className="settings__left-list">
        <Link to='' className="settings__left-item">
          <a href="a">Profile</a>
        </Link>
        <Link 
        to='account' 
        className="settings__left-item">
          <a href="a">Account</a>
        </Link>
      </ul>
    </div>
  </section>
  )
}

export function AccountSettings() {
  return (
    <div className="settings">
      <NavBar />
      <AccountLeftBar/>
      <section className="settings__main">
        <div className="settings__main-contain">
        <Outlet/>
        </div>
      </section>
    </div>
  );
}
