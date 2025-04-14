import { useGetListUser } from '@oe/api';
import { AutocompeteMultiple } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useTranslations } from 'next-intl';
// import type { FormValues } from 'node_modules/@oe/ui';
import { useMemo } from 'react';
import type { KeyboardEvent } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

export function SelectUserField<T extends FieldValues>({
  form,
}: {
  form: UseFormReturn<T>;
}) {
  const t = useTranslations('blogManagement.inviteUser');
  const { users } = useGetListUser({
    page: 1,
    per_page: 9999,
  });

  const usesEmails = useMemo(() => users?.results.map(user => user.email), [users]);

  if (!usesEmails || usesEmails?.length === 0) {
    return null;
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, handleSelectOptions?: (value: string) => void) => {
    if (
      e.key === ' ' ||
      e.code === 'Space' ||
      (e.key === 'Enter' && (e.currentTarget.value.length === 0 || usesEmails.includes(e.currentTarget.value)))
    ) {
      e.preventDefault();
      return;
    }

    if (e.nativeEvent.isComposing || e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    handleSelectOptions?.(e.currentTarget.value);
  };

  return (
    <FormFieldWithLabel name="user_emails" label={t('sendTo')} form={form}>
      <AutocompeteMultiple options={usesEmails} placeholder={t('placeholderSendTo')} onKeyDown={handleKeyDown} />
    </FormFieldWithLabel>
  );
}
