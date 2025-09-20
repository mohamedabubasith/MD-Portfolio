
import React from 'react';
import Section from './Section';
import TimelineItem from './TimelineItem';

const experiences = [
  {
    date: 'Jan 2022 – Current',
    title: 'Android Engineer',
    company: 'Tech Solutions Inc.',
    description: 'Design, develop and maintenance of Android and flutter applications. Integrated Android functionalities in react native wrapper SDK, leading to a 30% increase in cross-platform feature parity.'
  },
  {
    date: 'July 2021 – Dec 2021',
    title: 'Internship',
    company: 'Mobile First Co.',
    description: 'Focused on mobile app development for phones and tablets. Gained hands-on experience with backend API integration. Implemented Firebase authentication and real-time database features.'
  }
];

const Experience: React.FC = () => {
  return (
    <Section id="experience" className="bg-primary-50">
      <h2 className="text-4xl font-bold text-center text-text-dark font-heading mb-4">Work Experience</h2>
      <div className="w-20 h-1 bg-primary-200 mx-auto mb-12"></div>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-1/2 w-0.5 h-full bg-primary-100 transform -translate-x-1/2"></div>
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
