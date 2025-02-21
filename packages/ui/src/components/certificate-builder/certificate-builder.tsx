'use client';

import { DndContext } from '@dnd-kit/core';
import { BuilderProvider } from './builder-context';
import { Preview } from './components/preview';
import { Settings } from './components/settings';
import { Toolbar } from './components/toolbar';

export const CertificateBuilder = () => {
  return (
    <BuilderProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          <div className="scrollbar flex-1 overflow-auto">
            <DndContext>
              <Preview />
            </DndContext>
          </div>
          <Settings />
        </div>
      </div>
    </BuilderProvider>
  );
};
