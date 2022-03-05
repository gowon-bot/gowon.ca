import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Outlet } from "react-router-dom";
import { gowonClient } from "../../helpers/gowon/client";

export const DashboardLayout: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={gowonClient}>
      <Outlet />
    </ApolloProvider>
  );
};
