
import React from 'react';
import Section from './Section';
import { EmailIcon, PhoneIcon, LocationIcon, HobbyIcon } from './Icons';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Section id="contact" className="bg-primary-50">
      <h2 className="text-4xl font-bold text-center text-text-dark font-heading mb-4">Get In Touch</h2>
      <div className="w-20 h-1 bg-primary-200 mx-auto mb-12"></div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-text-dark font-heading mb-6">Contact Information</h3>
          <p className="text-text-light mb-8">
            Feel free to reach out to me for any opportunities or just to say hello! I'm always open to discussing new projects and creative ideas.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <EmailIcon className="text-primary-300" />
              <a href="mailto:abubasith86@gmail.com" className="text-text-light hover:text-text-dark">abubasith86@gmail.com</a>
            </div>
            <div className="flex items-center gap-4">
              <PhoneIcon className="text-primary-300" />
              <a href="tel:+919585909514" className="text-text-light hover:text-text-dark">+91 9585909514</a>
            </div>
            <div className="flex items-center gap-4">
              <LocationIcon className="text-primary-300" />
              <span className="text-text-light">Perungudi, Chennai</span>
            </div>
             <div className="flex items-center gap-4">
              <HobbyIcon className="text-primary-300" />
              <span className="text-text-light">Playing Badminton</span>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-4">
            <input type="text" placeholder="Your Name" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"/>
            <input type="email" placeholder="Your Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"/>
            <textarea placeholder="Your Message" rows={5} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"></textarea>
            <button type="submit" className="w-full bg-primary-200 text-text-dark font-bold py-3 px-6 rounded-lg hover:bg-primary-300 transition-all duration-300 transform hover:scale-105">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
