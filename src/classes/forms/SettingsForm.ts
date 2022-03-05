import { APISetting, Setting, SettingValue } from "../../types/gowonAPI";
import { BaseForm } from "./BaseForm";

export class SettingsForm extends BaseForm<SettingValue> {
  asObject(): Array<APISetting> {
    const formObject = super.asObject();

    const array = [] as APISetting[];

    for (const [settingName, value] of Object.entries(formObject)) {
      array.push({ value, setting: { name: settingName } as Setting });
    }

    return array;
  }
}
