import { Button } from '@oe/ui/shadcn/button';
import { X } from 'lucide-react';
import { useEditor } from '../grapesjs';

import type { Asset } from 'grapesjs';

export type CustomAssetManagerProps = {
  assets: Asset[];
  select: (asset: Asset, complete: boolean) => void;
};

export default function CustomAssetManager({ assets, select }: CustomAssetManagerProps) {
  const editor = useEditor();

  const remove = (asset: Asset) => {
    editor.Assets.remove(asset);
  };

  return (
    <div className="grid grid-cols-3 gap-2 pr-2">
      {assets.map(asset => (
        <div key={asset.getSrc()} className="group relative overflow-hidden rounded">
          <img className="display-block" src={asset.getSrc()} alt={asset.get('name') as string} />
          <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-end bg-zinc-700/75 p-5 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="secondary" className="mb-2 w-full" onClick={() => select(asset, true)}>
              Select
            </Button>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => remove(asset)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
