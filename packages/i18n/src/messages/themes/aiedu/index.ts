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
                label: 'Giới Thiệu',
              },
              'items-1': {
                label: 'Bảng Xếp Hạng',
              },
              'items-2': {
                label: 'Khoá Học AI',
              },
              'items-3': {
                label: 'Lịch Trình',
              },
              'items-4': {
                label: 'Tin Tức',
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
            label: 'Chính Sách',
            items: {
              'items-0': {
                label: 'Điều Khoản Bảo Mật',
              },
              'items-1': {
                label: 'Giải Đáp Thăc Mắc',
              },
            },
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
            label: 'Bảng Xếp Hạng',
          },
          'sidebarItems-2': {
            id: 'courses',
            href: '/courses',
            label: 'Khoá Học AI',
          },
          'sidebarItems-3': {
            id: 'blog',
            href: '/news-feed',
            label: 'Tin Tức',
          },
          'sidebarItems-4': {
            id: 'schedule',
            href: '/schedule',
            label: 'Lịch Trình',
          },
        },
      },
    },
  },
};
