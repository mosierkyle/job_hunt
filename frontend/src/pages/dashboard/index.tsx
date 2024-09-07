import React from 'react';
import styles from './page.module.css';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { useState } from 'react';
import DashboardNav from './components/dashboardNav';
import Home from './Pages/home';
import Jobs from './Pages/jobs';
import Interviews from './Pages/interviews';
import Connections from './Pages/connections';
import Settings from './Pages/settings';

const Dashboard: React.FC = () => {
  const isAuthenticated = useAuthenticated();
  const [activePage, setActivePage] = useState<string>('Home');

  if (isAuthenticated === 'loading') return <div>Loading...</div>;
  if (isAuthenticated === false) return <Navigate to="/login" />;

  const pageComponents: { [key: string]: React.FC } = {
    Home,
    Jobs,
    Interviews,
    Connections,
    Settings,
  };

  const ActiveComponent = pageComponents[activePage] || Home;

  return (
    <div className={styles.dashboard}>
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div className={styles.right}>
        <DashboardNav />
        <div className={styles.content}>
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
