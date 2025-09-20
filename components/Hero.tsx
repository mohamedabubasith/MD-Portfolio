
import React from 'react';
import Section from './Section';
import { EmailIcon, PhoneIcon, LocationIcon } from './Icons';

const Hero: React.FC = () => {
  return (
    <Section id="home" className="bg-primary-50 min-h-screen flex items-center">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-3/5 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-dark font-heading leading-tight mb-4">
            Mohamed Abu Basith
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-300 font-heading mb-6">
            Android Engineer
          </h2>
          <p className="text-lg text-text-light max-w-xl mx-auto md:mx-0 mb-8">
            Software developer with 2 years of experience in Android and Flutter Applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="mailto:abubasith86@gmail.com" className="flex items-center justify-center gap-2 bg-white text-text-dark border border-gray-200 shadow-sm font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              <EmailIcon />
              Email
            </a>
            <a href="tel:+919585909514" className="flex items-center justify-center gap-2 bg-white text-text-dark border border-gray-200 shadow-sm font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              <PhoneIcon />
              Phone
            </a>
            <div className="flex items-center justify-center gap-2 bg-white text-text-dark border border-gray-200 shadow-sm font-bold py-3 px-6 rounded-lg">
              <LocationIcon />
              Chennai
            </div>
          </div>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary-100 transform hover:scale-105 transition-transform duration-500">
            <img 
              src="https://picsum.photos/seed/mohamed/400/400" 
              alt="Mohamed Abu Basith Professional Headshot" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
