import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Сразу скроллим наверх
    window.scrollTo(0, 0);
    
    // На всякий случай через setTimeout для гарантии
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 100);
  }, [pathname]);

  return null;
};

export default ScrollToTop;