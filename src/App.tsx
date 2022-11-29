import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";

import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer/Footer";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { GowonAPILayout } from "./components/layouts/GowonAPILayout";
import { Navbar } from "./components/Navbar/Navbar";
import { useAppDispatch } from "./hooks";
import { CommandsPage } from "./pages/CommandsPage/CommandsPage";
import { GuildSettingsPage } from "./pages/Dashboard/Settings/GuildSettingsPage";
import { UserSettingsPage } from "./pages/Dashboard/Settings/UserSettingsPage";
import { DiscordAuthPage } from "./pages/DiscordAuthPage/DiscordAuthPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { ImportRatingsPage } from "./pages/ImportRatingsPage/ImportRatingsPage";
import { PrivacyPolicyPage } from "./pages/Legal/PrivacyPolicyPage";
import { TermsOfUsePage } from "./pages/Legal/TermsOfUsePage";
import { SpotifySuccessPage } from "./pages/SpotifySuccessPage/SpotifySuccessPage";
import { TwitterSuccessPage } from "./pages/TwitterSuccessPage/TwitterSuccessPage";
import { login } from "./store/slices/tokenSlice";

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

            <Route path="commands" element={<GowonAPILayout />}>
              <Route path=":keywords" element={<CommandsPage />} />
              <Route path="" element={<CommandsPage />} />
            </Route>

            <Route path="import-ratings" element={<ImportRatingsPage />} />

            <Route
              path="spotify-login-success"
              element={<SpotifySuccessPage />}
            />

            <Route
              path="twitter-login-success"
              element={<TwitterSuccessPage />}
            />

            <Route path="privacy" element={<PrivacyPolicyPage />} />

            <Route path="terms-of-use" element={<TermsOfUsePage />} />

            <Route path="dashboard" element={<DashboardLayout />}>
              <Route path="settings">
                <Route path="guild/:guildID" element={<GuildSettingsPage />} />
                <Route path="user" element={<UserSettingsPage />} />
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
