'use client';
import { createCertHtmlTemplateService } from '@oe/api/services/certificate';
import { z } from '@oe/api/utils/zod';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { useRouter } from '@oe/ui/common/navigation';
import { Modal } from '@oe/ui/components/modal';
import { useTable } from '@oe/ui/components/table';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { toast } from '@oe/ui/shadcn/sonner';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const createCertificateSchema = z.object({
  name: z.string().min(1, { message: 'certificate.validation.name' }),
});

export default function CreateCertificateButton() {
  const tCertificate = useTranslations('certificate');
  const router = useRouter();
  const { mutateAndClearCache } = useTable();

  const handleError = () => {
    toast.error(tCertificate('toast.createError'));
  };
  const onSubmit = async (data: z.infer<typeof createCertificateSchema>) => {
    const res = await createCertHtmlTemplateService(null, {
      payload: {
        name: data.name,
        type: 'certificate_template',
        template: {
          name: data.name,
        },
      },
    });
    await mutateAndClearCache?.();
    toast.success(tCertificate('toast.createSuccess'));
    router.push(
      buildUrl({
        endpoint: ADMIN_ROUTES.certificateDetail,
        params: { id: res?.id },
      })
    );
  };

  return (
    <Modal
      title={tCertificate('modal.create.title')}
      validationSchema={createCertificateSchema}
      onSubmit={onSubmit}
      onError={handleError}
      showSubmit
      buttons={[
        {
          label: tCertificate('actions.cancel'),
          type: 'button',
          variant: 'outline',
        },
        { label: tCertificate('actions.create'), type: 'submit' },
      ]}
      trigger={
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          {tCertificate('actions.create')}
        </Button>
      }
    >
      {() => (
        <>
          <FormFieldWithLabel name="name" label={tCertificate('modal.create.name')} required>
            <Input />
          </FormFieldWithLabel>
        </>
      )}
    </Modal>
  );
}
