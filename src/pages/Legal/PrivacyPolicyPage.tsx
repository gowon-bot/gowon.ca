import React from "react";
import { Page } from "../Page";
import "./LegalPage.scss";

export const PrivacyPolicyPage: React.FunctionComponent = () => {
  return (
    <div className="PrivacyPolicyPage">
      <Page title="Privacy policy" centered={true}>
        <div className="content">
          <h1>Privacy policy</h1>
          <p className="subtext">
            (what data Gowon collects and how we use it)
          </p>
          <p className="subtext">Last updated March 1st, 2022</p>

          <br />

          <h3 id="what-does-your-application-do">
            What does your application do?
          </h3>

          <p>
            Gowon is an open-source Last.fm bot. Users can explore, display, and
            analyze their Last.fm data, as well as see leaderboards for certain
            stats, add friends, and connect to other services (see more about
            those in <a href="#integrations">integrations</a>).
          </p>

          <br />

          <h3 id="data-storage">What data do you store?</h3>

          <p>Gowon stores the following data...</p>

          <div>
            <p>...when she joins the server:</p>
            <ul>
              <li>
                The users that are in that server (this data is deleted when she
                leaves)
              </li>
            </ul>
          </div>

          <div>
            <p>...when you login:</p>
            <ul>
              <li>Your Discord user ID</li>
              <li>Your Last.fm username, and session key</li>
            </ul>
          </div>

          <div>
            <p>...when you run a command:</p>
            <ul>
              <li>Your display name and username (stored temporarily)</li>
              <li>That you are in that server</li>
              <li>
                That you ran that command (including when it was run and where
                it was run)
              </li>
              <li>
                If you have your Last.fm scrobbles indexed, there is a 1 in 3
                chance Gowon will update (storing your latest scrobbles)
              </li>
            </ul>
          </div>

          <div>
            <p>...when a user joins or leaves a server:</p>
            <ul>
              <li>That that user is (or is no longer) in that server</li>
            </ul>
          </div>

          <div>
            <p>...when you provide it:</p>
            <ul>
              <li>Your Last.fm scrobbles when you Index or Update </li>
              <li>Your Rateyourmusic ratings when you import them</li>
              <li>Your Spotify playlist names when you tag them</li>
              <li>
                Your Discord username and profile picture when you log in to
                gowon.ca
              </li>
            </ul>
          </div>

          <br />

          <h3 id="data-usage">What do you do with that data?</h3>

          <p>
            All your data is stored on (and by extension shared with){" "}
            <a href="https://www.digitalocean.com/">DigitalOcean</a>.
            <br />
            We will never share your data with other third party services,
            unless specified. Your data will{" "}
            <span className="underline">never</span> be sold.
          </p>

          <ul>
            <li>
              With your Discord data, Gowon
              <ul>
                <li>Uses your ID to connect you to your Last.fm account</li>
                <li>Uses your nickname and/or username on leaderboards</li>
                <li>
                  Uses the list of server members to generate server
                  leaderboards
                </li>
              </ul>
            </li>

            <li>
              With your Last.fm scrobbles, Gowon
              <ul>
                <li>Uses them to display your stats on Leaderboards</li>
                <li>Calculates various stats</li>
              </ul>
            </li>
          </ul>

          <br />

          <h3 id="data-management">How can I (the user) control that data?</h3>

          <p>Logging out will delete all your permanently stored data.</p>
          <p>Server data is also cleared when Gowon leaves a server.</p>

          <br />

          <p>
            You can also control what information Gowon shares about you on
            global leaderboards with the Privacy command. By default, Gowon
            doesn't share any identifying data.
          </p>

          <br />

          <p>
            You can also request deletion of any of your data at any time by
            contacting me through Discord (the support server, or me -
            john!#2527), or through{" "}
            <a href="https://github.com/gowon-bot/gowon">Github</a>
          </p>

          <br />

          <h3 id="integrations">What services does Gowon integrate with?</h3>

          <p>Gowon integrates with a variety of third party services:</p>

          <ul>
            <li>
              <a href="https://last.fm">Last.fm</a>, for most of the bot's
              features and storing music metadata
            </li>
            <li>
              <a href="https://www.spotify.com/">Spotify</a>, for fetching and
              storing music metadata, and Gowon's Spotify commands
            </li>
            <li>
              <a href="https://rateyourmusic.com/">Rateyourmusic</a>, for
              importing your ratings, and storing music metadata
            </li>
          </ul>

          <br />

          <h3 id="updates">Updates to the privacy policy</h3>

          <p>
            This document can be updated regularly and without prior notice to
            reflect changes to our practices. If any major changes are made to
            how we handle your data, a notice will be posted to the Gowon
            support server. The date of the most recent update will be reflected
            at the top of the privacy policy.
          </p>
        </div>
      </Page>
    </div>
  );
};
