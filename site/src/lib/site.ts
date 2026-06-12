export const SITE = {
  name: 'Lars Quaedvlieg',
  firstName: 'Lars',
  title: 'Lars Quaedvlieg',
  description:
    'Personal website of Lars C.P.M. Quaedvlieg, AI researcher and builder working on iterative self-improvement and reinforcement learning.',
  role: 'Member of Technical Staff @ Jump Trading',
  location: 'London, United Kingdom',
  email: 'larsquaedvlieg@outlook.com',
  blogName: 'AI Horizon',
  blogDescription:
    'Insights, breakthroughs, and practical tips from my involvement in machine learning research.',
} as const;

export const SOCIALS = [
  { label: 'Email', href: 'mailto:larsquaedvlieg@outlook.com', icon: 'email' },
  { label: 'GitHub', href: 'https://github.com/lars-quaedvlieg', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lars-quaedvlieg', icon: 'linkedin' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=f_-rgVcAAAAJ', icon: 'scholar' },
  { label: 'ORCID', href: 'https://orcid.org/0000-0002-0109-5705', icon: 'orcid' },
  { label: 'X (Twitter)', href: 'https://x.com/lars_quaedvlieg', icon: 'x' },
] as const;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Publications', href: '/publications' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'CV', href: '/cv' },
] as const;

/** Prefix a root-absolute path with the configured base path. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!path.startsWith('/')) return path;
  if (base && path.startsWith(base + '/')) return path;
  return base + path;
}
