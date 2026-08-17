/**
 * The swap seam for the Sudoku backend.
 *
 * Every function here is a stub returning mock data. When the API Gateway /
 * Lambda / DynamoDB stack lands, replace each body with the marked fetch call —
 * the signatures are already the shapes the UI consumes, so nothing above this
 * file should need to change.
 */

import { SAMPLE_PUZZLE, type Grid } from './puzzle';

// TODO: point at the deployed API Gateway stage.
// const API_URL = process.env.NEXT_PUBLIC_SUDOKU_API_URL;

/**
 * Flip to false to exercise the "no owner time recorded yet" branch — the
 * "beat my time" banner should disappear entirely rather than render empty.
 */
const SIMULATE_OWNER_TIME = true;

/** Mock latency, so loading states are actually exercised in development. */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** STUB: replace with fetch(`${API_URL}/puzzle/today`) */
export async function getTodaysPuzzle(): Promise<Grid> {
  await delay(400);
  return SAMPLE_PUZZLE;
}

/** STUB: replace with fetch(`${API_URL}/scores`, { method: 'POST', ... }) */
export async function submitScore(clientId: string, seconds: number): Promise<void> {
  await delay(300);
  // Placeholder until the real endpoint exists — proves the call fired with the
  // right payload when testing in the browser console.
  console.info('[sudoku stub] submitScore', { clientId, seconds });
}

/**
 * The site owner's own best time, or null if they have not set one.
 * STUB: replace with fetch(`${API_URL}/scores/owner`)
 */
export async function getOwnerTime(): Promise<number | null> {
  await delay(200);
  return SIMULATE_OWNER_TIME ? 268 : null;
}