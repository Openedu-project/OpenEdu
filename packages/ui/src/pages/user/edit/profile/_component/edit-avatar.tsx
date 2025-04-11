'use client';

import type { IFileResponse } from '@oe/api';
import { ImageIcon } from '@oe/assets';
// import { Button } from '#button';
// import { useToast } from '#use-toast';
// import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Uploader } from '#components/uploader';
import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar';

interface IProps {
  onSetAvaUrl: (url: string) => void;
  avatar: string;
}

export function EditAvatar({ onSetAvaUrl, avatar }: IProps) {
  const [file] = useState<IFileResponse[]>([]);

  const handleEditAvatar = (file: IFileResponse) => {
    const url = file?.url;

    onSetAvaUrl(url ?? '');
  };

  return (
    // <div>
    //   <ImageIcon className="mb-3" />
    //   <Button variant="primary" size="medium" className="mbutton-regular16" onClick={handleEditAvatar}>
    //     <Plus size={16} />
    //     Add
    //   </Button>
    // </div>
    <Uploader
      accept="image/*"
      // minSizeBytes={1024}
      // maxSizeBytes={5 * 1024 * 1024}
      value={file}
      onChange={file => handleEditAvatar(file as IFileResponse)}
      contentClassName="p-0 m-0 rounded-full"
      className="w-[60px] rounded-full"
    >
      <Avatar className="h-[60px] w-[60px]">
        <AvatarImage src={avatar ?? ''} alt="avatar" />
        <AvatarFallback>
          <ImageIcon />
        </AvatarFallback>
      </Avatar>
    </Uploader>
  );
}
