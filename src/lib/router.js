import { useState, useEffect } from 'react';

// Centralize the navigation triggers
export const navigate = (toPath) => {
  if (window.location.pathname !== toPath) {
    window.history.pushState(null, '', toPath);
    // Dispatch a custom event so all active router hooks update synchronously
    window.dispatchEvent(new Event('pushstate'));
  }
};

export function useRouter() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);

  const isReport = path.startsWith('/report/');
  const reportId = isReport ? path.substring(8).split('/')[0] || null : null;

  return {
    path,
    navigate,
    params: {
      id: reportId
    }
  };
}
