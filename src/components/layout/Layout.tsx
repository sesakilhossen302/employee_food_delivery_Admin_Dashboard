import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StoreSettings } from '../../types';

interface Props {
  storeSettings: StoreSettings;
  activeOrdersCount: number;
}

export const Layout: React.FC<Props> = ({ storeSettings, activeOrdersCount }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header storeSettings={storeSettings} activeOrdersCount={activeOrdersCount} />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
