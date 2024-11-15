import { Provider } from '@oe/ui/common/providers';
import { RichTextEditor } from '@oe/ui/components/rich-text';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import type { ComponentDefinition, Editor } from 'grapesjs';
import type { AbstractIntlMessages } from 'next-intl';
import type React from 'react';

// const RichTextEditorWrapper = ({
//   messages,
//   locale,
//   ...props
// }: RichTextEditorProps & { messages: AbstractIntlMessages; locale: string }) => {
//   return (
//     <Provider messages={messages} locale={locale}>
//       <RichTextEditor {...props} />
//     </Provider>
//   );
// };

export const shadcnPlugin = (editor: Editor, messages: AbstractIntlMessages, locale: string) => {
  const { Blocks, Components } = editor;

  const addShadcnComponent = ({
    type,
    Component,
    props,
  }: {
    type: string;
    Component: React.ComponentType;
    props?: ComponentDefinition;
  }) => {
    Components.addType(type, {
      extend: 'react-component',
      model: {
        defaults: {
          ...props,
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          component: (props: any) => (
            <Provider messages={messages} locale={locale}>
              <Component {...props} />
            </Provider>
          ),
        },
      },
    });

    Blocks.add(type, {
      label: type,
      category: 'Shadcn UI',
      content: { type },
    });
  };

  addShadcnComponent({
    type: 'shadcn-button',
    Component: Button,
    props: {
      attributes: { variant: 'default' },
      components: 'Click me',
    },
  });

  // Thêm Input Component
  addShadcnComponent({
    type: 'shadcn-input',
    Component: Input,
    props: {
      attributes: { placeholder: 'Type here...' },
    },
  });
  addShadcnComponent({
    type: 'shadcn-rich-text',
    Component: RichTextEditor,
    props: {
      attributes: {
        menuBarItems: ['-aiGenerate'],
        value: 'Hello world',
      },
    },
  });
};
