import { User } from "../interfaces/User";

import { clientID, redirect, clientSecret } from "../secrets";

export function getDiscordAuthURL() {
  return `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientID}&scope=identify&state=15773059ghq9183habn&redirect_uri=${encodeURIComponent(
    redirect
  )}&prompt=consent`;
}

export async function getUserFromCode(code: string): Promise<User> {
  const accessToken = await getAccessToken(code);
  return await getUser(accessToken.access_token);
}

async function getAccessToken(code: string) {
  const response = await fetch("https://discord.com/api/oauth2/token", {
    body: new URLSearchParams({
      client_secret: clientSecret,
      client_id: clientID,
      grant_type: "authorization_code",
      redirect_uri: redirect,
      code,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const jsonResponse = await response.json();

  console.log(jsonResponse);

  return jsonResponse as {
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;
    scope: string;
  };
}

async function getUser(token: string): Promise<User> {
  const url = `https://discord.com/api/users/@me`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const jsonResponse = await response.json();

  console.log(jsonResponse);

  return {
    discordID: jsonResponse.id,
    username: jsonResponse.username,
    avatarURL: `https://cdn.discordapp.com/avatars/${jsonResponse.id}/${
      jsonResponse.avatar
    }.${jsonResponse?.avatar?.startsWith("a_") ? "gif" : "png"}`,
  };
}
