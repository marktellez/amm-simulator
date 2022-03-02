import { useState, useEffect, Children } from "react";

import Tab from "./tab";

export default function Tabs({ children, onChange, value }) {
  const [selectedIndex, setSelectedIndex] = useState(value);

  useEffect(() => {
    selectedIndex !== value && setSelectedIndex(value);
  }, [value]);

  useEffect(() => {
    selectedIndex !== value && onChange(selectedIndex);
  }, [selectedIndex]);

  const tabs = Children.toArray(children).filter(
    (child) => child.type.displayName === "Tab"
  );

  return (
    <>
      <div className="flex space-x-1 border-b border-yellow-600">
        {tabs.map((tab, i) => (
          <Tab
            onChange={() => setSelectedIndex(i)}
            selectedIndex={selectedIndex}
            value={i}
            label={tab.props.label}>
            {tab.props.children}
          </Tab>
        ))}
      </div>
      <div className="p-8 my-8">{tabs[selectedIndex].props.children}</div>
    </>
  );
}

Tabs.Tab = Tab;
