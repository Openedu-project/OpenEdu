'use client';
import { Eye, EyeOff } from 'lucide-react';
import type { FieldError } from 'react-hook-form';

import { type InputHTMLAttributes, forwardRef, useState } from 'react';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';

export interface InputPasswordProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean | FieldError;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, color, size, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative h-12">
        <Input
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          className="h-full pr-10 focus-visible:ring-offset-0"
          {...props}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute top-[3px] right-[3px] h-[calc(100%-6px)] w-10 p-0 text-muted-foreground"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? <Eye color={color} className="h-4 w-4" /> : <EyeOff color={color} className="h-4 w-4" />}
        </Button>
      </div>
    );
  }
);

InputPassword.displayName = 'InputPassword';

export default InputPassword;
