import React, { useState, useEffect, useRef } from "react";
import "./Navbar.scss";
import GowonLogo from "../../assets/gowonnies.png";
import { useAppSelector } from "../../hooks";
import { UserDisplay } from "./UserDisplay/UserDisplay";
import { Link } from "react-router-dom";
import { getDiscordAuthURL } from "../../helpers/discord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const toggleDarkMode = (state: boolean) => {
  document.body.classList.toggle("dark-mode", state);
  document.body.classList.toggle("light-mode", !state);
};

export const Navbar: React.FunctionComponent = () => {
  const token = useAppSelector((state) => state.token.value);
  const [useDarkMode, setUseDarkMode] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const openDrawer = () => {
    drawerRef.current?.classList.toggle("open", true);
    drawerRef.current?.classList.toggle("closed", false);
  };

  const closeDrawer = () => {
    drawerRef.current?.classList.toggle("open", false);
    drawerRef.current?.classList.toggle("closed", true);
  };

  useEffect(() => {
    const eventCloseDrawer = (event: MouseEvent) => {
      if (!drawerRef.current?.contains(event.target as Node)) {
        closeDrawer();
      }
    };

    document.addEventListener("mousedown", eventCloseDrawer);

    return () => {
      document.removeEventListener("mousedown", eventCloseDrawer);
    };
  }, []);

  useEffect(() => {
    const themePreference = localStorage.getItem("themePreference");

    let shouldUseDarkMode = !!window.matchMedia(`(prefers-color-scheme: dark)`);

    if (themePreference) {
      if (themePreference === "dark") shouldUseDarkMode = true;
      if (themePreference === "light") shouldUseDarkMode = false;
    }

    setUseDarkMode(shouldUseDarkMode);
    toggleDarkMode(shouldUseDarkMode);

    return () => {};
  }, []);

  const switchTheme = () => {
    toggleDarkMode(!useDarkMode);
    localStorage.setItem("themePreference", !useDarkMode ? "dark" : "light");
    setUseDarkMode(!useDarkMode);
  };

  return (
    <div className="Navbar">
      <img
        alt="logo"
        className="navbar-item logo"
        src={GowonLogo}
        onClick={switchTheme}
      ></img>

      <button className="hamburger-button" onClick={openDrawer}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div className="menu-items closed" ref={drawerRef}>
        <Link className="menu-item" to="/" onClick={closeDrawer}>
          Home
        </Link>

        <Link className="menu-item" to="/commands" onClick={closeDrawer}>
          Commands
        </Link>

        <Link className="menu-item" to="/import-ratings" onClick={closeDrawer}>
          Import ratings
        </Link>

        <div className="grow"></div>

        <div className="menu-item user-item">
          {token?.discord_user ? (
            <UserDisplay user={token.discord_user} />
          ) : (
            <a
              className="button button-discord discord-login-button"
              href={getDiscordAuthURL()}
            >
              Login with Discord
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
