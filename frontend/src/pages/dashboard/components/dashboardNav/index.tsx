import React from 'react';
import styles from './page.module.css';
import SearchBar from '../searchBar';
import UserAvatar from '../userAvatar';
import { MdNotificationsNone } from 'react-icons/md';

interface DashboardNavProps {
  setActivePage: (page: string) => void;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ setActivePage }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.text}>Welcome back {`Kyle`}</div>
      <div className={styles.search}>
        <SearchBar placeholder="Search..." />
      </div>
      <div className={styles.user}>
        <div className={styles.noticationDiv}>
          <MdNotificationsNone className={styles.icon} />
        </div>
        <UserAvatar setActivePage={setActivePage} firstName="Kyle" lastName="Mosier" />
      </div>
    </div>
  );
};

export default DashboardNav;
