import { GAME_CONFIG } from '../data/gameData.js';

function normalizeName(name) {
  return String(name ?? '').trim().toLocaleLowerCase('vi');
}

function readAllRecords() {
  try {
    const raw = globalThis.localStorage?.getItem(GAME_CONFIG.leaderboardKey);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((record) => record && typeof record.name === 'string' && Number.isFinite(record.score))
      .sort((a, b) => b.score - a.score);
  } catch {
    return [];
  }
}

export function readLeaderboard() {
  return readAllRecords().slice(0, 5);
}

export function saveBestRecord(name, score) {
  const cleanName = String(name ?? '').trim().slice(0, 18);
  const normalized = normalizeName(cleanName);
  if (!normalized || !Number.isFinite(score) || score < 0) {
    return { saved: false, newRecord: false, leaderboard: readLeaderboard() };
  }

  const current = readAllRecords();
  const previous = current.find((record) => normalizeName(record.name) === normalized);
  const newRecord = !previous || score > previous.score;

  if (newRecord) {
    const next = current.filter((record) => normalizeName(record.name) !== normalized);
    next.push({ name: cleanName, score, achievedAt: new Date().toISOString() });
    next.sort((a, b) => b.score - a.score);
    try {
      const storage = globalThis.localStorage;
      if (!storage?.setItem) return { saved: false, newRecord: false, leaderboard: current.slice(0, 5) };
      storage.setItem(GAME_CONFIG.leaderboardKey, JSON.stringify(next));
      return { saved: true, newRecord: true, leaderboard: next.slice(0, 5) };
    } catch {
      return { saved: false, newRecord: false, leaderboard: current.slice(0, 5) };
    }
  }

  return { saved: true, newRecord: false, leaderboard: current.slice(0, 5) };
}
