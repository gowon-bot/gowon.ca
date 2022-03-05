import { useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { SettingsForm } from "../../../classes/forms/SettingsForm";
import { APISetting } from "../../../types/gowonAPI";
import { SomethingWentWrong } from "../../errors/SomethingWentWrong";
import { Page } from "../../Page";
import { SettingDisplay } from "./SettingDisplay";
import "./GuildSettingsPage.scss";
import { useAppSelector } from "../../../hooks";
import DefaultServerIcon from "../../../assets/default-server-icon.png";
import { authHeaderFromToken } from "../../../helpers/doughnut";

interface GuildSettingsPageProps {}

const SETTINGS = gql`
  query getGuildSettings($guildID: String!) {
    guildSettings(guildID: $guildID) {
      value {
        role {
          id
          name
          colour
        }
        string
        boolean
      }
      setting {
        name
        category
        friendlyName
        description
        type
      }
    }

    guild(guildID: $guildID) {
      name
      image
      canAdmin
    }
  }
`;

const SAVE_SETTINGS = gql`
  mutation saveSettings($guildID: String!, $settings: [GuildSettingInput!]!) {
    saveGuildSettings(guildID: $guildID, settings: $settings)
  }
`;

export const GuildSettingsPage: React.FunctionComponent<
  GuildSettingsPageProps
> = () => {
  const token = useAppSelector((state) => state.token.value);

  const { guildID } = useParams<{ guildID: string }>();

  const { loading, error, data } = useQuery(SETTINGS, {
    variables: { guildID: guildID || "" },
    context: { headers: authHeaderFromToken(token) },
  });

  const [saveSettings, { loading: saving }] = useMutation<
    never,
    { guildID: string; settings: APISetting[] }
  >(SAVE_SETTINGS, { context: { headers: authHeaderFromToken(token) } });

  if (error) {
    console.log(error);

    return <SomethingWentWrong />;
  }

  if (!guildID || (!loading && !data?.guild?.name)) {
    return <SomethingWentWrong />;
  }

  const settingsForm = new SettingsForm();

  return (
    <div className="DashboardPage">
      <Page title="Dashboard">
        <h1>Guild Settings</h1>
        {!loading && (
          <div className="guild-info">
            <img src={data.guild.image || DefaultServerIcon} alt="" />
            <h5>{data.guild.name}</h5>
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
                variables: { guildID, settings: settingsForm.asObject() },
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
                      guildID={guildID}
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

function groupSettings(data: { guildSettings: APISetting[] }): {
  [key: string]: APISetting[];
} {
  const groupedSettings = {} as { [key: string]: APISetting[] };

  for (const setting of data.guildSettings) {
    const category = setting.setting.category || "General";

    if (!groupedSettings[category]) groupedSettings[category] = [];

    groupedSettings[category].push(setting);
  }

  return groupedSettings;
}
