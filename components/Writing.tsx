import React, { useEffect, useState } from 'react';
import SectionHead from './SectionHead';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  categories: string[];
  author: string;
}

interface RssResponse {
  status: string;
  items: MediumPost[];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").trim();
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} MIN READ`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
}

const Writing: React.FC = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const rssUrl = encodeURIComponent('https://medium.com/feed/@mohamedabu.basith_91257');
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`)
      .then(r => r.json())
      .then((data: RssResponse) => {
        if (data.status === 'ok') {
          setPosts(data.items);
        } else {
          setError(true);
        }
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
    <section className="sectionblock" id="writing">
      <SectionHead
        num="/05"
        label="SIGNAL"
        title="Writing"
        meta={['LIVE FROM MEDIUM', '// REAL-TIME']}
      />

      {loading && (
        <div className="grid-loading">
          <div className="spin" />
          FETCHING ARTICLES FROM MEDIUM
        </div>
      )}

      {error && (
        <div className="grid-loading">
          FAILED TO FETCH — CHECK NETWORK
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="grid-loading">
          NO ARTICLES FOUND
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="articles">
          {posts.map((post, idx) => {
            const excerpt = stripHtml(post.description).slice(0, 200) + '…';
            const readTime = estimateReadTime(stripHtml(post.description));
            return (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`article reveal d${(idx % 4) + 1}`}
                onMouseEnter={e => e.currentTarget.closest('.articles')?.classList.add('has-hover')}
                onMouseLeave={e => e.currentTarget.closest('.articles')?.classList.remove('has-hover')}
              >
                <div className="article-side">
                  <span className="article-id">ART_{String(idx + 1).padStart(3, '0')}</span>
                  <span className="article-date">{formatDate(post.pubDate)}</span>
                  <span className="article-read">{readTime}</span>
                </div>
                <div className="article-main">
                  <div className="article-pub">
                    <span className="article-m">M</span>
                    MEDIUM
                    {post.categories.slice(0, 2).map(c => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                  </div>
                  <h3 className="article-title">{post.title}</h3>
                  <p className="article-excerpt">{excerpt}</p>
                </div>
                <div className="article-arrow">
                  READ <span>↗</span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Writing;
