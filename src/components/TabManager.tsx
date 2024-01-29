import React from 'react';

interface TabManagerProps {
    tabs: { name: string; extension: string }[];
    activeTab: { name: string; extension: string };
    onCloseTab: (tab: { name: string; extension: string }) => void;
    onTabChange: (tab: { name: string; extension: string }) => void;
}

const TabManager: React.FC<TabManagerProps> = ({ tabs, activeTab, onCloseTab, onTabChange }) => {
    return (
      <div className="tab-bar">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`tab ${tab === activeTab ? 'active-tab' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab.name}
            <span className="tab-close" onClick={() => onCloseTab(tab)}>
              &times;
            </span>
          </div>
        ))}
      </div>
    );
  };

export default TabManager;
