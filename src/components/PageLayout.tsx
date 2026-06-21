import React, { ReactNode } from 'react';
import { HeaderNav } from './HeaderNav';

export interface PageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  hideAlertsIcon?: boolean;
}

export function PageLayout({ title, description, actions, children, hideAlertsIcon }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-muted flex flex-col font-sans">
      <HeaderNav hideAlertsIcon={hideAlertsIcon} />

      <main className="flex-1 p-6 flex flex-col gap-6 max-w-[1920px] mx-auto w-full">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground dark:text-white">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
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
