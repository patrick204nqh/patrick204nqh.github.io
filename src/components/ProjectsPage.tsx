import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  fork: boolean;
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Card className="transition-all duration-300 hover:border-accent hover:bg-accent/5">
      <CardContent className="p-5">
        <h3 className="font-display text-base font-medium mb-1">
          <a href={repo.html_url} className="text-ink no-underline hover:text-accent transition-colors">{repo.name}</a>
        </h3>
        <p className="text-sm text-ink-dim leading-relaxed mb-2">{repo.description || 'No description'}</p>
        <div className="flex gap-4 text-xs text-ink-muted font-mono">
          {repo.language && <Badge variant="secondary" className="text-[0.65rem] px-1.5 py-0 h-4">{repo.language}</Badge>}
          {repo.stargazers_count > 0 && <span className="text-[#d29922]">&#9733; {repo.stargazers_count}</span>}
          <span>Updated {new Date(repo.updated_at).toLocaleDateString('en', { month: 'short', year: 'numeric' })}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectsPage() {
  const [oss, setOss] = useState<Repo[]>([]);
  const [personal, setPersonal] = useState<Repo[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/patrick204nqh/repos?per_page=100&type=public&sort=updated')
      .then(r => r.json())
      .then((repos: Repo[]) => {
        if (!Array.isArray(repos)) throw new Error('Invalid response');
        const nonFork = repos.filter(r => !r.fork);
        const ossRepos = nonFork.filter(r => (r.topics || []).some(t => ['oss', 'hacktoberfest', 'opensource'].includes(t)));
        const personalRepos = nonFork.filter(r => !(r.topics || []).some(t => ['oss', 'hacktoberfest', 'archived'].includes(t)));
        setOss(ossRepos.sort((a, b) => b.stargazers_count - a.stargazers_count));
        setPersonal(personalRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()));
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div className="max-w-[42rem] mx-auto px-6 py-24">
      <section className="mb-16">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.75px] leading-[1.2] mb-8">Open Source</h2>
        <div className="flex flex-col gap-3">
          {error ? (
            <p className="text-ink-dim text-sm">Could not load projects from GitHub. Visit <a href="https://github.com/patrick204nqh" className="text-accent">github.com/patrick204nqh</a> directly.</p>
          ) : oss.length === 0 ? (
            <p className="text-ink-dim text-sm">No OSS repos tagged yet. Add <code className="bg-surface-alt px-1 py-0.5 rounded text-xs">oss</code> topic on GitHub to show them here.</p>
          ) : oss.map(repo => <RepoCard repo={repo} key={repo.name} />)}
        </div>
      </section>

      <section>
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.75px] leading-[1.2] mb-8">Personal Projects</h2>
        <div className="flex flex-col gap-3">
          {error ? (
            <p className="text-ink-dim text-sm">Could not load projects.</p>
          ) : personal.map(repo => <RepoCard repo={repo} key={repo.name} />)}
        </div>
      </section>
    </div>
  );
}
