import type { BlockCategoryProperties, BlockProperties, Editor } from 'grapesjs';

import { sources } from './tailblocks';

export interface PluginOptions {
  openCategory?: string;
}

const getSvgHtml = (svg: SVGElement): string => {
  if (typeof window === 'undefined') {
    return '';
  }
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  return svg.outerHTML;
};

export default (editor: Editor, options: PluginOptions = {}) => {
  const bm = editor.Blocks;

  for (const s of sources) {
    const block: BlockProperties = {
      label: getSvgHtml(editor.$(s.label).get(0) as SVGElement),
      attributes: { class: `${s.class} block-full-width` },
      content: s.content,
      category: { label: s.category, open: s.category === options.openCategory } as
        | string
        | BlockCategoryProperties
        | undefined,
    };

    bm.add(s.id, block);
  }
};
