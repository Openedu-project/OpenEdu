import type { ReactNode } from 'react';
import { cn } from '#utils/cn';

interface IProps {
  children: ReactNode;
  title: string;
  titleClass?: string;
  containerClass?: string;
  childrenClass?: string;
}

export const CourseSection = ({ children, title, titleClass, containerClass, childrenClass }: IProps) => {
  return (
    <div className={cn('flex flex-col gap-1', containerClass)}>
      <h2 className={cn('mcaption-semibold18 capitalize', titleClass)}>{title}</h2>
      <div className={cn('rounded-lg border border-primary/20 p-4 shadow-7 lg:p-6', childrenClass)}>{children}</div>
    </div>
  );
};
