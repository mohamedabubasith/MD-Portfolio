import React from 'react';
import SectionHead from './SectionHead';

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

const EDUCATION = [
  {
    date: '2022 - 2024',
    title: 'Master of Business Administration (MBA) – Marketing Management',
    co: 'Alagappa University, Karaikudi',
    desc: 'First Class. Registration No: 2022013600080',
  },
  {
    date: '2017 - 2020',
    title: 'Bachelor of Computer Application (BCA)',
    co: 'Jamal Mohamed College, Tiruchirappalli',
    desc: 'First Class. Roll No: 17US9753',
  },
  {
    date: 'Certification',
    title: 'Ethical Hacking',
    co: 'CyberSec',
    desc: 'Specialized in ethical hacking concepts and practical applications.',
  },
];

const Experience: React.FC = () => {
  return (
    <section className="sectionblock" id="experience">
      <SectionHead
        num="/04"
        label="TIMELINE"
        title="Career Log"
        meta={['2021 ────── 2025', '// ONE COMPANY, MANY CHAPTERS']}
      />

      <div className="timeline">
        {EXP.map((e, i) => (
          <div key={i} className={`tl-item${e.now ? ' now' : ''} reveal d${(i % 4) + 1}`}>
            <div className="tl-meta">
              <span>{e.date}</span>
              {e.now && <span className="now-badge">NOW</span>}
            </div>
            <div className="tl-role">{e.role}</div>
            <div className="tl-co">{e.co}</div>
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

      <div className="section-sub">EDUCATION // CREDENTIALS</div>

      <div className="edu-grid">
        {EDUCATION.map((edu, i) => (
          <div key={i} className={`edu-card reveal d${i + 1}`}>
            <div className="edu-date">{edu.date}</div>
            <div className="edu-title">{edu.title}</div>
            <div className="edu-co">{edu.co}</div>
            <div className="edu-desc">{edu.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
