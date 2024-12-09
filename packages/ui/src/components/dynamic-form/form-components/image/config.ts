import type { FormFieldType } from '../../types';

export const formImageDefaultConfig: FormFieldType = {
  name: 'image',
  fieldType: 'image',
  label: 'Image',
  alt: 'image',
  aspectRatio: 'none',
  quality: 85,
  containerHeight: 100,
  align: 'start',
  backgroundImage: true,
};
