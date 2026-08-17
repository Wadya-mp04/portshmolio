'use client';

import type { Grid } from './puzzle';

type Props = {
  grid: Grid;
  /** True where the puzzle supplied the digit — those cells are not editable. */
  givens: readonly (readonly boolean[])[];
  disabled: boolean;
  onCellChange: (row: number, col: number, value: number | null) => void;
};

/** Heavier rules on 3x3 boundaries; the outer edge comes from the container. */
function cellBorders(row: number, col: number): string {
  const top =
    row % 3 === 0 ? 'border-t-2 border-t-foreground/50' : 'border-t border-t-foreground/20';
  const left =
    col % 3 === 0 ? 'border-l-2 border-l-foreground/50' : 'border-l border-l-foreground/20';
  return `${top} ${left}`;
}

export default function SudokuBoard({ grid, givens, disabled, onCellChange }: Props) {
  /**
   * Arrow keys walk the grid, stepping over given cells — they render as static
   * text rather than inputs, so they aren't focusable and would otherwise be
   * dead stops.
   */
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const deltas: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    const step = deltas[event.key];
    const origin = (event.target as HTMLElement).dataset.pos;
    if (!step || !origin) return;

    event.preventDefault();
    const [deltaRow, deltaCol] = step;
    let [row, col] = origin.split('-').map(Number);

    for (row += deltaRow, col += deltaCol; row >= 0 && row < 9 && col >= 0 && col < 9; ) {
      const next = event.currentTarget.querySelector<HTMLInputElement>(
        `input[data-pos="${row}-${col}"]`,
      );
      if (next) {
        next.focus();
        next.select();
        return;
      }
      row += deltaRow;
      col += deltaCol;
    }
  }

  return (
    // role="grid" requires role="row" children, so the rows are real elements
    // rather than a flat 81-cell CSS grid.
    <div
      role="grid"
      aria-label="Sudoku puzzle"
      onKeyDown={handleKeyDown}
      className="w-fit border-b-2 border-r-2 border-foreground/50 font-mono"
    >
      {grid.map((cells, row) => (
        <div role="row" key={row} className="flex">
          {cells.map((value, col) => {
            const isGiven = givens[row][col];
            return (
              <div
                role="gridcell"
                key={col}
                className={`size-9 sm:size-11 ${cellBorders(row, col)}`}
              >
                {isGiven ? (
                  <span
                    aria-label={`Row ${row + 1}, column ${col + 1}: ${value}, given`}
                    className="grid size-full place-items-center bg-foreground/[0.07] text-base font-semibold text-foreground sm:text-lg"
                  >
                    {value}
                  </span>
                ) : (
                  <input
                    data-pos={`${row}-${col}`}
                    inputMode="numeric"
                    autoComplete="off"
                    disabled={disabled}
                    aria-label={`Row ${row + 1}, column ${col + 1}`}
                    value={value ?? ''}
                    onChange={(event) => {
                      // Take the last character typed, so overwriting a filled
                      // cell works without having to clear it first.
                      const typed = event.target.value.slice(-1);
                      if (typed === '') return onCellChange(row, col, null);
                      if (!/[1-9]/.test(typed)) return;
                      onCellChange(row, col, Number(typed));
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Backspace' || event.key === 'Delete') {
                        event.preventDefault();
                        onCellChange(row, col, null);
                      }
                    }}
                    className="size-full bg-transparent text-center text-base text-foreground outline-none focus:bg-foreground/10 disabled:cursor-default sm:text-lg"
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}