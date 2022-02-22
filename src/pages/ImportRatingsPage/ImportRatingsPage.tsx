import React, { useState } from "react";
import { ImportRatingsDisplay } from "./ImportRatingsDisplay/ImportRatingsDisplay";
import { Page } from "../Page";
import "./ImportRatingsPage.scss";
import { useAppSelector } from "../../hooks";

export const ImportRatingsPage: React.FunctionComponent = () => {
  const token = useAppSelector((state) => state.token.value);
  const [ratings, setRatings] = useState("");

  const handlePaste: React.ClipboardEventHandler<HTMLDivElement> = (event) => {
    const paste = event.clipboardData.getData("text");

    event.stopPropagation();

    setRatings(paste);
  };

  return (
    <div className="ImportRatingsPage" onPaste={handlePaste}>
      <Page title="Import ratings" centered={true}>
        <p>Click me and paste your ratings in here</p>
        <input onPaste={handlePaste} className={`paste-zone`}></input>
        {ratings && <ImportRatingsDisplay ratings={ratings} />}
        {!token && (
          <p className="reminder">Please sign in to import your ratings!</p>
        )}
      </Page>
    </div>
  );
};
