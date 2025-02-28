import { Frame, Layers, Settings } from 'lucide-react';
import { Button } from '#shadcn/button';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#shadcn/tabs';
import { cn } from '#utils/cn';
import { useCertificateBuilder } from '../provider';
import { ElementTab } from './tabs/element-tab';
import { FrameTab } from './tabs/frame-tab';
import { LayerTab } from './tabs/layer-tab';

type TabType = 'frame' | 'element' | 'layers';

type Tab = {
  id: TabType;
  icon: ReactNode;
  label: string;
  disabled: boolean;
};

export const Sidebar = () => {
  const tCertificate = useTranslations('certificate');
  const { selectedElementId } = useCertificateBuilder();

  const [activeTab, setActiveTab] = useState<TabType>('frame');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!selectedElementId) {
      setActiveTab('frame');
    }
  }, [selectedElementId]);

  const tabs: Tab[] = [
    {
      id: 'frame',
      icon: <Frame className="h-4 w-4" />,
      label: tCertificate('builder.tabs.frame'),
      disabled: false,
    },
    {
      id: 'element',
      icon: <Settings className="h-4 w-4" />,
      label: tCertificate('builder.tabs.element'),
      disabled: !selectedElementId,
    },
    {
      id: 'layers',
      icon: <Layers className="h-4 w-4" />,
      label: tCertificate('builder.tabs.layers'),
      disabled: false,
    },
  ] as const;

  // const handleDeleteElement = (id: string) => {
  //   deleteElement(id);
  //   setActiveTab("elements");
  //   selectElement(null);
  // };

  return (
    <div
      className={cn(
        'absolute top-0 right-0 z-10 flex h-full w-80 translate-x-full flex-col border-l bg-background transition-transform duration-300 ease-in-out',
        {
          'translate-x-0': isOpen,
        },
        'md:static md:translate-x-0'
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="-left-8 absolute top-2 h-8 w-8 rounded-md rounded-tr-none rounded-br-none border border-r-0 bg-background text-muted-foreground hover:text-muted-foreground/80 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      <Tabs value={activeTab} onValueChange={value => setActiveTab(value as TabType)} className="flex h-full flex-col">
        <TabsList className="grid w-full grid-cols-3 bg-background">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex gap-2 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none"
              disabled={tab.disabled}
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="frame" className="scrollbar flex-1 overflow-y-auto">
          <FrameTab />
        </TabsContent>
        <TabsContent value="element" className="scrollbar flex-1 overflow-y-auto">
          <ElementTab />
        </TabsContent>
        <TabsContent value="layers" className="scrollbar flex-1 overflow-y-auto">
          <LayerTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
