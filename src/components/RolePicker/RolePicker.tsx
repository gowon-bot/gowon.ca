import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import ReactSelect, { SingleValue, StylesConfig } from "react-select";
import { getTheme } from "../../helpers/ui/select";
import { APIRole, SettingValue } from "../../types/gowonAPI";

const ROLES = gql`
  query getRoles($guildID: String!) {
    roles(guildID: $guildID) {
      id
      name
      colour
    }
  }
`;

interface RolePickerProps {
  guildID: string;
  name?: string;
  initialValue?: APIRole;
  onChange?: (setting: SettingValue | undefined) => void;
}

interface RolePickerOption {
  label: string;
  value: string;
  colour: string;
}

export const RolePicker: React.FunctionComponent<RolePickerProps> = ({
  guildID,
  name,
  initialValue,
  onChange = () => {},
}) => {
  const [getRoles, { data, loading }] = useLazyQuery<
    { roles: APIRole[] },
    { guildID: string }
  >(ROLES, { variables: { guildID } });

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const handleChange = (role: APIRole | undefined) => {
    onChange({ role });
  };

  const options =
    (!loading &&
      data &&
      data.roles.map((r) => ({
        value: r.id,
        label: r.name,
        colour: r.colour,
      }))) ||
    [];

  const getColour = (colour: string) =>
    colour === "#000000" ? "var(--color-primary)" : colour;

  const selectStyles: StylesConfig<RolePickerOption> = {
    control: (styles) => ({
      ...styles,
      cursor: "pointer",
      color: "var(--color-primary)",
    }),
    option: (styles, { data, isSelected }) => ({
      ...styles,
      color: getColour(data.colour),
      ...(isSelected
        ? {
            backgroundColor: "var(--background-lighter)",
            alignItems: "center",
            display: "flex",

            ":before": {
              backgroundColor: getColour(data.colour),
              borderRadius: 10,
              content: '" "',
              display: "block",
              marginRight: 8,
              height: 10,
              width: 10,
            },
          }
        : {}),

      cursor: "pointer",
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: getColour(data.colour),
    }),
  };

  return (
    <div className="RolePicker">
      {
        <ReactSelect
          isClearable={true}
          onChange={(option) => {
            option = option as SingleValue<RolePickerOption>;

            handleChange(
              option
                ? {
                    id: option.value,
                    name: option.label,
                    colour: option.colour,
                  }
                : undefined
            );
          }}
          options={options}
          defaultValue={
            initialValue
              ? {
                  label: initialValue.name,
                  value: initialValue.id,
                  colour: initialValue.colour,
                }
              : undefined
          }
          styles={selectStyles}
          theme={getTheme()}
        />
      }
    </div>
  );
};
