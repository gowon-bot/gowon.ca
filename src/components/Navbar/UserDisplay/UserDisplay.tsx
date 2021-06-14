import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { User } from "../../../interfaces/User";
import { logout } from "../../../store/slices/userSlice";
import "./UserDisplay.scss";

interface UserDisplayProps {
  user: User;
}

export const UserDisplay: React.FunctionComponent<UserDisplayProps> = ({
  children,
  user,
}) => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => {
    setShowLogout(true);
  };
  const handleMouseLeave = () => {
    setShowLogout(false);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className="UserDisplay"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="user" style={{ display: showLogout ? "none" : "flex" }}>
        <img alt="user profile" src={user.avatarURL}></img>
        <p>{user.username}</p>
      </div>
      {showLogout && (
        <button className="link" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};
