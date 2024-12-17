'use client';

import dynamic from 'next/dynamic';

export const InputPhoneNumber = dynamic(() =>
  import('#components/input-phonenumber').then(mod => mod.InputPhoneNumber)
);
