import { nanoid } from 'nanoid';
import { type ReactNode, createContext, useContext, useState } from 'react';
import type { CertificateElement, CertificateTemplate } from './types';

interface HistoryState {
  past: CertificateTemplate[];
  present: CertificateTemplate;
  future: CertificateTemplate[];
}

interface BuilderContextType {
  template: CertificateTemplate;
  selectedElement: string | null;
  showGrid: boolean;
  snapToGrid: boolean;
  canUndo: boolean;
  canRedo: boolean;
  updateTemplate: (template: CertificateTemplate) => void;
  updateElement: (id: string, updates: Partial<CertificateElement>) => void;
  selectElement: (id: string | null) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  undo: () => void;
  redo: () => void;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export const BuilderProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: {
      id: nanoid(),
      name: 'Certificate',
      width: 800,
      height: 600,
      maxWidth: 800,
      maxHeight: 600,
      backgroundColor: '#ffffff',
      elements: [],
    },
    future: [],
  });

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const updateTemplate = (newTemplate: CertificateTemplate) => {
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: newTemplate,
      future: [],
    }));
  };

  const updateElement = (id: string, updates: Partial<CertificateElement>) => {
    updateTemplate({
      ...history.present,
      elements: history.present.elements.map(el => (el.id === id ? { ...el, ...updates } : el)) as CertificateElement[],
    });
  };

  const selectElement = (id: string | null) => {
    setSelectedElement(id);
  };

  const toggleGrid = () => {
    setShowGrid(prev => !prev);
  };

  const toggleSnapToGrid = () => {
    setSnapToGrid(prev => !prev);
  };

  const undo = () => {
    if (!canUndo) {
      return;
    }
    setHistory(prev => ({
      past: prev.past.slice(0, -1),
      present: prev.past[prev.past.length - 1] as CertificateTemplate,
      future: [prev.present, ...prev.future],
    }));
  };

  const redo = () => {
    if (!canRedo) {
      return;
    }
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: prev.future[0] as CertificateTemplate,
      future: prev.future.slice(1),
    }));
  };

  return (
    <BuilderContext.Provider
      value={{
        template: history.present,
        selectedElement,
        showGrid,
        snapToGrid,
        canUndo,
        canRedo,
        updateTemplate,
        updateElement,
        selectElement,
        toggleGrid,
        toggleSnapToGrid,
        undo,
        redo,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within BuilderProvider');
  }
  return context;
};
