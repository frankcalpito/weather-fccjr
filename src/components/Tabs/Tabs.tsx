import React, { useState } from "react";

interface TabsProps {
  tabs: { label: string; content: React.ReactNode }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full mt-8">
      <div className="inline-flex rounded-lg overflow-hidden w-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 flex-1 text-center transition-colors ${
              activeTab === index
                ? "bg-slate-800 text-white"
                : "bg-gray-200 text-gray-600"
            } ${index === 0 ? "rounded-l-lg" : ""} ${
              index === tabs.length - 1 ? "rounded-r-lg" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-2">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
