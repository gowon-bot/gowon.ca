import React from "react";
import { Page } from "../Page";
import { ReactComponent as SpotifyLogo } from "../../assets/SpotifyLogo.svg";
import "./SpotifySuccessPage.scss";

export const SpotifySuccessPage: React.FunctionComponent = () => {
  return (
    <Page centered={true}>
      <div className="gowonify">
        <SpotifyLogo className="spotify-logo" />
        <h1>Gowonify</h1>
      </div>

      <div className="information">
        <h2 className="success">Successfully signed in!</h2>
        <a href="/commands?q=spotify">
          Click here to see the commands you can run
        </a>
      </div>
    </Page>
  );
};
