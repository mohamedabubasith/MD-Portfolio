
import React from 'react';

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  align: 'left' | 'right';
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, subtitle, description, align }) => {
  const alignmentClasses = align === 'left' 
    ? 'md:text-right md:pr-8' 
    : 'md:text-left md:pl-8 md:col-start-2';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mb-8 relative">
      <div className={`mb-4 md:mb-0 ${alignmentClasses}`}>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary-200 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-white"></div>
        <h3 className="text-lg font-bold text-text-dark font-heading">{title}</h3>
        <h4 className="font-semibold text-primary-300 mb-2">{subtitle}</h4>
        <time className="text-sm text-text-light">{date}</time>
        <p className="mt-2 text-text-light text-base">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
