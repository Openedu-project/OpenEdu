import { ROLE_LIST } from '@oe/core/utils/constants';
import { ADMIN_ROUTES, AFFILIATE_ROUTES, BLOG_ADMIN_ROUTES, CREATOR_ROUTES } from '@oe/core/utils/routes';
import { Settings, User } from 'lucide-react';

type MenuItem = {
  key: string;
  icon: typeof Settings | typeof User;
  requiredRoles: string[];
  href: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    key: 'profile',
    icon: User,
    requiredRoles: Object.values(ROLE_LIST),
    href: '',
  },
  {
    key: 'admin',
    icon: Settings,
    requiredRoles: [
      ROLE_LIST.SYSTEM_ADMIN,
      ROLE_LIST.ADMIN,
      ROLE_LIST.MODERATOR,
      ROLE_LIST.ORG_ADMIN,
      ROLE_LIST.ORG_MODERATOR,
    ],
    href: ADMIN_ROUTES.dashboard,
  },
  {
    key: 'creator',
    icon: Settings,
    requiredRoles: [ROLE_LIST.PARTNER],
    href: CREATOR_ROUTES.dashboard,
  },
  {
    key: 'organizationBlog',
    icon: Settings,
    requiredRoles: [ROLE_LIST.ORG_EDITOR, ROLE_LIST.ORG_WRITER],
    href: BLOG_ADMIN_ROUTES.myBlog,
  },
  {
    key: 'learningSpace',
    icon: Settings,
    requiredRoles: [ROLE_LIST.LEARNER],
    href: '#',
  },
  {
    key: 'affiliate',
    icon: Settings,
    requiredRoles: [ROLE_LIST.LEARNER],
    href: AFFILIATE_ROUTES.campaigns,
  },
  {
    key: 'wallet',
    icon: Settings,
    requiredRoles: [ROLE_LIST.LEARNER],
    href: '#',
  },
  {
    key: 'myBlog',
    icon: Settings,
    requiredRoles: [ROLE_LIST.LEARNER],
    href: '#',
  },
] as const;
