import { type ICreateOrganizationSchemaType, createOrganizationSchema } from '@oe/api/schemas/organization';
import type { IOrganization } from '@oe/api/types/organizations';
import { Modal } from '@oe/ui/components/modal';
import { Uploader } from '@oe/ui/components/uploader';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface IViewOrganizationModal {
  onSubmit: (value: unknown) => void;
  onClose: () => void;
  data: IOrganization | null;
  isEdit: boolean;
}
const DOMAIN_NAME = process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME;

export function ViewOrganizationModal({ onSubmit, onClose, isEdit = false, data }: IViewOrganizationModal) {
  const t = useTranslations('organizationsManagement.viewOrganizationModal');

  const handleSubmit = useCallback(
    async (value: ICreateOrganizationSchemaType) => {
      await onSubmit?.(value);
    },
    [onSubmit]
  );

  return (
    <Modal
      open={true}
      title={isEdit ? t('editOrganization') : t('createOrganization')}
      onClose={onClose}
      buttons={[
        {
          type: 'button',
          label: t('cancel'),
          variant: 'outline',
          onClick: () => onClose(),
        },
        {
          type: 'submit',
          label: t('save'),
          variant: 'default',
        },
      ]}
      validationSchema={createOrganizationSchema}
      onSubmit={handleSubmit}
      defaultValues={{
        phone: data?.user?.phone ?? '',
        name: data?.name ?? '',
        domain: data?.domain ?? '',
        email: data?.user?.email ?? '',
      }}
    >
      {form => (
        <>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input disabled={isEdit} {...field} placeholder={t('enterEmailAddress')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phoneNumber')}</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isEdit} placeholder={t('enterPhoneNumber')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('companyName')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('enterCompanyName')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>{t('domainName')}</FormLabel>
                <Input disabled={isEdit} {...field} placeholder={t('enterDomainName')} />
                <FormMessage />
                {!isEdit && (
                  <span className="absolute top-[2.25rem] right-[12px] text-gray text-sm">.{DOMAIN_NAME}</span>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('thumbnail')}</FormLabel>
                <FormControl>
                  <Uploader
                    draggable
                    accept="image/*"
                    listType="picture"
                    value={field?.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </Modal>
  );
}
