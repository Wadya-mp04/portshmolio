/**
 * Content stores dates as "YYYY-MM" (enforced by the schema in content/types.ts).
 *
 * Formatting uses a fixed month table rather than Intl/toLocaleDateString on
 * purpose: these strings are baked into the static export at build time, so a
 * locale-dependent formatter would make the output depend on whichever machine
 * ran the build.
 */

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** "2024-03" → "Mar 2024" */
export function formatMonth(value: string): string {
  const [year, month] = value.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** A null `end` means the entry is current. */
export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`;
}

/** Elapsed seconds as "m:ss" — used by the Sudoku timer. */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}