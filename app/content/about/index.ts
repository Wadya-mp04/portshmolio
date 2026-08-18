import { aboutSchema, validateOne, type About } from '@/content/types';

/**
 * String.raw so backslashes survive verbatim. In a normal template literal JS
 * drops the backslash from unrecognised escapes (`\ ` becomes a plain space),
 * which would quietly shred the art.
 *
 * TODO: replace with your own banner — any figlet-style generator will do.
 */
const BANNER = String.raw`
__        __ _   _   ___      _     __  __  ___
\ \      / /| | | | / _ \    / \   |  \/  ||_ _|
 \ \ /\ / / | |_| || | | |  / _ \  | |\/| | | |
  \ V  V /  |  _  || |_| | / ___ \ | |  | | | |
   \_/\_/   |_| |_| \___/ /_/   \_\|_|  |_||___|
`;

const about: About = {
  // TODO: replace with real content
  window: 'manifesto.sh — 80x24',
  prompt: 'you@workstation:~$',
  banner: BANNER,
  commands: [
    {
      command: 'whoami',
      output: [
        'One or two sentences on what you do and the kind of problems you work on.',
        'A second paragraph if you want more room — each string here renders as its own paragraph.',
      ],
    },
    {
      command: 'cat philosophy.txt',
      style: 'quote',
      output: ['A line you actually believe about building software. Replace this.'],
    },

    // ← add another command here
  ],
};

export default validateOne(aboutSchema, about, 'content/about');