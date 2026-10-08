import React from 'react';
import SectionHead from './SectionHead';

const About: React.FC = () => {
  return (
    <section className="sectionblock" id="about">
      <SectionHead
        num="/01"
        label="WHO"
        title="Profile"
        meta={['SECTION 01 / 06', '// PROFILE']}
      />

      <div className="about-grid">
        <div className="about-avatar reveal">
          <img src="/profile.jpeg" alt="Mohamed Abu Basith" />
          <div className="about-avatar-label">
            <span className="about-avatar-name">Mohamed Abu Basith</span>
            <span className="about-avatar-role">GEN AI ENGINEER</span>
          </div>
        </div>

        <div className="about-bio reveal d2">
          <p>
            I'm a <b>Gen AI / Software Engineer</b> with 4+ years of industry experience shipping
            production systems. I lead end-to-end Gen AI projects — <b>AI agents</b> on AWS Bedrock,
            real-time <b>voice-to-voice conversational agents</b>, and enterprise Knowledge Base platforms.
          </p>
          <p>
            My work sits where models meet infrastructure: multi-pipeline <b>RAG systems</b>
            (Standard, HyDE, Hybrid, Graph), MCP servers across ERPNext, Flowise and ThingsBoard,
            human-in-the-loop document pipelines on Step Functions, and LLM APIs from OpenAI,
            Anthropic and OpenRouter wired to Qdrant, Chroma and pgvector.
          </p>
          <p>
            Before Gen AI, I spent 3 years building Android, Flutter, and React Native apps across
            multiple client projects — which means I understand both the model layer and the product
            that consumers actually touch.
          </p>
          <p className="note">&gt; OFFLINE_STATUS: Badminton enthusiast. Probably losing.</p>
        </div>
      </div>

      <div className="about-lower">
        <div className="stat-grid reveal d3">
          <div className="stat">
            <div className="stat-num">4<span className="unit">yrs</span></div>
            <div className="stat-label">SHIPPING SOFTWARE</div>
          </div>
          <div className="stat">
            <div className="stat-num">7<span className="unit">+</span></div>
            <div className="stat-label">RAG STRATEGIES</div>
          </div>
          <div className="stat">
            <div className="stat-num">5<span className="unit">+</span></div>
            <div className="stat-label">MCP SERVERS SHIPPED</div>
          </div>
          <div className="stat">
            <div className="stat-num">∞</div>
            <div className="stat-label">TOKENS PROCESSED</div>
          </div>
        </div>

        <div className="panel reveal d4">
          <div className="panel-head">
            <span>CURRENT STACK</span>
            <span style={{ color: 'var(--cyan)' }}>06</span>
          </div>
          <div className="tele-row"><span className="k">LLM</span><span className="v">OpenAI / Anthropic / Bedrock</span></div>
          <div className="tele-row"><span className="k">AGENTS</span><span className="v">Strands / LangGraph / MCP</span></div>
          <div className="tele-row"><span className="k">INFRA</span><span className="v">AWS / Kubeflow / LiveKit</span></div>
          <div className="tele-row"><span className="k">VECTOR DB</span><span className="v">Qdrant / Chroma / pgvector</span></div>
          <div className="tele-row"><span className="k">LANG</span><span className="v">Python / TypeScript</span></div>
          <div className="tele-row"><span className="k">MOBILE</span><span className="v">Android / Flutter</span></div>
        </div>
      </div>
    </section>
  );
};

export default About;
