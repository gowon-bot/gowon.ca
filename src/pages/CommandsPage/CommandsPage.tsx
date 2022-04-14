import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Page } from "../Page";
import { CommandHelp } from "../../components/commands/CommandHelp";
import { SomethingWentWrong } from "../errors/SomethingWentWrong";
import { DebounceInput } from "react-debounce-input";
import { useParams, useSearchParams } from "react-router-dom";
import "./CommandsPage.scss";
import { authHeaderFromToken } from "../../helpers/doughnut";
import { useAppSelector } from "../../hooks";
import ReactSwitch from "react-switch";

const COMMANDS = gql`
  query getCommands($keywords: String, $isAdmin: Boolean) {
    commands(keywords: $keywords, isAdmin: $isAdmin) {
      id
      idSeed
      parentName
      name
      friendlyName
      description
      usage

      aliases
      variations {
        name
        variation
        description
      }

      hasChildren
      children {
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
  }
`;

export const CommandsPage: React.FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const { keywords: paramsKeywords } = useParams<{ keywords: string }>();
  const token = useAppSelector((state) => state.token.value);

  const [isAdmin, setIsAdmin] = useState(false);
  const [keywords, setKeywords] = useState<string | undefined>(
    paramsKeywords || searchParams.get("q") || undefined
  );

  const { loading, error, data } = useQuery(COMMANDS, {
    variables: { keywords, isAdmin },
    context: { headers: authHeaderFromToken(token) },
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
            minLength={1}
            debounceTimeout={300}
            value={keywords}
            onChange={(event) =>
              setKeywords(event.target.value.trim() || undefined)
            }
          />
        </div>

        <div className="admin-toggle">
          <ReactSwitch
            name="isAdmin"
            checked={isAdmin}
            onChange={(checked) => setIsAdmin(checked)}
            width={30}
            height={17}
          />
          <label htmlFor="isAdmin" className="subtext">
            Include administrator commads
          </label>
        </div>

        {loading ? (
          <></>
        ) : (
          data.commands.map((c: any) => (
            <CommandHelp command={c} key={c.idSeed}></CommandHelp>
          ))
        )}

        {!loading && keywords && data.commands.length === 0 ? (
          <div className="no-matching">
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
