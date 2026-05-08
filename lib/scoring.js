import {
  SCORE_MULTIPLIERS,
  COMBO_BONUS_PER_COMBO,
  FEVER_GAUGE_PER_TSUM,
  FEVER_GAUGE_PER_CROWN,
} from './constants';

export function getMultiplier(count) {
  for (const { min, multiplier } of SCORE_MULTIPLIERS) {
    if (count >= min) return multiplier;
  }
  return 0;
}

export function computeScore(count, combo, isFever) {
  const multiplier = getMultiplier(count);
  const base = count * 100 * multiplier;
  const comboBonus = combo * COMBO_BONUS_PER_COMBO;
  return (base + comboBonus) * (isFever ? 2 : 1);
}

export function computeFeverGaugeIncrease(clearedCells) {
  return clearedCells.reduce((sum, cell) => {
    return sum + (cell.type === 'crown' ? FEVER_GAUGE_PER_CROWN : FEVER_GAUGE_PER_TSUM);
  }, 0);
}
