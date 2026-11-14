import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ITEMS,
  NOTIFICATIONS,
  RUMORS
} from '../src/data/gameData.js';

import {
  RUMOR_EXPANSION_25
} from '../src/data/rumor-expansion-proposal.js';

test('25 expanded rumors and official events are integrated correctly', () => {
  assert.equal(RUMOR_EXPANSION_25.length, 25);

  const itemIds = new Set(ITEMS.map(item => item.id));

  // Check uniqueness across all active rumors.
  const rumorIds = RUMORS.map(rumor => rumor.id);
  const rumorEventIds = RUMORS.map(rumor => rumor.eventId);

  assert.equal(
    new Set(rumorIds).size,
    RUMORS.length,
    'all rumor IDs must be unique'
  );

  assert.equal(
    new Set(rumorEventIds).size,
    RUMORS.length,
    'all rumor eventIds must be unique'
  );

  // Check uniqueness across all official notices.
  const noticeEventIds = NOTIFICATIONS.map(notice => notice.eventId);

  assert.equal(
    new Set(noticeEventIds).size,
    NOTIFICATIONS.length,
    'all notification eventIds must be unique'
  );

  // Every official notice must match exactly one rumor.
  for (const notice of NOTIFICATIONS) {
    const matchingRumors = RUMORS.filter(
      rumor => rumor.eventId === notice.eventId
    );

    assert.equal(
      matchingRumors.length,
      1,
      `notice ${notice.eventId} must match exactly one rumor`
    );

    assert.equal(
      matchingRumors[0].itemId,
      notice.itemId,
      `itemId mismatch for event ${notice.eventId}`
    );
  }

  // Check that all 25 expanded rumors are integrated.
  for (const proposed of RUMOR_EXPANSION_25) {
    const matches = RUMORS.filter(
      rumor => rumor.id === proposed.id
    );

    assert.equal(
      matches.length,
      1,
      `expanded rumor ${proposed.id} must exist exactly once in RUMORS`
    );

    const rumor = matches[0];

    assert.equal(rumor.eventId, proposed.eventId);
    assert.equal(rumor.itemId, proposed.itemId);

    assert.ok(
      itemIds.has(rumor.itemId),
      `unknown itemId: ${rumor.itemId}`
    );

    assert.ok(
      typeof rumor.text === 'string' && rumor.text.length > 0
    );

    assert.ok(
      typeof rumor.falseText === 'string' && rumor.falseText.length > 0
    );

    assert.ok(
      rumor.truthChance >= 0 && rumor.truthChance <= 1
    );

    assert.ok(
      Number.isFinite(rumor.rumorMultiplier) &&
      rumor.rumorMultiplier > 0
    );

    // Every expanded rumor must have its corresponding official event.
    const matchingNotice = NOTIFICATIONS.find(
      notice => notice.eventId === rumor.eventId
    );

    assert.ok(
      matchingNotice,
      `missing official event for ${rumor.eventId}`
    );

    assert.equal(matchingNotice.itemId, rumor.itemId);
  }
});