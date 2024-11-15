import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';

const imageRegex = /!\[(.+|)]\((\S+)\)/;
export const Image = Node.create({
  name: 'image',
  inline: false,
  group: 'block',
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: 'img[src]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  addCommands() {
    return {
      setImage:
        options =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: options }),
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: imageRegex,
        type: this.type,
        getAttributes: match => {
          const [, alt, src] = match;
          return { src, alt };
        },
      }),
    ];
  },
});

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { src: string; alt?: string; title?: string }) => ReturnType;
    };
  }
}
