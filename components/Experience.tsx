import React from 'react';
import SectionHead from './SectionHead';

const EXP = [
  {
    date: 'Jan 2026 – Present',
    now: true,
    role: 'Gen AI / Software Engineer – Level 2',
    co: 'Grootan Technologies',
    bullets: [
      'Built the Pet Quest picture-validation AI agent on Bedrock Agent with Strands, integrated into WordPress.',
      'Developed a user portal with Cognito auth and a human-in-the-loop (HITL) document-upload process on Step Functions, integrating Textract and Amazon Bedrock models.',
      'Shipped a production-ready supplier-operations Admin Portal on AWS Cognito, RDS PostgreSQL, Lambda and API Gateway.',
      'Orchestrated MCP servers on Flowise into a production-ready AI agent.',
      'Developed MCP servers across open-source components: ERPNext, Flowise and ThingsBoard.',
      'Architected an enterprise Knowledge Base platform with Standard, HyDE, Hybrid and Graph RAG pipelines using the Cognee plugin.',
    ],
    tags: ['AWS Bedrock', 'Strands', 'Step Functions', 'Textract', 'Cognito', 'MCP', 'Flowise', 'Cognee'],
  },
  {
    date: 'Jan 2022 – Dec 2025',
    now: false,
    role: 'Software Engineer – Level 1 · Gen AI',
    co: 'Grootan Technologies',
    bullets: [
      'Implemented MCP (Model Context Protocol) to connect the AI agent with external tools, APIs and enterprise services for real-time data access.',
      'Integrated OpenRouter as the multi-provider LLM layer, enabling dynamic model switching across OpenAI, Anthropic and other providers.',
      'Delivered a dual-mode (voice + text) conversational AI agent with prompt-engineered system prompts, a RAG-based knowledge base and a web-scraping pipeline for live retrieval.',
      'Built and deployed a production-grade real-time voice-to-voice AI agent on LiveKit for WebRTC audio streaming and low-latency communication.',
      'Designed vector-database-backed knowledge base grounding with multi-tenancy and user-isolated semantic search, cutting hallucinated responses.',
      'Developed a Gen AI Document Verification POC for an enterprise client: extracts uploaded-document content, validates it against defined criteria via the OpenAI API, and returns structured JSON for DB and UI.',
    ],
    tags: ['Python', 'LiveKit', 'OpenRouter', 'MCP', 'RAG', 'Qdrant', 'OpenAI API'],
  },
  {
    date: 'Jan 2022 – Dec 2024',
    now: false,
    role: 'Software Engineer – Level 1 · Mobile',
    co: 'Grootan Technologies',
    bullets: [
      'Designed and developed Android, Flutter, React Native and Cordova applications across multiple client projects.',
      'Integrated native Android functionality into a React Native wrapper SDK for cross-platform compatibility.',
      'Worked on the WLA Android financial authentication app, integrating a custom SDK with biometric authentication (Face ID and Touch ID).',
      'Delivered Firebase-backed Android apps with real-time database, authentication and REST API integration, from spec to Play Store and App Store.',
    ],
    tags: ['Android', 'Kotlin', 'Flutter', 'React Native', 'Cordova', 'Firebase'],
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
        meta={['2021 ────── 2026', '// ONE COMPANY, MANY CHAPTERS']}
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
