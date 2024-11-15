import { cn } from '@oe/ui/utils/cn';

import type { BlocksResultProps } from '../grapesjs';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@oe/ui/shadcn/accordion';
import { MAIN_BORDER_COLOR } from '../utils';

export type CustomBlockManagerProps = Pick<BlocksResultProps, 'mapCategoryBlocks' | 'dragStart' | 'dragStop'>;

export default function CustomBlockManager({ mapCategoryBlocks, dragStart, dragStop }: CustomBlockManagerProps) {
  return (
    <>
      <Accordion type="multiple" className="w-full">
        {[...mapCategoryBlocks].map(([category, blocks]) => (
          <AccordionItem value={category} key={category}>
            <AccordionTrigger className="px-4">
              {category}
              {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
            </AccordionTrigger>
            <AccordionContent className="flex flex-wrap">
              {blocks.map(block => (
                <div
                  key={block.getId()}
                  draggable
                  className={cn(
                    'flex cursor-pointer flex-col items-center rounded border px-5 py-2 transition-colors',
                    MAIN_BORDER_COLOR
                  )}
                  onDragStart={ev => dragStart(block, ev.nativeEvent)}
                  onDragEnd={() => dragStop(false)}
                >
                  {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                  <div className="h-10 w-10" dangerouslySetInnerHTML={{ __html: block.getMedia() as string }} />
                  <div
                    className="w-full text-center text-sm"
                    title={block.getId()}
                    // biome-ignore lint/security/noDangerouslySetInnerHtmlWithChildren: <explanation>
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                    dangerouslySetInnerHTML={{ __html: block.getLabel() as string }}
                  >
                    {/* {block.getLabel()} */}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
