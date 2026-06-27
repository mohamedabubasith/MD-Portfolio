import React from 'react';
import CardTicks from './CardTicks';

const EXP = [
  {
    date: '2025',
    now: true,
    role: 'Generative AI Engineer',
    co: 'Grootan Technologies',
    bullets: [
      'Built production-grade real-time voice-to-voice AI agent using LiveKit for WebRTC audio streaming and low-latency communication.',
      'Integrated speech-to-text, LLM reasoning, and text-to-speech in a sub-300ms pipeline.',
      'Stacked knowledge base grounding with semantic search and embeddings for context-aware responses.',
    ],
    tags: ['Python', 'LiveKit', 'OpenAI', 'RAG', 'WebRTC'],
  },
  {
    date: '2025',
    now: false,
    role: 'Enterprise Knowledge Base Platform',
    co: 'Grootan Technologies',
    bullets: [
      'Architected a product-grade enterprise Knowledge Base platform using multi-pipeline RAG with 7 retrieval strategies.',
      'Implemented Standard, HyDE, Hybrid, Graph, and Contextual Compression RAG pipelines.',
      'Deployed and orchestrated full multi-pipeline infrastructure on Kubeflow for scalable MLOps.',
    ],
    tags: ['Kubeflow', 'Qdrant', 'LangChain', 'Python', 'FastAPI'],
  },
  {
    date: '2025',
    now: false,
    role: 'Gen AI Document Verification POC',
    co: 'Saudi Client — Grootan',
    bullets: [
      'Developed a POC for automated document verification using Generative AI and multimodal LLM capabilities.',
      'Integrated Anthropic Claude API to extract, validate, and cross-reference structured and unstructured data.',
    ],
    tags: ['Claude API', 'Multimodal', 'Python', 'Document AI'],
  },
  {
    date: 'Jan 2022 – Dec 2024',
    now: false,
    role: 'Mobile Application Developer',
    co: 'Grootan Technologies',
    bullets: [
      'Designed, developed, and maintained Android, Flutter, and React Native applications across multiple client projects.',
      'Built Firebase-backed mobile applications with real-time database, authentication, and REST API integration.',
      'Delivered multiple client apps from spec to Play Store/App Store deployment.',
    ],
    tags: ['Android', 'Flutter', 'React Native', 'Kotlin', 'Firebase'],
  },
  {
    date: 'Jul 2021 – Dec 2021',
    now: false,
    role: 'Software Engineer – Intern',
    co: 'Grootan Technologies Pvt Ltd',
    bullets: [
      'Designed and developed mobile applications for phones and tablets.',
      'Collaborated with senior engineers on client projects using Agile methodologies.',
    ],
    tags: ['Android', 'Java', 'XML'],
  },
];

const Experience: React.FC = () => {
  return (
    <section className="section" id="experience">
      <div className="bento experience-bento">
        <div className="bento-head-card reveal">
          <div className="section-head">
            <div>
              <div className="section-label"><span className="num">/04</span> TIMELINE</div>
              <h2 className="section-title">
                4 years, <em>one company</em>, many chapters.
              </h2>
            </div>
            <div className="section-meta">
              <div>2021 ────── 2025</div>
              <div style={{ marginTop: 6 }}>// CAREER LOG</div>
            </div>
          </div>
        </div>

        <div className="bento-card is-data timeline-card col-12">
          <CardTicks />
          <div className="timeline">
            {EXP.map((e, i) => (
              <div key={i} className={`tl-item reveal d${(i % 4) + 1}`}>
                <div className="tl-meta">
                  <span>{e.date}</span>
                  {e.now && <span className="now">NOW</span>}
                </div>
                <div className="tl-role">{e.role}</div>
                <div className="tl-co"><b>{e.co}</b></div>
                <div className="tl-desc">
                  <ul>
                    {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
                <div className="tl-tags">
                  {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
