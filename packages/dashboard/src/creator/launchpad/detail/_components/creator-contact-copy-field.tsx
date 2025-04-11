'use client';

import { copyToClipboard } from '@oe/core';
import { Button } from '@oe/ui';
import { ClipboardCopy } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContactCopyButtonProps {
  value: string;
}

export function ContactCopyButton({ value }: ContactCopyButtonProps) {
  const t = useTranslations('creatorLaunchpad.contact');
  return (
    <Button
      variant="ghost"
      className="rounded-full p-2 transition-colors hover:bg-neutral-100"
      aria-label={t('copyToClipboard')}
      onClick={() => {
        copyToClipboard(value, t('copySuccess'));
      }}
    >
      <ClipboardCopy className="h-5 w-5 text-gray-500" />
    </Button>
  );
}
