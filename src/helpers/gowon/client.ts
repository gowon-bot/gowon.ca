import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gowonAPIURL } from "../../secrets";

export const gowonClient = new ApolloClient({
  uri: gowonAPIURL,
  cache: new InMemoryCache(),
});
