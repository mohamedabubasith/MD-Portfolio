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
            I'm a <b>Generative AI Engineer</b> with 4+ years of industry experience building
            production systems. I specialize in leading end-to-end Gen AI projects — from real-time
            <b> voice-to-voice conversational agents</b> to enterprise Knowledge Base platforms.
          </p>
          <p>
            My work sits where models meet infrastructure: architecting multi-pipeline
            <b> RAG systems</b> (Standard, HyDE, Hybrid, Graph) on Kubeflow, implementing MCP
            configurations, and connecting LLM APIs like OpenAI and Anthropic with vector databases
            like Qdrant, Chroma, and pgvector.
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
            <div className="stat-num">3<span className="unit">+</span></div>
            <div className="stat-label">LLM PROVIDERS</div>
          </div>
          <div className="stat">
            <div className="stat-num">∞</div>
            <div className="stat-label">TOKENS PROCESSED</div>
          </div>
        </div>

        <div className="panel reveal d4">
          <div className="panel-head">
            <span>CURRENT STACK</span>
            <span style={{ color: 'var(--cyan)' }}>05</span>
          </div>
          <div className="tele-row"><span className="k">LLM</span><span className="v">OpenAI / Anthropic</span></div>
          <div className="tele-row"><span className="k">INFRA</span><span className="v">Kubeflow / LiveKit</span></div>
          <div className="tele-row"><span className="k">VECTOR DB</span><span className="v">Qdrant / Chroma / pgvector</span></div>
          <div className="tele-row"><span className="k">LANG</span><span className="v">Python / TypeScript</span></div>
          <div className="tele-row"><span className="k">MOBILE</span><span className="v">Android / Flutter</span></div>
        </div>
      </div>
    </section>
  );
};

export default About;
