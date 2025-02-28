import type { ICertificate, ICertificateElement, ICertificateTemplate } from '@oe/api/types/certificate';

export interface ICertificateHistoryState {
  past: ICertificateTemplate[];
  present: ICertificateTemplate;
  future: ICertificateTemplate[];
}

export interface ICertificateBuilderContextType {
  certificate?: ICertificate;
  template: ICertificateTemplate;
  selectedElement?: ICertificateElement;
  selectedElementId: string | null;
  showGrid: boolean;
  snapToGrid: boolean;
  canUndo: boolean;
  canRedo: boolean;
  updateTemplate: (template: ICertificateTemplate) => void;
  updateElement: (id: string, updates: Partial<ICertificateElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  undo: () => void;
  redo: () => void;
}
