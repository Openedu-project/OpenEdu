import type { HTMLAttributes } from 'react';
import { Image } from '#components/image';
import { cn } from '#utils/cn';

interface IQuizLayoutProps extends HTMLAttributes<HTMLDivElement> {
  background: string;
}

const QuizLayout = ({ background, children, className, ...props }: IQuizLayoutProps) => {
  return (
    <div className={cn('relative z-0 h-full max-w-full', className)} {...props}>
      {children}
      <Image
        src={background}
        alt=""
        noContainer
        fill
        sizes="(max-width: 768px) 100vw"
        className="-z-10 absolute top-0 left-0 rounded-[20px]"
      />
    </div>
  );
};

export { QuizLayout };
