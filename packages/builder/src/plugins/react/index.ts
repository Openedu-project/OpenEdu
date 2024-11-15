import type { Component, Editor } from 'grapesjs';
import React, { type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

// const voidElements = [
//   'input',
//   'img',
//   'br',
//   'hr',
//   'area',
//   'base',
//   'col',
//   'embed',
//   'link',
//   'meta',
//   'param',
//   'source',
//   'track',
//   'wbr',
// ];

export default (editor: Editor) => {
  const componentManager = editor.Components;
  const defaultType = componentManager.getType('default');
  const defaultModel = defaultType.model;
  // const CHILDREN_WRAPPER_ATTR = 'data-react-children';

  componentManager.addType('react-component', {
    model: {
      toHTML(opts = {}) {
        return defaultModel.prototype.toHTML.call(this, {
          ...opts,
          tag: this.get('type'),
        });
      },
    },
    view: {
      onRender() {
        this.renderReactComponent();
      },

      renderReactComponent() {
        const { model, el } = this;
        const ReactComponent = model.get('component');
        if (!ReactComponent) {
          console.warn('React component not found', model);
          return;
        }

        const props = {
          ...model.get('attributes'),
        };

        const children = model.components().map((child: Component) => {
          return child.toHTML();
        });

        const reactElement = React.createElement(
          ReactComponent,
          props,
          (children.length > 0 ? children[0] : undefined) as ReactNode
        );

        if (!this.reactRootInstance) {
          this.reactRootInstance = createRoot(el);
        }
        this.reactRootInstance.render(reactElement);
      },
    },
  });
};
