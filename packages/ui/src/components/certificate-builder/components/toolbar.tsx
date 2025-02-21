import { ChevronLeft, Image, Redo, Save, Type, Undo } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Button } from '#shadcn/button';
import { useBuilder } from '../builder-context';
import type { CertificateElement } from '../types';
import { ExportPDFButton } from './pdf-export';

// interface ToolbarProps {
//   template: CertificateTemplate;
//   onTemplateUpdate: (template: CertificateTemplate) => void;
//   onUndo: () => void;
//   onRedo: () => void;
//   canUndo: boolean;
//   canRedo: boolean;
// }

export const Toolbar = () => {
  const { template, updateTemplate, canUndo, canRedo, undo, redo } = useBuilder();

  const [saving, setSaving] = useState(false);

  const addElement = (type: CertificateElement['type']) => {
    const newElement: CertificateElement = {
      id: nanoid(),
      type,
      x: 100,
      y: 100,
      width: type === 'text' ? 200 : 40,
      height: type === 'text' ? 25 : 40,
      zIndex: template.elements.length,
      visible: true,
      ...(type === 'text' && {
        text: 'New Text',
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Inter',
      }),
    } as CertificateElement;

    updateTemplate({
      ...template,
      elements: [...template.elements, newElement],
    });
  };

  const handleSave = () => {
    setSaving(true);
    console.log('template', template);
    // try {
    //   await templateService.saveTemplate(template);
    //   // Show success notification
    // } catch (error) {
    //   // Show error notification
    // } finally {
    // }
    setSaving(false);
  };

  return (
    <div className="flex items-center gap-4 border-b bg-background px-4 py-2">
      <Button variant="outline" size="icon" className="h-8 w-8 p-0">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center space-x-2">
        <Button type="button" onClick={undo} disabled={!canUndo} variant="outline" className="h-8 w-8 p-0">
          <Undo className="h-4 w-4" />
        </Button>
        <Button type="button" onClick={redo} disabled={!canRedo} variant="outline" className="h-8 w-8 p-0">
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button type="button" onClick={() => addElement('text')} variant="outline" className="h-8 gap-2">
          <Type className="h-4 w-4" />
          Add Text
        </Button>
        <Button type="button" onClick={() => addElement('image')} variant="outline" className="h-8 gap-2">
          <Image className="h-4 w-4" />
          Add Image
        </Button>
      </div>

      <div className="ml-auto flex items-center space-x-2">
        <ExportPDFButton template={template} data={{}} variant="outline" className="h-8 gap-2" />
        <Button type="button" onClick={handleSave} disabled={saving} className="h-8 gap-2">
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
};
