import React, { useState } from "react";
import ReactSelect from "react-select";
import Switch from "react-switch";
import { RolePicker } from "../../../components/RolePicker/RolePicker";
import { getTheme } from "../../../helpers/ui/select";
import { Setting, SettingValue } from "../../../types/gowonAPI";
import "./SettingDisplay.scss";

interface SettingDisplayProps {
  setting: Setting;
  initialValue?: SettingValue;
  guildID?: string;
  onChange?: (setting: SettingValue | undefined) => void;
}

export const SettingDisplay: React.FunctionComponent<SettingDisplayProps> = ({
  setting,
  initialValue,
  guildID,
  onChange = () => {},
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (value: SettingValue | undefined) => {
    setValue(value);
    onChange(value);
  };

  return (
    <div className="SettingDisplay">
      <div className="info">
        <label htmlFor={setting.name}>{setting.friendlyName}</label>
        <small className="subtext">{setting.description}</small>
      </div>

      {setting.type === "toggle" && (
        <Switch
          checked={value?.boolean || false}
          onChange={(checked) => handleChange({ boolean: checked })}
          width={46}
          height={23}
        />
      )}

      {isSettingTextType(setting.type) && (
        <input
          type="text"
          value={value?.string}
          onChange={(event) => handleChange({ string: event.target.value })}
          className={`${setting.type === "textshort" ? "small" : ""}`}
          maxLength={setting.type === "textshort" ? 3 : undefined}
        />
      )}

      {setting.type === "role" && (
        <RolePicker
          guildID={guildID!}
          initialValue={initialValue?.role}
          onChange={(newValue) => handleChange(newValue)}
        />
      )}

      {setting.type === "number" && (
        <input
          className="number-input"
          type="number"
          onChange={(e) =>
            handleChange({ number: parseInt(e.currentTarget.value) })
          }
          defaultValue={value?.number || 0}
        ></input>
      )}

      {setting.type === "choice" && (
        <ReactSelect
          className="select-input"
          options={(setting.choices || []).map((c) => ({ label: c, value: c }))}
          theme={getTheme()}
          onChange={(e) => handleChange({ string: e?.value })}
          defaultValue={
            value?.string
              ? {
                  label: value.string,
                  value: value.string,
                }
              : undefined
          }
        />
      )}
    </div>
  );
};

function isSettingTextType(type: string) {
  return type === "text" || type === "textlong" || type === "textshort";
}
