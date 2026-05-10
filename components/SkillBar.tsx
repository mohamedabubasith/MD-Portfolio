
import React, { useState, useRef, useEffect } from 'react';

interface SkillBarProps {
  name: string;
  level: number;
}

const useOnScreen = <T extends Element,>(options: IntersectionObserverInit): [React.RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.5 });
  
  return (
    <div ref={ref} className="mb-6 group">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-mono text-gray-300 uppercase tracking-wider">{name}</span>
        <span className="text-sm font-mono text-[#b8ff33]">{level}%</span>
      </div>
      <div className="w-full bg-neutral-900 border border-neutral-800 h-2 p-[2px]">
        <div 
          className="bg-gradient-to-r from-[#76b900] to-[#b8ff33] h-full transition-all duration-1000 ease-out relative" 
          style={{ width: isVisible ? `${level}%` : '0%' }}
        >
          <div className="absolute top-0 right-0 h-full w-1 bg-white opacity-50 shadow-[0_0_10px_#ffffff]"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
