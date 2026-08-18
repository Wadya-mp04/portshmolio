'use client';

import { useEffect, useRef } from 'react';
import {
  Box2,
  Box3,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Shape,
} from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

/**
 * An SVG extruded into a rotating 3D form.
 *
 * With ASCII on, AsciiEffect emits a DOM subtree of text rather than pixels,
 * which is why this needs no theme handling: `color` is inherited from CSS, so
 * it follows --accent and cross-fades with the existing theme transition.
 *
 * Loaded via next/dynamic from ExperienceScroller and only rendered while
 * pinned, so three.js is never fetched below the lg breakpoint.
 */

/** TEMPORARY: false renders the raw 3D mesh so the geometry can be inspected. */
const ASCII = true;

/**
 * Lightest to densest — and the leading space is load-bearing.
 *
 * AsciiEffect forces `brightness = 1` for any pixel with alpha 0, then picks
 * `charList[round((1 - brightness) * maxIdx)]`, i.e. index 0. So transparent
 * background lands on the FIRST character, and a leading space is what makes it
 * disappear. Reordering this ramp would fill the background with solid glyphs.
 */
const CHARSET = ' .:-=+*#%@';

/**
 * Extrusion depth as a fraction of the logo's largest 2D dimension.
 *
 * This has to be relative. An absolute depth is meaningless because SVG user
 * units are arbitrary — this logo's viewBox is 1075 wide, so a depth of 24 came
 * out at 1/45th of the width and rendered as a sheet of paper.
 */
const DEPTH_RATIO = 0.16;

/** Fixed tilt, so the extrusion is visible rather than edge-on at every angle. */
const TILT_X = 0.42;

/**
 * Traced SVGs carry their background as filled near-white paths. Extruding
 * those yields a solid slab with the logo embossed into it rather than the logo
 * itself, so anything lighter than this is treated as background and skipped.
 */
const MAX_INK_LUMINANCE = 0.7;

/** Unparseable fills return false — keep the path rather than silently drop it. */
function isBackgroundFill(fill: string | undefined): boolean {
  if (!fill) return false;
  const hex = fill.trim().replace('#', '');
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((char) => char + char)
          .join('')
      : hex;
  if (!/^[0-9a-f]{6}$/i.test(full)) return false;
  const packed = Number.parseInt(full, 16);
  const r = (packed >> 16) & 255;
  const g = (packed >> 8) & 255;
  const b = packed & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > MAX_INK_LUMINANCE;
}

type Props = { src: string };

