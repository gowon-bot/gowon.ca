import React from "react";
import "./DiscordMessage.scss";

type DiscordMessageProps = React.PropsWithChildren<{
  displayName: string;
  avatarURL: string;
  roleColour?: string;
  timestamp?: string;
}>;

export const DiscordMessage: React.FunctionComponent<DiscordMessageProps> = ({
  children,
  avatarURL,
  displayName,
  roleColour,
  timestamp,
}) => {
  const now = new Date();

  return (
    <div className="DiscordMessage">
      <img className="profile-picture" src={avatarURL} alt="profile"></img>
      <div className="right">
        <h2 className="header">
          <span
            className="display-name"
            style={{ color: roleColour || "var(--color-primary)" }}
          >
            {displayName}
          </span>
          <span className="timestamp">
            {timestamp ||
              `Today at ${now.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}`}
          </span>
        </h2>
        <div className="message-content">{children}</div>
      </div>
    </div>
  );
};
