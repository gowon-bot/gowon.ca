import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { destroyToken, refreshUser } from "../../../helpers/doughnut";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { DiscordUser } from "../../../interfaces/DoughnutToken";
import {
  loginWithLocalStorage,
  logout,
} from "../../../store/slices/tokenSlice";
import "./UserDisplay.scss";

interface UserDisplayProps {
  user: DiscordUser;
}

export const UserDisplay: React.FunctionComponent<UserDisplayProps> = ({
  user,
}) => {
  const [triedImageRefetch, setTriedImageRefetch] = useState(false);
  const token = useAppSelector((state) => state.token.value);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    destroyToken(token!);
  };

  const refetchImage = async () => {
    if (!triedImageRefetch) {
      setTriedImageRefetch(true);
    }

    await refreshUser(token!).then((user) => {
      if (user) {
        dispatch(loginWithLocalStorage(user));
      }
    });
  };

  return (
    <div className="UserDisplay">
      <Link to="/dashboard/settings/user">
        <FontAwesomeIcon
          className="settings-icon"
          title="Settings"
          icon={faSliders}
        />
      </Link>

      <div className="user">
        <img
          alt="user profile"
          src={user.avatarURL}
          onError={refetchImage}
        ></img>
        <p>{user.username}</p>
      </div>

      <button className="link" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
