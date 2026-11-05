# Whose Track?

A music party game for friends: everyone pastes links to Spotify songs, the game plays them one at a time, and the group guesses whose song each one is. Available in English and Portuguese (EN/PT switch on every screen).

- A single file (`index.html`), no server of its own.
- Browser-to-browser multiplayer with [PeerJS](https://peerjs.com/). The host's browser acts as the server, so if the host closes the tab the game ends.
- Audio through Spotify's official embed player (30-second preview, or the full track for anyone signed in to Spotify in that browser).

## Scoring

- +100 for each right person, −50 for each wrong one (never below 0 per round)
- +50 for naming exactly who has the song
- Song owner: +40 for each player who didn't suspect them

## Run locally

```bash
python -m http.server 8765
```

Then open http://localhost:8765.
