import type { SimpleIcon } from 'simple-icons';
import {
  siAutocad,
  siC,
  siCplusplus,
  siCss,
  siDocker,
  siEslint,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLinux,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPostman,
  siPython,
  siPytorch,
  siReact,
  siSanity,
  siScikitlearn,
  siSketchup,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVercel,
  siVite,
  siWireshark,
  siZod,
} from 'simple-icons';

/**
 * Skill name → brand mark. Keyed by the exact string in content/skills, so a
 * renamed skill silently loses its icon rather than breaking the build — the
 * tag still renders its text, which is the part that carries the meaning.
 *
 * Absent on purpose, because Simple Icons carries no mark for them: Java, AWS,
 * Amazon S3, CloudFront and Route 53 (trademark removals), SQL (a standard, not
 * a brand) and next-intl (no mark at all). Those seven render text-only.
 */
const ICONS: Record<string, SimpleIcon> = {
  // Languages
  Python: siPython,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  C: siC,
  'C++': siCplusplus,
  HTML: siHtml5,
  CSS: siCss,

  // Frameworks & Libraries
  React: siReact,
  'Next.js': siNextdotjs,
  'Node.js': siNodedotjs,
  Express: siExpress,
  FastAPI: siFastapi,
  Pandas: siPandas,
  NumPy: siNumpy,
  PyTorch: siPytorch,
  'Scikit-Learn': siScikitlearn,
  'Tailwind CSS': siTailwindcss,
  'Three.js': siThreedotjs,
  Zod: siZod,

  // Platforms & Infrastructure
  Vercel: siVercel,
  Docker: siDocker,
  Linux: siLinux,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  'Sanity CMS': siSanity,

  // Tools
  Git: siGit,
  GitHub: siGithub,
  Vite: siVite,
  Postman: siPostman,
  Wireshark: siWireshark,
  ESLint: siEslint,
  SketchUp: siSketchup,
  AutoCAD: siAutocad,
};

/* --- legibility ------------------------------------------------------------
   A brand hex is authored against white, so a single baked-in value cannot
   serve both themes: Next.js is pure black (1.4:1 on the navy background) and
   React is pale cyan (1.1:1 on the sand one). Measured across all four
   backgrounds this site ships, 10 of the 18 marks above fail a 2:1 floor
   somewhere.

   So each mark is nudged toward black or white — the least it takes to clear
   3:1 — and both results are emitted as custom properties for CSS to choose
   between. Nudging preserves hue, so Git stays red and React stays cyan;
   only the achromatic marks (Next.js, Vercel, Three.js, Sanity, GitHub) go
   grey in dark mode, which is how those logos are normally shown anyway.

   All of this runs at module load in a Server Component, i.e. once at build.
--------------------------------------------------------------------------- */

type Rgb = [number, number, number];

/** The `--bg` of every palette in globals.css, grouped by which way to nudge. */
const LIGHT_BACKGROUNDS: Rgb[] = [
  [251, 247, 240], // #fbf7f0 sand
  [240, 213, 164], // #f0d5a4 olive light
];
const DARK_BACKGROUNDS: Rgb[] = [
  [24, 45, 61], // #182d3d navy
  [34, 42, 21], // #222a15 olive dark
];

/** Comfortably above the 3:1 WCAG asks of non-text UI, and short of washing out. */
const MIN_CONTRAST = 3;

function parseHex(hex: string): Rgb {
  return [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16)) as Rgb;
}

function toHex(rgb: Rgb): string {
  return `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}

function luminance([r, g, b]: Rgb): number {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Walks `colour` toward `target` in 5% steps, stopping at the first blend that
 * clears MIN_CONTRAST against every background. Stepping rather than solving
 * because contrast is not linear in the blend factor, and 20 iterations of this
 * at build time costs nothing.
 */
function adapt(colour: Rgb, backgrounds: Rgb[], target: Rgb): string {
  for (let t = 0; t <= 1; t += 0.05) {
    const blend = colour.map((v, i) => v + (target[i] - v) * t) as Rgb;
    if (backgrounds.every((bg) => contrast(blend, bg) >= MIN_CONTRAST)) return toHex(blend);
  }
  return toHex(target);
}

const BLACK: Rgb = [0, 0, 0];
const WHITE: Rgb = [255, 255, 255];

/** Precomputed once per icon, rather than per tag rendered. */
const PALETTE = new Map(
  Object.entries(ICONS).map(([name, icon]) => {
    const rgb = parseHex(icon.hex);
    return [
      name,
      {
        path: icon.path,
        light: adapt(rgb, LIGHT_BACKGROUNDS, BLACK),
        dark: adapt(rgb, DARK_BACKGROUNDS, WHITE),
      },
    ];
  }),
);

export default function SkillIcon({ name }: { name: string }) {
  const icon = PALETTE.get(name);
  if (!icon) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      // Decorative: the skill name sits right beside it in readable text.
      aria-hidden="true"
      className="size-4 shrink-0 text-(--brand-light) dark:text-(--brand-dark)"
      style={{ '--brand-light': icon.light, '--brand-dark': icon.dark } as React.CSSProperties}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}