'use client'
import React, { useState } from 'react';

type TabProps = {
  label: string;
  children: React.ReactNode;
};

type TabsProps = {
  children: React.ReactElement<TabProps>[];
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className='anime-content'>{children}</div>;
};

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='w-full max-w-3xl mx-auto'>
      <div className="flex space-x-4 justify-center">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`py-4 px-4 ${activeTab === index ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div key={activeTab} className={`mt-4 px-5 ${activeTab ? 'anime-content': '' }`} >
        {children[activeTab]}
      </div>
    </div>
  );
};