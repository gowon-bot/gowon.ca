import {
  DiscordUser,
  DoughnutToken,
  TokenAndUser,
} from "../interfaces/DoughnutToken";
import { doughnutURL } from "../secrets";

export async function destroyToken(token: DoughnutToken) {
  await fetch(doughnutURL + "/token/destroy", {
    method: "post",
    body: JSON.stringify({ token: token.token }),
  });
}

export async function getUserFromCode(
  code: string
): Promise<TokenAndUser | undefined> {
  const response = await fetch(doughnutURL + "/token/request", {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  const tokenAndUser = await response.json();

  tokenAndUser.discord_user = convertDiscordUser(tokenAndUser.discord_user);

  return tokenAndUser as TokenAndUser;
}

function convertDiscordUser(response: any): DiscordUser {
  return {
    id: response.id,
    username: response.username,
    avatarURL: `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`,
  };
}
