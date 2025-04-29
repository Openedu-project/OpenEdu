import type { ICertificateData, ICertificateElement } from '@oe/api';
import { formatDate } from '@oe/core';

export const fonts = [
  {
    name: 'Inter',
    family: 'Inter',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Open Sans',
    family: 'Open Sans',
    weights: ['300', '400', '500', '600', '700', '800'],
  },
  {
    name: 'Montserrat',
    family: 'Montserrat',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Nunito',
    family: 'Nunito',
    weights: ['200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Bitter',
    family: 'Bitter',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Roboto Condensed',
    family: 'Roboto Condensed',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Roboto Mono',
    family: 'Roboto Mono',
    weights: ['100', '200', '300', '400', '500', '600', '700'],
  },
  {
    name: 'Alex Brush',
    family: 'Alex Brush',
    weights: ['400'],
  },
  {
    name: 'Great Vibes',
    family: 'Great Vibes',
    weights: ['400'],
  },
  {
    name: 'Pinyon Script',
    family: 'Pinyon Script',
    weights: ['400'],
  },
  {
    name: 'Aleo',
    family: 'Aleo',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Be Vietnam Pro',
    family: 'Be Vietnam Pro',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Comfortaa',
    family: 'Comfortaa',
    weights: ['300', '400', '500', '600', '700'],
  },
  {
    name: 'Cormorant Garamond',
    family: 'Cormorant Garamond',
    weights: ['300', '400', '500', '600', '700'],
  },
  {
    name: 'Dancing Script',
    family: 'Dancing Script',
    weights: ['400', '500', '600', '700'],
  },
  {
    name: 'EB Garamond',
    family: 'EB Garamond',
    weights: ['400', '500', '600', '700', '800'],
  },
  {
    name: 'Hanken Grotesk',
    family: 'Hanken Grotesk',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Imperial Script',
    family: 'Imperial Script',
    weights: ['400'],
  },
  {
    name: 'Lobster',
    family: 'Lobster',
    weights: ['400'],
  },
  {
    name: 'Lora',
    family: 'Lora',
    weights: ['400', '500', '600', '700'],
  },
  {
    name: 'Mulish',
    family: 'Mulish',
    weights: ['200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Noto Sans',
    family: 'Noto Sans',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Playfair Display',
    family: 'Playfair Display',
    weights: ['400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Raleway',
    family: 'Raleway',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Roboto Slab',
    family: 'Roboto Slab',
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Space Grotesk',
    family: 'Space Grotesk',
    weights: ['300', '400', '500', '600', '700'],
  },
  // {
  //   name: 'Plus Jakarta Sans',
  //   family: 'Plus Jakarta Sans',
  //   weights: ['300', '400', '500', '600', '700'],
  // },
];

export function interpolateContent(content: string, data?: ICertificateData) {
  if (!data) {
    return content;
  }

  return content.replace(/\{\{(.*?)\}\}/g, (match, key: keyof ICertificateData) => {
    if ((key === 'learner_name' || key === 'course_name' || key === 'project_name') && data[key]) {
      return data[key];
    }
    if (key === 'issue_date' && data[key]) {
      return formatDate(new Date(data[key]).getTime());
    }
    return match;
  });
}

export const getElementPosition = (element: ICertificateElement) => {
  const position = element.styles?.position || 'top-left';

  switch (position) {
    case 'top-left':
      return {
        left: element.styles?.x || 0,
        top: element.styles?.y || 0,
      };
    case 'top-right':
      return {
        right: element.styles?.right || 0,
        top: element.styles?.y || 0,
      };
    case 'bottom-left':
      return {
        left: element.styles?.x || 0,
        bottom: element.styles?.bottom || 0,
      };
    case 'bottom-right':
      return {
        right: element.styles?.right || 0,
        bottom: element.styles?.bottom || 0,
      };
    default:
      return {
        left: element.styles?.x || 0,
        top: element.styles?.y || 0,
      };
  }
};

export const getJustifyContent = (element?: ICertificateElement) => {
  const position = element?.styles?.position || 'top-left';

  if (position === 'top-right' || position === 'bottom-right') {
    return 'flex-end';
  }
  return 'flex-start';
};

export const getJustifyClass = (element?: ICertificateElement) => {
  const position = element?.styles?.position || 'top-left';

  if (position === 'top-right' || position === 'bottom-right') {
    return 'justify-end';
  }
  return 'justify-start';
};

export const getItemsClass = (element?: ICertificateElement) => {
  const position = element?.styles?.position || 'top-left';

  if (position === 'top-right' || position === 'bottom-right') {
    return 'items-end';
  }

  return 'items-start';
};

export const pxToPt = (px: number): number => {
  return Math.round(((px * 72) / 96) * 100) / 100;
};
