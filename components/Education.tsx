
import React from 'react';
import Section from './Section';
import TimelineItem from './TimelineItem';

const education = [
  {
    date: '2022 - 2024',
    title: 'Master of Business Administration (MBA) – Marketing Management',
    company: 'Alagappa University, Karaikudi',
    description: 'First Class. Registration No: 2022013600080'
  },
  {
    date: '2017 - 2020',
    title: 'Bachelor of Computer Application (BCA)',
    company: 'Jamal Mohamed College, Tiruchirappalli',
    description: 'First Class. Roll No: 17US9753'
  },
  {
    date: 'Certification',
    title: 'Ethical Hacking',
    company: 'CyberSec',
    description: 'Specialized in ethical hacking concepts and practical applications.'
  }
];

const Education: React.FC = () => {
  return (
    <Section id="education" className="bg-transparent border-t border-neutral-900 border-dashed">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-5xl font-mono font-bold tracking-tighter uppercase mb-4">
          <span className="gradient-text">Education</span>
        </h2>
        <div className="w-24 h-1 bg-[#76b900] shadow-[0_0_15px_rgba(118,185,0,0.6)]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto pl-4 md:pl-0">
        <div className="absolute left-0 md:left-1/2 w-[1px] h-full bg-neutral-800 md:transform md:-translate-x-1/2 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-[#76b900]/50 before:to-transparent"></div>
        {education.map((edu, index) => (
          <TimelineItem 
            key={index}
            date={edu.date}
            title={edu.title}
            subtitle={edu.company}
            description={edu.description}
            align={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </Section>
  );
};

export default Education;
