import React from "react";
import { Page } from "../Page";
import { ReactComponent as TwitterLogo } from "../../assets/TwitterLogo.svg";
import "./TwitterSuccessPage.scss";

export const TwitterSuccessPage: React.FunctionComponent = () => {
  return (
    <Page centered={true}>
      <div className="twitter">
        <TwitterLogo className="twitter-logo" />
        <h1>Twitter</h1>
      </div>

      <div className="information">
        <h2 className="success">Successfully signed in!</h2>
        <p>You can now run a select few commands on Twitter!</p>
        <p>
          To run a command, mention Gowon followed by the name of the command!
        </p>
        <p>For example, @Gowonlfm fm</p>
      </div>
    </Page>
  );
};
