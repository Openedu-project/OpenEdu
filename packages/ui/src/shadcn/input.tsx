import { Loader2, XCircle } from 'lucide-react';
import type React from 'react';
import { cn } from '#utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  loading?: boolean;
  wrapperClassName?: string;
  ref?: React.RefObject<HTMLInputElement | null> | React.Ref<HTMLInputElement>;
}

function Input({
  className,
  type,
  error,
  prefixIcon,
  suffixIcon,
  loading,
  wrapperClassName,
  ref,
  ...props
}: InputProps) {
  return (
    <div className={cn('relative w-full', wrapperClassName)}>
      {/* Prefix Icon */}
      {prefixIcon && <div className="-translate-y-1/2 absolute top-1/2 left-3 text-muted-foreground">{prefixIcon}</div>}

      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background [appearance:textfield] file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground autofill:shadow-[0_0_0px_1000px_hsl(var(--background))_inset] focus:border-0 focus:ring-inset focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive',
          // Ngăn chặn zoom trên iOS khi focus
          // biome-ignore lint/nursery/useSortedClasses: <explanation>
          '@supports (-webkit-touch-callout: none) { font-size: 16px }',
          // Add padding when icons are present
          prefixIcon && 'pl-10',
          suffixIcon && 'pr-10',
          error && 'border-destructive focus-visible:ring-destructive',
          // Additional padding for error icon
          error && !suffixIcon && 'pr-10',
          className
        )}
        {...props}
      />

      {/* Suffix Icon */}
      {suffixIcon && (
        <div className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground">{suffixIcon}</div>
      )}

      {/* Error Icon */}
      {error && !loading && (
        <div className="-translate-y-1/2 absolute top-1/2 right-3 text-destructive">
          <XCircle className="h-4 w-4" />
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  );
}

export { Input };
