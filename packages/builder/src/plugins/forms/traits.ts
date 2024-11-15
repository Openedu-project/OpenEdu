/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, Editor } from 'grapesjs';

import { typeOption } from './components';

export default function (editor: Editor) {
  const trm = editor.TraitManager;

  trm.addType('select-options', {
    events: {
      keyup: 'onChange',
    },

    onValueChange() {
      const { model, target } = this;
      const optionsStr = (model.get('value') as string).trim();
      const options = optionsStr.split('\n');
      // biome-ignore lint/suspicious/noEvolvingTypes: <explanation>
      const optComps = [];

      for (const optionStr of options) {
        const option = optionStr.split('::');

        optComps.push({
          type: typeOption,
          components: option[1] || option[0],
          attributes: { value: option[0] },
        });
      }

      target.components().reset(optComps);
      target.view?.render();
    },

    getInputEl() {
      if (!this.$input) {
        const optionsArr = [] as (Component | string)[];
        const options = this.target.components();

        for (let i = 0; i < options.length; i++) {
          const option = options.models[i];
          const optAttr = (option as Component).get('attributes');
          const optValue = optAttr?.value || '';
          const optTxtNode = (option as Component).components().models[0];
          const optLabel = optTxtNode?.get('content') || '';

          optionsArr.push(`${optValue}::${optLabel}`);
        }

        const el = document.createElement('textarea');

        el.value = optionsArr.join('\n');
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        this.$input = el as any;
      }

      return this.$input;
    },
  });
}
