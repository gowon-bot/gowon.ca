import { useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";
import toast from "react-hot-toast";
import { SettingsForm } from "../../../classes/forms/SettingsForm";
import { authHeaderFromToken } from "../../../helpers/doughnut";
import { useAppSelector } from "../../../hooks";
import { APISetting } from "../../../types/gowonAPI";
import { SomethingWentWrong } from "../../errors/SomethingWentWrong";
import { Page } from "../../Page";
import { SettingDisplay } from "./SettingDisplay";
import "./SettingsPage.scss";

interface UserSettingsPageProps {}

const SETTINGS = gql`
  query getUserSettings($userID: String!) {
    userSettings(userID: $userID) {
      value {
        string
        number
        boolean
      }
      setting {
        name
        category
        friendlyName
        description
        type
        choices
      }
    }
  }
`;

const SAVE_SETTINGS = gql`
  mutation saveSettings($userID: String!, $settings: [SettingAndValueInput!]!) {
    saveUserSettings(userID: $userID, settings: $settings)
  }
`;

export const UserSettingsPage: React.FunctionComponent<
  UserSettingsPageProps
> = () => {
  const token = useAppSelector((state) => state.token.value);

  const { loading, error, data } = useQuery(SETTINGS, {
    variables: { userID: token?.discord_id || "" },
    context: { headers: authHeaderFromToken(token) },
  });

  const [saveSettings, { loading: saving }] = useMutation<
    never,
    { userID: string; settings: APISetting[] }
  >(SAVE_SETTINGS, { context: { headers: authHeaderFromToken(token) } });

  if (error) {
    console.log(error);

    return <SomethingWentWrong />;
  }

  if (!token?.discord_id) {
    return <SomethingWentWrong />;
  }

  const settingsForm = new SettingsForm();

  return (
    <div className="DashboardPage">
      <Page title="Dashboard">
        <h1>User Settings</h1>

        {!loading && (
          <div className="user-info">
            <img src={token.discord_user.avatarURL} alt="" />
            <h5>{token.discord_user.username}</h5>
          </div>
        )}

        <br />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const save = saveSettings({
                variables: {
                  userID: token?.discord_id || "",
                  settings: settingsForm.asObject(),
                },
              });

              toast.promise(
                save,
                {
                  loading: "Saving...",
                  success: "Successfully saved!",
                  error: "Something went wrong",
                },
                {
                  style: {
                    background: "var(--background-lighter)",
                    color: "var(--color-primary)",
                  },
                }
              );
            }}
          >
            {Object.entries(groupSettings(data)).map(([group, settings]) => (
              <div key={group}>
                <h3 className="form-group-title">{group}</h3>

                <div className="form-group">
                  {settings.map((s) => (
                    <SettingDisplay
                      key={s.setting.name}
                      setting={s.setting}
                      initialValue={s.value}
                      onChange={(value) =>
                        settingsForm.set(s.setting.name, value)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}

            <button className="save-button" type="submit" disabled={saving}>
              Save settings
            </button>
          </form>
        )}
      </Page>
    </div>
  );
};

function groupSettings(data: { userSettings: APISetting[] }): {
  [key: string]: APISetting[];
} {
  const groupedSettings = {} as { [key: string]: APISetting[] };

  for (const setting of data.userSettings) {
    const category = setting.setting.category || "General";

    if (!groupedSettings[category]) groupedSettings[category] = [];

    groupedSettings[category].push(setting);
  }

  return groupedSettings;
}
