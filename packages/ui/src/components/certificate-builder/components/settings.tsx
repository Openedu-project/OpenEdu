import { ColorPicker } from '@oe/ui/components/color-picker';
import { useState } from 'react';
import { useBuilder } from '../builder-context';
import type { CertificateElement } from '../types';
import { LayerManager } from './layer-manager';
import { fonts } from './utils';

type TabType = 'template' | 'element' | 'layers';

export const Settings = () => {
  const {
    template,
    selectedElement,
    showGrid,
    snapToGrid,
    updateTemplate,
    updateElement,
    toggleGrid,
    toggleSnapToGrid,
  } = useBuilder();

  const [activeTab, setActiveTab] = useState<TabType>('template');

  const tabs = [
    { id: 'template', label: 'Template', disabled: false },
    { id: 'element', label: 'Element', disabled: !selectedElement },
    { id: 'layers', label: 'Layers', disabled: false },
  ] as const;

  return (
    <div className="flex h-full w-80 flex-col border-l bg-white">
      {/* Tabs */}
      <div className="flex border-b">
        {tabs.map(tab => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={`flex-1 px-4 py-2 font-medium text-sm ${activeTab === tab.id ? 'border-blue-500 border-b-2' : ''}
              ${tab.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="scrollbar flex-1 overflow-y-auto p-4">
        {activeTab === 'template' && (
          <div className="space-y-6">
            {/* <section>
              <h3 className="font-medium mb-2">Dimensions</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm">Width</p>
                  <input
                    type="number"
                    value={template.width}
                    onChange={(e) =>
                      updateTemplate({
                        ...template,
                        width: Number(e.target.value),
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div>
                  <p className="text-sm">Height</p>
                  <input
                    type="number"
                    value={template.height}
                    onChange={(e) =>
                      updateTemplate({
                        ...template,
                        height: Number(e.target.value),
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              </div>
            </section> */}

            <section>
              <h3 className="mb-2 font-medium">Background</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 block text-sm">Color</p>
                  <ColorPicker
                    color={template.backgroundColor}
                    onChange={color =>
                      updateTemplate({
                        ...template,
                        backgroundColor: color,
                      })
                    }
                  />
                </div>
                <div>
                  <p className="mb-1 block text-sm">Image</p>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = event => {
                            const img = new Image();
                            img.onload = () => {
                              updateTemplate({
                                ...template,
                                width: img.width,
                                height: img.height,
                                maxWidth: template.maxWidth,
                                maxHeight: Math.round(template.maxWidth * (img.height / img.width)),
                                backgroundImage: event.target?.result as string,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                              });
                            };
                            img.src = event.target?.result as string;
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full"
                    />
                    {template.backgroundImage && (
                      <div className="relative">
                        <img
                          src={template.backgroundImage}
                          alt="Background preview"
                          className="h-auto w-full rounded border"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            objectFit: 'contain',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateTemplate({
                              ...template,
                              backgroundImage: undefined,
                            })
                          }
                          className="absolute top-1 right-1 rounded-full bg-white p-1 shadow hover:bg-gray-100"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-2 font-medium">Grid Settings</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" checked={showGrid} onChange={toggleGrid} className="mr-2" />
                  Show Grid
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={snapToGrid} onChange={toggleSnapToGrid} className="mr-2" />
                  Snap to Grid
                </label>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'element' && selectedElement && (
          <ElementSettings
            element={template.elements.find(el => el.id === selectedElement) as CertificateElement}
            onUpdate={updates => updateElement(selectedElement, updates)}
          />
        )}
        {activeTab === 'layers' && <LayerManager />}
      </div>
    </div>
  );
};

// Tách ElementSettings thành component riêng
const ElementSettings = ({
  element,
  onUpdate,
}: {
  element: CertificateElement;
  onUpdate: (updates: Partial<CertificateElement>) => void;
}) => {
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

      {/* DateTime Element Settings */}
      {/* {element.type === "datetime" && (
        <section>
          <h3 className="mb-2 font-medium">Date/Time Settings</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-1 block text-sm">Format</p>
              <select
                value={element.format}
                onChange={(e) => onUpdate({ format: e.target.value })}
                className="w-full rounded border px-2 py-1"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD MMMM YYYY">DD MMMM YYYY</option>
              </select>
            </div>
            <div>
              <p className="mb-1 block text-sm">Style</p>
              <div className="space-y-2">
                <input
                  type="number"
                  value={element.fontSize}
                  onChange={(e) =>
                    onUpdate({ fontSize: Number(e.target.value) })
                  }
                  className="w-full rounded border px-2 py-1"
                  placeholder="Font Size"
                />
                <ColorPicker
                  color={element.color}
                  onChange={(color) => onUpdate({ color })}
                />
              </div>
            </div>
          </div>
        </section>
      )} */}

      {/* Image Element Settings */}
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

      {/* Signature Element Settings */}
      {/* {element.type === "signature" && (
        <section>
          <h3 className="mb-2 font-medium">Signature Settings</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-1 block text-sm">Upload Signature</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      onUpdate({ src: event.target?.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full"
              />
            </div>
            <div>
              <p className="mb-1 block text-sm">Placeholder Text</p>
              <input
                type="text"
                value={element.placeholder}
                onChange={(e) => onUpdate({ placeholder: e.target.value })}
                className="w-full rounded border px-2 py-1"
                placeholder="Click to add signature"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm">Width</p>
                <input
                  type="number"
                  value={element.width}
                  onChange={(e) => onUpdate({ width: Number(e.target.value) })}
                  className="w-full rounded border px-2 py-1"
                />
              </div>
              <div>
                <p className="text-sm">Height</p>
                <input
                  type="number"
                  value={element.height}
                  onChange={(e) => onUpdate({ height: Number(e.target.value) })}
                  className="w-full rounded border px-2 py-1"
                />
              </div>
            </div>
          </div>
        </section>
      )} */}
    </div>
  );
};
