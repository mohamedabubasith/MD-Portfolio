import React, { useEffect, useState } from 'react';
import SectionHead from './SectionHead';
import SelectedWork from './SelectedWork';
import ProjectVis, { VIS_TYPES } from './ProjectVis';

interface GHRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).getFullYear().toString();
}

function getTopics(repo: GHRepo): string[] {
  const topics = repo.topics.slice(0, 4);
  if (repo.language && !topics.includes(repo.language.toLowerCase())) {
    topics.unshift(repo.language);
  }
  return topics.slice(0, 5);
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/mohamedabubasith/repos?sort=updated&per_page=12&type=public')
      .then(r => r.json())
      .then((data: GHRepo[]) => {
        const envHidden = (import.meta.env.VITE_GITHUB_HIDDEN_REPOS ?? '')
          .split(',').map((s: string) => s.trim().toLowerCase()).filter(Boolean);
        const hidden = new Set(['portfolio', 'md-portfolio', 'mohamedabubasith', ...envHidden]);
        const filtered = data
          .filter(r => !r.fork && !hidden.has(r.name.toLowerCase()))
          .slice(0, 9);
        setRepos(filtered);
        setLoading(false);
        window.dispatchEvent(new Event('content-loaded'));
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        window.dispatchEvent(new Event('content-loaded'));
      });
  }, []);

  return (
    <section className="sectionblock" id="projects">
      <SectionHead
        num="/02"
        label="WORK"
        title="Selected Work"
        meta={['SECTION 02 / 06', '// SHIPPED']}
      />

      <SelectedWork />

      <div className="section-sub">OPEN SOURCE — LIVE FROM GITHUB // REAL-TIME</div>

      <div className="repo-grid">
        {loading && (
          <div className="grid-loading">
            <div className="spin" />
            FETCHING REPOS FROM GITHUB
          </div>
        )}

        {error && (
          <div className="grid-loading">
            FAILED TO FETCH — CHECK NETWORK
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="grid-loading">
            NO PUBLIC REPOS FOUND
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          repos.map((repo, idx) => {
            const visKind = VIS_TYPES[idx % VIS_TYPES.length];
            const status = repo.archived ? 'archived' : 'live';
            const topics = getTopics(repo);
            return (
              <article key={repo.id} className={`repo reveal d${(idx % 4) + 1}`}>
                <div className="repo-head">
                  <span>REPO_{String(idx + 1).padStart(3, '0')}</span>
                  <span className="repo-head-r">
                    <span className="repo-stars">★ {repo.stargazers_count}</span>
                    <span className={`repo-status ${status}`}>
                      {status === 'live' && <span className="dot" />}
                      {status.toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="repo-vis"><ProjectVis kind={visKind} /></div>
                <h3>{repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
                <p>{repo.description || 'No description provided.'}</p>
                <div className="repo-tags">
                  {topics.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="repo-foot">
                  <span>{formatDate(repo.updated_at)}</span>
                  <div className="repo-links">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="plink" title="GitHub">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.04c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.21.08 1.85 1.24 1.85 1.24 1.08 1.85 2.83 1.32 3.52 1 .1-.78.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.2.7.82.58A12 12 0 0 0 12 .3z" />
                      </svg>
                      SOURCE
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="plink plink-live" title="Live">
                        <span className="live-dot" />
                        LIVE <span className="arrow">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Projects;
