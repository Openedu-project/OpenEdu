import type { IUser } from '@oe/api/types/user';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { ROLE_LIST } from '@oe/core/utils/constants';
import {
  ADMIN_ROUTES,
  AFFILIATE_ROUTES,
  BLOG_ADMIN_ROUTES,
  BLOG_ROUTES,
  CREATOR_ROUTES,
  LEARNER_ROUTES,
  PROTECTED_ROUTES,
} from '@oe/core/utils/routes';
import {
  BadgePercent,
  Bolt,
  FileText,
  GraduationCap,
  NotebookPen,
  ScrollText,
  type Settings,
  type User,
  Wallet,
} from 'lucide-react';

type MenuItem = {
  key: string;
  icon: typeof Settings | typeof User;
  requiredRoles: string[];
  href: string;
  hasSepratePage?: boolean;
};

export const MENU_ITEMS = (user: IUser) =>
  [
    {
      key: 'affiliate',
      icon: BadgePercent,
      requiredRoles: [ROLE_LIST.LEARNER],
      href: AFFILIATE_ROUTES.campaigns,
    },
    {
      key: 'learningSpace',
      icon: NotebookPen,
      requiredRoles: [ROLE_LIST.LEARNER],
      href: LEARNER_ROUTES.dashboard,
    },
    {
      key: 'wallet',
      icon: Wallet,
      requiredRoles: [ROLE_LIST.LEARNER],
      href: PROTECTED_ROUTES.wallet,
    },
    {
      key: 'myPost',
      icon: FileText,
      requiredRoles: [ROLE_LIST.LEARNER],
      href: createAPIUrl({ endpoint: BLOG_ROUTES.authorBlog, params: { username: user.username } }),
      hasSepratePage: true,
    },
    {
      key: 'admin',
      icon: Bolt,
      requiredRoles: [
        ROLE_LIST.SYSTEM_ADMIN,
        ROLE_LIST.ADMIN,
        ROLE_LIST.MODERATOR,
        ROLE_LIST.ORG_ADMIN,
        ROLE_LIST.ORG_MODERATOR,
      ],
      href: ADMIN_ROUTES.dashboard,
      hasSepratePage: true,
    },
    {
      key: 'creator',
      icon: GraduationCap,
      requiredRoles: [ROLE_LIST.PARTNER],
      href: CREATOR_ROUTES.dashboard,
      hasSepratePage: true,
    },
    {
      key: 'organizationBlog',
      icon: ScrollText,
      requiredRoles: [ROLE_LIST.ORG_EDITOR, ROLE_LIST.ORG_WRITER],
      href: BLOG_ADMIN_ROUTES.myBlog,
      hasSepratePage: true,
    },
  ] as MenuItem[];
