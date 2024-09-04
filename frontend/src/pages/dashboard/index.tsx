import React from 'react';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const isAuthenticated = useAuthenticated();

  if (isAuthenticated === 'loading') return <div>Loading...</div>;
  if (isAuthenticated === false) return <Navigate to="/login" />;

  return (
    <div>
      <p>Welcome to the Dashboard</p>
    </div>
  );
};

export default Dashboard;
