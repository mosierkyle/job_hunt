import React from 'react';
import styles from './page.module.css';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { useState } from 'react';

const Dashboard: React.FC = () => {
  const isAuthenticated = useAuthenticated();
  const [activePage, setActivePage] = useState<string>('Home');

  if (isAuthenticated === 'loading') return <div>Loading...</div>;
  if (isAuthenticated === false) return <Navigate to="/login" />;

  return (
    <div className={styles.dashboard}>
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
    </div>
  );
};

export default Dashboard;
