'use client';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import type { FieldError } from 'react-hook-form';

import { type InputHTMLAttributes, useState } from 'react';
import { Button } from '#shadcn/button';
import { Input, type InputProps } from '#shadcn/input';

export interface InputPasswordProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
    Omit<InputProps, 'error'> {
  error?: boolean | FieldError;
}

export function InputPassword({ className, color, size, error, ...props }: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative h-10" data-slot="input-password">
      <Input
        type={showPassword ? 'text' : 'password'}
        className="pr-10 focus-visible:ring-offset-0"
        prefixIcon={<LockKeyhole className="h-4 w-4" />}
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