export default function LogoAscii({ src }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.6;

    const renderer = new WebGLRenderer({ antialias: !ASCII, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // invert MUST stay false. AsciiEffect maps transparent pixels to index 0 of
    // the charset (a space, so they vanish); `invert: true` mirrors the index to
    // the opposite end and paints the empty background as solid '@'.
    // resolution scales the character GRID, not the element: AsciiEffect uses
    // `floor(px * resolution)` per axis and rebuilds that many characters as an
    // HTML string every frame, so cost grows with the SQUARE of this number.
    // Measured against the 84rem element:
    //   0.095 ->  127x127 grid,  8k chars/frame, 21.1px glyphs
    //   0.13  ->  174x174 grid, 15k chars/frame, 15.4px glyphs  <- here
    //   0.19  ->  255x255 grid, 32k chars/frame, 10.5px glyphs (drops frames)
    const effect = ASCII
      ? new AsciiEffect(renderer, CHARSET, { invert: false, resolution: 0.13 })
      : null;

    if (effect) {
      // Inherit the site's colour rather than AsciiEffect's white-on-black.
      effect.domElement.style.color = 'inherit';
      effect.domElement.style.backgroundColor = 'transparent';
    }

    // Both types expose setSize/render/domElement, so downstream code is shared.
    const output = effect ?? renderer;
    host.appendChild(output.domElement);

    /** Normals give a strong shading gradient with no lights to configure. */
    const material = new MeshNormalMaterial();
    const geometries: ExtrudeGeometry[] = [];
    const pivot = new Group();
    pivot.rotation.x = TILT_X;
    scene.add(pivot);

    let frame = 0;
    let disposed = false;
    let visible = true;
    let onScreen = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const size = () => {
      const rect = host.getBoundingClientRect();
      const side = Math.max(1, Math.min(rect.width, rect.height));
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      output.setSize(side, side);
    };

    const render = () => output.render(scene, camera);

    const loop = () => {
      if (disposed || !visible || !onScreen || reduced) return;
      pivot.rotation.y += 0.012;
      render();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };

    const stop = () => cancelAnimationFrame(frame);

    new SVGLoader().load(
      src,
      (data) => {
        if (disposed) return;

        // SVGLoader types userData.style as {}, so the fill needs narrowing.
        const ink = data.paths.filter((path) => {
          const style = path.userData?.style as { fill?: string } | undefined;
          return !isBackgroundFill(style?.fill);
        });
        // If every path looked like background (a white logo, say), the filter
        // was wrong — fall back to extruding everything rather than nothing.
        const usable = ink.length > 0 ? ink : data.paths;

        const shapes: Shape[] = [];
        for (const path of usable) shapes.push(...SVGLoader.createShapes(path));

        // Measure the flat outline first so depth can be derived from the
        // logo's own scale, before any geometry is built.
        const bounds = new Box2();
        for (const shape of shapes) {
          for (const point of shape.getPoints(2)) bounds.expandByPoint(point);
        }
        const span = bounds.getSize(new Vector2());
        const depth = Math.max(span.x, span.y) * DEPTH_RATIO;

        const shapesGroup = new Group();
        for (const shape of shapes) {
          // curveSegments: 2 — the source is a raster trace, so detail lives in
          // point density, not curve smoothness. Higher values multiply
          // triangles for nothing the output could resolve.
          const geometry = new ExtrudeGeometry(shape, {
            depth,
            bevelEnabled: false,
            curveSegments: 2,
          });
          geometries.push(geometry);
          shapesGroup.add(new Mesh(geometry, material));
        }

        // SVG's Y axis points down, three.js's points up.
        shapesGroup.scale.y = -1;

        // Auto-fit: centre on the origin and normalise to a fixed size, so any
        // SVG is framed correctly without per-logo magic numbers in content.
        const box = new Box3().setFromObject(shapesGroup);
        const extent = box.getSize(new Vector3());
        const centre = box.getCenter(new Vector3());
        shapesGroup.position.sub(centre);
        pivot.add(shapesGroup);
        pivot.scale.setScalar(2 / Math.max(extent.x, extent.y, extent.z));

        size();
        // Reduced motion still gets the artwork — one frame, then nothing moves.
        if (reduced) render();
        else start();
      },
      undefined,
      () => {
        // A missing file is caught at build time by the schema's existsSync
        // check, so reaching here means a genuine network failure. Leave the
        // slot empty rather than showing a broken decorative element.
      },
    );

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      if (visible && onScreen && !reduced) start();
      else stop();
    };

    // Scrolled out of view is wasted GPU work — the background canvas cannot do
    // this because it is always on screen, but a section widget can.
    const observer = new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      if (visible && onScreen && !reduced) start();
      else stop();
    });
    observer.observe(host);

    const resizeObserver = new ResizeObserver(() => {
      size();
      if (reduced) render();
    });
    resizeObserver.observe(host);

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      disposed = true;
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      resizeObserver.disconnect();
      geometries.forEach((geometry) => geometry.dispose());
      material.dispose();
      renderer.dispose();
      output.domElement.remove();
    };
  }, [src]);

  // aria-hidden and unselectable: with ASCII on this is a large subtree of text
  // that would otherwise be read aloud and be highlightable.
  return <div ref={hostRef} aria-hidden="true" className="xp-logo" />;
}