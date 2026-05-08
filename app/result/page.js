'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();
  const [score] = useState(() => {
    try { return parseInt(sessionStorage.getItem('tsumtsum_score') || '0', 10); } catch { return 0; }
  });
  const [highScore] = useState(() => {
    try { return parseInt(sessionStorage.getItem('tsumtsum_highscore') || '0', 10); } catch { return 0; }
  });

  const isNewRecord = score > 0 && score >= highScore;

  const rank =
    score >= 50000 ? { label: 'S', color: '#ffe066' } :
    score >= 30000 ? { label: 'A', color: '#c084fc' } :
    score >= 15000 ? { label: 'B', color: '#4ecdc4' } :
    score >= 5000  ? { label: 'C', color: '#4ade80' } :
                     { label: 'D', color: '#94a3b8' };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 px-4"
      style={{ background: 'linear-gradient(180deg, #0d1b3e 0%, #0a1020 100%)' }}
    >
      <div
        className="flex flex-col items-center gap-6 p-8 rounded-3xl w-full max-w-sm"
        style={{
          background: 'linear-gradient(135deg, #1a3060, #0d1b3e)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 0 60px rgba(99,102,241,0.2)',
          animation: 'slideUp 0.5s ease',
        }}
      >
        <h1 className="text-3xl font-black text-white">リザルト</h1>

        {/* Rank */}
        <div
          className="flex items-center justify-center w-24 h-24 rounded-full text-5xl font-black"
          style={{
            background: `${rank.color}22`,
            border: `3px solid ${rank.color}`,
            color: rank.color,
            boxShadow: `0 0 30px ${rank.color}55`,
          }}
        >
          {rank.label}
        </div>

        {isNewRecord && (
          <div
            className="text-sm font-bold px-4 py-1 rounded-full"
            style={{ background: '#ffe06633', color: '#ffe066' }}
          >
            🏆 NEW RECORD!
          </div>
        )}

        <div className="flex flex-col items-center gap-1 w-full">
          <span className="text-sm text-slate-400">スコア</span>
          <span className="text-5xl font-black text-white tabular-nums">
            {score.toLocaleString()}
          </span>
        </div>

        <div
          className="flex justify-between w-full px-4 py-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-slate-400">ハイスコア</span>
            <span className="font-bold text-slate-200 tabular-nums">
              {highScore.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-slate-400">ランク基準</span>
            <span className="font-bold text-slate-200 text-xs">
              S:50000 A:30000 B:15000
            </span>
          </div>
        </div>

        <button
          onClick={() => router.push('/')}
          className="w-full py-4 rounded-2xl font-black text-white text-lg transition-all"
          style={{
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
          }}
        >
          もう一度遊ぶ
        </button>
      </div>
    </div>
  );
}
