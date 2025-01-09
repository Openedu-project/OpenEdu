import type { HTMLAttributes } from 'react';
import { Image } from '#components/image';
import { cn } from '#utils/cn';

interface IQuizLayoutProps extends HTMLAttributes<HTMLDivElement> {
  background: string;
}

const QuizLayout = ({ background, children, className, ...props }: IQuizLayoutProps) => {
  return (
    <div className={cn('relative h-full max-w-full', className)} {...props}>
      {children}
      <Image src={background} alt="" width={866} height={487} className="-z-10 absolute top-0 left-0" />
    </div>
  );
};

export default QuizLayout;
