'use client';

import { useRouter } from 'next/navigation';
import { useGame } from '@/lib/GameContext';
import { Actions } from '@/lib/gameReducer';

export default function ResultModal() {
  const { state, dispatch } = useGame();
  const router = useRouter();

  if (state.phase !== 'ended') return null;

  const isNewRecord = state.score >= state.highScore && state.score > 0;

  function handlePlayAgain() {
    dispatch({ type: Actions.RESET });
  }

  function handleResult() {
    router.push('/result');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="flex flex-col items-center gap-6 p-8 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, #1a3060, #0d1b3e)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 60px rgba(99,102,241,0.3)',
          animation: 'slideUp 0.4s ease',
          minWidth: 280,
        }}
      >
        <h2 className="text-2xl font-black text-white">ゲーム終了！</h2>

        {isNewRecord && (
          <div
            className="text-sm font-bold px-4 py-1 rounded-full"
            style={{ background: '#ffe06633', color: '#ffe066' }}
          >
            🏆 NEW RECORD!
          </div>
        )}

        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-slate-400">スコア</span>
          <span className="text-5xl font-black text-white tabular-nums">
            {state.score.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-slate-400">ハイスコア</span>
          <span className="text-lg font-bold text-slate-300 tabular-nums">
            {Math.max(state.score, state.highScore).toLocaleString()}
          </span>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={handlePlayAgain}
            className="flex-1 py-3 rounded-2xl font-black text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
            }}
          >
            もう一度
          </button>
          <button
            onClick={handleResult}
            className="flex-1 py-3 rounded-2xl font-black transition-all"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#94a3b8',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            結果を見る
          </button>
        </div>
      </div>
    </div>
  );
}
