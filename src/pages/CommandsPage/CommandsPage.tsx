import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Page } from "../Page";
import { CommandHelp } from "../../components/commands/CommandHelp";
import { SomethingWentWrong } from "../errors/SomethingWentWrong";
import { DebounceInput } from "react-debounce-input";
import "./CommandsPage.scss";

const COMMANDS = gql`
  query getCommands($keywords: String) {
    commands(keywords: $keywords) {
      id
      idSeed
      parentName
      name
      friendlyName
      description
      aliases
      usage
    }
  }
`;

export const CommandsPage: React.FunctionComponent = () => {
  const [keywords, setKeywords] = useState<string | undefined>(undefined);

  const { loading, error, data } = useQuery(COMMANDS, {
    variables: { keywords },
  });

  if (error) {
    return <SomethingWentWrong />;
  }

  return (
    <div className="CommandsPage">
      <Page title="Commands">
        <div className="command-search">
          <h2>Search: </h2>
          <DebounceInput
            className="command-search-input"
            minLength={2}
            debounceTimeout={300}
            onChange={(event) => setKeywords(event.target.value || undefined)}
          />
        </div>

        {loading ? (
          <></>
        ) : (
          data.commands.map((c: any) => (
            <CommandHelp command={c} key={c.id}></CommandHelp>
          ))
        )}

        {!loading && keywords && data.commands.length === 0 ? (
          <div>
            <h5>
              No commands found matching{" "}
              <span className="text-inline">`{keywords}`</span>
            </h5>
          </div>
        ) : (
          <></>
        )}
      </Page>
    </div>
  );
};
