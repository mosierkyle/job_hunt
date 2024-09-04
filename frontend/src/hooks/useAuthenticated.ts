import { useState, useEffect } from 'react';
import Authentication from '../utils/auth';

export const useAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<true | false | 'loading'>('loading');

  useEffect(() => {
    const user = Authentication.getCurrentUser();
    if (user && user.access) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};
