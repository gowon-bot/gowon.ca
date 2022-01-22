import React from "react";
import { DiscordMessage } from "../../components/DiscordMessage/DiscordMessage";
import { Page } from "../Page";
import "./HomePage.scss";
import Gowonnies from "../../assets/gowonnies.png";
import { useAppSelector } from "../../hooks";

export const HomePage: React.FunctionComponent = () => {
  const token = useAppSelector((state) => state.token.value);

  return (
    <div className="HomePage">
      <Page title="Home" centered={true}>
        <div className="content">
          <DiscordMessage
            displayName="Gowon"
            roleColour="var(--gowon-green)"
            avatarURL={Gowonnies}
          >
            <p>
              Welcome to Gowon
              {token ? (
                <>
                  ,{" "}
                  <span className="discord-username">
                    {token.discord_user.username}
                  </span>
                </>
              ) : (
                <>!</>
              )}
            </p>
          </DiscordMessage>

          <div className="buttons">
            <a
              href="https://discord.com/oauth2/authorize?client_id=720135602669879386&scope=bot&permissions=26688"
              className="button button-discord invite"
            >
              Invite the bot
            </a>
            <a
              href="https://discord.gg/9Vr7Df7TZf"
              className="button button-discord support"
            >
              Join the support server
            </a>
            <a
              href="https://last.fm/user/gowon_"
              className="button button-lastfm lastfm"
            >
              Follow her on Last.fm
            </a>
            <a
              href="https://www.patreon.com/gowon_"
              className="button button-patreon patreon"
            >
              Support me on Patreon
            </a>
            <a
              href="https://github.com/gowon-bot/gowon"
              className="button button-github github"
            >
              Github
            </a>
          </div>
        </div>
      </Page>
    </div>
  );
};
