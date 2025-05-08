'use client';
import { Button, Link, cn } from '@oe/ui';
import { ArrowRight } from 'lucide-react';

interface AieduButtonProps {
  link?: string;
  text?: string;
  variant?: 'default' | 'outline';
  className?: string;
}

const AieduButton = ({ link, text, variant = 'default', className }: AieduButtonProps) => {
  return (
    <div className="button-wrapper">
      <Link
        href={link ? link : '#'}
        className={cn(
          '!p-0 h-fit w-full max-w-[300px] border-none hover:no-underline',
          variant === 'outline' && '!text-primary',
          className
        )}
      >
        <Button
          variant={variant === 'default' ? 'default' : 'outline'}
          className={cn(
            '!pr-0 relative flex h-fit w-full items-center justify-between overflow-hidden rounded-full bg-primary px-6 py-3 font-bold text-[16px] text-background md:text-[20px]',
            variant === 'outline' &&
              'border-primary bg-background text-primary hover:bg-background hover:text-primary/80'
          )}
        >
          <span className="relative z-10 mr-4 w-[calc(100%-28px)]">{text}</span>
          <div
            className={cn(
              'icon-container relative z-10 mr-2 rounded-full bg-background p-1',
              variant === 'outline' && 'bg-primary'
            )}
          >
            <ArrowRight className={cn('h-6 w-6 text-primary', variant === 'outline' && 'text-secondary')} />
          </div>
        </Button>
      </Link>

      {/* Shine effect element */}
      <div
        className="shine-effect"
        style={{
          WebkitTransform: 'skewX(-25deg)',
          msTransform: 'skewX(-25deg)',
          display: 'block',
          zIndex: 2,
          position: 'absolute',
          top: 0,
          left: '-75%',
          width: '50%',
          height: '100%',
          transform: 'skewX(-25deg)',
          background:
            variant === 'outline'
              ? 'transparent'
              : 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%)',
        }}
      />

      {/* CSS for the animations */}
      <style jsx>{`
        .button-wrapper {
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 100%;
          max-width: 300px;
        }

        .shine-effect {
          opacity: 0;
          transition: opacity 0.1s;
        }

        .button-wrapper:hover .shine-effect {
          animation: shine 1s ease-in-out;
          opacity: 1;
        }

        @keyframes shine {
          100% {
            left: 125%;
          }
        }

        /* Arrow icon animation */
        .icon-container {
          transition: all 0.3s ease;
        }

        .button-wrapper:hover .icon-container {
          animation: moveRight 0.8s ease-in-out infinite;
        }

        @keyframes moveRight {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
};

export { AieduButton, type AieduButtonProps };
