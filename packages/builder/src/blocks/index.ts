import type { Editor } from 'grapesjs';
import type { PluginOptions } from './tailwind';

import loadTailwindBlocks from './tailwind';

export default (editor: Editor, opts: PluginOptions = {}) => {
  loadTailwindBlocks(editor, opts);
};
