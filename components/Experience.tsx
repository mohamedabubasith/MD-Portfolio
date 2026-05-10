
import React from 'react';
import Section from './Section';
import TimelineItem from './TimelineItem';

const experiences = [
  {
    date: '2025 – Present',
    title: 'Conversational AI Agent',
    company: 'Generative AI Eng. @ Grootan Technologies',
    description: (
      <ul className="list-none space-y-2 text-gray-400">
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Built a production-grade real-time voice-to-voice AI agent using LiveKit for WebRTC audio streaming and low-latency communication.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Integrated LangChain for LLM orchestration and OpenRouter as the multi-provider LLM configuration layer.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Implemented MCP (Model Context Protocol) to connect the agent with external tools, APIs, and enterprise services.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Designed vector database-backed knowledge base grounding with semantic search and embeddings for context-aware responses.</span></li>
      </ul>
    )
  },
  {
    date: '2025',
    title: 'Enterprise Knowledge Base Platform',
    company: 'Generative AI Eng. @ Grootan Technologies',
    description: (
      <ul className="list-none space-y-2 text-gray-400">
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Architected a product-grade enterprise Knowledge Base platform using a multi-pipeline RAG concept with 7 retrieval strategies.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Implemented pipeline variants: Standard RAG, HyDE, Hybrid RAG, Graph RAG, and custom pipelines using LlamaIndex and LangChain.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Built external source connectors using Airbyte for structured data ingestion and developed automated web scraping modules.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Deployed and orchestrated the full multi-pipeline infrastructure on Kubeflow for scalable MLOps.</span></li>
      </ul>
    )
  },
  {
    date: '2025',
    title: 'Gen AI Document Verification POC',
    company: 'Saudi Client Project @ Grootan',
    description: (
      <ul className="list-none space-y-2 text-gray-400">
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Developed a POC for automated document verification using Generative AI and multimodal LLM capabilities.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Applied prompt engineering and LLM API integration to extract, validate, and cross-reference structured and unstructured data.</span></li>
      </ul>
    )
  },
  {
    date: 'Jan 2022 – Dec 2024',
    title: 'Mobile Application Developer',
    company: 'Software Eng. @ Grootan Technologies',
    description: (
      <ul className="list-none space-y-2 text-gray-400">
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Designed, developed, and maintained Android, Flutter, and React Native applications across multiple client projects.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Integrated Android native functionalities into a React Native wrapper SDK for cross-platform compatibility.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Delivered Firebase-backed mobile applications with real-time database, authentication, and REST API integration.</span></li>
      </ul>
    )
  },
  {
    date: 'Jul 2021 – Dec 2021',
    title: 'Software Engineer – Intern',
    company: 'Grootan Technologies Pvt Ltd',
    description: (
      <ul className="list-none space-y-2 text-gray-400">
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Designed and developed mobile applications for phones and tablets.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Integrated backend APIs and database response servers for server-side logic.</span></li>
        <li className="flex items-start gap-2"><span className="text-[#76b900] mt-1">›</span> <span>Built features using Firebase Authentication and Real-time Database.</span></li>
      </ul>
    )
  }
];

const Experience: React.FC = () => {
  return (
    <Section id="experience" className="bg-transparent border-t border-neutral-900 border-dashed">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-5xl font-mono font-bold tracking-tighter uppercase mb-4">
          <span className="gradient-text">Experience</span>
        </h2>
        <div className="w-24 h-1 bg-[#76b900] shadow-[0_0_15px_rgba(118,185,0,0.6)]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto pl-4 md:pl-0">
        <div className="absolute left-0 md:left-1/2 w-[1px] h-full bg-neutral-800 md:transform md:-translate-x-1/2 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-[#76b900]/50 before:to-transparent"></div>
        {experiences.map((exp, index) => (
          <TimelineItem 
            key={index}
            date={exp.date}
            title={exp.title}
            subtitle={exp.company}
            description={exp.description}
            align={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </Section>
  );
};

export default Experience;
