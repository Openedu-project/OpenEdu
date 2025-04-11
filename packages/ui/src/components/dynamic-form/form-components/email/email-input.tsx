import type { RefObject } from 'react';
import { Input, type InputProps } from '#shadcn/input';

export function EmailInput({ ref, ...props }: InputProps & { ref?: RefObject<HTMLInputElement> }) {
  return <Input type="email" {...props} ref={ref} />;
}
