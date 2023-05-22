import { useState, useEffect, useRef } from 'react';

const useInView = (threshold = 0, rootMargin = '0px') => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    const observedTarget = targetRef.current;

    return () => {
      if (observedTarget) {
        observer.unobserve(observedTarget);
      }
    };
  }, [threshold, rootMargin]);

  return [targetRef, isIntersecting];
};

export default useInView;