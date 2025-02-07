import { Image } from '@oe/ui/components/image';
import type { ReactNode } from 'react';
import { cn } from '#utils/cn';
import { AuthSocialButtons } from './auth-social-buttons';

export function AuthLayout({
  title,
  seperateText,
  banner,
  slogan,
  children,
  className,
}: {
  title?: string;
  seperateText?: string;
  banner: {
    src: string;
    alt: string;
  };
  slogan: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-dvh">
      <div className="flex w-full items-center justify-center bg-auth-background p-6 md:w-1/2 md:p-10">
        <div className="flex w-full max-w-[400px] flex-col gap-4">
          {title && <h1 className={cn('font-semibold text-2xl text-primary', className)}>{title}</h1>}
          {children}

          {seperateText && (
            <>
              <div className="relative flex items-center justify-center before:h-[2px] before:w-full before:bg-muted-foreground after:h-[2px] after:w-full after:bg-muted-foreground">
                <span className="shrink-0 px-8 text-muted-foreground text-sm md:px-16">{seperateText}</span>
              </div>
              <AuthSocialButtons />
            </>
          )}
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 md:flex-col md:items-center md:justify-center">
        <div className="mb-6 w-full max-w-[300px]">
          <Image src={banner.src} alt={banner.alt} objectFit="contain" priority height={363} width={359} />
        </div>
        <h3 className="max-w-[80%] text-center font-bold text-2xl text-primary md:text-4xl">{slogan}</h3>
      </div>
    </div>
  );
}
