import { Extension } from '@tiptap/core';

export const TextColor = Extension.create({
  name: 'textColor',
  addOptions() {
    return { types: ['textStyle'] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: element => element.style.color?.replace(/["']+/g, ''),
            renderHTML: attributes => {
              if (!attributes.color) {
                return {};
              }
              return { style: `color: ${attributes.color}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setTextColor:
        color =>
        ({ commands }) =>
          commands.setMark('textStyle', { color }),
      unsetTextColor:
        () =>
        ({ commands }) =>
          commands.setMark('textStyle', { color: null }),
    };
  },
});

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textColor: {
      setTextColor: (color: string) => ReturnType;
      unsetTextColor: () => ReturnType;
    };
  }
}
