import { getUnlocalizedPathname } from '@oe/i18n/utils';

export const DYNAMIC_FORMS_ROUTES = {
  formList: '/forms',
  createForm: '/forms/create',
  formDetail: '/forms/:id',
  formTemplates: '/forms/templates',
} as const;

export const PLATFORM_ROUTES = {
  homepage: '/',
  orgNotFound: '/org-not-found',
  unauthorized: '/unauthorized',
  aboutUs: '/about-us',
  contactUs: '/contact-us',
  courses: '/courses',
  courseDetail: '/courses/:slug',
  courseLearning: '/courses/:slug/:section/:lesson',
  payment: '/courses/:slug/payment',
  notFound: '/not-found',
  terms: '/terms',
  specificTerms: '/terms/:terms',
  userProfile: '/user/:username',
} as const;

export const BLOG_ROUTES = {
  blog: '/blog',
  blogDetail: '/blog/organization/:slug',
  personBlogDetail: '/blog/:username/:slug',
  blogHashtag: '/blog/hashtag/:id',
  blogCategory: '/blog/category/:id',
  blogSearchResult: '/blog/search-result',
  blogManagement: '/blog/me/management',
  createBlog: '/blog/me/create',
  editBlog: '/blog/me/:id/edit',
  previewBlog: '/blog/me/:id/preview',
  authorBlog: '/blog/author/:username',
};

export const BLOG_ADMIN_ROUTES = {
  writerMgt: '/blog-admin/writer-management',
  editorMgt: '/blog-admin/editor-management',
  inviteMgt: '/blog-admin/invitation-management',
  orgBlogMgt: '/blog-admin/org-blog',
  userBlogMgt: '/blog-admin/user-blog',
  requestMgt: '/blog-admin/request',
  blogCategory: '/blog-admin/blog-category',
  myBlog: '/blog-admin/my-blog',
  createBlog: '/blog-admin/create',
  editBlog: '/blog-admin/:id/edit',
  previewBlog: '/blog-admin/:id/preview',
};

export const AUTH_ROUTES = {
  login: '/login',
  signUp: '/signup',
  forgotPassword: '/forgot-password',
  forgotPasswordSuccess: '/forgot-password-success',
  setPassword: '/set-password',
  confirmInvitation: '/confirm-invitation',
  socialLogin: '/social-login',
} as const;

export const ADMIN_ROUTES = {
  dashboard: '/admin',
  courses: '/admin/course/list',
  courseCategories: '/admin/course/categories',
  coursesReviewing: '/admin/course/reviewing',
  allUsers: '/admin/user/list',
  emailSettings: '/admin/site-settings/emails',
  generalSettings: '/admin/site-settings/general',
  languageSettings: '/admin/site-settings/languages',
  pagesSettings: '/admin/site-settings/pages',
  themesSettings: '/admin/site-settings/themes',
  themeDetail: '/admin/themes/:themeName',
  permissionActionSettings: '/admin/permissions/actions',
  permissionPageSettings: '/admin/permissions/pages',
  permissionRoleSettings: '/admin/permissions/roles',
  creatorManagementCreators: '/admin/creator-management/creators',
  creatorManagementRequests: '/admin/creator-management/requests',
  creatorManagementInvitations: '/admin/creator-management/invitations',
  organizationRequests: '/admin/organizations/organization-requests',
  organizationManagement: '/admin/organizations/organizations-management',
  formList: `/admin${DYNAMIC_FORMS_ROUTES.formList}`,
  createForm: `/admin${DYNAMIC_FORMS_ROUTES.createForm}`,
  formDetail: `/admin${DYNAMIC_FORMS_ROUTES.formDetail}`,
  formTemplates: `/admin${DYNAMIC_FORMS_ROUTES.formTemplates}`,
  withdrawRequest: '/admin/withdraw-request',
} as const;

export const CREATOR_ROUTES = {
  dashboard: '/creator',
  courses: '/creator/courses',
  coupon: '/creator/coupon',
  formList: `/creator${DYNAMIC_FORMS_ROUTES.formList}`,
  createForm: `/creator${DYNAMIC_FORMS_ROUTES.createForm}`,
  formDetail: `/creator${DYNAMIC_FORMS_ROUTES.formDetail}`,
  formTemplates: `/creator${DYNAMIC_FORMS_ROUTES.formTemplates}`,
  aiGeneralInfo: '/creator/courses/ai-creation/general-info',
  aiSettingUp: '/creator/courses/:courseId/settings',
  aiYoutubePlaylist: '/creator/courses/ai-creation/youtube-playlist',
} as const;

export const PROTECTED_ROUTES = {
  admin: '/admin',
  creator: '/creator',
  learner: '/learner',
  blog: '/blog-admin',
  affiliate: '/affiliate',
} as const;

export const ZONE_ROUTES = {
  platform: '/',
  // admin: '/admin',
  // creator: '/creator',
  // learner: '/learner',
  // affiliate: '/affiliate',
  blog: '/blog',
  // landing: '/landing',
} as const;

export const REFERRER_ROUTES = {
  admin: '/admin',
  creator: '/creator',
} as const;

export const SITEMAP_ROUTES = [
  {
    path: PLATFORM_ROUTES.homepage,
    priority: 1,
    changeFrequency: 'daily' as const,
  },
  {
    path: PLATFORM_ROUTES.aboutUs,
    priority: 0.8,
    changeFrequency: 'daily' as const,
  },
  {
    path: PLATFORM_ROUTES.contactUs,
    priority: 0.8,
    changeFrequency: 'daily' as const,
  },
  {
    path: PLATFORM_ROUTES.courses,
    priority: 0.8,
    changeFrequency: 'daily' as const,
  },
  {
    path: PLATFORM_ROUTES.courseDetail,
    priority: 0.8,
    changeFrequency: 'daily' as const,
    isDynamic: true,
  },
  {
    path: PLATFORM_ROUTES.terms,
    priority: 0.8,
    changeFrequency: 'daily' as const,
  },
  {
    path: PLATFORM_ROUTES.specificTerms,
    priority: 0.8,
    changeFrequency: 'daily' as const,
    isDynamic: true,
  },
];

export function isProtectedRoute(pathname: string) {
  const unlocalizedPathname = getUnlocalizedPathname(pathname);
  return Object.entries(PROTECTED_ROUTES).some(([_, path]) => unlocalizedPathname.startsWith(path));
}

export function isZoneRoute(pathname: string, zone: IZoneRoutes) {
  const unlocalizedPathname = getUnlocalizedPathname(pathname);
  return Object.entries(ZONE_ROUTES).some(
    ([zoneName, path]) => zoneName === zone && unlocalizedPathname.startsWith(path)
  );
}

export function generateRoute(pathname: string, params: Record<string, unknown>) {
  let url = pathname;

  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, value as string);
  }
  return url;
}

export type IZoneRoutes = keyof typeof ZONE_ROUTES;
export type IZoneRoutesValues = (typeof ZONE_ROUTES)[IZoneRoutes];

export type IProtectedRoutes = keyof typeof PROTECTED_ROUTES;
export type IProtectedRoutesValues = (typeof PROTECTED_ROUTES)[IProtectedRoutes];

export type IReferrerRoutes = keyof typeof REFERRER_ROUTES;
