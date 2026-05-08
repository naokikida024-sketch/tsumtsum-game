'use client';

import { useGame } from '@/lib/GameContext';
import { Actions } from '@/lib/gameReducer';

export default function SkillButton() {
  const { state, dispatch } = useGame();
  const { skillReady, phase } = state;
  const canUse = skillReady && phase === 'playing';

  return (
    <button
      onClick={() => canUse && dispatch({ type: Actions.SKILL_USE })}
      disabled={!canUse}
      className={`
        flex flex-col items-center gap-1 px-4 py-2 rounded-2xl
        transition-all duration-200 select-none
        ${canUse ? 'skill-ready cursor-pointer opacity-100' : 'opacity-40 cursor-not-allowed'}
      `}
      style={{
        background: canUse
          ? 'linear-gradient(135deg, #7c3aed, #c084fc)'
          : 'rgba(255,255,255,0.05)',
        border: '2px solid',
        borderColor: canUse ? '#c084fc' : 'rgba(255,255,255,0.1)',
      }}
    >
      <svg viewBox="0 0 40 30" width={48} height={36}>
        <polygon points="12,14 16,9 20,13 24,9 28,14 26,16 14,16" fill="#ffe066" />
        <circle cx="16" cy="9" r="2" fill="#ff6b9d" />
        <circle cx="20" cy="13" r="2" fill="#ff6b9d" />
        <circle cx="24" cy="9" r="2" fill="#ff6b9d" />
        <rect x="12" y="16" width="16" height="8" rx="2" fill="#ffe066" opacity="0.7" />
      </svg>
      <span
        className="text-xs font-black"
        style={{ color: canUse ? '#ffe066' : '#94a3b8' }}
      >
        SKILL
      </span>
    </button>
  );
}
