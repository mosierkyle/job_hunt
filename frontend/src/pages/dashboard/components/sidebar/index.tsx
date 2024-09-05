import React from 'react';
import styles from './page.module.css';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { MdOutlineChat } from 'react-icons/md';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import SidebarElement from '../sideElement';
import { IconType } from 'react-icons';

interface Element {
  name: string;
  icon: IconType; // Keep this as IconType (the icon component type)
}

interface SidebarProps {
  setActivePage: (page: string) => void;
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage, activePage }) => {
  const elements: Element[] = [
    { name: 'Home', icon: GoHome }, // Pass the icon component itself
    { name: 'Jobs', icon: MdOutlineWorkOutline },
    { name: 'Interviews', icon: MdOutlineChat },
    { name: 'Connections', icon: MdOutlinePeopleAlt },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>JobHunt</div>
      <section className={styles.elements}>
        {elements.map((element) => {
          return (
            <SidebarElement
              key={element.name}
              Icon={element.icon}
              title={element.name}
              setActivePage={setActivePage}
              activePage={activePage}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Sidebar;
