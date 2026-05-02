import React, { ReactNode } from 'react';
import { HeaderNav } from './HeaderNav';

export interface PageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ title, description, actions, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#1a365d] flex flex-col font-sans">
      <HeaderNav />

      <main className="flex-1 p-6 flex flex-col gap-6 max-w-[1920px] mx-auto w-full">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#0b1c30] dark:text-white">{title}</h1>
            {description && (
              <p className="text-sm text-[#515f74] dark:text-[#cbd5e1] mt-1">{description}</p>
            )}
          </div>
          
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
