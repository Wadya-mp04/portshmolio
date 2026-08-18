import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';

/**
 * NOTE: this module is server-only — the `node:fs` check below cannot run in a
 * browser. Client components must import from here with `import type`, which is
 * erased at compile time. A value import from a client component breaks the build.
 */

/* ---------------------------------------------------------------------------
   The mini-CMS contract.

   Schemas are the source of truth; the exported TS types are derived from them
   with z.infer, so a type and its validator can never drift apart. Each content
   module runs validate() at module load, which means a malformed entry fails
   `next build` with a pointed error rather than silently rendering an empty card.
--------------------------------------------------------------------------- */

/** Dates are month-precision: "2024-03". Day precision is noise on a CV. */
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'expected a "YYYY-MM" date, e.g. "2024-03"');

const nonEmpty = (label: string) => z.string().trim().min(1, `${label} cannot be empty`);

export const experienceSchema = z.object({
  company: nonEmpty('company'),
  role: nonEmpty('role'),
  location: nonEmpty('location'),
  start: yearMonth,
  /** null means "current" — rendered as "Present". */
  end: yearMonth.nullable(),
  bullets: z.array(nonEmpty('bullet')).min(1, 'list at least one bullet'),
  tech: z.array(nonEmpty('tech')),
  /**
   * Company logo, extruded into a rotating 3D form beside the role.
   * Path is relative to public/. Omit for roles with no artwork.
   *
   * The refine is the point: a regex only proves the string *looks* like a
   * path, so a renamed file would still build and 404 at runtime. Checking the
   * filesystem fails the build instead, naming the missing file.
   */
  logo: z
    .string()
    .regex(/^\/logos\/.+\.svg$/, 'expected a path like "/logos/name.svg"')
    // Zod 4 takes the message via `error`, which may be a function of the issue.
    // A bare callback as the second argument is the Zod 3 API and no longer types.
    .refine((path) => existsSync(join(process.cwd(), 'public', path)), {
      error: (issue) => `no such file: public${issue.input}`,
    })
    .optional(),
});

export const educationSchema = z.object({
  institution: nonEmpty('institution'),
  credential: nonEmpty('credential'),
  /**
   * Optional: degree names like "Bachelor of Computer Science" already name the
   * field, and appending it again reads as a stutter.
   */
  field: nonEmpty('field').optional(),
  location: nonEmpty('location'),
  start: yearMonth,
  end: yearMonth.nullable(),
  /** Rendered as tags, same treatment as `tech` on Experience. May be empty. */
  coursework: z.array(nonEmpty('course')),
  notes: nonEmpty('notes').optional(),
});

export const projectSchema = z.object({
  name: nonEmpty('name'),
  summary: nonEmpty('summary'),
  tech: z.array(nonEmpty('tech')),
  highlights: z.array(nonEmpty('highlight')),
  repoUrl: z.url().optional(),
  liveUrl: z.url().optional(),
});

export const skillGroupSchema = z.object({
  category: nonEmpty('category'),
  skills: z.array(nonEmpty('skill')).min(1, 'list at least one skill'),
});

export const certificationSchema = z.object({
  name: nonEmpty('name'),
  issuer: nonEmpty('issuer'),
  issued: yearMonth,
  /** Omit for credentials that don't lapse. */
  expires: yearMonth.optional(),
  credentialUrl: z.url().optional(),
});

/** One `$ command` plus the output it prints, in the About terminal. */
export const terminalCommandSchema = z.object({
  command: nonEmpty('command'),
  /** Each string renders as its own paragraph of output. */
  output: z.array(nonEmpty('output line')).min(1, 'a command must print something'),
  /** 'quote' renders the output as an indented, rule-marked blockquote. */
  style: z.enum(['plain', 'quote']).optional(),
});

export const aboutSchema = z.object({
  /** Title-bar text, e.g. "manifesto.sh — 80x24". */
  window: nonEmpty('window'),
  /** Shell prompt printed before every command. */
  prompt: nonEmpty('prompt'),
  /**
   * Decorative ASCII banner, rendered aria-hidden.
   * Deliberately not nonEmpty(): that trims, which would eat the leading
   * whitespace that keeps ASCII art aligned.
   */
  banner: z.string().min(1, 'banner cannot be empty'),
  commands: z.array(terminalCommandSchema).min(1, 'list at least one command'),
});

export type TerminalCommand = z.infer<typeof terminalCommandSchema>;
export type About = z.infer<typeof aboutSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Certification = z.infer<typeof certificationSchema>;

function fail(label: string, issues: string[]): never {
  throw new Error(`Invalid content in ${label}:\n${issues.join('\n')}`);
}

/**
 * Validates a single content object at module load — the array-free counterpart
 * to validate(), for modules like content/about that export one object.
 */
export function validateOne<S extends z.ZodType>(
  schema: S,
  entry: unknown,
  label: string,
): z.infer<S> {
  const result = schema.safeParse(entry);

  if (!result.success) {
    fail(
      label,
      result.error.issues.map((issue) => {
        // Zod types `path` as PropertyKey[]; String() because implicit
        // symbol→string conversion throws.
        const path = issue.path.map(String).join('.') || '(root)';
        return `  • ${path}: ${issue.message}`;
      }),
    );
  }

  return result.data;
}

/**
 * Validates a content array at module load.
 *
 * A raw ZodError surfacing mid-build is hard to trace back to a file, so this
 * rethrows with the content module's name and the array index of the offending
 * entry — enough to open the right file and find the right object.
 */
export function validate<S extends z.ZodType>(
  schema: S,
  entries: unknown,
  label: string,
): z.infer<S>[] {
  const result = z.array(schema).safeParse(entries);

  if (!result.success) {
    fail(
      label,
      result.error.issues.map((issue) => {
        // Zod types `path` as PropertyKey[], so entries may be symbols.
        // Implicit symbol→string conversion throws, hence the explicit String().
        const [index, ...rest] = issue.path;
        const field = rest.length ? rest.map(String).join('.') : '(entry)';
        return `  • entry [${String(index)}] → ${field}: ${issue.message}`;
      }),
    );
  }

  return result.data;
}