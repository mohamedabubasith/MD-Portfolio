
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
    <div ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-text-dark">{name}</span>
        <span className="text-sm font-medium text-primary-300">{level}%</span>
      </div>
      <div className="w-full bg-primary-50 rounded-full h-2.5">
        <div 
          className="bg-primary-200 h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: isVisible ? `${level}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
