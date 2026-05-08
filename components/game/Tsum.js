'use client';

import { memo } from 'react';
import { DESKTOP_CELL_PX } from '@/lib/constants';

const FACES = {
  heart: ({ size, uid }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <defs>
        <radialGradient id={`hbody-${uid}`} cx="35%" cy="28%" r="70%">
          <stop offset="0%"   stopColor="#ffd0e8" />
          <stop offset="45%"  stopColor="#ff6b9d" />
          <stop offset="100%" stopColor="#99004d" />
        </radialGradient>
        <radialGradient id={`hshadow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      {/* drop shadow */}
      <ellipse cx="20" cy="38" rx="13" ry="2.5" fill="rgba(0,0,0,0.22)" />
      {/* body sphere */}
      <circle cx="20" cy="20" r="18" fill={`url(#hbody-${uid})`} />
      {/* rim darkening */}
      <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="3" />
      {/* specular highlight */}
      <ellipse cx="13" cy="12" rx="6" ry="3.5" fill="rgba(255,255,255,0.5)" transform="rotate(-25 13 12)" />
      <ellipse cx="11" cy="11" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.75)" transform="rotate(-25 11 11)" />
      {/* heart icon top */}
      <path d="M15.5 10 C15.5 7.5 18.5 7 20 9.5 C21.5 7 24.5 7.5 24.5 10 C24.5 13 20 16.5 20 16.5 C20 16.5 15.5 13 15.5 10 Z"
        fill="#ff2277" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      {/* eyes */}
      <ellipse cx="14.5" cy="22" rx="3.2" ry="4" fill="#1a0010" />
      <ellipse cx="25.5" cy="22" rx="3.2" ry="4" fill="#1a0010" />
      <circle cx="15.8" cy="20.8" r="1.1" fill="white" />
      <circle cx="26.8" cy="20.8" r="1.1" fill="white" />
      <circle cx="15.2" cy="22.5" r="0.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="26.2" cy="22.5" r="0.5" fill="rgba(255,255,255,0.4)" />
      {/* cheeks */}
      <ellipse cx="10" cy="25" rx="3" ry="1.8" fill="rgba(255,100,140,0.4)" />
      <ellipse cx="30" cy="25" rx="3" ry="1.8" fill="rgba(255,100,140,0.4)" />
      {/* mouth */}
      <path d="M15.5 28.5 Q20 32.5 24.5 28.5" stroke="#1a0010" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),

  star: ({ size, uid }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <defs>
        <radialGradient id={`sbody-${uid}`} cx="35%" cy="28%" r="70%">
          <stop offset="0%"   stopColor="#fff5a0" />
          <stop offset="45%"  stopColor="#ffd700" />
          <stop offset="100%" stopColor="#7a5500" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="38" rx="13" ry="2.5" fill="rgba(0,0,0,0.22)" />
      <circle cx="20" cy="20" r="18" fill={`url(#sbody-${uid})`} />
      <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
      <ellipse cx="13" cy="12" rx="6" ry="3.5" fill="rgba(255,255,255,0.5)" transform="rotate(-25 13 12)" />
      <ellipse cx="11" cy="11" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.75)" transform="rotate(-25 11 11)" />
      {/* star icon top */}
      <polygon points="20,7 21.4,11.5 26.2,11.5 22.4,14.2 23.8,18.7 20,16 16.2,18.7 17.6,14.2 13.8,11.5 18.6,11.5"
        fill="#ffaa00" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      <ellipse cx="14.5" cy="23" rx="3.2" ry="4" fill="#3a2a00" />
      <ellipse cx="25.5" cy="23" rx="3.2" ry="4" fill="#3a2a00" />
      <circle cx="15.8" cy="21.8" r="1.1" fill="white" />
      <circle cx="26.8" cy="21.8" r="1.1" fill="white" />
      <circle cx="15.2" cy="23.5" r="0.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="26.2" cy="23.5" r="0.5" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="10" cy="26.5" rx="3" ry="1.8" fill="rgba(255,180,0,0.4)" />
      <ellipse cx="30" cy="26.5" rx="3" ry="1.8" fill="rgba(255,180,0,0.4)" />
      <path d="M15.5 29.5 Q20 33.5 24.5 29.5" stroke="#3a2a00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),

  moon: ({ size, uid }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <defs>
        <radialGradient id={`mbody-${uid}`} cx="35%" cy="28%" r="70%">
          <stop offset="0%"   stopColor="#b2f5f0" />
          <stop offset="45%"  stopColor="#4ecdc4" />
          <stop offset="100%" stopColor="#005550" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="38" rx="13" ry="2.5" fill="rgba(0,0,0,0.22)" />
      <circle cx="20" cy="20" r="18" fill={`url(#mbody-${uid})`} />
      <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
      <ellipse cx="13" cy="12" rx="6" ry="3.5" fill="rgba(255,255,255,0.5)" transform="rotate(-25 13 12)" />
      <ellipse cx="11" cy="11" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.75)" transform="rotate(-25 11 11)" />
      {/* crescent moon icon top */}
      <path d="M22 7 Q29 11 29 18 Q23 15 19 18 Q18 9 22 7 Z" fill="#aaf0ec" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
      <ellipse cx="14.5" cy="23" rx="3.2" ry="4" fill="#002a28" />
      <ellipse cx="25.5" cy="23" rx="3.2" ry="4" fill="#002a28" />
      <circle cx="15.8" cy="21.8" r="1.1" fill="white" />
      <circle cx="26.8" cy="21.8" r="1.1" fill="white" />
      <circle cx="15.2" cy="23.5" r="0.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="26.2" cy="23.5" r="0.5" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="10" cy="26.5" rx="3" ry="1.8" fill="rgba(0,200,190,0.35)" />
      <ellipse cx="30" cy="26.5" rx="3" ry="1.8" fill="rgba(0,200,190,0.35)" />
      <path d="M15.5 29.5 Q20 33.5 24.5 29.5" stroke="#002a28" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),

  sun: ({ size, uid }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <defs>
        <radialGradient id={`sunbody-${uid}`} cx="35%" cy="28%" r="70%">
          <stop offset="0%"   stopColor="#ffe0b0" />
          <stop offset="45%"  stopColor="#ff9040" />
          <stop offset="100%" stopColor="#7a2a00" />
        </radialGradient>
      </defs>
      {/* sun rays behind body */}
      {[0,40,80,120,160,200,240,280,320].map(a => (
        <line key={a}
          x1={20 + Math.cos(a * Math.PI / 180) * 19}
          y1={20 + Math.sin(a * Math.PI / 180) * 19}
          x2={20 + Math.cos(a * Math.PI / 180) * 25}
          y2={20 + Math.sin(a * Math.PI / 180) * 25}
          stroke="#ffcc44" strokeWidth="3" strokeLinecap="round" opacity="0.9"
        />
      ))}
      <ellipse cx="20" cy="38" rx="13" ry="2.5" fill="rgba(0,0,0,0.22)" />
      <circle cx="20" cy="20" r="17" fill={`url(#sunbody-${uid})`} />
      <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
      <ellipse cx="13" cy="12" rx="6" ry="3.5" fill="rgba(255,255,255,0.5)" transform="rotate(-25 13 12)" />
      <ellipse cx="11" cy="11" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.75)" transform="rotate(-25 11 11)" />
      <ellipse cx="14.5" cy="23" rx="3.2" ry="4" fill="#3a1500" />
      <ellipse cx="25.5" cy="23" rx="3.2" ry="4" fill="#3a1500" />
      <circle cx="15.8" cy="21.8" r="1.1" fill="white" />
      <circle cx="26.8" cy="21.8" r="1.1" fill="white" />
      <circle cx="15.2" cy="23.5" r="0.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="26.2" cy="23.5" r="0.5" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="10" cy="26.5" rx="3" ry="1.8" fill="rgba(255,120,0,0.4)" />
      <ellipse cx="30" cy="26.5" rx="3" ry="1.8" fill="rgba(255,120,0,0.4)" />
      <path d="M15.5 29.5 Q20 33.5 24.5 29.5" stroke="#3a1500" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),

  crown: ({ size, uid }) => (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      <defs>
        <radialGradient id={`crownbody-${uid}`} cx="35%" cy="28%" r="70%">
          <stop offset="0%"   stopColor="#ecc0ff" />
          <stop offset="45%"  stopColor="#c084fc" />
          <stop offset="100%" stopColor="#4b006e" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="38" rx="13" ry="2.5" fill="rgba(0,0,0,0.22)" />
      <circle cx="20" cy="20" r="18" fill={`url(#crownbody-${uid})`} />
      <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
      <ellipse cx="13" cy="12" rx="6" ry="3.5" fill="rgba(255,255,255,0.5)" transform="rotate(-25 13 12)" />
      <ellipse cx="11" cy="11" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.75)" transform="rotate(-25 11 11)" />
      {/* crown */}
      <polygon points="11,17 14,10 20,15 26,10 29,17 27,18.5 13,18.5"
        fill="#ffe066" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      <circle cx="14"  cy="10" r="1.8" fill="#ff6b9d" />
      <circle cx="20"  cy="15" r="1.8" fill="#4ecdc4" />
      <circle cx="26"  cy="10" r="1.8" fill="#ff6b9d" />
      <ellipse cx="14.5" cy="23.5" rx="3.2" ry="4" fill="#1a0033" />
      <ellipse cx="25.5" cy="23.5" rx="3.2" ry="4" fill="#1a0033" />
      <circle cx="15.8" cy="22.3" r="1.1" fill="white" />
      <circle cx="26.8" cy="22.3" r="1.1" fill="white" />
      <circle cx="15.2" cy="24" r="0.5" fill="rgba(255,255,255,0.4)" />
      <circle cx="26.2" cy="24" r="0.5" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="10" cy="27" rx="3" ry="1.8" fill="rgba(160,80,255,0.4)" />
      <ellipse cx="30" cy="27" rx="3" ry="1.8" fill="rgba(160,80,255,0.4)" />
      <path d="M15.5 30 Q20 34 24.5 30" stroke="#1a0033" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
};

function Tsum({ cell, cellPx = DESKTOP_CELL_PX, onClearDone, onFallDone }) {
  const Face = FACES[cell.type];
  const svgSize = cellPx * 0.88;

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
      {Face && <Face size={svgSize} uid={cell.id} />}
    </div>
  );
}

export default memo(Tsum);
