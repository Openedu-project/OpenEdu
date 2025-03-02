import type { ICertificateElement, ICertificateImageElement } from '@oe/api/types/certificate';
import type { IFileResponse } from '@oe/api/types/file';
import { Uploader } from '#components/uploader';
import { ElementAlignmentSetting, SettingSection } from '../common';

export const ImageSetting = ({
  selectedElement,
  updateElement,
}: {
  selectedElement?: ICertificateElement;
  updateElement: (id: string, updates: Partial<ICertificateElement>) => void;
}) => {
  const element = selectedElement as ICertificateImageElement;

  return (
    <>
      <SettingSection translationKey="builder.settings.uploadImage">
        <Uploader
          id="image"
          fileListVisible={false}
          listType="picture"
          value={element?.file}
          accept="image/png, image/jpeg, image/jpg"
          onChange={file =>
            updateElement(selectedElement?.id ?? '', {
              ...element,
              file: file as IFileResponse,
            })
          }
        />
      </SettingSection>
      <SettingSection translationKey="builder.elements.image.elementTitle">
        <ElementAlignmentSetting selectedElement={selectedElement} updateElement={updateElement} />
      </SettingSection>
    </>
  );
};
