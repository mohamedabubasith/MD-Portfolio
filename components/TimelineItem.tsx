
import React from 'react';

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  align: 'left' | 'right';
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, subtitle, description, align }) => {
  const alignmentClasses = align === 'left' 
    ? 'md:text-right md:pr-12' 
    : 'md:text-left md:pl-12 md:col-start-2';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mb-12 relative group z-10 w-full hover:-translate-y-1 transition-transform duration-300">
      <div className={`mb-4 md:mb-0 ${alignmentClasses}`}>
        {/* Glow point */}
        <div className="hidden md:block absolute top-[10px] left-1/2 w-4 h-4 bg-[#76b900] rounded-full transform -translate-x-1/2 border-2 border-black shadow-[0_0_10px_rgba(118,185,0,0.8)] z-20 group-hover:bg-[#b8ff33] group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(184,255,51,1)] transition-all duration-300"></div>
        
        {/* Tactical dot for mobile */}
        <div className="md:hidden absolute top-[10px] -left-[9px] w-4 h-4 bg-[#76b900] rounded-full border-2 border-black shadow-[0_0_10px_rgba(118,185,0,0.8)] z-20"></div>

        <div className={`ml-6 md:ml-0 flex flex-col ${align === 'left' ? 'md:items-end' : 'md:items-start'}`}>
          <time className="inline-block text-[#76b900] font-mono text-xs mb-2 tracking-widest">{date}</time>
          <h3 className={`text-xl font-bold font-mono text-white mb-1 uppercase tracking-tight text-left ${align === 'left' ? 'md:text-right' : 'md:text-left'}`}>{title}</h3>
          <h4 className={`font-mono text-gray-400 mb-4 text-sm text-left ${align === 'left' ? 'md:text-right' : 'md:text-left'}`}>{subtitle}</h4>
          <div className={`text-gray-400 font-mono text-sm leading-relaxed w-full bg-neutral-900/40 p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-sm text-left shadow-[0_0_20px_rgba(0,0,0,0.3)] group-hover:border-[#76b900]/30 transition-colors duration-300`}>
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
