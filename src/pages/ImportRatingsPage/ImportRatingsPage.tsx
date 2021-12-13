import React, { useState } from "react";
import { ImportRatingsDisplay } from "./ImportRatingsDisplay/ImportRatingsDisplay";
import { Page } from "../Page";
import "./ImportRatingsPage.scss";

export const ImportRatingsPage: React.FunctionComponent = () => {
  const [selected, setSelected] = useState(false);
  const [ratings, setRatings] = useState("");

  const handlePaste: React.ClipboardEventHandler<HTMLDivElement> = (event) => {
    const paste = event.clipboardData.getData("text");

    event.stopPropagation();

    setRatings(paste);
  };

  const handleClick = () => setSelected(true);

  return (
    <div className="ImportRatingsPage" onPaste={handlePaste}>
      <Page title="Import ratings" centered={true}>
        <div
          onPaste={handlePaste}
          onClick={handleClick}
          className={`paste-zone ${selected ? "selected" : ""}`}
        >
          Click me and paste your ratings in here
        </div>

        {ratings && <ImportRatingsDisplay ratings={ratings} />}
      </Page>
    </div>
  );
};
