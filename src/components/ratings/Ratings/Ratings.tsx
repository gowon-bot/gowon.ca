import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../hooks";

const RATINGS = gql`
  query GetRatings($discordID: String!) {
    ratings(settings: { user: { discordID: $discordID } }) {
      rating
      rateYourMusicAlbum {
        title
        artistName
      }
    }
  }
`;

export const Ratings: React.FunctionComponent = () => {
  const user = useAppSelector((state) => state.user.value);

  const [getRatings, { loading, data }] = useLazyQuery(RATINGS);

  useEffect(() => {
    if (user) {
      getRatings({ variables: { discordID: user.discordID } });
    }

    return () => {};
  }, [user, getRatings]);

  if (loading || !data) return <p>Loading...</p>;

  return (
    <div className="Ratings">
      {data.ratings.map((r: any) => (
        <p>{r.rateYourMusicAlbum.title}</p>
      ))}
    </div>
  );
};
