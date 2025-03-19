'use client';

import { useEffect } from 'react';
import { initLogger } from './logrocket';

export default function LogRocketHandler() {
  useEffect(() => {
    initLogger();
  }, []);

  return null;
}
