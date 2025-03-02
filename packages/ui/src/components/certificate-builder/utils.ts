import type { ICertificateData, ICertificateElement } from '@oe/api/types/certificate';
import { formatDate } from '@oe/core/utils/datetime';

export const fonts = [
  {
    name: 'Inter',
    family: 'Inter',
    weights: ['400', '700'],
  },
  {
    name: 'Open Sans',
    family: 'Open Sans',
    weights: ['400', '700'],
  },
  {
    name: 'Montserrat',
    family: 'Montserrat',
    weights: ['400', '700'],
  },
  {
    name: 'Nunito',
    family: 'Nunito',
    weights: ['400', '700'],
  },
  {
    name: 'Assistant',
    family: 'Assistant',
    weights: ['400', '700'],
  },
  {
    name: 'Oswald',
    family: 'Oswald',
    weights: ['400', '700'],
  },
  {
    name: 'Bitter',
    family: 'Bitter',
    weights: ['400', '700'],
  },
  {
    name: 'Roboto Condensed',
    family: 'Roboto Condensed',
    weights: ['400', '700'],
  },
  {
    name: 'Roboto Mono',
    family: 'Roboto Mono',
    weights: ['400', '700'],
  },
  {
    name: 'Alex Brush',
    family: 'Alex Brush',
    weights: ['400', '700'],
  },
  {
    name: 'Great Vibes',
    family: 'Great Vibes',
    weights: ['400', '700'],
  },
  {
    name: 'Rouge Script',
    family: 'Rouge Script',
    weights: ['400', '700'],
  },
];

export function interpolateContent(content: string, data?: ICertificateData) {
  if (!data) {
    return content;
  }

  return content.replace(/\{\{(.*?)\}\}/g, (match, key: keyof ICertificateData) => {
    if ((key === 'learner_name' || key === 'course_name') && data[key]) {
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
