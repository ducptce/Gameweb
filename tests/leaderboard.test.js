import test from 'node:test';
import assert from 'node:assert/strict';
import { GAME_CONFIG } from '../src/data/gameData.js';
import { readLeaderboard, saveBestRecord } from '../src/storage/leaderboard.js';

function useMemoryStorage() {
  const store = new Map();
  globalThis.localStorage = {
    getItem(key) { return store.has(key) ? store.get(key) : null; },
    setItem(key, value) { store.set(key, String(value)); }
  };
  return store;
}

test('leaderboard keeps each name personal best and only displays top five', () => {
  const store = useMemoryStorage();
  for (let index = 1; index <= 6; index += 1) {
    saveBestRecord(`Trader ${index}`, index * 1000);
  }
  assert.equal(readLeaderboard().length, 5);
  const allRecords = JSON.parse(store.get(GAME_CONFIG.leaderboardKey));
  assert.equal(allRecords.length, 6);

  const update = saveBestRecord('trader 1', 500);
  assert.equal(update.newRecord, false);
  const improved = saveBestRecord('TRADER 1', 9000);
  assert.equal(improved.newRecord, true);
  const finalRecords = JSON.parse(store.get(GAME_CONFIG.leaderboardKey));
  assert.equal(finalRecords.find((record) => record.name === 'TRADER 1').score, 9000);
  assert.equal(readLeaderboard()[0].score, 9000);
  delete globalThis.localStorage;
});

test('saving reports unavailable storage instead of claiming a record was saved', () => {
  delete globalThis.localStorage;
  const result = saveBestRecord('No Storage', 1234);
  assert.equal(result.saved, false);
  assert.equal(result.newRecord, false);
});
