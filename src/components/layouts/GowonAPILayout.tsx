import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Outlet } from "react-router-dom";
import { gowonClient } from "../../helpers/gowon/client";

export const GowonAPILayout: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={gowonClient}>
      <Outlet />
    </ApolloProvider>
  );
};
