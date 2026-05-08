'use client';

import { useGame } from '@/lib/GameContext';

export default function FeverOverlay() {
  const { state } = useGame();
  if (!state.isFever) return null;

  return (
    <>
      <div className="fever-overlay" />
      <div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none
                   px-6 py-2 rounded-full font-black text-xl"
        style={{
          background: 'linear-gradient(90deg, #ffe066, #ffaa00, #ffe066)',
          color: '#1a0a00',
          boxShadow: '0 0 20px 6px #ffe06688',
          animation: 'comboPop 0.3s ease',
          backgroundSize: '200% 100%',
        }}
      >
        🔥 FEVER TIME! 🔥
      </div>
    </>
  );
}
