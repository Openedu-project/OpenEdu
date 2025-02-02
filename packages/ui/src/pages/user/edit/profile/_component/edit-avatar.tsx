'use client';

import type { IFileResponse } from '@oe/api/types/file';
import ImageIcon from '@oe/assets/icons/image';
import { Avatar, AvatarFallback, AvatarImage } from '@oe/ui/shadcn/avatar';
// import { Button } from '@oe/ui/button';
// import { useToast } from '@oe/ui/use-toast';
// import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Uploader } from '#components/uploader';

interface IProps {
  onSetAvaUrl: (url: string) => void;
  avatar: string;
}

export default function EditAvatar({ onSetAvaUrl, avatar }: IProps) {
  const [files] = useState<IFileResponse[]>([]);

  const handleEditAvatar = (files: IFileResponse[]) => {
    const url = files[0]?.url;

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
      value={files}
      onChange={handleEditAvatar}
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
