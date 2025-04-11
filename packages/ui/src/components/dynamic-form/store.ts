import { z } from '@oe/api';
import { createStore } from '@oe/core';
import { uniqueID } from '@oe/core';
import type { FormEditorStore, FormFieldOrGroup } from './types';

const initialState = {
  fields: [],
  selectedFieldId: null,
  defaultValues: {},
  zodSchema: z.object({}),
};

export const useFormEditorStore = createStore<FormEditorStore>(set => ({
  ...initialState,
  addField: (config, index) =>
    set(state => {
      const fields = [...state.fields];
      const fieldId = `${config.fieldId}-${uniqueID()}`;
      const newConfig = { ...config, name: config.name, fieldId };

      if (index !== undefined) {
        const currentField = [...(Array.isArray(fields[index]) ? fields[index] : [fields[index]]), newConfig].filter(
          Boolean
        ) as FormFieldOrGroup;
        fields[index] = currentField;
        return { fields, selectedFieldId: fieldId };
      }
      return {
        fields: [...fields, newConfig],
        selectedFieldId: fieldId,
      };
    }),

  removeField: fieldId =>
    set(state => ({
      fields: state.fields
        .map(field => {
          if (Array.isArray(field)) {
            const filtered = field.filter(f => f.fieldId !== fieldId);
            if (filtered.length === 0) {
              return null;
            }
            if (filtered.length === 1) {
              return filtered[0];
            }
            return filtered;
          }
          return field.fieldId === fieldId ? null : field;
        })
        .filter(Boolean) as FormFieldOrGroup[],
      selectedFieldId: state.selectedFieldId === fieldId ? null : state.selectedFieldId,
    })),

  updateField: (name, newConfig) =>
    set(state => ({
      fields: state.fields.map(field => {
        if (Array.isArray(field)) {
          // Cập nhật toàn bộ group nếu newConfig là array
          if (Array.isArray(newConfig)) {
            return field[0]?.name === name ? newConfig : field;
          }
          // Cập nhật từng field trong group
          return field.map(f => (f.name === name ? { ...f, ...newConfig } : f));
        }
        return field.name === name ? { ...field, ...newConfig } : field;
      }) as FormFieldOrGroup[],
    })),
  updateFields: (fields, index) =>
    set(state => {
      if (index !== undefined) {
        const newFields = [...state.fields];
        newFields[index] = fields as FormFieldOrGroup;
        return { fields: newFields };
      }
      return { fields: fields as FormFieldOrGroup[] };
    }),
  reorderFields: (fromIndex: number, toIndex: number) =>
    set(state => {
      const fields = [...state.fields];
      const [removed] = fields.splice(fromIndex, 1);
      if (removed) {
        fields.splice(toIndex, 0, removed);
        return {
          fields,
          // selectedFieldId: state.selectedFieldId,
        };
      }
      return state;
    }),

  setSelectedField: fieldId => set({ selectedFieldId: fieldId }),
  reset: () => {
    set(initialState);
  },
}));
