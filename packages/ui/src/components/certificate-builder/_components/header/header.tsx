import { updateCertHtmlTemplateService } from '@oe/api/services/certificate';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { ArrowLeft, Eye, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { useCertificateBuilder } from '../provider';
import { RendererConfigModal } from '../renderer';

export const Header = () => {
  const tCertificate = useTranslations('certificate');
  const { certificate, template, updateTemplate } = useCertificateBuilder();
  const [isSaving, setIsSaving] = useState(false);
  const { mutate: globalMutate } = useSWRConfig();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateCertHtmlTemplateService(undefined, {
        payload: {
          ...certificate,
          name: template.name ?? certificate?.name ?? '',
          template: {
            ...template,
            name: template.name ?? certificate?.name ?? '',
          },
        },
      });
      await globalMutate((key: string) => !!key?.includes(`${API_ENDPOINT.HTML_TEMPLATES}?`), undefined, {
        revalidate: false,
      });

      toast.success(tCertificate('toast.saveSuccess'));
    } catch (error) {
      console.error('Save error:', error);
      toast.error(tCertificate('toast.saveError'));
    }
    setIsSaving(false);
  };

  return (
    <div className="flex h-14 items-center gap-4 border-b bg-background px-4">
      <div className="flex flex-1 items-center gap-2">
        <Link variant="ghost" size="icon" className="mr-2 h-8 w-8" activeClassName="" href={ADMIN_ROUTES.certificates}>
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Input
          value={template.name ?? certificate?.name ?? ''}
          onChange={e => updateTemplate({ ...template, name: e.target.value })}
          className="h-8 w-full"
          placeholder={tCertificate('builder.name.placeholder')}
        />
      </div>

      <div className="flex items-center gap-2">
        <RendererConfigModal
          trigger={
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          }
          isPreview
          template={template}
        />
        <Button onClick={handleSave} className="h-8" disabled={isSaving} loading={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? tCertificate('builder.saving') : tCertificate('builder.save')}
        </Button>
      </div>
    </div>
  );
};
