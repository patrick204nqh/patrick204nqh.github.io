import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="no-underline">
      <Card className="transition-all duration-300 hover:border-accent hover:bg-accent/5">
        <CardContent className="p-4">
          <span className="font-mono text-xs font-medium text-ink truncate block">{repo.name}</span>
          <span className="text-xs text-ink-dim leading-relaxed line-clamp-2 block mt-1">{repo.description || ''}</span>
          <span className="flex gap-3 text-[0.7rem] text-ink-muted font-mono mt-2 items-center">
            {repo.language && <Badge variant="secondary" className="text-[0.65rem] px-1.5 py-0 h-4">{repo.language}</Badge>}
            {repo.stargazers_count > 0 && <span className="text-[#d29922]">&#9733; {repo.stargazers_count}</span>}
          </span>
        </CardContent>
      </Card>
    </a>
  );
}

export default function GithubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState({ count: '-', stars: '-' });
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/patrick204nqh/repos?per_page=100&type=public&sort=updated')
      .then(r => r.json())
      .then((data: Repo[]) => {
        if (!Array.isArray(data)) throw new Error('Invalid response');
        const filtered = data.filter(r => !r.fork && !r.archived);
        const totalStars = filtered.reduce((s, r) => s + r.stargazers_count, 0);
        setStats({ count: String(filtered.length), stars: String(totalStars) });
        setRepos(filtered.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4));
      })
      .catch(() => setError(true));
  }, []);

  return (
    <section className="page-section relative z-10 py-24 bg-surface border-y border-border" id="github-projects">
      <div className="max-w-[42rem] mx-auto px-6">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.75px] leading-[1.2] mb-6 max-w-[28ch] reveal">Open source</h2>
        <div className="text-ink-dim leading-relaxed max-w-[60ch] text-sm reveal reveal-delay-1">
          <p>Public work on GitHub from a developer who ships.</p>
        </div>
        <div className="flex gap-10 my-8 reveal reveal-delay-1">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[1.75rem] font-medium text-accent leading-tight">{stats.count}</span>
            <span className="text-xs text-ink-muted font-mono uppercase tracking-wide">repositories</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[1.75rem] font-medium text-accent leading-tight">{stats.stars}</span>
            <span className="text-xs text-ink-muted font-mono uppercase tracking-wide">stars earned</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {error ? (
            <p className="text-ink-muted text-sm col-span-full">Could not load GitHub data.</p>
          ) : repos.length === 0 ? (
            <p className="text-ink-muted text-sm col-span-full">Loading projects...</p>
          ) : (
            repos.map(repo => <RepoCard repo={repo} key={repo.name} />)
          )}
        </div>
        <div className="mt-2 reveal reveal-delay-2">
          <a href="/projects" className="font-mono text-xs text-accent no-underline hover:opacity-70 transition-opacity">View all projects</a>
        </div>
      </div>
    </section>
  );
}
