import type { ReactNode } from 'react';
import { cn } from '#utils/cn';

interface TypoProps {
  children: ReactNode;
  className?: string;
}

const H2Text = ({ children, className }: TypoProps) => {
  return (
    <h2 className={cn(className, 'font-bold text-2xl leading-tight sm:text-[28px] md:text-[40px]')}>{children}</h2>
  );
};

const DescText = ({ children, className }: TypoProps) => {
  return <p className={cn(className, 'font-normal text-sm leading-tight sm:text-base md:text-xl')}>{children}</p>;
};

export { H2Text, DescText };
