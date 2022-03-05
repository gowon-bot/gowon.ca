import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
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

export const RolePicker: React.FunctionComponent<RolePickerProps> = ({
  guildID,
  name,
  initialValue,
  onChange = () => {},
}) => {
  const [value, setValue] = useState(initialValue);
  const [getRoles, { data, loading }] = useLazyQuery<
    { roles: APIRole[] },
    { guildID: string }
  >(ROLES, { variables: { guildID } });

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const role = { id: event.target.value } as APIRole;

    setValue(role);
    onChange({ role });
  };

  return (
    <div className="RolePicker">
      <select name={name || "role"} value={value?.id} onChange={handleChange}>
        <option value={""}>Select a role...</option>
        {loading && <option disabled={true}>Loading...</option>}
        {!loading &&
          data &&
          data.roles.map((r) => (
            <option style={{ color: r.colour }} value={r.id} key={r.id}>
              {r.name}
            </option>
          ))}
      </select>
    </div>
  );
};
