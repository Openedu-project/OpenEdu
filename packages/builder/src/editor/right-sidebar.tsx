import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { cn } from '@oe/ui/utils/cn';
import { Brush, FileText, Grid, Layers, Settings } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import {
  BlocksProvider,
  LayersProvider,
  PagesProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from '../grapesjs';

import { MAIN_BORDER_COLOR } from '../utils';
import CustomBlockManager from './custom-block-manager';
import CustomLayerManager from './custom-layer-manager';
import CustomPageManager from './custom-page-manager';
import CustomSelectorManager from './custom-selector-manager';
import CustomStyleManager from './custom-style-manager';
import CustomTraitManager from './custom-trait-manager';

export default function RightSidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [selectedTab, setSelectedTab] = useState('style');

  return (
    <div className={cn('gjs-right-sidebar scrollbar flex flex-col overflow-y-auto', className)}>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="sticky top-0 grid w-full grid-cols-5 ">
          <TabsTrigger value="style">
            <Brush className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="traits">
            <Settings className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="layers">
            <Layers className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="blocks">
            <Grid className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="pages">
            <FileText className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        <div className={cn('flex-grow border-t', MAIN_BORDER_COLOR)}>
          <TabsContent value="style">
            <SelectorsProvider>{props => <CustomSelectorManager {...props} />}</SelectorsProvider>
            <StylesProvider>{props => <CustomStyleManager {...props} />}</StylesProvider>
          </TabsContent>
          <TabsContent value="traits">
            <TraitsProvider>{props => <CustomTraitManager {...props} />}</TraitsProvider>
          </TabsContent>
          <TabsContent value="layers">
            <LayersProvider>{props => <CustomLayerManager {...props} />}</LayersProvider>
          </TabsContent>
          <TabsContent value="blocks">
            <BlocksProvider>{props => <CustomBlockManager {...props} />}</BlocksProvider>
          </TabsContent>
          <TabsContent value="pages">
            <PagesProvider>{props => <CustomPageManager {...props} />}</PagesProvider>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
