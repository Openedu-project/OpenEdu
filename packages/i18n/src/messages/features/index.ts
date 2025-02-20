import { aiAssistantMessages } from './ai-assistant';
import { blogMessages } from './blog';
import { blogManagementMessages } from './blog-management';
import { courseMessages } from './course';
import { dashboardMessages } from './dashboard';
import { dynamicFormsMessages } from './dynamic-forms';
import { languagesMessages } from './languages';
import { mintCertificateMessages } from './mint-certificate';
import { walletMessages } from './wallet';

export const featuresMessages = {
  ...dashboardMessages,
  ...languagesMessages,
  ...dynamicFormsMessages,
  ...blogMessages,
  ...walletMessages,
  ...blogManagementMessages,
  ...mintCertificateMessages,
  ...aiAssistantMessages,
  ...courseMessages,
};
