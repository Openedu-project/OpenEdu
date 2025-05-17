'use client';
import dynamic from 'next/dynamic';
import { useLoginRequiredStore } from './_store';
import { LoginWarningModal } from './login-required-modal';

export const LoginWarningModalLazy = dynamic(
  () => import('./login-required-modal').then(mod => mod.LoginWarningModal),
  { ssr: false }
);

export { LoginWarningModal, useLoginRequiredStore };
