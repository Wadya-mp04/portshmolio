import { aboutSchema, validateOne, type About } from '@/content/types';

/**
 * String.raw so backslashes survive verbatim. In a normal template literal JS
 * drops the backslash from unrecognised escapes (`\ ` becomes a plain space),
 * which would quietly shred the art.
 *
 * Kept as WHOAMI rather than a name: it labels the first command below it.
 */
const BANNER = String.raw`
__        __ _   _   ___      _     __  __  ___
\ \      / /| | | | / _ \    / \   |  \/  ||_ _|
 \ \ /\ / / | |_| || | | |  / _ \  | |\/| | | |
  \ V  V /  |  _  || |_| | / ___ \ | |  | | | |
   \_/\_/   |_| |_| \___/ /_/   \_\|_|  |_||___|
`;

const about: About = {
  window: 'manifesto.sh — 80x24',
  prompt: 'waddah@montreal:~$',
  banner: BANNER,
  commands: [
    {
      command: 'whoami',
      output: [
        'Software engineer working across backend, full-stack and cloud infrastructure. Finishing a Computer Science degree at Concordia in Montreal, after a first year at the American University of Sharjah.',
      ],
    },
    // {
    //   command: 'cat focus.txt',
    //   output: [
    //     'Protocols and retrieval, mostly. A reliable transfer protocol written from scratch over raw UDP; a five-stage IR pipeline over Concordia’s thesis repository; three indexing architectures benchmarked over 21,578 Reuters documents.',
    //     'The through line is building the thing rather than importing it.',
    //   ],
    // },
    // {
    //   // TODO: this line is the one piece of writing here that is not derived
    //   // from the CV — it is a claim about what you believe, put in your voice.
    //   // It is grounded in the work (four adversarial network scenarios, three
    //   // benchmarked architectures, sub-millisecond latency measured rather than
    //   // assumed), but rewrite it so it is actually yours.
    //   command: 'cat philosophy.txt',
    //   style: 'quote',
    //   output: [
    //     'Information wants to be free.',
    //   ],
    // },

    // ← add another command here
  ],
};

export default validateOne(aboutSchema, about, 'content/about');