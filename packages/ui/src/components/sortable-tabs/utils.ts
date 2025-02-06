import { uniqueID } from '@oe/core/utils/unique';
import type { TabItem, TabOption } from './types';

export const createTabFromOption = (option?: TabOption, id?: string, index?: number): TabItem => ({
  id: id || `tab-${uniqueID()}`,
  value: option?.value || '',
  label: option?.label as string,
  icon: option?.icon,
  content: typeof option?.content === 'function' ? option?.content(option, index || 0) : option?.content,
});
