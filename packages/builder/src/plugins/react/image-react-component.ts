import type { Plugin, PluginOptions } from 'grapesjs';

export const ImagePlugin: Plugin<PluginOptions> = (editor, { coreReactModel, coreReactView }) => {
  editor.Components.addType('image-react-component', {
    extend: 'image',
    model: {
      ...coreReactModel,
      defaults: {
        name: 'Image',
        highlightable: false,
        resizable: false,
        stylable: true,
        editable: true,
        draggable: true,
        droppable: true,
      },
    },

    view: {
      ...coreReactView,
    },
  });
};
