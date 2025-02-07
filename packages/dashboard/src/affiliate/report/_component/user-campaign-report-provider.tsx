'use client';
import type React from 'react';
import { createContext, useContext, useState } from 'react';

type UserAffiliateReportContextType = {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
};

const UserAffiliateReportContext = createContext<UserAffiliateReportContextType | undefined>(undefined);

export function UserAffiliateReportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedOption, setSelectedOption] = useState('USD');

  return (
    <UserAffiliateReportContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </UserAffiliateReportContext.Provider>
  );
}

export function useUserAffiliateReport() {
  const context = useContext(UserAffiliateReportContext);
  if (!context) {
    throw new Error('useReport must be used within ReportProvider');
  }
  return context;
}
