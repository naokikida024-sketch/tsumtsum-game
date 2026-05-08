'use client';

import { memo } from 'react';
import { DESKTOP_CELL_PX } from '@/lib/constants';

const FACES = {
  heart: ({ size }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <circle cx="20" cy="22" r="17" fill="#ff6b9d" />
      <ellipse cx="14" cy="20" rx="3.5" ry="4.5" fill="#1a0010" />
      <ellipse cx="26" cy="20" rx="3.5" ry="4.5" fill="#1a0010" />
      <circle cx="15.5" cy="19" r="1.2" fill="white" />
      <circle cx="27.5" cy="19" r="1.2" fill="white" />
      <path d="M15 27 Q20 31 25 27" stroke="#1a0010" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M16 11 C16 8 19.5 8 19.5 11 C19.5 8 23 8 23 11 L19.5 15 Z" fill="#ff4488" />
    </svg>
  ),
  star: ({ size }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <circle cx="20" cy="22" r="17" fill="#ffd700" />
      <ellipse cx="14" cy="20" rx="3.5" ry="4.5" fill="#3a2a00" />
      <ellipse cx="26" cy="20" rx="3.5" ry="4.5" fill="#3a2a00" />
      <circle cx="15.5" cy="19" r="1.2" fill="white" />
      <circle cx="27.5" cy="19" r="1.2" fill="white" />
      <path d="M15 27 Q20 31 25 27" stroke="#3a2a00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <polygon points="20,7 21.5,12 26.5,12 22.5,15 24,20 20,17 16,20 17.5,15 13.5,12 18.5,12" fill="#ffaa00" />
    </svg>
  ),
  moon: ({ size }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <circle cx="20" cy="22" r="17" fill="#4ecdc4" />
      <ellipse cx="14" cy="20" rx="3.5" ry="4.5" fill="#002a28" />
      <ellipse cx="26" cy="20" rx="3.5" ry="4.5" fill="#002a28" />
      <circle cx="15.5" cy="19" r="1.2" fill="white" />
      <circle cx="27.5" cy="19" r="1.2" fill="white" />
      <path d="M15 27 Q20 31 25 27" stroke="#002a28" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M22 7 Q28 10 28 17 Q22 14 18 17 Q18 9 22 7 Z" fill="#88eeea" />
    </svg>
  ),
  sun: ({ size }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <circle cx="20" cy="20" r="6" fill="#ffaa00" opacity="0.5" />
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a}
          x1={20 + Math.cos(a*Math.PI/180)*8}
          y1={20 + Math.sin(a*Math.PI/180)*8}
          x2={20 + Math.cos(a*Math.PI/180)*12}
          y2={20 + Math.sin(a*Math.PI/180)*12}
          stroke="#ffaa00" strokeWidth="2.5" strokeLinecap="round"
        />
      ))}
      <circle cx="20" cy="22" r="15" fill="#ff9040" />
      <ellipse cx="14" cy="20" rx="3.5" ry="4.5" fill="#3a1500" />
      <ellipse cx="26" cy="20" rx="3.5" ry="4.5" fill="#3a1500" />
      <circle cx="15.5" cy="19" r="1.2" fill="white" />
      <circle cx="27.5" cy="19" r="1.2" fill="white" />
      <path d="M15 27 Q20 31 25 27" stroke="#3a1500" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  crown: ({ size }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <circle cx="20" cy="22" r="17" fill="#c084fc" />
      <ellipse cx="14" cy="21" rx="3.5" ry="4.5" fill="#1a0033" />
      <ellipse cx="26" cy="21" rx="3.5" ry="4.5" fill="#1a0033" />
      <circle cx="15.5" cy="20" r="1.2" fill="white" />
      <circle cx="27.5" cy="20" r="1.2" fill="white" />
      <path d="M15 28 Q20 32 25 28" stroke="#1a0033" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <polygon points="12,14 16,9 20,13 24,9 28,14 26,16 14,16" fill="#ffe066" />
      <circle cx="16" cy="9" r="1.5" fill="#ff6b9d" />
      <circle cx="20" cy="13" r="1.5" fill="#ff6b9d" />
      <circle cx="24" cy="9" r="1.5" fill="#ff6b9d" />
    </svg>
  ),
};

function Tsum({ cell, cellPx = DESKTOP_CELL_PX, onClearDone, onFallDone }) {
  const Face = FACES[cell.type];
  const svgSize = cellPx * 0.85;

  const cls = [
    'tsum',
    cell.isTraced   ? 'tsum--traced'   : '',
    cell.isClearing ? 'tsum--clearing' : '',
    cell.isFalling  ? 'tsum--falling'  : '',
  ].join(' ').trim();

  const style = {
    left: cell.col * cellPx + 2,
    top:  cell.row * cellPx + 2,
    width:  cellPx - 4,
    height: cellPx - 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (cell.isFalling) {
    style['--fall-dist'] = `${cell.fallDistance * cellPx}px`;
  }

  function handleAnimEnd() {
    if (cell.isClearing && onClearDone) onClearDone(cell.id);
    else if (cell.isFalling && onFallDone) onFallDone(cell.id);
  }

  return (
    <div
      id={`tsum-${cell.id}`}
      className={cls}
      data-type={cell.type}
      style={style}
      onAnimationEnd={handleAnimEnd}
    >
      {Face && <Face size={svgSize} />}
    </div>
  );
}

export default memo(Tsum);
