import { ApolloClient, InMemoryCache } from "@apollo/client";
import { mirrorballAPIURL } from "../../secrets";

export const mirrorballClient = new ApolloClient({
  uri: mirrorballAPIURL,
  cache: new InMemoryCache(),
});
