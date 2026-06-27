import React, { useEffect, useRef } from 'react';
import CardTicks from './CardTicks';

const STACKS = [
  {
    title: 'AI / ML',
    code: 'GEN-AI',
    skills: [
      { name: 'Generative AI & LLMs', val: 95 },
      { name: 'RAG Architectures', val: 92 },
      { name: 'Vector Databases', val: 90 },
      { name: 'Prompt Engineering', val: 88 },
      { name: 'LangChain / LlamaIndex', val: 85 },
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
      { name: 'SQL', val: 78 },
    ],
  },
  {
    title: 'Infrastructure',
    code: 'INFRA',
    skills: [
      { name: 'Kubeflow / MLOps', val: 82 },
      { name: 'FastAPI / REST', val: 88 },
      { name: 'Docker / Kubernetes', val: 78 },
      { name: 'LiveKit (WebRTC)', val: 85 },
      { name: 'Firebase / Cloud', val: 80 },
    ],
  },
  {
    title: 'Mobile & Frontend',
    code: 'MOBILE',
    skills: [
      { name: 'Android (Native)', val: 85 },
      { name: 'Flutter', val: 82 },
      { name: 'React / Next.js', val: 85 },
      { name: 'React Native', val: 78 },
      { name: 'Tailwind CSS', val: 80 },
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
    <section className="section" id="skills">
      <div className="bento skills-bento">
        <div className="bento-head-card reveal">
          <div className="section-head">
            <div>
              <div className="section-label"><span className="num">/03</span> STACK</div>
              <h2 className="section-title">
                Tools I <em>actually use</em>.
              </h2>
            </div>
            <div className="section-meta">
              <div>SECTION 03 / 05</div>
              <div style={{ marginTop: 6 }}>// PROFICIENCY</div>
            </div>
          </div>
        </div>

        {STACKS.map((group, gi) => (
          <div
            key={group.code}
            className={`skill-group col-6 reveal d${(gi % 4) + 1}`}
            ref={el => { groupRefs.current[gi] = el; }}
          >
            <CardTicks />
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
