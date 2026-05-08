export const DESKTOP_COLS = 8;
export const DESKTOP_ROWS = 10;
export const MOBILE_COLS = 7;
export const MOBILE_ROWS = 9;
export const DESKTOP_CELL_PX = 56;
export const MOBILE_CELL_PX = 44;

export const TSUM_TYPES = [
  { id: 'heart',  label: 'ハート',  color: '#ff6b9d' },
  { id: 'star',   label: 'スター',  color: '#ffd700' },
  { id: 'moon',   label: 'ムーン',  color: '#4ecdc4' },
  { id: 'sun',    label: 'サン',    color: '#ff9040' },
  { id: 'crown',  label: 'クラウン', color: '#c084fc' },
];

export const TSUM_TYPE_IDS = TSUM_TYPES.map(t => t.id);

export const TSUM_COLOR_MAP = Object.fromEntries(
  TSUM_TYPES.map(t => [t.id, t.color])
);

export const SCORE_MULTIPLIERS = [
  { min: 13, multiplier: 5 },
  { min: 9,  multiplier: 3 },
  { min: 5,  multiplier: 2 },
  { min: 3,  multiplier: 1 },
];

export const COMBO_BONUS_PER_COMBO = 10;
export const COMBO_TIMEOUT_TICKS = 3;

export const FEVER_GAUGE_PER_TSUM = 5;
export const FEVER_GAUGE_PER_CROWN = 20;
export const FEVER_THRESHOLD = 100;
export const FEVER_DURATION_TICKS = 10;

export const SKILL_RADIUS = 1; // 3x3 area (radius=1 around anchor)

export const GAME_DURATION = 60;

export const HIGH_SCORE_KEY = 'tsumtsum_highscore';
