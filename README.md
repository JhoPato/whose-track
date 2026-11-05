# Whose Track?

A music party game for friends. Everyone connects Spotify, the game grabs a random mix of each person's music, plays the songs one at a time, and the group guesses whose song each one is. First to the target score wins. English and Portuguese (EN/PT switch on every screen).

Live at https://whosetrack.discloud.dev/

## How it works

- `public/index.html` is the whole game. `server.js` is a tiny dependency-free Node server that serves it (port 8080 on Discloud).
- Browser-to-browser multiplayer with [PeerJS](https://peerjs.com/). The host's browser runs the room, so if the host closes the tab the game ends.
- Spotify sign-in uses the Authorization Code flow with PKCE in a new tab (no client secret, no stored token). Each tape is a random mix of the player's library: most played (all periods), random pages of liked songs, random stretches of playlists they made, and tracks from random saved albums. The host can switch each source on or off, skip explicit songs, and start songs in the middle or at the beginning.
- Audio plays through Spotify's official embed player: a 30-second preview, or the full track for anyone signed in to Spotify in that browser.

## Spotify setup

1. Create an app at https://developer.spotify.com/dashboard (needs Spotify Premium) with the Web API and these redirect URIs (scopes requested: user-top-read, user-library-read, playlist-read-private, playlist-read-collaborative):
   - `https://whosetrack.discloud.dev/`
   - `http://127.0.0.1:8765/` (local testing)
2. Put its Client ID in `SPOTIFY_CLIENT_ID` at the top of the script in `public/index.html` (or set the `SPOTIFY_CLIENT_ID` environment variable for `server.js`).
3. In the app's User Management, add each player's name and Spotify email. Development Mode allows 5 users.

## Scoring

- +100 for each right person, −50 for each wrong one (never below 0 per round)
- +50 for naming exactly who has the song
- Song owner: +40 for each player who didn't suspect them

## Run locally

```bash
node server.js 8765
```

Then open http://127.0.0.1:8765/ (use 127.0.0.1, not localhost, so the Spotify redirect matches).

## Deploy to Discloud

```bash
discloud app commit whosetrack
```
