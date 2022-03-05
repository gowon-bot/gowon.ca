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
}

export interface SettingValue {
  role?: APIRole;
  string?: string;
  boolean?: boolean;
}

export interface APISetting {
  value: SettingValue | undefined;
  setting: Setting;
}
