import { type ICreateCreatorSchemaType, createCreatorSchema } from '@oe/api/schemas/creators';
import type { ICreatorPayload } from '@oe/api/types/creators';

import { Modal } from '@oe/ui/components/modal';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Mail, TabletSmartphone, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ICreateCreator {
  onSubmit: (value: ICreatorPayload) => void;
  onClose: () => void;
}

export default function CreateCreatorModal({ onSubmit, onClose }: ICreateCreator) {
  const t = useTranslations('creatorManagement.createCreatorModal');
  const handleSubmit = async (values: ICreateCreatorSchemaType) => {
    await onSubmit?.(values as ICreatorPayload);
  };
  return (
    <Modal
      open={true}
      title={t('title')}
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
      validationSchema={createCreatorSchema}
      onSubmit={handleSubmit}
    >
      {form => (
        <>
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('name')} prefixIcon={<User />} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>{t('phone')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('phone')} prefixIcon={<TabletSmartphone />} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('email')} prefixIcon={<Mail />} />
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
