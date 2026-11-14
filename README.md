# Thương Hội Ánh Trăng — Phaser + Vite

A mobile-friendly, 15-round merchant trading game. The interface uses responsive HTML/CSS for accessible tap targets and horizontal warehouse scrolling; Phaser renders the atmospheric market backdrop and trade feedback. Market rules and all game content are plain JavaScript modules.

## Run locally

```bash
npm install
npm run dev
```

## Build and test

```bash
npm test
npm run build
npm run preview
```

## Deploy to the existing GitHub Pages repository

This project is configured for the repository named `Gameweb`:

```js
// vite.config.js
export default defineConfig({ base: '/Gameweb/' });
```

Push the project root (including `src/`, `package.json`, `vite.config.js` and `.github/workflows/deploy.yml` (also commit `package-lock.json` if `npm install` generated it)) to the `main` branch. GitHub Actions installs dependencies, builds `dist/`, and publishes it to GitHub Pages. In repository Settings → Pages, set the source to **GitHub Actions**.

## Edit goods, rumors, notices and prices

Most balancing and content changes belong in **`src/data/gameData.js`**:

- `GAME_CONFIG`: starting cash, rounds, notice count, daily price range and sell spread.
- `ITEMS`: item `id`, display name, icon, base price and random stock range.
- `RUMORS`: rumor wording, related `itemId`, truth probability and small next-round price factor.
- `NOTIFICATIONS`: one official event for each `eventId`, its message, correction and stronger price factor.

Every rumor's `eventId` must match exactly one notification's `eventId`; the IDs and target `itemId` values should also agree. Add a new good by adding an item object. Add an event by adding a paired rumor and notification object.

## Rules implemented in this prototype

- Start with 10,000 coins and play 15 rounds.
- There are 15 goods. A run randomizes each good's starting shop stock, each round's prices, the 15 rumors and exactly 4 notification days.
- A rumor is shown during one round and, if true, makes a small price adjustment in the following round. A matching official notice may confirm it and apply a much larger price multiplier. False rumors are officially debunked on their scheduled notice day.
- Buy quantity is limited by both available cash and remaining shop stock. Sell quantity is limited by the warehouse inventory.
- Final score is cash plus the current sell value of remaining warehouse goods.
- Each merchant name keeps its personal best score. The visible leaderboard shows the top five.

## Important leaderboard limitation

The current version stores scores in browser `localStorage`. That means records persist on the same browser/device, but they are **not shared** between different players, browsers or phones. A truly global leaderboard needs a backend database and write API (for example Supabase or Firebase); GitHub Pages alone is static hosting and cannot provide shared score storage.
