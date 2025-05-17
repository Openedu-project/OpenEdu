'use client';
import dynamic from 'next/dynamic';
import { NewUserSignInTriggerModal } from './new-user-signin-trigger-modal';

export const NewUserSignInTriggerModalLazy = dynamic(
  () => import('./new-user-signin-trigger-modal').then(mod => mod.NewUserSignInTriggerModal),
  { ssr: false }
);

export { NewUserSignInTriggerModal };
