import { useEffect } from 'react';
import { navigate } from '../lib/router';
import PremiumLoader from '../components/loading/PremiumLoader';

export default function LoadingPage() {
  useEffect(() => {
    // Elegant delayed navigation to Results report after 2.8s
    // This allows the premium progress circle and simulation scanner to animate fully
    const timer = setTimeout(() => {
      navigate('/results');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return <PremiumLoader />;
}
