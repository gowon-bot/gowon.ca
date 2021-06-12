import React from "react";
import { getDiscordAuthURL } from "../../../helpers/discord";
import "./DiscordButton.scss";

export const DiscordButton: React.FunctionComponent = () => {
  const handleOnClick = () => {
    window.location.href = getDiscordAuthURL();
  };

  return (
    <div className="DiscordButton">
      <button onClick={handleOnClick}>Login with Discord</button>
    </div>
  );
};
