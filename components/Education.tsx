
import React from 'react';
import Section from './Section';
import TimelineItem from './TimelineItem';

const education = [
  {
    date: '2017 - 2020',
    title: 'Bachelor of Computer Application (BCA)',
    company: 'Jamal Mohamed College',
    description: 'Graduated with a focus on software development principles, database management, and computer networking.'
  },
  {
    date: '2021',
    title: 'Ethical Hacking Certification',
    company: 'CyberSec Institute',
    description: 'Completed a comprehensive course on ethical hacking methodologies, network security, and vulnerability assessment.'
  }
];

const Education: React.FC = () => {
  return (
    <Section id="education" className="bg-white">
      <h2 className="text-4xl font-bold text-center text-text-dark font-heading mb-4">Education & Certification</h2>
      <div className="w-20 h-1 bg-primary-200 mx-auto mb-12"></div>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-1/2 w-0.5 h-full bg-primary-100 transform -translate-x-1/2"></div>
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
