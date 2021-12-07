import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import GowonLogo from "../../assets/gowonnies.png";
// import { useAppSelector } from "../../hooks";
// import { DiscordButton } from "./DiscordButton/DiscordButton";
// import { UserDisplay } from "./UserDisplay/UserDisplay";
import { Link } from "react-router-dom";

const toggleDarkMode = (state: boolean) => {
  document.body.classList.toggle("dark-mode", state);
  document.body.classList.toggle("light-mode", !state);
};

export const Navbar: React.FunctionComponent = () => {
  // const user = useAppSelector((state) => state.user.value);
  const [useDarkMode, setUseDarkMode] = useState(false);

  useEffect(() => {
    const themePreference = localStorage.getItem("themePreference");

    console.log(themePreference);

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
    console.log(useDarkMode);

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

      <Link className="menu-item" to="/">
        Home
      </Link>

      <Link className="menu-item" to="/commands">
        Commands
      </Link>

      <div></div>
      {/* {user ? <UserDisplay user={user} /> : <DiscordButton />} */}
    </div>
  );
};
