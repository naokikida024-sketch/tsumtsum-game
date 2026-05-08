'use client';

import { useRef, useLayoutEffect, useCallback, useState, useEffect } from 'react';
import { useGame } from '@/lib/GameContext';
import { Actions } from '@/lib/gameReducer';
import { DESKTOP_CELL_PX, MOBILE_CELL_PX } from '@/lib/constants';
import Tsum from './Tsum';
import audioEngine from '@/lib/audio';

function useGridSize(cols, rows) {
  const [cellPx, setCellPx] = useState(DESKTOP_CELL_PX);

  useEffect(() => {
    function update() {
      const mobile = window.innerWidth < 640;
      setCellPx(mobile ? MOBILE_CELL_PX : DESKTOP_CELL_PX);
    }
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  return {
    cellPx,
    boardWidth:  cols * cellPx,
    boardHeight: rows * cellPx,
  };
}

export default function Board() {
  const { state, dispatch } = useGame();
  const { cells, phase, tracing, cols, rows, isFever } = state;

  const { cellPx, boardWidth, boardHeight } = useGridSize(cols, rows);

  const boardRef = useRef(null);
  const cellRectsRef = useRef(new Map());

  const clearDoneRef = useRef(0);
  const fallDoneRef  = useRef(0);

  const clearingCells = cells.filter(c => c.isClearing);
  const fallingCells  = cells.filter(c => c.isFalling);

  // Particle state
  const [particles, setParticles] = useState([]);

  // Re-measure cell rects after each render
  useLayoutEffect(() => {
    const map = new Map();
    cells.forEach(cell => {
      const el = document.getElementById(`tsum-${cell.id}`);
      if (el) map.set(cell.id, el.getBoundingClientRect());
    });
    cellRectsRef.current = map;
  });

  // Reset animation counters when phase changes
  useEffect(() => {
    if (phase === 'clearing')  clearDoneRef.current = 0;
    if (phase === 'refilling') fallDoneRef.current = 0;
  }, [phase]);

  const getIdAtPoint = useCallback((x, y) => {
    for (const [id, rect] of cellRectsRef.current) {
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return id;
      }
    }
    return null;
  }, []);

  const spawnParticles = useCallback((clearedCells) => {
    if (!boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const newParticles = [];
    clearedCells.forEach(cell => {
      const rect = cellRectsRef.current.get(cell.id);
      if (!rect) return;
      const cx = rect.left - boardRect.left + rect.width / 2;
      const cy = rect.top  - boardRect.top  + rect.height / 2;
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const dist = 20 + Math.random() * 20;
        newParticles.push({
          id: `p-${cell.id}-${i}`,
          cx, cy,
          px: Math.cos(angle) * dist,
          py: Math.sin(angle) * dist,
          color: cell.type,
        });
      }
    });
    if (newParticles.length > 0) {
      setParticles(p => [...p, ...newParticles]);
    }
  }, []);

  function handlePointerDown(e) {
    if (phase !== 'playing') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const id = getIdAtPoint(e.clientX, e.clientY);
    if (id) {
      dispatch({ type: Actions.TRACE_START, payload: { id } });
      audioEngine.playTrace();
    }
  }

  function handlePointerMove(e) {
    if (!tracing || phase !== 'playing') return;
    const id = getIdAtPoint(e.clientX, e.clientY);
    if (id) {
      const prevLen = state.tracedIds.length;
      dispatch({ type: Actions.TRACE_MOVE, payload: { id } });
      if (!state.tracedIds.includes(id) && state.tracedIds.length > prevLen - 1) {
        audioEngine.playTrace();
      }
    }
  }

  function handlePointerUp() {
    if (!tracing) return;
    const cleared = cells.filter(c => state.tracedIds.includes(c.id));
    if (cleared.length >= 3) spawnParticles(cleared);
    dispatch({ type: Actions.TRACE_END });
  }

  const handleClearDone = useCallback((id) => {
    clearDoneRef.current += 1;
    if (clearDoneRef.current >= clearingCells.length) {
      dispatch({ type: Actions.CLEAR_DONE });
    }
  }, [clearingCells.length, dispatch]);

  const handleFallDone = useCallback((id) => {
    fallDoneRef.current += 1;
    if (fallDoneRef.current >= fallingCells.length) {
      dispatch({ type: Actions.REFILL_DONE });
    }
  }, [fallingCells.length, dispatch]);

  function removeParticle(id) {
    setParticles(p => p.filter(x => x.id !== id));
  }

  return (
    <div
      ref={boardRef}
      className={`board-container ${isFever ? 'fever-active' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ width: boardWidth, height: boardHeight, position: 'relative', touchAction: 'none' }}
    >
      {cells.map(cell => (
        <Tsum
          key={cell.id}
          cell={cell}
          cellPx={cellPx}
          onClearDone={cell.isClearing ? handleClearDone : undefined}
          onFallDone={cell.isFalling ? handleFallDone : undefined}
        />
      ))}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          data-type={p.color}
          style={{
            left: p.cx - 4,
            top:  p.cy - 4,
            width: 8,
            height: 8,
            background: `var(--color-tsum-${p.color})`,
            '--px': `${p.px}px`,
            '--py': `${p.py}px`,
          }}
          onAnimationEnd={() => removeParticle(p.id)}
        />
      ))}
    </div>
  );
}
