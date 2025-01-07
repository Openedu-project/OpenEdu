import { blogMessages } from './blog';
import { coursesMessages } from './courses';
import { dashboardMessages } from './dashboard';
import { dynamicFormsMessages } from './dynamic-forms';
import { languagesMessages } from './languages';
export const featuresMessages = {
  ...coursesMessages,
  ...dashboardMessages,
  ...languagesMessages,
  ...dynamicFormsMessages,
  ...blogMessages,
};
