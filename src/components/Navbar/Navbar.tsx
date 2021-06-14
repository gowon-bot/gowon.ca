import React from "react";
import "./Navbar.scss";
import GowonLogo from "../../assets/gowonnies.png";
import { DiscordButton } from "./DiscordButton/DiscordButton";
import { useAppSelector } from "../../hooks";
import { UserDisplay } from "./UserDisplay/UserDisplay";
import { Link } from "react-router-dom";

export const Navbar: React.FunctionComponent = () => {
  const user = useAppSelector((state) => state.user.value);

  return (
    <div className="Navbar">
      <Link to="/">
        <img alt="logo" className="navbar-item logo" src={GowonLogo}></img>
      </Link>

      <h3 className="navbar-item">Gowon</h3>

      <div className="push"></div>

      {user ? <UserDisplay user={user} /> : <DiscordButton />}
    </div>
  );
};
