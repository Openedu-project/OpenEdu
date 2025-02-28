'use client';

import { Editor } from './_components/editor';
import { Header } from './_components/header';
import { CertificateBuilderProvider } from './_components/provider';
import { Sidebar } from './_components/sidebar';

export const CertificateBuilder = () => {
  return (
    <CertificateBuilderProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        <Header />
        <div className="relative flex flex-1 overflow-hidden">
          <div className="scrollbar flex-1 overflow-auto">
            <Editor />
          </div>
          <Sidebar />
        </div>
      </div>
    </CertificateBuilderProvider>
  );
};
