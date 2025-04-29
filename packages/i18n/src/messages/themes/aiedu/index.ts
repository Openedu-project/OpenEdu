import { authMessages } from '../auth';
import { aieduHomepage } from './homepage';
import { aieduIntroduction } from './introduction';
import { aieduRanking } from './ranking';
// Theme step 19 (optional): add translate
export const aieduMessage = {
  //Theme step 19.1 Syntax ${themeName}: translate
  aiedu: {
    ...aieduHomepage,
    ...aieduIntroduction,
    ...aieduRanking,
    auth: {
      ...authMessages.auth,
      footer: {
        description:
          'Chương trình phổ cập AI dành cho thanh thiếu niên Việt Nam Học miễn phí, ứng dụng thật, sẵn sàng cho tương lai. Đưa tri thức AI đến mọi bạn trẻ, xây nền tảng vững chắc cho thế hệ Việt Nam làm chủ công nghệ ',
        navigationItems: {
          registration: {
            label: 'Danh Mục ',
            items: {
              'items-0': {
                label: 'Giới thiệu',
              },
              'items-1': {
                label: 'Bảng xếp hạng',
              },
              'items-2': {
                label: 'Khoá học AI',
              },
              'items-3': {
                label: 'Lịch trình',
              },
              'items-4': {
                label: 'Tin tức',
              },
            },
          },
          terms: {
            label: 'Hỗ Trợ',
            items: {
              'items-0': {
                label: 'Facebook',
              },
              'items-1': {
                label: 'Zalo Group',
              },
              'items-2': {
                label: 'X',
              },
              'items-3': {
                label: 'Email',
              },
            },
          },
          social: {
            label: 'QR Code',
          },
        },
      },
      header: {
        sidebarItems: {
          'sidebarItems-0': {
            id: 'introduction',
            href: '/introduction',
            label: 'Giới thiệu',
          },
          'sidebarItems-1': {
            id: 'ranking',
            href: '/ranking',
            label: 'Bảng xếp hạng',
          },
          'sidebarItems-2': {
            id: 'courses',
            href: '/courses',
            label: 'Khoá học AI',
          },
          'sidebarItems-3': {
            id: 'blog',
            href: '/blog',
            label: 'Tin tức',
          },
          'sidebarItems-4': {
            id: 'schedule',
            href: '/schedule',
            label: 'Lịch trình',
          },
        },
      },
    },
  },
};
