import type { ReactNode } from 'react';
import { cn } from '#utils/cn';

interface IProps {
  children: ReactNode;
  title: string;
  titleClass?: string;
  containerClass?: string;
}

export const CourseSection = ({ children, title, titleClass, containerClass }: IProps) => {
  return (
    <div className={cn('mb-4 md:mb-10', containerClass)}>
      <h2 className={cn('mcaption-semibold20 mb-3 text-foreground/75 capitalize', titleClass)}>{title}</h2>
      {children}
    </div>
  );
};
