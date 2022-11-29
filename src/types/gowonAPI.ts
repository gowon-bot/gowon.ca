export interface APIRole {
  id: string;
  name: string;
  colour: string;
}

export interface Setting {
  name: string;
  category: string;
  friendlyName: string;
  description: string;
  type: string;
  scope: string;
  choices?: string[];
}

export interface SettingValue {
  role?: APIRole;
  string?: string;
  boolean?: boolean;
  number?: number;
}

export interface APISetting {
  value: SettingValue | undefined;
  setting: Setting;
}
