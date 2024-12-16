import { z } from '@oe/api/utils/zod';
import { createStore } from '@oe/core/store';
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
      const timestamp = Date.now();
      const uniqueName = `${config.name}_${index ?? fields.length}_${timestamp}`;
      const newConfig = { ...config, name: uniqueName };

      if (index !== undefined) {
        const currentField = [...(Array.isArray(fields[index]) ? fields[index] : [fields[index]]), newConfig].filter(
          Boolean
        ) as FormFieldOrGroup;
        fields[index] = currentField;
        return { fields, selectedFieldId: uniqueName };
      }

      return {
        fields: [...fields, newConfig],
        selectedFieldId: uniqueName,
      };
    }),

  removeField: name =>
    set(state => ({
      fields: state.fields
        .map(field => {
          if (Array.isArray(field)) {
            const filtered = field.filter(f => f.name !== name);
            if (filtered.length === 0) {
              return null;
            }
            if (filtered.length === 1) {
              return filtered[0];
            }
            return filtered;
          }
          return field.name === name ? null : field;
        })
        .filter(Boolean) as FormFieldOrGroup[],
      selectedFieldId: state.selectedFieldId === name ? null : state.selectedFieldId,
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

  setSelectedField: name => set({ selectedFieldId: name }),
  reset: () => {
    set(initialState);
  },
}));
