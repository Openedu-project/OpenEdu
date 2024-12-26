// import { type InputHTMLAttributes, forwardRef } from 'react';
// import { cn } from '#utils/cn';

// export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

// const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
//   return (
//     <input
//       type={type}
//       className={cn(
//         'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background [appearance:textfield] file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus:border-0 focus:ring-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   );
// });
// Input.displayName = 'Input';

import { Loader2, XCircle } from 'lucide-react';
import React from 'react';
import { cn } from '#utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  loading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, prefixIcon, suffixIcon, loading, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {/* Prefix Icon */}
        {prefixIcon && (
          <div className="-translate-y-1/2 absolute top-1/2 left-3 text-muted-foreground">{prefixIcon}</div>
        )}

        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background [appearance:textfield] file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground autofill:shadow-[0_0_0px_1000px_hsl(var(--background))_inset] focus:border-0 focus:ring-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            // Add padding when icons are present
            prefixIcon && 'pl-10',
            suffixIcon && 'pr-10',
            error && 'border-destructive focus-visible:ring-destructive',
            // Additional padding for error icon
            error && !suffixIcon && 'pr-10',
            className
          )}
          ref={ref}
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
);

Input.displayName = 'Input';

export { Input };
