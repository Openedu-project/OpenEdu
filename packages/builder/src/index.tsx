'use client';

import grapesjs from 'grapesjs';
import gjsblockbasic from 'grapesjs-blocks-basic';
// import gjsTailwind from 'grapesjs-tailwind';
import { AssetsProvider, Canvas, GjsEditor, ModalProvider } from './grapesjs';

import type { Editor, EditorConfig } from 'grapesjs';

import { useLocale, useMessages } from 'next-intl';
import blocks from './blocks';
import CustomAssetManager from './editor/custom-asset-manager';
import CustomModal from './editor/custom-modal';
import RightSidebar from './editor/right-sidebar';
import Topbar from './editor/topbar';
import gjsForms from './plugins/forms';
import reactPlugin from './plugins/react';
import { shadcnPlugin } from './plugins/shadcn';
import { MAIN_BORDER_COLOR } from './utils';

const gjsOptions: EditorConfig = {
  height: '100dvh',
  // storageManager: true,
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  canvas: {
    styles: [`${process.env.NEXT_PUBLIC_APP_ADMIN_ORIGIN}/builder-tailwind.css`],
    frameContent: '<!DOCTYPE html><html><body class="scrollbar"></body></html>',
  },
  projectData: {
    assets: [
      'https://via.placeholder.com/350x250/78c5d6/fff',
      'https://via.placeholder.com/350x250/459ba8/fff',
      'https://via.placeholder.com/350x250/79c267/fff',
      'https://via.placeholder.com/350x250/c5d647/fff',
      'https://via.placeholder.com/350x250/f28c33/fff',
    ],
    pages: [
      {
        name: 'Home page',
        component: '<h1>GrapesJS React Custom UI</h1>',
      },
    ],
  },
};

export type EditorInstance = Editor;

export default function Builder({ onEditor }: { onEditor?: (editor: Editor) => void }) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <GjsEditor
      grapesjs={grapesjs}
      options={gjsOptions}
      plugins={[gjsblockbasic, reactPlugin, editor => shadcnPlugin(editor, messages, locale), gjsForms, blocks]}
      onEditor={onEditor}
      className="overflow-hidden"
    >
      <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
        <div className="flex flex-grow flex-col">
          <Topbar className="min-h-[48px]" />
          <Canvas className="flex-grow bg-muted" />
        </div>
        <RightSidebar className={`w-[300px] border-l ${MAIN_BORDER_COLOR}`} />
      </div>
      <ModalProvider>
        {({ open, title, content, close }) => (
          <CustomModal open={open} title={title} close={close}>
            {content}
          </CustomModal>
        )}
      </ModalProvider>
      <AssetsProvider>
        {({ assets, select, Container }) => (
          <Container>
            <CustomAssetManager
              assets={assets}
              select={select}
              // close={close}
            />
          </Container>
        )}
      </AssetsProvider>
    </GjsEditor>
  );
}
