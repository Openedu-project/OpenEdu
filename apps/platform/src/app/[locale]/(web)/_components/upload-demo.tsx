'use client';
import type { IFileResponse } from '@oe/api/types/file';
import { Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { Camera, User2 } from 'lucide-react';
import { useState } from 'react';

export default function UploadDemo() {
  const [fileList, setFileList] = useState<IFileResponse[]>([]);

  console.log('fileList', fileList);
  return (
    <div>
      <Uploader listType="picture-text" aspectRatio={4 / 3} crop={{ locked: false }} accept="image/*">
        <Button>Select files...</Button>
      </Uploader>
      <Uploader listType="picture-text" multiple value={fileList} onChange={setFileList}>
        <Button>Select files...</Button>
      </Uploader>
      <Uploader
        multiple
        listType="picture"
        value={fileList}
        onChange={setFileList}
        triggerProps={{ className: 'order-1 h-24 w-24' }}
      >
        <Button variant="outline" className="h-full w-full">
          <Camera />
        </Button>
      </Uploader>
      <Uploader
        listType="picture"
        aspectRatio={1}
        crop
        fileListVisible={false}
        value={fileList}
        onChange={setFileList}
        fileItemProps={{
          thumbnailClassName: 'object-cover',
          buttonsPosition: 'center',
        }}
      >
        <Button variant="outline" className="h-40 w-40 rounded-full p-0">
          <User2 />
        </Button>
      </Uploader>
      <Uploader
        draggable
        multiple
        listType="picture-text"
        value={fileList}
        onChange={setFileList}
        // fileListVisible={false}
        // className="h-48"
      />
    </div>
  );
}
