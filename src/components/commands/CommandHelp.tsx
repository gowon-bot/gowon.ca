import React, { useState } from "react";
import { DiscordMessage } from "../DiscordMessage/DiscordMessage";
import "./CommandHelp.scss";

interface CommandHelpProps {
  command: Command;
  prefix?: string;
}

export const CommandHelp: React.FunctionComponent<CommandHelpProps> = ({
  command,
  prefix = "!",
}) => {
  const [displayHelp, setDisplayHelp] = useState(false);

  const handleClick = () => setDisplayHelp(!displayHelp);

  return (
    <div className="CommandHelp" onClick={handleClick}>
      <h3 className="command-title">{displayCommandName(command)} </h3>
      <p className="help-description">{command.description}</p>

      {displayHelp && (
        <div className="help-content">
          {command.aliases.length ? (
            <div className="aliases">
              <h5 className="aliases-title">Aliases:</h5>
              <div className="aliases-content">
                {command.aliases.map((a) => (
                  <span className="text-inline alias">{a}</span>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="usage">
            <h5 className="usage-title">Usage:</h5>

            <div className="usage-content">
              {command.usage.map((u) => (
                <DiscordMessage
                  displayName="You"
                  avatarURL="https://gowon.ca/assets/gowonniess.png"
                  roleColour="#9864b0"
                >
                  <span className="command-name">
                    {prefix}
                    {displayCommandName(command)}
                  </span>{" "}
                  {u}
                </DiscordMessage>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function displayCommandName(command: Command): string {
  return (command.parentName ? command.parentName + " " : "") + command.name;
}

export interface Command {
  id: string;
  idSeed: string;
  name: string;
  friendlyName: string;
  description: string;
  parentName?: string;

  aliases: string[];
  variations: Variation[];

  category?: string;
  subcategory?: string;
  usage: string[];

  hasChildren: boolean;
}

export interface Variation {
  name: string;
  variation: string[];
  description?: string;
}
