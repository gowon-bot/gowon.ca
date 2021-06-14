import { clientID, redirect } from "../secrets";

export function getDiscordAuthURL() {
  return `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientID}&scope=identify&state=15773059ghq9183habn&redirect_uri=${encodeURIComponent(
    redirect
  )}&prompt=consent`;
}
