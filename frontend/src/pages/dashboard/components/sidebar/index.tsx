import React from 'react';
import styles from './page.module.css';
import { GoHome } from 'react-icons/go';
import SidebarElement from '../sideElement';
import { IconType } from 'react-icons';
import {
  MdLogout,
  MdOutlineSettings,
  MdOutlineChat,
  MdOutlinePeopleAlt,
  MdOutlineWorkOutline,
  MdOutlineViewSidebar,
} from 'react-icons/md';
import { useState } from 'react';

interface Element {
  name: string;
  icon: IconType;
}

interface SidebarProps {
  setActivePage: (page: string) => void;
  activePage: string;
  showSideBar: boolean;
  setShowSideBar: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setActivePage,
  activePage,
  setShowSideBar,
  showSideBar,
}) => {
  // const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const elements: Element[] = [
    { name: 'Home', icon: GoHome },
    { name: 'Jobs', icon: MdOutlineWorkOutline },
    { name: 'Interviews', icon: MdOutlineChat },
    { name: 'Connections', icon: MdOutlinePeopleAlt },
  ];
  const bottomElements: Element[] = [
    { name: 'Settings', icon: MdOutlineSettings },
    { name: 'SignOut', icon: MdLogout },
  ];

  const handleSideBar = () => {
    console.log(!showSideBar);
    setShowSideBar(!showSideBar);
  };

  return (
    <div className={showSideBar ? styles.sidebar : styles.hideSideBar}>
      <div className={styles.logo}>
        <p className={showSideBar ? styles.logoText : styles.noLogo}>JobHunt</p>
        <MdOutlineViewSidebar
          onClick={() => handleSideBar()}
          className={showSideBar ? styles.icon : styles.iconOnly}
        />
      </div>
      <section className={styles.elements}>
        {elements.map((element) => {
          return (
            <SidebarElement
              showSideBar={showSideBar}
              key={element.name}
              Icon={element.icon}
              title={element.name}
              setActivePage={setActivePage}
              activePage={activePage}
            />
          );
        })}
      </section>
      <section className={showSideBar ? styles.bottom : styles.bottomSidebar}>
        {bottomElements.map((element) => {
          return (
            <SidebarElement
              showSideBar={showSideBar}
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
