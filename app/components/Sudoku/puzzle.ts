/**
 * Sample puzzle + win detection.
 *
 * Real puzzles will arrive from the generator Lambda via getTodaysPuzzle();
 * this hardcoded grid exists so the board, timer and win logic can be built and
 * tested without a backend.
 */

export type Cell = number | null;
export type Grid = readonly (readonly Cell[])[];

const _ = null;

// TODO: replace with a generated puzzle once the Lambda exists.
export const SAMPLE_PUZZLE: Grid = [
  [5, 3, _, _, 7, _, _, _, _],
  [6, _, _, 1, 9, 5, _, _, _],
  [_, 9, 8, _, _, _, _, 6, _],
  [8, _, _, _, 6, _, _, _, 3],
  [4, _, _, 8, _, 3, _, _, 1],
  [7, _, _, _, 2, _, _, _, 6],
  [_, 6, _, _, _, _, 2, 8, _],
  [_, _, _, 4, 1, 9, _, _, 5],
  [_, _, _, _, 8, _, _, 7, 9],
];

/**
 * The solution to SAMPLE_PUZZLE.
 *
 * Deliberately NOT used by isSolved() — win detection is rule-based so that any
 * valid completion counts, not just this one. It's exported purely as a
 * development aid: drop it into the board to exercise the completion UI without
 * solving the puzzle by hand.
 */
export const SAMPLE_SOLUTION: Grid = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

/** True when every digit 1-9 appears exactly once. */
function isCompleteGroup(values: readonly Cell[]): boolean {
  const seen = new Set(values.filter((value): value is number => value !== null));
  return seen.size === 9;
}

/**
 * Rule-based rather than a comparison against SAMPLE_SOLUTION: a grid wins if
 * every row, column and 3x3 box holds 1-9. That keeps the check honest if a
 * future generated puzzle ever admits more than one valid solution.
 */
export function isSolved(grid: Grid): boolean {
  for (let index = 0; index < 9; index += 1) {
    const row = grid[index];
    const column = grid.map((r) => r[index]);
    if (!isCompleteGroup(row) || !isCompleteGroup(column)) return false;
  }

  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const box: Cell[] = [];
      for (let r = boxRow; r < boxRow + 3; r += 1) {
        for (let c = boxCol; c < boxCol + 3; c += 1) box.push(grid[r][c]);
      }
      if (!isCompleteGroup(box)) return false;
    }
  }

  return true;
}