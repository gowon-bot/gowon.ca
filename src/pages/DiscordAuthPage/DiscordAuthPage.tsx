import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getUserFromCode } from "../../helpers/discord";
import { useAppDispatch } from "../../hooks";
import { loginWithLocalStorage } from "../../store/slices/userSlice";
import { SomethingWentWrong } from "../errors/SomethingWentWrong";
import { Page } from "../Page";

interface DiscordAuthPageProps extends RouteComponentProps<any> {}

export const DiscordAuthPage: React.FunctionComponent<DiscordAuthPageProps> = ({
  history,
}) => {
  const [errored, setErrored] = useState(false);
  const dispatch = useAppDispatch();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const code = urlSearchParams.get("code");

  if (!code) {
    return <SomethingWentWrong />;
  }

  getUserFromCode(code)
    .then((user) => {
      if (user) {
        dispatch(loginWithLocalStorage(user));
        history.push("/");
      }
    })
    .catch(() => {
      setErrored(true);
    });

  return errored ? <SomethingWentWrong /> : <Page title="Discord Auth" />;
};
