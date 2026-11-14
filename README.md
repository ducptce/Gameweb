# Thương Hội Ánh Trăng — Phaser + Vite

A responsive 15-round merchant trading game. Phaser renders ambient background effects; HTML/CSS provides the market, warehouse, trade dialogs and mobile controls. The game rules and game content are separated so that market balancing can be managed in `src/data/gameData.js`.

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

## Deploy to GitHub Pages

The project is configured for the repository named `Gameweb`:

```js
// vite.config.js
export default defineConfig({ base: '/Gameweb/' });
```

Push the project root (including `src/`, `package.json`, `vite.config.js` and `.github/workflows/deploy.yml`) to the `main` branch. GitHub Actions installs dependencies, builds `dist/`, and publishes it to GitHub Pages. In repository Settings → Pages, set the source to **GitHub Actions**.

## Updated trading rules

- Start with 10,000 coins and play 15 rounds.
- Every good has exactly one price per day. Buying and selling use the same `market[itemId].price`; there is no buy/sell spread.
- Only a random subset of the 15 goods is listed each day. Unlisted goods cannot be bought or sold that day.
- Listed goods have unlimited daily supply and demand. The player can buy as many units as current cash allows and sell as many units as currently owned in inventory.
- When a rumor is relevant to the current or next notice, its linked product is kept tradable on that day so the event can be acted on. Other daily listings remain random.
- All goods receive a daily price quote, including goods that are not listed. Unsold inventory is valued using the latest daily quote when the game ends.
- Every round has a countdown. It auto-advances to the next day when the timer reaches zero. The default is 60 seconds; the value can be configured in `gameData.js`.
- A game contains the configured number of official notices (4 by default), each paired with its rumor from the previous round.
- Each merchant name keeps a personal best score. The visible leaderboard shows the top five.

## Configure without editing the engine

The user-managed content file is `src/data/gameData.js`. The current engine reads these optional settings, but this project version intentionally leaves that file unchanged:

Add the following properties to `GAME_CONFIG` when you want to override the defaults:

```js
export const GAME_CONFIG = {
  // Keep the other existing properties...
  dailyAvailableItemCountRange: [6, 10], // number of distinct goods listed each day
  roundDurationSeconds: 60              // countdown duration for each round
};
```

For each object in `ITEMS`:

- `stockRange: [min, max]` is the randomized number of units the shop offers to sell to the player each day.
- Optional `sellDemandRange: [min, max]` independently sets how many units customers are willing to buy from the player each day. If omitted, `stockRange` is also used as the fallback range for customer demand.
- `basePrice` remains the reference price. `dailyPriceMin` and `dailyPriceMax` randomize the day's price around it.

The old `sellPriceRatio` setting is no longer used because buying and selling share one price. You may remove that property from `GAME_CONFIG` when editing the data file.

To add a new good, add an item object with a unique `id`, `name`, `icon`, `basePrice`, `stockRange` and `category`. To give it a distinct sell-demand range, also add `sellDemandRange`. To add a story event, add a paired rumor and notification with matching `eventId` and `itemId` values.

## Leaderboard limitation

Scores are stored in browser `localStorage`. Records persist on the same browser/device, but they are not shared between players, browsers or phones. A truly global leaderboard requires a backend database and write API (for example Supabase or Firebase); GitHub Pages alone is static hosting.


## v1.2 trading rule update

- A tradable item has one daily price shared by buying and selling.
- There are no daily per-item quantity caps. The player may buy as much as current cash allows and sell as much as current inventory contains.
- `dailyAvailableItemCountRange` still controls how many different item types appear in the market each day. Items outside that day's selection cannot be traded until a later day.
- `stockRange` in each item is now legacy/unused by the engine. It previously described the random daily shop quantity; because daily quantities are unlimited, it no longer affects gameplay. You may remove it from your own `gameData.js` if you wish, but it is not necessary for the game to run.
- `dailyPriceMin` and `dailyPriceMax` are global random multipliers applied to each item's `basePrice` to generate that item's price for the day. They are price settings, not quantity settings.
