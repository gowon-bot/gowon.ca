import React, { MouseEventHandler, useState } from "react";
import Gowonniess from "../../assets/gowonniess.png";
import { DiscordMessage } from "../DiscordMessage/DiscordMessage";
import "./CommandHelp.scss";

type CommandHelpProps = React.PropsWithChildren<{
  command: Command;
  prefix?: string;
  inParent?: boolean;
  parentSetDisplayHelp?: (toggle: boolean) => void;
}>;

export const CommandHelp: React.FunctionComponent<CommandHelpProps> = ({
  inParent,
  command,
  prefix = "!",
  parentSetDisplayHelp,
}) => {
  const [displayHelp, setDisplayHelp] = useState(inParent || false);
  const displayUsage = !command.hasChildren;

  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    (parentSetDisplayHelp || setDisplayHelp)(!displayHelp);
  };

  const childrenDisplayed = command.hasChildren && displayHelp;

  return (
    <div
      className={
        "CommandHelp" +
        (inParent ? " in-parent" : "") +
        (childrenDisplayed ? " parent" : "") +
        (displayHelp ? " expanded" : "")
      }
      onClick={handleClick}
    >
      <h3 className="command-title">
        {displayCommandName(command)}{" "}
        {command.hasChildren && (
          <span className="subtitle text-inline">Parent</span>
        )}
      </h3>
      <p className="help-description">{command.description}</p>

      {displayHelp && (
        <div className="help-content">
          {displayUsage && command.aliases?.length ? (
            <div className="aliases">
              <h5 className="aliases-title">Aliases:</h5>
              <div className="aliases-content">
                {command.aliases.map((a) => (
                  <span key={a} className="text-inline alias">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}

          {displayUsage && command.variations?.length ? (
            <div className="variations">
              <h5 className="variations-title">Variations:</h5>
              <div className="variations-content">
                {command.variations.map((v) => (
                  <li key={v.name}>
                    {v.name} (
                    {v.variation.map((variation) => (
                      <span key={variation} className="text-inline variation">
                        {variation}
                      </span>
                    ))}
                    ){v.description && " - " + v.description}
                  </li>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}

          {displayUsage && (
            <div className="usage">
              <h5 className="usage-title">Usage:</h5>

              <div className="usage-content">
                {command.usage.map((u) => (
                  <DiscordMessage
                    key={u}
                    displayName="You"
                    avatarURL={Gowonniess}
                    roleColour="var(--gowon-development-pink)"
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
          )}

          {!displayUsage && (
            <div className="children">
              {command.children.map((c, idx) => (
                <>
                  <CommandHelp
                    command={c}
                    key={c.id}
                    inParent={true}
                    parentSetDisplayHelp={setDisplayHelp}
                  ></CommandHelp>

                  {idx !== command.children.length - 1 && <hr />}
                </>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function displayCommandName(command: Command) {
  return (
    <>
      {command.parentName && (
        <span className="parent-name">{command.parentName} </span>
      )}
      {command.friendlyName}
    </>
  );
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
  children: Command[];
}

export interface Variation {
  name: string;
  variation: string[];
  description?: string;
}
