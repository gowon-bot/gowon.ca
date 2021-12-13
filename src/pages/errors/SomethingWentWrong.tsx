import React from "react";
import { Page } from "../Page";
import "./SomethingWentWrong.scss";

export const SomethingWentWrong: React.FunctionComponent = () => {
  return (
    <div className="SomethingWentWrong">
      <Page title=":(" centered={true}>
        <div>
          <h2>Something went wrong...</h2>
          <img
            alt="Gowon selfie with burnt nuggets"
            src="https://pbs.twimg.com/media/EVzmQNPXQAE8TIm.jpg"
          />
        </div>
      </Page>
    </div>
  );
};
