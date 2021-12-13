export interface DoughnutToken {
  token: string;
  discord_id: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatarURL: string;
}

export type TokenAndUser = DoughnutToken & { discord_user: DiscordUser };
