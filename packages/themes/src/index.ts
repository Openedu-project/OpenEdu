// 'use client';
import { AcademiaAboutUs, AcademiaHomePage } from './academia';
import { ScholarAboutUs, ScholarHomePage } from './scholar';

export const THEMES = {
  academia: {
    HomePage: AcademiaHomePage,
    AboutUs: AcademiaAboutUs,
  },
  scholar: {
    HomePage: ScholarHomePage,
    AboutUs: ScholarAboutUs,
  },
  professional: {
    description: 'Giao diện hiện đại, chuyên nghiệp',
    homePage: '',
  },
  wisdom: {
    description: 'Tông màu trầm ấm, tạo không khí học tập',
    homePage: '',
  },
  nova: {
    description: 'Thiết kế tối giản, hiện đại',
    homePage: '',
  },
  spark: {
    description: 'Năng động, tươi sáng',
    homePage: '',
  },
  dynamix: {
    description: 'Linh hoạt và sinh động',
    homePage: '',
  },
  quantum: {
    description: 'Đột phá và sáng tạo',
    homePage: '',
  },
  techHub: {
    description: 'Cho các khóa học công nghệ',
    homePage: '',
  },
  creative: {
    description: 'Cho các khóa học thiết kế, nghệ thuật',
    homePage: '',
  },
  business: {
    description: 'Cho các khóa học kinh doanh',
    homePage: '',
  },
  scienceLab: {
    description: 'Cho các khóa học khoa học',
    homePage: '',
  },
  spring: {
    description: 'Tươi sáng, nhiều màu pastel',
    homePage: '',
  },
  summer: {
    description: 'Rực rỡ, năng động',
    homePage: '',
  },
  autumn: {
    description: 'Ấm áp, trầm ấm',
    homePage: '',
  },
  winter: {
    description: 'Thanh lịch, tinh tế',
    homePage: '',
  },
  azure: {
    description: 'Chủ đạo màu xanh dương',
    homePage: '',
  },
  forest: {
    description: 'Chủ đạo màu xanh lá',
    homePage: '',
  },
  sunset: {
    description: 'Chủ đạo màu cam, đỏ',
    homePage: '',
  },
  midnight: {
    description: 'Chủ đạo màu tối, thanh lịch',
    homePage: '',
  },
} as const;

export type ThemeName = keyof typeof THEMES;
