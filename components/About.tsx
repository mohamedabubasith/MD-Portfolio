
import React from 'react';
import Section from './Section';
import SkillBar from './SkillBar';

const skills = [
  { name: 'Generative AI & LLMs', level: 95 },
  { name: 'Python / Backend', level: 90 },
  { name: 'TypeScript / React', level: 85 },
  { name: 'Vector Databases', level: 90 },
  { name: 'Android / Flutter', level: 85 }
];

const About: React.FC = () => {
  return (
    <Section id="about" className="bg-transparent border-t border-neutral-900 border-dashed">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-5xl font-mono font-bold tracking-tighter uppercase mb-4">
          <span className="gradient-text">About</span>
        </h2>
        <div className="w-24 h-1 bg-[#76b900] shadow-[0_0_15px_rgba(118,185,0,0.6)]"></div>
      </div>
      
      <div className="grid md:grid-cols-5 gap-16 items-center max-w-6xl mx-auto">
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-mono text-[#b8ff33] text-xl flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#b8ff33] inline-block shadow-[0_0_8px_#b8ff33]"></span>
            Professional Summary
          </h3>
          <p className="text-gray-400 font-mono text-sm leading-relaxed">
            Results-driven Generative AI Engineer and Software Engineer with 4+ years of industry experience. I specialize in leading production-grade Gen AI projects including real-time voice-to-voice conversational AI agents and enterprise Knowledge Base platforms.
          </p>
          <p className="text-gray-400 font-mono text-sm leading-relaxed">
            Proficient in building multi-pipeline RAG architectures (Standard, HyDE, Hybrid, Graph) on Kubeflow, implementing MCP configurations, and weaving together LLM APIs like OpenAI and Anthropic with vector databases.
          </p>
          <p className="text-gray-500 font-mono text-sm leading-relaxed border-l-2 border-[#76b900] pl-4">
            &gt; OFFLINE_STATUS: Badminton enthusiast.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="space-y-2">
            {skills.map(skill => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
