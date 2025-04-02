// 'use client';

// import type { TLessonContent } from '@oe/api/types/course/basic';
// import type { ContentRendererProps } from './_types/types';
// import { CONTENT_RENDERERS } from './content-render';

// interface ContentElementProps extends ContentRendererProps {
//   type: TLessonContent;
// }

// export const ContentElement = ({ type, ...props }: ContentElementProps) => {
//   const renderer = CONTENT_RENDERERS[type];

//   if (!renderer) {
//     return null;
//   }

//   return <>{renderer.render({ ...props })}</>;
// };
