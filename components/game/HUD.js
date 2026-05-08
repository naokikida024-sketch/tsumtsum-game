'use client';

import { useGame } from '@/lib/GameContext';
import { FEVER_THRESHOLD } from '@/lib/constants';

export default function HUD() {
  const { state } = useGame();
  const { score, highScore, timeLeft, combo, feverGauge, isFever } = state;

  const timerRed = timeLeft <= 10;
  const gaugePercent = Math.min(100, (feverGauge / FEVER_THRESHOLD) * 100);

  return (
    <div className="flex flex-col gap-2 w-full px-2 py-3">
      {/* Score row */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400">スコア</span>
          <span className="text-2xl font-black text-white tabular-nums">
            {score.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-400">ベスト</span>
          <span className="text-sm font-bold text-slate-300 tabular-nums">
            {highScore.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Timer + Combo */}
      <div className="flex justify-between items-center">
        <div
          className="text-3xl font-black tabular-nums transition-colors"
          style={{ color: timerRed ? '#f87171' : '#facc15' }}
        >
          {timeLeft}s
        </div>
        {combo >= 2 && (
          <div
            className="text-lg font-black px-3 py-1 rounded-full"
            style={{
              background: 'rgba(250,204,21,0.15)',
              color: '#facc15',
              border: '1px solid rgba(250,204,21,0.3)',
              animation: 'comboPop 0.2s ease',
            }}
          >
            {combo} COMBO
          </div>
        )}
      </div>

      {/* Fever gauge */}
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-bold w-12 shrink-0"
          style={{ color: isFever ? '#ffe066' : '#94a3b8' }}
        >
          {isFever ? 'FEVER!' : 'FEVER'}
        </span>
        <div
          className="flex-1 h-3 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${gaugePercent}%`,
              background: isFever
                ? 'linear-gradient(90deg, #ffe066, #ffaa00)'
                : 'linear-gradient(90deg, #c084fc, #818cf8)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
