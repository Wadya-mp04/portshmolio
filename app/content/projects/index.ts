import { projectSchema, validate, type Project } from '@/content/types';

/**
 * Summaries are the CV's two bullets per project compressed into prose — same
 * facts, same figures, no new claims. Every number here (agent counts, document
 * counts, latencies, k values) comes off the CV; none were rounded or invented.
 *
 * demoUrl and devpostUrl are omitted throughout because no URLs were supplied.
 * The CV shows a DevPost link on the algal bloom project — add it below and the
 * link appears in the row with no component change.
 */
const entries: Project[] = [
  {
    name: 'Harmful Algal Bloom RL Simulation (AlgeaMind)',
    summary:
      'A reinforcement-learning simulation of algal bloom remediation, pitting three agents — heuristic, RL and Claude API — against a grid modelling 5+ per-cell environmental variables, with intervention costs benchmarked against real-world remediation records. A React/TypeScript frontend visualises agent behaviour and environmental state in real time over a Python FastAPI backend.',
    year: '2026',
    tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'PyTorch'],
    repoUrl: 'https://github.com/Wadya-mp04/TrackAlgae',
    devpostUrl:'https://devpost.com/software/trackalgae'
    // TODO: devpostUrl — the CV links one for this project.
  },
  {
    name: 'Reliable Data Transfer Protocol over UDP',
    summary:
      'A reliable data-transfer protocol written from scratch in Java over raw UDP, covering packet serialization, alternating-bit sequencing and timeout-driven retransmission. Stress-tested under four adversarial network conditions — 100ms and 1100ms delays, 50% client and server packet loss — using Linux network namespaces and tc netem fault injection, with every test scenario transferring successfully.',
    year: '2026',
    tech: ['Java', 'UDP Sockets', 'Linux'],
    repoUrl: 'https://github.com/Wadya-mp04/JavaApplicationLayerProtocol',
  },
  {
    name: 'Concordia Thesis Scraping and Clustering',
    summary:
      "A five-stage information-retrieval pipeline — crawler, PDF extractor, tokenizer, TF-IDF, K-Means — run over Concordia's Spectrum thesis repository, with retry logic and robots.txt compliance for production-grade crawling. A 5,000-feature TF-IDF vocabulary clustered at k = 2, 10 and 20 surfaces groupings from broad disciplines down to niche subfields like robotics and patent law.",
    year: '2025',
    tech: ['Python', 'BeautifulSoup', 'Pandas', 'NumPy', 'Scikit-Learn'],
    repoUrl: 'https://github.com/Wadya-mp04/Concordia-Thesis-Scraping-and-Clustering',
  },
  {
    name: 'Reuters SPIMI Indexer and Search Engine',
    summary:
      "Three search-indexing architectures — naïve, SPIMI and compressed — built and benchmarked over 21,578 Reuters documents, reaching sub-millisecond query latency with configurable tokenization. The comparison demonstrates SPIMI's scalability advantage over naïve in-memory indexing at scale, with lossy compression shrinking the index while preserving query performance.",
    year: '2025',
    tech: ['Python', 'IR Algorithms'],
    repoUrl: 'https://github.com/Wadya-mp04/reuters-indexer-project',
  },
  {
    name: 'BookNotes Web Application',
    summary:
      'A full-stack reading tracker with authentication, CRUD and Open Library API integration, using an LRU cache to cut redundant external API calls. Hardened with ISBN-10/13 checksum validation and parameterized SQL to eliminate injection risk, plus debounced lookups and dynamic SVG cover previews.',
    year: '2025',
    tech: ['Node.js', 'Express', 'EJS', 'PostgreSQL', 'JavaScript', 'CSS'],
    repoUrl: 'https://github.com/Wadya-mp04/Waddah-s_Book_Notes',
  },

  // ← add a new project here (newest first)
];

export default validate(projectSchema, entries, 'content/projects');