import React, { useState } from "react";
import styles from "styles/tab.css"; // Import your CSS file

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className={styles.tabContainer}>
      <ul className={styles.tabList}>
        <li
          className={activeTab === 1 ? styles.active : ""}
          onClick={() => handleTabClick(1)}
        >
          Tab 1
        </li>
        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleTabClick(2)}
        >
          Tab 2
        </li>
        <li
          className={activeTab === 3 ? "active" : ""}
          onClick={() => handleTabClick(3)}
        >
          Tab 3
        </li>
      </ul>
      <div className={styles.tabContent}>
        {activeTab === 1 && <p>Content for Tab 1</p>}
        {activeTab === 2 && <p>Content for Tab 2</p>}
        {activeTab === 3 && <p>Content for Tab 3</p>}
      </div>
    </div>
  );
};

export default TabComponent;
