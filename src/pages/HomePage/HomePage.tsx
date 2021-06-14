import React from "react";
import { Page } from "../Page";
import { Card } from "../../components/Card/Card";
import "./HomePage.scss";

export const HomePage: React.FunctionComponent = () => {
  return (
    <div className="HomePage">
      <Page title="Home">
        <Card linkTo="/ratings">
          <h2>Ratings</h2>
        </Card>
      </Page>
    </div>
  );
};
