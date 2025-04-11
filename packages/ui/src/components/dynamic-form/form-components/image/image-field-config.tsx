import type { IFileResponse } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Uploader } from '#components/uploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#shadcn/tabs';
import { FormAlignConfig } from '../../form-config/form-align-config';
import { FormAspectRatioConfig } from '../../form-config/form-aspect-ratio-config';
import { FormBorderRadiusConfig } from '../../form-config/form-border-radius-config';
import { FormImageAltConfig } from '../../form-config/form-image-alt-config';
import { FormImageContainerHeightConfig } from '../../form-config/form-image-container-height-config';
import { FormImageExternalSrcConfig } from '../../form-config/form-image-external-src-config';
import { FormImageObjectFitConfig } from '../../form-config/form-image-object-fit-config';
import { FormPriorityConfig } from '../../form-config/form-priority-config';
import { FormQualityConfig } from '../../form-config/form-quality-config';
import type { FormFieldType } from '../../types';

export function ImageFieldConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: string | number | boolean) => void;
}) {
  const t = useTranslations('dynamicForms.fieldConfig');
  const [file, setFile] = useState<IFileResponse>();

  if (field.fieldType !== 'image') {
    return null;
  }

  const clearUploadFields = () => {
    handleConfigChange('quality', 85);
    handleConfigChange('priority', false);
    handleConfigChange('aspectRatio', 'none');
    handleConfigChange('src', '');
  };

  const clearExternalFields = () => {
    handleConfigChange('externalSrc', '');
  };

  const handleTabChange = (value: string) => {
    if (value === 'external') {
      clearUploadFields();
    } else {
      clearExternalFields();
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="upload" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">{t('uploadImage')}</TabsTrigger>
          <TabsTrigger value="external">{t('externalImage')}</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="space-y-4">
          <Uploader
            listType="picture"
            accept="image/*"
            value={file}
            fileListVisible={false}
            onChange={file => {
              setFile(file as IFileResponse);
              handleConfigChange('src', (file as IFileResponse)?.url ?? '');
            }}
          />
          <FormQualityConfig field={field} handleConfigChange={handleConfigChange} />
          <FormPriorityConfig field={field} handleConfigChange={handleConfigChange} />
          <FormAspectRatioConfig field={field} handleConfigChange={handleConfigChange} />
          <FormImageContainerHeightConfig field={field} handleConfigChange={handleConfigChange} />
        </TabsContent>
        <TabsContent value="external" className="space-y-4">
          <FormImageExternalSrcConfig field={field} handleConfigChange={handleConfigChange} />
          <FormImageContainerHeightConfig field={field} handleConfigChange={handleConfigChange} />
        </TabsContent>
      </Tabs>
      <FormImageAltConfig field={field} handleConfigChange={handleConfigChange} />
      <FormAlignConfig field={field} handleConfigChange={handleConfigChange} />
      <FormBorderRadiusConfig field={field} handleConfigChange={handleConfigChange} />
      <FormImageObjectFitConfig field={field} handleConfigChange={handleConfigChange} />
    </div>
  );
}
