'use client';

import { useEffect, useState } from 'react';
import SudokuBoard from './SudokuBoard';
import { isSolved, type Cell, type Grid } from './puzzle';
import { getOwnerTime, getTodaysPuzzle, submitScore } from './api';
import { formatDuration } from '@/lib/format';

const CLIENT_ID_KEY = 'clientId';

/**
 * Stable anonymous identity for score submission. Safe to run lazily during the
 * first render because this component is only ever mounted client-side (see
 * SudokuSection's dynamic import with ssr: false); the window guard is a
 * belt-and-braces default in case it is ever imported somewhere that renders
 * on the server.
 */
function ensureClientId(): string {
  if (typeof window === 'undefined') return '';
  const existing = window.localStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;
  const created = crypto.randomUUID();
  window.localStorage.setItem(CLIENT_ID_KEY, created);
  return created;
}

export default function SudokuWidget() {
  const [clientId] = useState(ensureClientId);
  const [puzzle, setPuzzle] = useState<Grid | null>(null);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [ownerTime, setOwnerTime] = useState<number | null>(null);

  // The timer runs from the first move to completion; `now` only exists to
  // re-render the ticking display.
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const [nextPuzzle, owner] = await Promise.all([getTodaysPuzzle(), getOwnerTime()]);
      if (cancelled) return;
      setPuzzle(nextPuzzle);
      setGrid(nextPuzzle);
      setOwnerTime(owner);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (startedAt === null || finishedAt !== null) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [startedAt, finishedAt]);

  const elapsedSeconds =
    startedAt === null ? 0 : Math.floor(((finishedAt ?? now) - startedAt) / 1000);

  function handleCellChange(row: number, col: number, value: Cell) {
    if (grid === null || finishedAt !== null) return;

    // Read the start time locally: setStartedAt below won't be visible in this
    // closure, and the very first move could also be the solving move.
    const startTs = startedAt ?? Date.now();
    if (startedAt === null) {
      setStartedAt(startTs);
      setNow(startTs);
    }

    const next = grid.map((cells, r) =>
      cells.map((cell, c) => (r === row && c === col ? value : cell)),
    );
    setGrid(next);

    if (isSolved(next)) {
      const finished = Date.now();
      setFinishedAt(finished);
      void submitScore(clientId, Math.max(1, Math.round((finished - startTs) / 1000)));
    }
  }

  if (puzzle === null || grid === null) {
    return <p className="text-muted">Loading today&apos;s puzzle…</p>;
  }

  const givens = puzzle.map((cells) => cells.map((cell) => cell !== null));
  const beatOwner = ownerTime !== null && finishedAt !== null && elapsedSeconds < ownerTime;

  return (
    <div className="w-fit">
      <div className="mb-4 flex items-baseline justify-between gap-4 font-mono text-sm">
        <p className="text-muted">
          {startedAt === null ? 'Timer starts on your first move' : 'Elapsed'}
        </p>
        {/* aria-live off: a live timer would be announced on every tick. */}
        <p aria-live="off" className="text-lg text-foreground">
          {formatDuration(elapsedSeconds)}
        </p>
      </div>

      <SudokuBoard
        grid={grid}
        givens={givens}
        disabled={finishedAt !== null}
        onCellChange={handleCellChange}
      />

      {/* Only renders when a time has actually been recorded — flip
          SIMULATE_OWNER_TIME in api.ts to check the absent case. */}
      {ownerTime !== null && finishedAt === null && (
        <p className="mt-4 rounded-lg border border-foreground/15 bg-foreground/[0.04] px-4 py-3 font-mono text-sm text-foreground">
          Beat my time: {formatDuration(ownerTime)}
        </p>
      )}

      {finishedAt !== null && (
        <div
          role="status"
          className="mt-4 rounded-lg border border-foreground/15 bg-foreground/[0.04] px-4 py-3 font-mono text-sm text-foreground"
        >
          <p className="font-semibold">Solved in {formatDuration(elapsedSeconds)}.</p>
          {ownerTime !== null && (
            <p className="mt-1 text-muted">
              {beatOwner
                ? `You beat my ${formatDuration(ownerTime)}.`
                : `Still short of my ${formatDuration(ownerTime)}.`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}