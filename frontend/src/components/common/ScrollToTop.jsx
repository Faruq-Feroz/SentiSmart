import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top immediately when pathname changes
    window.scrollTo(0, 0);
    
    // For some browsers or complex layouts, we need a more aggressive approach
    // Set both documentElement and body scroll positions
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // For Safari
    if (window.pageYOffset) {
      window.scrollTo({
        top: 0,
        behavior: 'auto' // Use 'auto' instead of 'smooth' for immediate effect
      });
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;