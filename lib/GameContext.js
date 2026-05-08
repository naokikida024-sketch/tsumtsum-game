'use client';

import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { gameReducer, createInitialState, Actions } from './gameReducer';
import { HIGH_SCORE_KEY, DESKTOP_COLS, DESKTOP_ROWS } from './constants';
import audioEngine from './audio';

const GameContext = createContext(null);

export function GameProvider({ children, cols = DESKTOP_COLS, rows = DESKTOP_ROWS }) {
  const [state, dispatch] = useReducer(gameReducer, null, () =>
    createInitialState(cols, rows)
  );

  const prevPhaseRef = useRef(state.phase);
  const prevFeverRef = useRef(state.isFever);
  const prevTimeRef = useRef(state.timeLeft);
  const prevClearedRef = useRef(state.lastClearedCount);

  // Timer
  useEffect(() => {
    if (state.phase !== 'playing') return;
    const id = setInterval(() => dispatch({ type: Actions.TICK }), 1000);
    return () => clearInterval(id);
  }, [state.phase]);

  // Save high score when game ends
  useEffect(() => {
    if (state.phase === 'ended' && state.score > state.highScore) {
      try { localStorage.setItem(HIGH_SCORE_KEY, String(state.score)); } catch {}
    }
  }, [state.phase, state.score, state.highScore]);

  // Audio effects
  useEffect(() => {
    const phase = state.phase;
    const prevPhase = prevPhaseRef.current;

    if (phase === 'clearing' && prevPhase === 'playing' && state.lastClearedCount > 0) {
      audioEngine.playClear(state.lastClearedCount);
    }
    if (phase === 'ended' && prevPhase !== 'ended') {
      audioEngine.playTimeUp();
    }
    prevPhaseRef.current = phase;
  }, [state.phase, state.lastClearedCount]);

  useEffect(() => {
    if (state.isFever && !prevFeverRef.current) {
      audioEngine.playFever();
    }
    prevFeverRef.current = state.isFever;
  }, [state.isFever]);

  // Save score to sessionStorage for result page
  useEffect(() => {
    if (state.phase === 'ended') {
      try {
        sessionStorage.setItem('tsumtsum_score', String(state.score));
        sessionStorage.setItem('tsumtsum_highscore', String(Math.max(state.score, state.highScore)));
      } catch {}
    }
  }, [state.phase, state.score, state.highScore]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
