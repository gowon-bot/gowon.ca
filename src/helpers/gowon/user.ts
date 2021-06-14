import { User } from "../../interfaces/User";
import { gowonClient } from "../../helpers/gowon/client";
import gql from "graphql-tag";

export async function getUserFromCode(code: string): Promise<User | undefined> {
  const response = await gowonClient.mutate<{ discordAuthenticate: User }>({
    mutation: gql`
      mutation discordAuthenticate($code: String!) {
        discordAuthenticate(code: $code) {
          discordID
          username
          avatarURL
        }
      }
    `,
    variables: { code },
  });

  return response.data?.discordAuthenticate;
}
