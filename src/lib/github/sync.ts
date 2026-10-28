import { Project } from '@/types/database.types';
import { PORTFOLIO_PROJECTS, EnrichedProject } from '@/data/projects';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
  created_at: string;
  updated_at: string;
}

const EXCLUDED_REPOS = new Set([
  'my-portfolio',
  'belalansari07.github.io',
]);

/**
 * Format raw repository names into clean, readable titles.
 * E.g. "Low-Latency-Edge-AI-Alert-System." -> "Low-Latency Edge AI Alert System"
 */
export function formatRepoTitle(repoName: string): string {
  return repoName
    .replace(/^[-_.]+|[-_.]+$/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Infer technology tags from repository language and topics.
 */
export function inferTechStack(repo: GitHubRepo): string[] {
  const stack = new Set<string>();

  if (repo.language) {
    stack.add(repo.language);
  }

  if (Array.isArray(repo.topics)) {
    repo.topics.forEach((t) => {
      const formatted = t
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      stack.add(formatted);
    });
  }

  const text = `${repo.name} ${repo.description || ''}`.toLowerCase();
  if (text.includes('ai') || text.includes('ml')) stack.add('AI/ML');
  if (text.includes('vision') || text.includes('yolo')) stack.add('Computer Vision');
  if (text.includes('rag') || text.includes('llm')) stack.add('LLM & RAG');
  if (text.includes('edge') || text.includes('iot')) stack.add('Edge AI');
  if (text.includes('react') || text.includes('next')) stack.add('Next.js');
  if (text.includes('python')) stack.add('Python');
  if (text.includes('fastapi')) stack.add('FastAPI');

  if (stack.size === 0) {
    stack.add('Open Source');
    stack.add('GitHub');
  }

  return Array.from(stack).slice(0, 6);
}

/**
 * Infer what the project is for if not provided in curated metadata.
 */
export function inferWhatIsItFor(repo: GitHubRepo): string {
  if (repo.description && repo.description.trim().length > 15) {
    return repo.description.trim();
  }

  const cleanTitle = formatRepoTitle(repo.name);
  const langText = repo.language ? `built with ${repo.language}` : 'an open-source system';
  return `Targeted to provide ${langText} for ${cleanTitle.toLowerCase()} engineering and research. Explore the repository for full source code, blueprints, and setup documentation.`;
}

/**
 * Fetch all public repositories from GitHub with ISR caching (revalidate every 5 minutes).
 */
export async function fetchGitHubRepos(username = 'BELALANSARI07'): Promise<GitHubRepo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'BelalPortfolioSync-NextJS',
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, {
      headers,
      next: {
        revalidate: 300, // Revalidate every 5 minutes
        tags: ['github-projects'],
      },
    });

    if (!res.ok) {
      console.warn(`[GitHub Sync] API returned HTTP ${res.status}`);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();
    if (!Array.isArray(repos)) return [];

    return repos.filter(
      (r) => !r.fork && !EXCLUDED_REPOS.has(r.name.toLowerCase().replace(/\.+$/, ''))
    );
  } catch (error) {
    console.warn('[GitHub Sync] Error fetching GitHub repos (using fallback):', error);
    return [];
  }
}

/**
 * Merge GitHub repositories with curated projects.
 * Existing curated projects retain their rich benchmarks and architectural notes.
 * Curated projects that no longer exist on GitHub are automatically removed.
 * Any new repository created on GitHub is automatically appended as a live project card.
 */
export function mergeGitHubWithCurated(
  ghRepos: GitHubRepo[],
  curated: EnrichedProject[] = PORTFOLIO_PROJECTS
): EnrichedProject[] {
  if (!ghRepos || ghRepos.length === 0) {
    return curated;
  }

  const matchedGhRepoIds = new Set<number>();
  const mergedCurated: EnrichedProject[] = [];

  // 1. Only keep curated projects that exist in current GitHub public repositories
  curated.forEach((curatedProj) => {
    const cleanCuratedSlug = curatedProj.slug.replace(/[^a-z0-9]/gi, '').toLowerCase();

    const matchedRepo = ghRepos.find((r) => {
      if (curatedProj.repo_url && curatedProj.repo_url.toLowerCase().endsWith(r.name.toLowerCase())) {
        return true;
      }
      const cleanRepoName = r.name.replace(/[^a-z0-9]/gi, '').toLowerCase();
      return (
        cleanRepoName === cleanCuratedSlug ||
        cleanCuratedSlug.includes(cleanRepoName) ||
        cleanRepoName.includes(cleanCuratedSlug)
      );
    });

    if (matchedRepo) {
      matchedGhRepoIds.add(matchedRepo.id);
      mergedCurated.push({
        ...curatedProj,
        repo_url: matchedRepo.html_url,
        live_url: matchedRepo.homepage || curatedProj.live_url,
        updated_at: matchedRepo.pushed_at || curatedProj.updated_at,
      });
    }
  });

  // 2. Add all new GitHub repositories that aren't yet in curated list
  const newProjects: EnrichedProject[] = [];

  ghRepos.forEach((r, idx) => {
    if (matchedGhRepoIds.has(r.id)) return;

    const cleanTitle = formatRepoTitle(r.name);
    const slug = r.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newProj: EnrichedProject = {
      id: `gh-${r.id}`,
      slug: slug || `repo-${r.id}`,
      title: cleanTitle,
      tagline: r.description || `Open-source engineering repository by Belal Ansari.`,
      what_is_it_for: inferWhatIsItFor(r),
      target_goals: [
        'Open-Source Repository',
        r.language || 'Software Engineering',
        'Modular Architecture',
      ],
      architecture_summary: r.description || `Public GitHub repository open-sourced by Belal Ansari.`,
      architecture_diagram: null,
      stack: inferTechStack(r),
      metrics: [],
      repo_url: r.html_url,
      live_url: r.homepage || null,
      paper_url: null,
      model_weights_url: null,
      status: 'OPEN SOURCE REPOSITORY',
      featured: true,
      display_order: 10 + idx,
      created_at: r.created_at || new Date().toISOString(),
      updated_at: r.pushed_at || new Date().toISOString(),
    };

    newProjects.push(newProj);
  });

  return [...mergedCurated, ...newProjects];
}

/**
 * Primary helper to get the fully synced projects list with ISR caching.
 */
export async function getSyncedProjects(): Promise<EnrichedProject[]> {
  const ghRepos = await fetchGitHubRepos('BELALANSARI07');
  return mergeGitHubWithCurated(ghRepos, PORTFOLIO_PROJECTS);
}
