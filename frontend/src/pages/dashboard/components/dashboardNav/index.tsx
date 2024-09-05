import React from 'react';
import styles from './page.module.css';
import SearchBar from '../searchBar';
import UserAvatar from '../userAvatar';

const DashboardNav: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.text}>Hi Kyle</div>
      <div className={styles.search}>
        <SearchBar placeholder="Search..." />
      </div>
      <div className={styles.user}>
        <UserAvatar firstName="Kyle" lastName="Mosier" />
      </div>
    </div>
  );
};

export default DashboardNav;
