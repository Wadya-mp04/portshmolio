'use client';

import { useEffect, useRef } from 'react';

interface CanvasNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface CanvasState {
  nodes: CanvasNode[];
  animationId: number;
  lastTime: number;
  dpr: number;
  isVisible: boolean;
  reducedMotion: boolean;
  dotColor: string;
  lineColor: string;
  linkDistance: number;
  width: number;
  height: number;
}

/** Lattice pitch at typical viewport sizes; grown adaptively below. */
const BASE_SPACING = 100;
/**
 * Link-finding is O(n²). Left unbounded, a 4K viewport would produce ~830 nodes
 * (~340k pair checks per frame) against ~200 on a laptop. Capping the count and
 * widening the pitch instead keeps the cost flat across displays.
 */
const MAX_NODES = 260;
/** Multiple of the pitch: links orthogonal neighbours, skips diagonals (×1.41). */
const LINK_RATIO = 1.35;

// Background artwork, so these stay well below the 4.5:1 that *content* needs.
const DOT_ALPHA = 0.08;
const LINE_ALPHA = 0.04;
const DOT_RADIUS = 1.2;
const DRIFT = 0.22;

const FALLBACK = 'rgba(128,128,128,';

/* Module scope: these only touch their arguments, so the effects below have no
   function dependencies to declare and no stale-closure risk. */

/**
 * Normalises a CSS colour into `rgba(r,g,b,alpha)`, discarding any alpha the
 * source carried — the caller decides opacity.
 *
 * The number-matching branch is deliberate: tokens are authored as
 * `rgb(24 45 61 / 0.75)`, which a comma split cannot read. Getting it wrong is
 * invisible at runtime — canvas silently ignores a bad strokeStyle and keeps
 * the previous value, which is black.
 */
function parseColor(raw: string, alpha: number): string {
  const value = raw.trim();
  if (!value) return `${FALLBACK}${alpha})`;

  if (value.startsWith('#')) {
    const hex = value.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split('')
            .map((char) => char + char)
            .join('')
        : hex.slice(0, 6);
    const packed = Number.parseInt(full, 16);
    if (Number.isNaN(packed)) return `${FALLBACK}${alpha})`;
    return `rgba(${(packed >> 16) & 255},${(packed >> 8) & 255},${packed & 255},${alpha})`;
  }

  const numbers = value.match(/[\d.]+/g);
  if (numbers && numbers.length >= 3) {
    const [r, g, b] = numbers;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  return `${FALLBACK}${alpha})`;
}

function readColors(container: HTMLElement, state: CanvasState) {
  const style = getComputedStyle(container);
  state.dotColor = parseColor(style.getPropertyValue('--accent'), DOT_ALPHA);
  state.lineColor = parseColor(style.getPropertyValue('--muted'), LINE_ALPHA);
}

function draw(canvas: HTMLCanvasElement, state: CanvasState) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { width, height, nodes, linkDistance } = state;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = state.dotColor;
  ctx.strokeStyle = state.lineColor;
  ctx.lineWidth = 1;

  for (let i = 0; i < nodes.length; i += 1) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j += 1) {
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      // Cheap rejection before the square root.
      if (Math.abs(dx) > linkDistance || Math.abs(dy) > linkDistance) continue;
      if (Math.sqrt(dx * dx + dy * dy) < linkDistance) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }
}

function update(state: CanvasState, deltaTime: number) {
  const { width, height } = state;
  for (const node of state.nodes) {
    node.x += node.vx * deltaTime * 0.06;
    node.y += node.vy * deltaTime * 0.06;

    if (node.x < 0) node.x += width;
    if (node.x > width) node.x -= width;
    if (node.y < 0) node.y += height;
    if (node.y > height) node.y -= height;
  }
}

function rebuild(state: CanvasState, width: number, height: number) {
  let spacing = BASE_SPACING;
  while ((width / spacing) * (height / spacing) > MAX_NODES) spacing *= 1.15;

  state.linkDistance = spacing * LINK_RATIO;
  state.nodes = [];
  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      state.nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * DRIFT,
        vy: (Math.random() - 0.5) * DRIFT,
      });
    }
  }
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef<CanvasState>({
    nodes: [],
    animationId: 0,
    lastTime: 0,
    dpr: 1,
    isVisible: true,
    reducedMotion: false,
    dotColor: `${FALLBACK}${DOT_ALPHA})`,
    lineColor: `${FALLBACK}${LINE_ALPHA})`,
    linkDistance: BASE_SPACING * LINK_RATIO,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const state = stateRef.current;

    const loop = (timestamp: number) => {
      if (!state.isVisible || state.reducedMotion) return;
      if (!state.lastTime) state.lastTime = timestamp;
      // Clamped so a backgrounded tab doesn't teleport every node on return.
      const delta = Math.min(timestamp - state.lastTime, 100);
      state.lastTime = timestamp;
      update(state, delta);
      draw(canvas, state);
      state.animationId = requestAnimationFrame(loop);
    };

    // Always cancel before starting: visibilitychange and the motion query can
    // each fire while a loop is already running, and two concurrent loops would
    // double the speed and leak one past unmount.
    const start = () => {
      cancelAnimationFrame(state.animationId);
      state.lastTime = 0;
      state.animationId = requestAnimationFrame(loop);
    };

    const stop = () => cancelAnimationFrame(state.animationId);

    const refreshColors = () => {
      readColors(container, state);
      // While animating the next frame repaints anyway; a static frame will not.
      if (state.reducedMotion) draw(canvas, state);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.reducedMotion = motionQuery.matches;

    const onMotionChange = (event: MediaQueryListEvent) => {
      state.reducedMotion = event.matches;
      if (event.matches) {
        stop();
        draw(canvas, state); // one static frame rather than an empty canvas
      } else {
        start();
      }
    };

    const onVisibility = () => {
      state.isVisible = document.visibilityState === 'visible';
      if (state.isVisible && !state.reducedMotion) start();
      else stop();
    };

    /**
     * Watching the DOM rather than next-themes' `resolvedTheme`.
     *
     * next-themes writes the `.dark` class from inside its own useEffect, and
     * React runs child effects before parent ones — so a `[resolvedTheme]`
     * effect here would re-read the CSS variables while <html> still carried
     * the OLD theme, leaving the artwork permanently one theme behind (and thus
     * invisible, since it would match the incoming background). Observing the
     * attribute fires after the class actually changes, whatever the order.
     */
    const themeObserver = new MutationObserver(refreshColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;

        state.width = width;
        state.height = height;
        state.dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(width * state.dpr);
        canvas.height = Math.round(height * state.dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

        rebuild(state, width, height);
        refreshColors();
      }
    });

    resizeObserver.observe(container);
    motionQuery.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibility);

    refreshColors();
    if (!state.reducedMotion) start();

    return () => {
      stop();
      motionQuery.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibility);
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  // -z-10 puts this above the root background but beneath every block-level
  // background and all content. See the painting-order note in globals.css.
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}