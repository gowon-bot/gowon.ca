import React from "react";
import { Page } from "../Page";
import "./ErrorPage.scss";

export const PleaseSignIn: React.FunctionComponent = () => {
  return (
    <div className="PleaseSignIn">
      <Page title=":/" centered={true}>
        <div className="error">
          <h2>Please sign in to access this page!</h2>
          <img
            alt="Gowon sipping a drink"
            src="https://media.tenor.com/bivUZaX3VWMAAAAe/gowon-loona.png"
          />
        </div>
      </Page>
    </div>
  );
};
