import type { ReactNode } from 'react';

const AlertBlock = ({ children }: { children: ReactNode }) => (
  <span className="block rounded-[8px] p-4 border border-[#FFBD04] text-[#2C2C2C] text-sm font-normal leading-5 bg-[#FFF6DC]">
    {children}
  </span>
);

export default AlertBlock;
