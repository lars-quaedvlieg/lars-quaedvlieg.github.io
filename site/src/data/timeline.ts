export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  orgUrl?: string;
  description?: string;
  type: 'work' | 'education' | 'award';
}

// Newest first. Sourced from the old site's CV data and TimelineJS sheet.
export const TIMELINE: TimelineEntry[] = [
  {
    period: "Jan '26 – Present",
    title: 'Member of Technical Staff (AI Researcher)',
    org: 'Jump Trading',
    orgUrl: 'https://www.jumptrading.com/',
    description: 'AI research for trading, based in London.',
    type: 'work',
  },
  {
    period: "Mar '25 – Sep '25",
    title: 'Research Scientist Intern',
    org: 'Meta FAIR',
    orgUrl: 'https://ai.meta.com/research/',
    description:
      'Learning a distribution of successor features for zero-shot reinforcement learning, on the RL team in the Core Learning & Reasoning pillar.',
    type: 'work',
  },
  {
    period: "Oct '23 – Feb '25",
    title: 'Research Assistant',
    org: 'CLAIRE lab @ EPFL',
    orgUrl: 'https://www.epfl.ch/labs/claire/',
    description:
      'Research scholar in the Caglar Gulcehre Lab for AI Research: evolutionary search with LLMs, AI for math, and in-context reinforcement learning with state space models.',
    type: 'work',
  },
  {
    period: "Jul '23 – Jan '24",
    title: 'Research Intern',
    org: 'InstaDeep',
    orgUrl: 'https://www.instadeep.com/',
    description:
      'Self-supervised pre-training of transformer agents on expert trajectories (PASTA, RLJ 2024), evaluated across behavioral cloning, offline RL, sensor-failure robustness, and dynamics adaptation.',
    type: 'work',
  },
  {
    period: "Nov '22 – Oct '23",
    title: 'Research Assistant',
    org: 'LIONS lab @ EPFL',
    orgUrl: 'https://www.epfl.ch/labs/lions/',
    description:
      'Self-supervised learning for combinatorial optimization (NeurIPS 2023); RL + GNNs for scheduling.',
    type: 'work',
  },
  {
    period: "Sep '22 – Aug '25",
    title: 'MSc in Data Science',
    org: 'EPFL',
    orgUrl: 'https://www.epfl.ch/education/master/programs/data-science/',
    description: "Master's Excellence Fellowship (awarded to ~3% of students). 5.7/6.0 GPA.",
    type: 'education',
  },
  {
    period: "Feb '21 – Aug '22",
    title: 'AI Research Intern',
    org: 'Aucos AG',
    orgUrl: 'https://www.aucos.de/en/home-2/',
    description:
      'Multi-camera multi-object tracking, plant-layout generation, and production-line throughput optimization.',
    type: 'work',
  },
  {
    period: "Sep '19 – Jul '22",
    title: 'BSc in Data Science & AI',
    org: 'Maastricht University',
    orgUrl: 'https://curriculum.maastrichtuniversity.nl/education/bachelor/data-science-and-artificial-intelligence',
    description:
      'Graduated summa cum laude (9.5/10, ranked 1st of 104). <a href="https://www.maastrichtuniversity.nl/lars-quaedvlieg" target="_blank" rel="noopener">University-wide Best Bachelor’s Thesis Award</a> for “Multi-Agent Reinforcement Learning with Graph Neural Networks for Online Multi-Hoist Scheduling”.',
    type: 'education',
  },
];
