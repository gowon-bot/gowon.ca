import { gql } from "apollo-boost";
import React from "react";
import { useAppSelector } from "../../../hooks";
import "./ImportRatingsDisplay.scss";
import { useMutation } from "@apollo/client";
import { authHeaderFromToken } from "../../../helpers/doughnut";

interface ImportRatingsDisplayProps {
  ratings: string;
}

const IMPORT_RATINGS = gql`
  mutation importRatings($csv: String!, $discordID: String!) {
    importRatings(csv: $csv, user: { discordID: $discordID })
  }
`;

export const ImportRatingsDisplay: React.FunctionComponent<
  ImportRatingsDisplayProps
> = ({ ratings }) => {
  const token = useAppSelector((state) => state.token.value);

  const [importRatings, { loading, error, data }] = useMutation(IMPORT_RATINGS);

  const downloadRatings = () => {
    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([BOM, ratings]);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "ratings.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clickImportRatings = () => {
    importRatings({
      variables: { csv: ratings, discordID: token!.discord_id },
      context: { headers: authHeaderFromToken(token) },
    });
  };

  return (
    <div className="ImportRatingsDisplay">
      {verifyRatings(ratings) ? (
        <div className="actions">
          <p>Found {ratings.split("\n").length - 1} ratings:</p>

          <div className="buttons">
            {token && (
              <button disabled={loading || data} onClick={clickImportRatings}>
                Import
              </button>
            )}
            <button onClick={downloadRatings}>Download</button>
          </div>
        </div>
      ) : (
        <p>Invalid ratings!</p>
      )}
      <div className="status">
        {error && <h4 className="errored">{error.message}</h4>}
        {loading && <h4>Importing...</h4>}
        {data && <h4 className="success">Imported!</h4>}
      </div>
    </div>
  );
};

function verifyRatings(ratings: string): boolean {
  return ratings.startsWith(
    "RYM Album, First Name,Last Name,First Name localized, Last Name localized,Title,Release_Date,Rating,Ownership,Purchase Date,Media Type,Review"
  );
}
