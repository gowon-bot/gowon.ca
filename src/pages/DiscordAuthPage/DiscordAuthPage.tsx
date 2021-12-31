import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserFromCode } from "../../helpers/doughnut";
import { useAppDispatch } from "../../hooks";
import { loginWithLocalStorage } from "../../store/slices/tokenSlice";
import { SomethingWentWrong } from "../errors/SomethingWentWrong";
import { Page } from "../Page";

export const DiscordAuthPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [errored, setErrored] = useState(false);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      getUserFromCode(code)
        .then((user) => {
          if (user) {
            dispatch(loginWithLocalStorage(user));
            navigate("/");
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
  }, [dispatch, navigate, code]);

  if (!code) {
    return <SomethingWentWrong />;
  }

  return errored ? <SomethingWentWrong /> : <Page title="Discord Auth" />;
};
