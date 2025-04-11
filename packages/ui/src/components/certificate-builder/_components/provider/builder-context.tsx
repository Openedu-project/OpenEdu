'use client';

import type { ICertificateElement, ICertificateTemplate } from '@oe/api';
import { useGetCertTemplateById } from '@oe/api';
import { nanoid } from 'nanoid';
import { useParams } from 'next/navigation';
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import type { ICertificateBuilderContextType, ICertificateHistoryState } from '../../types';

const CertificateBuilderContext = createContext<ICertificateBuilderContextType | null>(null);

export const CertificateBuilderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { id } = useParams<{ id: string }>();
  const { certificateTemplate: certificate } = useGetCertTemplateById(id);

  const [state, setState] = useState(() => ({
    history: {
      past: [],
      present: {
        id: nanoid(),
        frame: {
          width: 800,
          height: 600,
          backgroundColor: '#ffffff',
          backgroundImage: null,
        },
        elements: [],
      },
      future: [],
    } as ICertificateHistoryState,
    selectedElementId: null as string | null,
    showGrid: true,
    snapToGrid: true,
    isSaving: false,
  }));

  const { history, selectedElementId, showGrid, snapToGrid } = state;

  useEffect(() => {
    if (certificate) {
      setState(prev => ({
        ...prev,
        history: {
          past: [],
          present: {
            ...prev.history.present,
            ...certificate.template,
          },
          future: [],
        },
        selectedElementId: null,
      }));
    }
  }, [certificate]);

  useEffect(() => {
    const elementExists = history.present.elements?.some(el => el.id === selectedElementId);

    if (selectedElementId && !elementExists) {
      setState(prev => ({
        ...prev,
        selectedElementId: null,
      }));
    }
  }, [history.present.elements, selectedElementId]);

  const updateTemplate = (newTemplate: ICertificateTemplate) => {
    setState(prev => ({
      ...prev,
      history: {
        past: [...prev.history.past, prev.history.present],
        present: newTemplate,
        future: [],
      },
    }));
  };

  const selectElement = (id: string | null) => {
    setState(prev => ({
      ...prev,
      selectedElementId: id,
    }));
  };

  const toggleGrid = () => {
    setState(prev => ({
      ...prev,
      showGrid: !prev.showGrid,
    }));
  };

  const toggleSnapToGrid = () => {
    setState(prev => ({
      ...prev,
      snapToGrid: !prev.snapToGrid,
    }));
  };

  const undo = () => {
    if (history.past.length === 0) {
      return;
    }

    setState(prev => ({
      ...prev,
      history: {
        past: prev.history.past.slice(0, -1),
        present: prev.history.past[prev.history.past.length - 1] as ICertificateTemplate,
        future: [prev.history.present, ...prev.history.future],
      },
    }));
  };

  const redo = () => {
    if (history.future.length === 0) {
      return;
    }

    setState(prev => ({
      ...prev,
      history: {
        past: [...prev.history.past, prev.history.present],
        present: prev.history.future[0] as ICertificateTemplate,
        future: prev.history.future.slice(1),
      },
    }));
  };

  const handleDeleteElement = (id: string) => {
    const elementToDelete = history.present.elements?.find(el => el.id === id);

    if (!elementToDelete) {
      updateTemplate({
        ...history.present,
        elements: history.present.elements?.filter(el => el.id !== id) as ICertificateElement[],
      });
      return;
    }

    // Kiểm tra nếu element bị xóa có thuộc tính order
    if (
      (elementToDelete.type === 'signature' || elementToDelete.type === 'organization') &&
      'order' in elementToDelete &&
      elementToDelete.order !== undefined
    ) {
      const deletedOrder = elementToDelete.order;
      const updatedElements = history.present.elements
        ?.map(el => {
          // Cập nhật order cho các elements cùng loại có order lớn hơn element bị xóa
          if (el.type === elementToDelete.type && 'order' in el && el.order !== undefined && el.order > deletedOrder) {
            return { ...el, order: el.order - 1 };
          }
          return el;
        })
        .filter(el => el.id !== id) as ICertificateElement[];

      updateTemplate({
        ...history.present,
        elements: updatedElements,
      });
    } else {
      // Xử lý bình thường nếu element không có order
      updateTemplate({
        ...history.present,
        elements: history.present.elements?.filter(el => el.id !== id) as ICertificateElement[],
      });
    }
  };

  const selectedElement = history.present.elements?.find(el => el.id === selectedElementId);

  const contextValue = {
    certificate,
    template: history.present,
    selectedElement,
    selectedElementId,
    showGrid,
    snapToGrid,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    updateTemplate,
    updateElement: (id: string, updates: Partial<ICertificateElement>) => {
      updateTemplate({
        ...history.present,
        elements: history.present.elements?.map(el =>
          el.id === id ? { ...el, ...updates } : el
        ) as ICertificateElement[],
      });
    },
    deleteElement: handleDeleteElement,
    selectElement,
    toggleGrid,
    toggleSnapToGrid,
    undo,
    redo,
  };

  return <CertificateBuilderContext.Provider value={contextValue}>{children}</CertificateBuilderContext.Provider>;
};

export const useCertificateBuilder = () => {
  const context = useContext(CertificateBuilderContext);
  if (!context) {
    throw new Error('useCertificateBuilder must be used within CertificateBuilderProvider');
  }
  return context;
};
