import React from "react";
import "./Page.scss";

interface PageProps {
  title?: string;
  centered?: boolean;
}

export const Page: React.FunctionComponent<PageProps> = ({
  children,
  title,
  centered,
}) => {
  document.title = title ? `Gowon | ${title}` : "Gowon";

  return <div className={`Page ${centered ? "centered" : ""}`}>{children}</div>;
};
