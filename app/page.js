'use client';

import { useEffect, useState } from 'react';
import { GameProvider, useGame } from '@/lib/GameContext';
import { Actions } from '@/lib/gameReducer';
import { DESKTOP_COLS, DESKTOP_ROWS, MOBILE_COLS, MOBILE_ROWS } from '@/lib/constants';
import Board from '@/components/game/Board';
import HUD from '@/components/game/HUD';
import SkillButton from '@/components/game/SkillButton';
import FeverOverlay from '@/components/ui/FeverOverlay';
import ResultModal from '@/components/ui/ResultModal';
import audioEngine from '@/lib/audio';

function StartScreen() {
  const { state, dispatch } = useGame();

  if (state.phase !== 'idle') return null;

  function handleStart() {
    audioEngine._init(); // unlock AudioContext on user gesture
    dispatch({ type: Actions.START });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
      style={{ background: 'rgba(13,27,62,0.92)', backdropFilter: 'blur(2px)' }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {['heart','star','moon','sun','crown'].map(type => (
            <div
              key={type}
              className="rounded-full"
              style={{
                width: 44,
                height: 44,
                background: `var(--color-tsum-${type})`,
                boxShadow: `0 0 14px 4px var(--color-tsum-${type})`,
              }}
            />
          ))}
        </div>
        <h1
          className="text-5xl font-black"
          style={{
            background: 'linear-gradient(135deg, #c084fc, #818cf8, #4ecdc4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ツムツム
        </h1>
        <p className="text-slate-400 text-sm">同じツムを3つ以上つなげよう！</p>
      </div>

      <button
        onClick={handleStart}
        className="px-12 py-4 rounded-full font-black text-xl text-white transition-all"
        style={{
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          boxShadow: '0 0 30px rgba(99,102,241,0.5)',
        }}
      >
        スタート
      </button>

      <div className="text-xs text-slate-500 text-center leading-6">
        60秒間でできるだけ多く消そう<br />
        5個以上でスコア倍率アップ！
      </div>
    </div>
  );
}

function GameScreen() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-3 px-4 py-4"
      style={{ background: 'linear-gradient(180deg, #0d1b3e 0%, #0a1020 100%)' }}
    >
      <div className="w-full max-w-sm">
        <HUD />
      </div>
      <Board />
      <div className="flex justify-center">
        <SkillButton />
      </div>
      <FeverOverlay />
      <ResultModal />
      <StartScreen />
    </div>
  );
}

export default function Home() {
  const [dims, setDims] = useState({ cols: DESKTOP_COLS, rows: DESKTOP_ROWS });

  useEffect(() => {
    function update() {
      const mobile = window.innerWidth < 640;
      setDims({
        cols: mobile ? MOBILE_COLS : DESKTOP_COLS,
        rows: mobile ? MOBILE_ROWS : DESKTOP_ROWS,
      });
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <GameProvider cols={dims.cols} rows={dims.rows}>
      <GameScreen />
    </GameProvider>
  );
}
