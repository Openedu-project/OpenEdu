import { useState } from 'react';
import { useBuilder } from '../../builder-context';
import type { CertificateElement } from '../../types';
import { ElementSettings } from './element-settings';
import { LayerManager } from './layer-manager';
import { TemplateSettings } from './template-settings';

type TabType = 'template' | 'element' | 'layers';

export const Settings = () => {
  const { template, selectedElement, updateElement } = useBuilder();

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
        {activeTab === 'template' && <TemplateSettings />}

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
