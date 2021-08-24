import React from "react";
import { Ratings } from "../../components/ratings/Ratings/Ratings";
import { Page } from "../Page";

export const RatingsPage: React.FunctionComponent = () => {
  return (
    <div className="HomePage">
      <Page title="Ratings">
        <Ratings />
      </Page>
    </div>
  );
};
