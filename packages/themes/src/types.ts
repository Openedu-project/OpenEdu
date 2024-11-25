import type React from 'react';

export type Theme = {
  // description: string;
  [page: string]: React.ComponentType;
};
