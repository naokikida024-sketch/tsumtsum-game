import { TSUM_TYPE_IDS } from './constants';

let idCounter = 0;

export function createTsum(col, row, type) {
  return {
    id: `t-${++idCounter}-${col}-${row}`,
    type: type ?? TSUM_TYPE_IDS[Math.floor(Math.random() * TSUM_TYPE_IDS.length)],
    col,
    row,
    isTraced: false,
    isClearing: false,
    isFalling: false,
    fallDistance: 0,
  };
}

export function generateBoard(cols, rows) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(createTsum(c, r));
    }
  }
  return cells;
}

export function areAdjacent(a, b) {
  return (
    Math.abs(a.col - b.col) <= 1 &&
    Math.abs(a.row - b.row) <= 1 &&
    a.id !== b.id
  );
}

export function canExtendTrace(lastCell, candidate, tracedIds) {
  if (candidate.type !== lastCell.type) return false;
  if (tracedIds.includes(candidate.id)) return false;
  return areAdjacent(lastCell, candidate);
}

export function computeRefill(cells, clearedIds, cols, rows) {
  const clearedSet = new Set(clearedIds);
  const survivors = cells.filter(c => !clearedSet.has(c.id));
  const newCells = [];

  for (let col = 0; col < cols; col++) {
    const colSurvivors = survivors
      .filter(c => c.col === col)
      .sort((a, b) => b.row - a.row); // bottom first

    const clearedInCol = clearedIds.filter(id => {
      const cell = cells.find(c => c.id === id);
      return cell && cell.col === col;
    }).length;

    // Assign new rows to survivors from bottom
    colSurvivors.forEach((cell, i) => {
      const newRow = rows - 1 - i;
      const fell = newRow - cell.row;
      newCells.push({
        ...cell,
        row: newRow,
        isFalling: fell > 0,
        fallDistance: Math.max(0, fell),
      });
    });

    // Generate new cells at the top
    for (let i = 0; i < clearedInCol; i++) {
      const newRow = clearedInCol - 1 - i;
      newCells.push({
        ...createTsum(col, newRow),
        isFalling: true,
        fallDistance: newRow + clearedInCol,
      });
    }
  }

  return newCells;
}
