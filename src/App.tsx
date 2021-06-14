import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import { HomePage } from "./pages/HomePage/HomePage";
import { RatingsPage } from "./pages/RatingsPage/RatingsPage";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { useAppDispatch } from "./hooks";
import { login } from "./store/slices/userSlice";
import { DiscordAuthPage } from "./pages/DiscordAuthPage/DiscordAuthPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(login(JSON.parse(user)));
    }

    return () => {};
  });

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>

        <div className="App-content">
          <Switch>
            <Route
              path="/discordAuth"
              render={(routeProps) => <DiscordAuthPage {...routeProps} />}
            />

            <Route path="/ratings">
              <RatingsPage />
            </Route>

            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>

      <Footer></Footer>
    </div>
  );
}

export default App;
