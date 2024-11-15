import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@oe/ui/shadcn/accordion';

import type { StylesResultProps } from '../grapesjs';

import StylePropertyField from './style-property-field';

export default function CustomStyleManager({ sectors }: Omit<StylesResultProps, 'Container'>) {
  return (
    // <div className="gjs-custom-style-manager text-left">
    <Accordion type="multiple" className="w-full">
      {sectors.map(sector => (
        <AccordionItem value={sector.getId()} key={sector.getId()}>
          <AccordionTrigger className="px-4">
            {sector.getName()}
            {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
          </AccordionTrigger>
          <AccordionContent className="flex flex-wrap">
            {sector.getProperties().map(prop => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    // </div>
  );
}
