
import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
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


const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.2 });
  
  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-20 md:py-28 ${className} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
};

export default Section;
