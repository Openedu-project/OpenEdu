import { ColorPicker } from '@oe/ui/components/color-picker';
import type { CertificateElement } from '../../types';
import { fonts } from '../utils';

interface ElementSettingsProps {
  element: CertificateElement;
  onUpdate: (updates: Partial<CertificateElement>) => void;
}

export const ElementSettings = ({ element, onUpdate }: ElementSettingsProps) => {
  return (
    <div className="space-y-6">
      {/* Common settings cho tất cả elements */}
      <section>
        <h3 className="mb-2 font-medium">Position</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm">X</p>
            <input
              type="number"
              value={element.x}
              onChange={e => onUpdate({ x: Number(e.target.value) })}
              className="w-full rounded border px-2 py-1"
            />
          </div>
          <div>
            <p className="text-sm">Y</p>
            <input
              type="number"
              value={element.y}
              onChange={e => onUpdate({ y: Number(e.target.value) })}
              className="w-full rounded border px-2 py-1"
            />
          </div>
        </div>
      </section>

      {/* Text Element Settings */}
      {element.type === 'text' && (
        <>
          <section>
            <h3 className="mb-2 font-medium">Text</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={element.text}
                onChange={e => onUpdate({ text: e.target.value })}
                className="w-full rounded border px-2 py-1"
              />
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={element.dynamic}
                    onChange={e => onUpdate({ dynamic: e.target.checked })}
                    className="mr-2"
                  />
                  Dynamic Content
                </label>
                {element.dynamic && (
                  <select
                    value={element.dynamicKey}
                    onChange={e => onUpdate({ dynamicKey: e.target.value })}
                    className="mt-2 w-full rounded border px-2 py-1"
                  >
                    <option value="studentName">Student Name</option>
                    <option value="courseName">Course Name</option>
                    <option value="issueDate">Issue Date</option>
                  </select>
                )}
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-2 font-medium">Style</h3>
            <div className="space-y-4">
              <div>
                <p className="mb-1 block text-sm">Font Size</p>
                <input
                  type="number"
                  value={element.fontSize}
                  onChange={e => onUpdate({ fontSize: Number(e.target.value) })}
                  className="w-full rounded border px-2 py-1"
                />
              </div>
              <div>
                <p className="mb-1 block text-sm">Font Family</p>
                <select
                  value={element.fontFamily}
                  onChange={e => onUpdate({ fontFamily: e.target.value })}
                  className="w-full rounded border px-2 py-1"
                >
                  {fonts.map(font => (
                    <option key={font.family} value={font.family}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-1 block text-sm">Color</p>
                <ColorPicker color={element.color} onChange={color => onUpdate({ color })} />
              </div>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={element.bold}
                    onChange={e => onUpdate({ bold: e.target.checked })}
                    className="mr-1"
                  />
                  Bold
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={element.italic}
                    onChange={e => onUpdate({ italic: e.target.checked })}
                    className="mr-1"
                  />
                  Italic
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={element.underline}
                    onChange={e => onUpdate({ underline: e.target.checked })}
                    className="mr-1"
                  />
                  Underline
                </label>
              </div>
              <div>
                <p className="mb-1 block text-sm">Alignment</p>
                <select
                  value={element.align}
                  onChange={e =>
                    onUpdate({
                      align: e.target.value as 'left' | 'center' | 'right',
                    })
                  }
                  className="w-full rounded border px-2 py-1"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </section>
        </>
      )}
      {element.type === 'image' && (
        <section>
          <h3 className="mb-2 font-medium">Image Settings</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-1 block text-sm">Upload Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = event => {
                      onUpdate({ src: event.target?.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm">Width</p>
                <input
                  type="number"
                  value={element.width}
                  onChange={e => onUpdate({ width: Number(e.target.value) })}
                  className="w-full rounded border px-2 py-1"
                />
              </div>
              <div>
                <p className="text-sm">Height</p>
                <input
                  type="number"
                  value={element.height}
                  onChange={e => onUpdate({ height: Number(e.target.value) })}
                  className="w-full rounded border px-2 py-1"
                />
              </div>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={element.maintainAspectRatio}
                onChange={e => onUpdate({ maintainAspectRatio: e.target.checked })}
                className="mr-2"
              />
              Maintain Aspect Ratio
            </label>
          </div>
        </section>
      )}
    </div>
  );
};
