'use client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

/**
 * @property {string} key - Unique key for the tab.
 * @property {string} label - Label for the tab.
 * @property {React.ReactNode} component - Component to render for the tab.
 */

export type TabItem = {
  key: string;
  label: string;
  component: React.ReactNode;
  active?: boolean;
};

// todo: js doc
export type TabsProps = {
  items?: TabItem[];
  position?: 'centered' | 'start' | 'end';
  classNames?: {
    container?: string;
    tabs?: { text?: string; border?: string };
    component?: string;
  };
  activeKey?: string;
  onChange?: (active: any) => void;
  isLoading?: boolean;
};

/**
 * Tabs component to render a set of tabs with Tailwind CSS.
 * @param {TabsProps} props - Props for the Tabs component.
 * @returns The rendered Tabs component.
 */
const Tabs = ({
  isLoading,
  items = [],
  position = 'centered',
  classNames: classes,
  onChange,
  activeKey,
}: TabsProps) => {
  const { container, tabs, component } = classes || {};

  const [activeTab, setActiveTab] = useState<string>(
    items.find((item) => item.key === activeKey)?.key ||
      items.find((item) => item.active)?.key ||
      items[0]?.key ||
      ''
  );

  const activeComponent =
    items.find((item) => item.key === activeTab)?.component ||
    items[0].component;

  useEffect(() => {
    if (activeTab) if (onChange) onChange(activeTab);
  }, [activeTab, onChange]);

  return (
    <div className="w-full">
      <div
        className={classNames(
          'flex items-center',
          {
            'justify-center': position === 'centered',
            'justify-start': position === 'start',
            'justify-end': position === 'end',
            'gap-5': isLoading,
          },
          container
        )}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                className={classNames(
                  'relative -mb-px overflow-hidden bg-[#BFBFBF] px-10 py-1'
                )}
                disabled
              >
                <span className="animate__animated animate__fadeInLeft animate__infinite absolute left-0 top-0 h-full w-full select-none bg-white text-transparent">
                  {index}
                </span>
              </button>
            ))
          : items.map((item) => (
              <button
                key={item.key}
                className={classNames(
                  'relative -mb-px px-4 py-1.5 font-primary text-sm font-medium tracking-tight duration-300',
                  activeTab === item.key ? 'text-white' : 'text-[#BFBFBF]',
                  tabs?.text
                )}
                onClick={() => setActiveTab(item.key)}
              >
                <span
                  className={classNames(
                    'absolute bottom-0 left-0 border-b-2 border-primary-6 duration-300',
                    activeTab === item.key ? 'w-full' : 'w-0',
                    tabs?.border
                  )}
                />
                {item.label}
              </button>
            ))}
      </div>
      <div className="p-4">
        <div className={classNames(component)} key={activeKey}>
          {activeComponent}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
