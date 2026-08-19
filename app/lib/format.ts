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

/**
 * Certifications are commonly published with a year and no month, so their
 * schema accepts "2025" as well as "2025-03". Renders whatever precision it was
 * given rather than inventing a month — formatMonth alone would read the
 * missing half as NaN and print "undefined 2025".
 */
export function formatIssued(value: string): string {
  return value.includes('-') ? formatMonth(value) : value;
}

/** Elapsed seconds as "m:ss" — used by the Sudoku timer. */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}