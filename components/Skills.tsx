import React, { useEffect, useRef } from 'react';
import SectionHead from './SectionHead';

const STACKS = [
  {
    title: 'AI / Agents',
    code: 'GEN-AI',
    skills: [
      { name: 'Generative AI & LLMs', val: 95 },
      { name: 'AI Agents (Bedrock / Strands)', val: 90 },
      { name: 'RAG (Standard / HyDE / Hybrid / Graph)', val: 92 },
      { name: 'MCP Servers', val: 90 },
      { name: 'LangChain / LangGraph / LlamaIndex', val: 86 },
      { name: 'Vector Databases', val: 90 },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    code: 'AWS',
    skills: [
      { name: 'AWS Bedrock / Lambda / API Gateway', val: 86 },
      { name: 'Cognito / Step Functions / Textract', val: 84 },
      { name: 'Kubeflow / MLOps', val: 82 },
      { name: 'FastAPI / REST', val: 88 },
      { name: 'Docker / Kubernetes', val: 78 },
      { name: 'LiveKit (WebRTC)', val: 85 },
    ],
  },
  {
    title: 'Languages',
    code: 'LANG',
    skills: [
      { name: 'Python', val: 92 },
      { name: 'TypeScript / JavaScript', val: 85 },
      { name: 'Kotlin / Java', val: 82 },
      { name: 'Dart (Flutter)', val: 80 },
      { name: 'SQL / PostgreSQL', val: 78 },
    ],
  },
  {
    title: 'Mobile & Frontend',
    code: 'MOBILE',
    skills: [
      { name: 'Android (Native)', val: 85 },
      { name: 'Flutter', val: 82 },
      { name: 'React Native', val: 78 },
      { name: 'React / Next.js', val: 85 },
      { name: 'Cordova / Firebase', val: 76 },
    ],
  },
];

const Skills: React.FC = () => {
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const rows = entry.target.querySelectorAll<HTMLDivElement>('.skill-row');
          rows.forEach(row => row.classList.add('visible'));
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.2 });

    groupRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sectionblock" id="skills">
      <SectionHead
        num="/03"
        label="STACK"
        title="Tools I Use"
        meta={['SECTION 03 / 06', '// PROFICIENCY']}
      />

      <div className="skills-grid">
        {STACKS.map((group, gi) => (
          <div
            key={group.code}
            className={`skill-group reveal d${(gi % 4) + 1}`}
            ref={el => { groupRefs.current[gi] = el; }}
          >
            <div className="skill-group-head">
              <span className="skill-group-title">{group.title}</span>
              <span className="skill-group-code">{group.code}</span>
            </div>
            {group.skills.map(skill => (
              <div key={skill.name} className="skill-row">
                <div className="skill-meta">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-val">{skill.val}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{ '--skill-val': skill.val + '%' } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
