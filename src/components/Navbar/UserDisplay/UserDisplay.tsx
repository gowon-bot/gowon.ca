import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { DiscordUser } from "../../../interfaces/DoughnutToken";
import { logout } from "../../../store/slices/tokenSlice";
import { destroyToken } from "../../../helpers/doughnut";
import "./UserDisplay.scss";

interface UserDisplayProps {
  user: DiscordUser;
}

export const UserDisplay: React.FunctionComponent<UserDisplayProps> = ({
  user,
}) => {
  const token = useAppSelector((state) => state.token.value);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    destroyToken(token!);
  };

  return (
    <div className="UserDisplay">
      <div className="user">
        <img alt="user profile" src={user.avatarURL}></img>
        <p>{user.username}</p>
      </div>

      <button className="link" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
