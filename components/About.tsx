
import React from 'react';
import Section from './Section';
import SkillBar from './SkillBar';

const skills = [
  { name: 'Android', level: 90 },
  { name: 'Flutter', level: 85 },
  { name: 'React Native', level: 70 },
  { name: 'Node.js', level: 60 },
  { name: 'Firebase', level: 80 },
  { name: 'Figma', level: 75 },
  { name: 'Git', level: 95 },
  { name: 'Android Studio', level: 95 },
  { name: 'Visual Studio', level: 85 },
];

const About: React.FC = () => {
  return (
    <Section id="about" className="bg-white">
      <h2 className="text-4xl font-bold text-center text-text-dark font-heading mb-4">About Me</h2>
      <div className="w-20 h-1 bg-primary-200 mx-auto mb-12"></div>
      
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2">
          <p className="text-lg text-text-light mb-4 leading-relaxed">
            I am a dedicated and detail-oriented Android Engineer with a passion for creating intuitive and high-performance mobile applications. 
          </p>
          <p className="text-lg text-text-light leading-relaxed">
            With a proven ability to handle multiple projects with high accuracy and efficiency, I thrive in collaborative environments and am always eager to learn new technologies to build better products.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="space-y-6">
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
