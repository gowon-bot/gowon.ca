import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

interface CardProps {
  linkTo?: string;
}

export const Card: React.FunctionComponent<CardProps> = ({
  children,
  linkTo,
}) => {
  const card = <div className="Card">{children}</div>;

  return linkTo ? (
    <Link className="Card" to={linkTo}>
      {children}
    </Link>
  ) : (
    card
  );
};
