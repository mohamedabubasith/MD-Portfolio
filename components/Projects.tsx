import React, { useEffect, useState } from 'react';

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

const VIS_TYPES = ['graph', 'wave', 'bars', 'pulse', 'dots', 'grid'] as const;

function ProjectVis({ kind }: { kind: string }) {
  if (kind === 'graph') return (
    <svg viewBox="0 0 400 100" preserveAspectRatio="none">
      <g stroke="rgba(118,185,0,0.55)" strokeWidth="0.6" fill="none">
        <path d="M0,50 L60,30 L120,60 L180,20 L240,45 L300,15 L360,50 L400,35" />
        <path d="M0,70 L60,80 L120,45 L180,70 L240,65 L300,80 L360,40 L400,65" opacity="0.5" />
      </g>
      {[[60,30],[120,60],[180,20],[240,45],[300,15],[360,50]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2.5" fill="#9aff00" />
          <circle cx={x} cy={y} r="6" fill="rgba(118,185,0,0.18)">
            <animate attributeName="r" values="4;10;4" dur={(2+i*0.2)+'s'} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur={(2+i*0.2)+'s'} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
  if (kind === 'wave') return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      <path d="M0,50 Q25,15 50,50 T100,50 T150,50 T200,50" stroke="#76B900" strokeWidth="1" fill="none">
        <animate attributeName="d" dur="3s" repeatCount="indefinite"
          values="M0,50 Q25,15 50,50 T100,50 T150,50 T200,50;M0,50 Q25,85 50,50 T100,50 T150,50 T200,50;M0,50 Q25,15 50,50 T100,50 T150,50 T200,50" />
      </path>
      <path d="M0,50 Q25,70 50,50 T100,50 T150,50 T200,50" stroke="rgba(118,185,0,0.4)" strokeWidth="0.7" fill="none">
        <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M0,50 Q25,70 50,50 T100,50 T150,50 T200,50;M0,50 Q25,25 50,50 T100,50 T150,50 T200,50;M0,50 Q25,70 50,50 T100,50 T150,50 T200,50" />
      </path>
    </svg>
  );
  if (kind === 'bars') return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      {Array.from({ length: 28 }).map((_, i) => {
        const h = 20 + Math.sin(i * 0.6) * 20 + (i % 5) * 6;
        return (
          <rect key={i} x={i * 7 + 2} y={100 - h} width="4" height={h} fill="#76B900" opacity={0.4 + (i % 4) * 0.15}>
            <animate attributeName="height" values={`${h};${h*0.5};${h}`} dur={(1+i*0.05)+'s'} repeatCount="indefinite" />
            <animate attributeName="y" values={`${100-h};${100-h*0.5};${100-h}`} dur={(1+i*0.05)+'s'} repeatCount="indefinite" />
          </rect>
        );
      })}
    </svg>
  );
  if (kind === 'pulse') return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      <path d="M0,50 L45,50 L55,20 L65,80 L75,50 L120,50 L130,30 L140,70 L150,50 L200,50" stroke="#9aff00" strokeWidth="1.2" fill="none" />
      <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(118,185,0,0.15)" />
    </svg>
  );
  if (kind === 'dots') return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (i % 10) * 20 + 10;
        const y = Math.floor(i / 10) * 30 + 20;
        const op = 0.2 + Math.random() * 0.6;
        return <circle key={i} cx={x} cy={y} r="3" fill="#76B900" opacity={op}>
          <animate attributeName="opacity" values={`${op};${op*0.3};${op}`} dur={(1.5+i*0.1)+'s'} repeatCount="indefinite" />
        </circle>;
      })}
    </svg>
  );
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <rect key={`${r}-${c}`} x={c*20+2} y={r*16+2} width="16" height="12"
            fill="rgba(118,185,0,0.15)" stroke="rgba(118,185,0,0.3)" strokeWidth="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur={(1+r*0.3+c*0.1)+'s'} repeatCount="indefinite" />
          </rect>
        ))
      )}
    </svg>
  );
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
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="section" id="projects">
      <div className="section-head">
        <div>
          <div className="section-label reveal"><span className="num">/02</span> WORK</div>
          <h2 className="section-title reveal d1">
            GitHub <em>projects</em>.
          </h2>
        </div>
        <div className="section-meta reveal d2">
          <div>LIVE FROM GITHUB</div>
          <div style={{ marginTop: 6 }}>// REAL-TIME</div>
        </div>
      </div>

      {loading && (
        <div className="projects-loading">
          <div className="spin" />
          FETCHING REPOS FROM GITHUB
        </div>
      )}

      {error && (
        <div className="projects-loading">
          FAILED TO FETCH — CHECK NETWORK
        </div>
      )}

      {!loading && !error && repos.length === 0 && (
        <div className="projects-loading">
          NO PUBLIC REPOS FOUND
        </div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="projects">
          {repos.map((repo, idx) => {
            const visKind = VIS_TYPES[idx % VIS_TYPES.length];
            const size = idx === 0 ? 'lg' : idx === 3 ? 'lg' : 'sm';
            const status = repo.archived ? 'archived' : 'live';
            const topics = getTopics(repo);
            return (
              <article
                key={repo.id}
                className={`project size-${size} reveal d${(idx % 4) + 1}`}
                onMouseEnter={() => document.body.classList.add('has-active')}
                onMouseLeave={() => document.body.classList.remove('has-active')}
              >
                <div className="project-head">
                  <span className="project-id">REPO_{String(idx + 1).padStart(3, '0')}</span>
                  <span className="project-head-r">
                    <span className="project-stars">★ {repo.stargazers_count}</span>
                    <span className={`project-status ${status}`}>
                      {status === 'live' && <span className="dot" />}
                      {status.toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="project-vis"><ProjectVis kind={visKind} /></div>
                <h3 className="project-title">{repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
                <p className="project-desc">{repo.description || 'No description provided.'}</p>
                <div className="project-stack">
                  {topics.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="project-foot">
                  <span className="project-year">{formatDate(repo.updated_at)}</span>
                  <div className="project-links">
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
          })}
        </div>
      )}
    </section>
  );
};

export default Projects;
