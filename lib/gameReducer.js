import {
  GAME_DURATION,
  FEVER_THRESHOLD,
  FEVER_DURATION_TICKS,
  COMBO_TIMEOUT_TICKS,
  SKILL_RADIUS,
  HIGH_SCORE_KEY,
} from './constants';
import { generateBoard, canExtendTrace, computeRefill } from './tsumUtils';
import { computeScore, computeFeverGaugeIncrease } from './scoring';

export const Actions = {
  INIT:        'INIT',
  START:       'START',
  TRACE_START: 'TRACE_START',
  TRACE_MOVE:  'TRACE_MOVE',
  TRACE_END:   'TRACE_END',
  CLEAR_DONE:  'CLEAR_DONE',
  REFILL_DONE: 'REFILL_DONE',
  TICK:        'TICK',
  SKILL_USE:   'SKILL_USE',
  SKILL_DONE:  'SKILL_DONE',
  END:         'END',
  RESET:       'RESET',
};

function readHighScore() {
  try { return parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10); } catch { return 0; }
}

function makeInitialState(cols, rows) {
  return {
    cols,
    rows,
    cells: generateBoard(cols, rows),
    phase: 'idle',
    timeLeft: GAME_DURATION,
    tracing: false,
    tracedIds: [],
    score: 0,
    highScore: readHighScore(),
    combo: 0,
    comboTimer: 0,
    feverGauge: 0,
    isFever: false,
    feverTimer: 0,
    skillReady: false,
    lastClearedCount: 0,
  };
}

export function createInitialState(cols, rows) {
  return makeInitialState(cols, rows);
}

export function gameReducer(state, action) {
  switch (action.type) {

    case Actions.INIT:
    case Actions.RESET: {
      return makeInitialState(state.cols, state.rows);
    }

    case Actions.START: {
      return { ...state, phase: 'playing', timeLeft: GAME_DURATION };
    }

    case Actions.TRACE_START: {
      if (state.phase !== 'playing') return state;
      const { id } = action.payload;
      return {
        ...state,
        tracing: true,
        tracedIds: [id],
        cells: state.cells.map(c =>
          c.id === id ? { ...c, isTraced: true } : c
        ),
      };
    }

    case Actions.TRACE_MOVE: {
      if (!state.tracing || state.phase !== 'playing') return state;
      const { id } = action.payload;
      const { tracedIds, cells } = state;

      // Undo: stepped back onto second-to-last
      if (tracedIds.length >= 2 && tracedIds[tracedIds.length - 2] === id) {
        const removed = tracedIds[tracedIds.length - 1];
        return {
          ...state,
          tracedIds: tracedIds.slice(0, -1),
          cells: cells.map(c => c.id === removed ? { ...c, isTraced: false } : c),
        };
      }

      if (tracedIds.includes(id)) return state;

      const lastCell = cells.find(c => c.id === tracedIds[tracedIds.length - 1]);
      const candidate = cells.find(c => c.id === id);
      if (!lastCell || !candidate) return state;
      if (!canExtendTrace(lastCell, candidate, tracedIds)) return state;

      return {
        ...state,
        tracedIds: [...tracedIds, id],
        cells: cells.map(c => c.id === id ? { ...c, isTraced: true } : c),
      };
    }

    case Actions.TRACE_END: {
      const { tracedIds, cells, score, combo, isFever, feverGauge } = state;

      // Cancel if fewer than 3
      if (tracedIds.length < 3) {
        return {
          ...state,
          tracing: false,
          tracedIds: [],
          combo: 0,
          comboTimer: 0,
          cells: cells.map(c => ({ ...c, isTraced: false })),
        };
      }

      const clearedCells = cells.filter(c => tracedIds.includes(c.id));
      const delta = computeScore(tracedIds.length, combo, isFever);
      const gaugeIncrease = computeFeverGaugeIncrease(clearedCells);

      let newGauge = feverGauge + gaugeIncrease;
      let newIsFever = isFever;
      let newFeverTimer = state.feverTimer;

      if (!isFever && newGauge >= FEVER_THRESHOLD) {
        newIsFever = true;
        newFeverTimer = FEVER_DURATION_TICKS;
        newGauge = 0;
      } else {
        newGauge = Math.min(newGauge, FEVER_THRESHOLD);
      }

      const newCombo = combo + 1;
      const newSkillReady = newGauge >= FEVER_THRESHOLD;

      return {
        ...state,
        tracing: false,
        tracedIds: [],
        score: score + delta,
        combo: newCombo,
        comboTimer: COMBO_TIMEOUT_TICKS,
        feverGauge: newGauge,
        isFever: newIsFever,
        feverTimer: newFeverTimer,
        skillReady: newSkillReady,
        lastClearedCount: tracedIds.length,
        phase: 'clearing',
        cells: cells.map(c =>
          tracedIds.includes(c.id)
            ? { ...c, isTraced: false, isClearing: true }
            : { ...c, isTraced: false }
        ),
      };
    }

    case Actions.CLEAR_DONE:
    case Actions.SKILL_DONE: {
      const clearedIds = state.cells.filter(c => c.isClearing).map(c => c.id);
      const newCells = computeRefill(state.cells, clearedIds, state.cols, state.rows);
      return {
        ...state,
        cells: newCells,
        phase: 'refilling',
      };
    }

    case Actions.REFILL_DONE: {
      return {
        ...state,
        cells: state.cells.map(c => ({ ...c, isFalling: false, fallDistance: 0 })),
        phase: 'playing',
      };
    }

    case Actions.TICK: {
      let { timeLeft, feverTimer, isFever, comboTimer, combo } = state;

      timeLeft = Math.max(0, timeLeft - 1);

      if (isFever) {
        feverTimer = Math.max(0, feverTimer - 1);
        if (feverTimer === 0) isFever = false;
      }

      if (comboTimer > 0) {
        comboTimer -= 1;
        if (comboTimer === 0) combo = 0;
      }

      if (timeLeft === 0) {
        return { ...state, timeLeft: 0, feverTimer, isFever, comboTimer, combo, phase: 'ended' };
      }

      return { ...state, timeLeft, feverTimer, isFever, comboTimer, combo };
    }

    case Actions.SKILL_USE: {
      if (!state.skillReady || state.phase !== 'playing') return state;

      const { cols, rows, cells } = state;
      const anchorCol = 1 + Math.floor(Math.random() * (cols - 2));
      const anchorRow = 1 + Math.floor(Math.random() * (rows - 2));

      const skillIds = new Set();
      for (let dr = -SKILL_RADIUS; dr <= SKILL_RADIUS; dr++) {
        for (let dc = -SKILL_RADIUS; dc <= SKILL_RADIUS; dc++) {
          const c = anchorCol + dc;
          const r = anchorRow + dr;
          if (c >= 0 && c < cols && r >= 0 && r < rows) {
            const cell = cells.find(x => x.col === c && x.row === r);
            if (cell) skillIds.add(cell.id);
          }
        }
      }

      const clearedCells = cells.filter(c => skillIds.has(c.id));
      const delta = computeScore(clearedCells.length, state.combo, state.isFever);

      return {
        ...state,
        skillReady: false,
        feverGauge: 0,
        score: state.score + delta,
        phase: 'clearing',
        cells: cells.map(c =>
          skillIds.has(c.id) ? { ...c, isClearing: true } : c
        ),
      };
    }

    case Actions.END: {
      return { ...state, phase: 'ended' };
    }

    default:
      return state;
  }
}
