import React from "react";
import "./Footer.scss";

export const Footer: React.FunctionComponent = () => {
  return (
    <div className="Footer">
      <p>
        Made with <span className="code-symbol">&lt;/&gt;</span> and{" "}
        <span className="heart-symbol">&lt;3</span> by{" "}
        <a href="https://jivison.dev">John</a>
      </p>
    </div>
  );
};
