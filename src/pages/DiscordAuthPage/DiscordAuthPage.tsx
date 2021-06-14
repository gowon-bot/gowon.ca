import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { loginWithLocalStorage } from "../../store/slices/userSlice";
import { SomethingWentWrong } from "../errors/SomethingWentWrong";
import { Page } from "../Page";
import { getUserFromCode } from "../../helpers/gowon/user";

interface DiscordAuthPageProps extends RouteComponentProps<any> {}

export const DiscordAuthPage: React.FunctionComponent<DiscordAuthPageProps> = ({
  history,
}) => {
  const [errored, setErrored] = useState(false);
  const dispatch = useAppDispatch();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const code = urlSearchParams.get("code");

  useEffect(() => {
    if (code) {
      getUserFromCode(code)
        .then((user) => {
          if (user) {
            dispatch(loginWithLocalStorage(user));
            history.push("/");
          } else {
            setErrored(true);
          }
        })
        .catch((e) => {
          console.error(e);
          setErrored(true);
        });
    }

    return () => {};
  }, [dispatch, history, code]);

  if (!code) {
    return <SomethingWentWrong />;
  }

  return errored ? <SomethingWentWrong /> : <Page title="Discord Auth" />;
};
