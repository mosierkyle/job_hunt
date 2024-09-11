import React from 'react';
import { IconType } from 'react-icons';
import styles from './page.module.css';

interface SidebarElementProps {
  showSideBar: boolean;
  Icon: IconType;
  title: string;
  setActivePage: (page: string) => void;
  activePage: string;
}

const SidebarElement: React.FC<SidebarElementProps> = ({
  showSideBar,
  Icon,
  title,
  setActivePage,
  activePage,
}) => {
  const handleClick = () => {
    setActivePage(title);
  };

  return (
    <div
      style={activePage === title ? { backgroundColor: '#f7f6f3' } : { fontWeight: '600' }}
      className={styles.sidebarElement}
      onClick={handleClick}
    >
      <Icon className={styles.icon} />
      <span className={showSideBar ? styles.title : styles.noTitle}>{title}</span>
    </div>
  );
};

export default SidebarElement;
