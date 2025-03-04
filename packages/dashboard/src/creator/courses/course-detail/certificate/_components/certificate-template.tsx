import { useGetCertLayers } from '@oe/api/hooks/useCertificate';
import { updateCourseCertTemplateService } from '@oe/api/services/certificate';
import type { ICertificate, ICertificateData } from '@oe/api/types/certificate';
import { type ICertificateDataSchema, RendererConfigModal } from '@oe/ui/components/certificate-builder';
import { TemplateScalePreview } from '@oe/ui/components/certificate-builder';
import { Modal } from '@oe/ui/components/modal';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { CircleAlert, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const CertificateTemplate = ({
  certificateTemplate,
  // selectedTemplate,
  courseId,
}: {
  certificateTemplate?: ICertificate;
  // selectedTemplate?: ICertificate;
  courseId: string;
}) => {
  const tCertificate = useTranslations('certificate');
  const tCourse = useTranslations('course');
  const tGeneral = useTranslations('general');
  const { mutateCertLayers } = useGetCertLayers({
    courseId,
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateCertificateTemplate = async (data: ICertificateDataSchema, templateId: string, hasToast = true) => {
    try {
      await updateCourseCertTemplateService(undefined, {
        params: {
          courseId,
          templateId,
        },
        payload: data as Partial<ICertificateData>,
      });
      await mutateCertLayers();
      if (hasToast) {
        toast.success(
          tCourse('common.toast.updateSuccess', {
            item: tCourse('common.courseTitle'),
          })
        );
      }
    } catch {
      if (hasToast) {
        toast.error(
          tCourse('common.toast.updateError', {
            item: tCourse('common.courseTitle'),
          })
        );
      }
    }
  };

  return (
    <div className="cursor-pointer rounded-md text-left">
      {certificateTemplate?.template && (
        <TemplateScalePreview template={certificateTemplate.template} data={certificateTemplate as ICertificateData} />
      )}
      <div className="mt-2 flex items-center justify-between p-2">
        <p className="font-medium text-sm">{certificateTemplate?.name || tCertificate('selectTemplate.defaultName')}</p>
        {certificateTemplate && (
          <div className="flex items-center gap-2">
            {certificateTemplate?.template && certificateTemplate.type === 'certificate_layer' && (
              <RendererConfigModal
                template={certificateTemplate.template}
                data={certificateTemplate as ICertificateData}
                onSubmit={data => handleUpdateCertificateTemplate(data, certificateTemplate.id)}
                onError={() => {
                  toast.error(
                    tCourse('common.toast.updateError', {
                      item: tCourse('common.courseTitle'),
                    })
                  );
                }}
                trigger={
                  <Button size="sm" className="h-8 gap-2">
                    <Settings className="h-4 w-4" />
                    {tCertificate('selectTemplate.configTemplate')}
                  </Button>
                }
              />
            )}
            {certificateTemplate.type === 'certificate_template' && (
              <Modal
                title={
                  <div className="mb-4 flex items-center justify-center">
                    <CircleAlert className="size-10 text-warning" />
                  </div>
                }
                description={tCertificate('selectTemplate.useTemplateDescription')}
                trigger={
                  <Button size="sm" className="h-8 p-2">
                    {tCertificate('selectTemplate.useTemplate')}
                  </Button>
                }
                buttons={[
                  {
                    label: tGeneral('cancel'),
                    variant: 'outline',
                    onClick: onClose => {
                      onClose?.();
                    },
                  },
                  {
                    label: tCertificate('selectTemplate.useTemplate'),
                    onClick: async onClose => {
                      setIsUpdating(true);
                      await handleUpdateCertificateTemplate(certificateTemplate, certificateTemplate.id, false);
                      onClose?.();
                      setIsUpdating(false);
                    },
                    loading: isUpdating,
                  },
                ]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
