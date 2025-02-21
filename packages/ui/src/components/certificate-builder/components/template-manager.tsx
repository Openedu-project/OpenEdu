import { useEffect, useState } from 'react';
import type { CertificateTemplate } from '../types';
import { CertificateRenderer } from './certificate-renderer';

interface TemplateManagerProps {
  onTemplateSelect: (template: CertificateTemplate) => void;
  onTemplateCreate: () => void;
}

export const TemplateManager = ({ onTemplateSelect, onTemplateCreate }: TemplateManagerProps) => {
  const [templates] = useState<CertificateTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    // try {
    //   const templates = await templateService.listTemplates();
    //   setTemplates(templates);
    // } catch (error) {
    //   // Show error notification
    // } finally {
    // }
    setLoading(false);
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this template?')) {
      return;
    }

    // try {
    //   await templateService.deleteTemplate(id);
    //   setTemplates(templates.filter((t) => t.id !== id));
    //   // Show success notification
    // } catch (error) {
    //   // Show error notification
    // }
  };

  if (loading) {
    return <div>Loading templates...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-xl">Certificate Templates</h2>
        <button
          type="button"
          onClick={onTemplateCreate}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Create New Template
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {templates.map(template => (
          <div
            key={template.id}
            className="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-h-3 aspect-w-4 bg-gray-100">
              {/* Template preview */}
              <div className="p-4">
                <CertificateRenderer template={template} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{template.name}</h3>
              <div className="mt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => onTemplateSelect(template)}
                  className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete()}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
