'use client';

import { Root } from '@radix-ui/react-aspect-ratio';
import type * as React from 'react';

function AspectRatio({ children, ...props }: React.ComponentProps<typeof Root>) {
  return (
    <Root data-slot="aspect-ratio" {...props}>
      {children}
    </Root>
  );
}

export { AspectRatio };
