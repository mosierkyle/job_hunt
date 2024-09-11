import React from 'react';
import styles from './page.module.css';
import SearchBar from '../searchBar';
import UserAvatar from '../userAvatar';
import { MdNotificationsNone } from 'react-icons/md';

interface DashboardNavProps {
  setActivePage: (page: string) => void;
  showSideBar: boolean;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ showSideBar, setActivePage }) => {
  return (
    <div className={showSideBar ? styles.navbar : styles.biggerNavbar}>
      {/* <div className={styles.text}>Hello, {`Kyle`}</div> */}
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
