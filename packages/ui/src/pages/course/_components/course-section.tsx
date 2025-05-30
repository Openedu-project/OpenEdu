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
    <div className={cn('flex flex-col gap-1', containerClass)}>
      <h2 className={cn('mcaption-semibold18 capitalize', titleClass)}>{title}</h2>
      {children}
    </div>
  );
};
