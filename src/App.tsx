import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";

import { HomePage } from "./pages/HomePage/HomePage";
import { SpotifySuccessPage } from "./pages/SpotifySuccessPage/SpotifySuccessPage";
import { CommandsPage } from "./pages/CommandsPage/CommandsPage";
import { ImportRatingsPage } from "./pages/ImportRatingsPage/ImportRatingsPage";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { useAppDispatch } from "./hooks";
import { login } from "./store/slices/tokenSlice";
import { DiscordAuthPage } from "./pages/DiscordAuthPage/DiscordAuthPage";
import { ApolloProvider } from "@apollo/client";
import { gowonClient } from "./helpers/gowon/client";
import { PrivacyPolicyPage } from "./pages/Legal/PrivacyPolicyPage";
import { Toaster } from "react-hot-toast";
import { GuildSettingsPage } from "./pages/Dashboard/Settings/GuildSettingsPage";
import { DashboardLayout } from "./pages/Dashboard/DashboardLayout";

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
      <Toaster position="bottom-center" />

      <Router>
        <Navbar></Navbar>

        <div className="App-content">
          <Routes>
            <Route index element={<HomePage />} />

            <Route path="discordAuth" element={<DiscordAuthPage />} />

            <Route
              path="commands"
              element={
                <ApolloProvider client={gowonClient}>
                  <CommandsPage />
                </ApolloProvider>
              }
            />

            <Route path="import-ratings" element={<ImportRatingsPage />} />

            <Route
              path="spotify-login-success"
              element={<SpotifySuccessPage />}
            />

            <Route path="privacy" element={<PrivacyPolicyPage />} />

            <Route path="dashboard" element={<DashboardLayout />}>
              <Route path="settings">
                <Route path="guild/:guildID" element={<GuildSettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>

      <Footer></Footer>
    </div>
  );
}

export default App;
