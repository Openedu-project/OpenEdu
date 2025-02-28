import { useCertificateBuilder } from '../../provider';
import { ImageSetting, OrganizationSetting, RichTextSetting, SignatureSetting, TextSetting } from '../element-setting';

export const ElementTab = () => {
  const { selectedElement, updateElement } = useCertificateBuilder();
  if (!selectedElement) {
    return null;
  }

  return (
    <div className="p-4 pt-0">
      {/* Hiển thị setting tương ứng với loại element */}
      {selectedElement.type === 'text' && (
        <TextSetting selectedElement={selectedElement} updateElement={updateElement} />
      )}

      {selectedElement.type === 'image' && (
        <ImageSetting selectedElement={selectedElement} updateElement={updateElement} />
      )}

      {selectedElement.type === 'organization' && (
        <OrganizationSetting selectedElement={selectedElement} updateElement={updateElement} />
      )}

      {selectedElement.type === 'signature' && (
        <SignatureSetting selectedElement={selectedElement} updateElement={updateElement} />
      )}

      {selectedElement.type === 'rich-text' && (
        <RichTextSetting selectedElement={selectedElement} updateElement={updateElement} />
      )}

      {/* Common setting luôn hiển thị cuối cùng */}
      {/* <CommonSetting
        selectedElement={selectedElement}
        updateElement={updateElement}
      /> */}
    </div>
  );
};
