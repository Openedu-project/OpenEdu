'use client';

import { useUnblockUser } from '@oe/api';
import { pickCharacters } from '@oe/core';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { Modal } from '#components/modal';
import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar';
import { Button } from '#shadcn/button';

interface Props {
  id: string;
  avatar: string;
  name: string;
  onUnbBlockUser: (userId: string) => Promise<void>;
}

export function UserBlocking({ id, avatar, name, onUnbBlockUser }: Props) {
  const tBlocking = useTranslations('userProfile.privacy');

  const [isOpenModalUnblock, setIsOpenModalUnblock] = useState<boolean>(false);

  const { triggerUnblock } = useUnblockUser(id);

  const handleOpenModalUnblock = useCallback(() => {
    setIsOpenModalUnblock(true);
  }, []);

  const handleCloseModalUnblock = useCallback(() => {
    setIsOpenModalUnblock(false);
  }, []);

  const handleBlockUser = useCallback(() => {
    if (id?.length > 0) {
      triggerUnblock()
        .then(() => onUnbBlockUser?.(id))
        .catch(error => console.error(error));
    }
  }, [id, onUnbBlockUser, triggerUnblock]);

  return (
    <>
      <div className="flex justify-between px-3 py-[14px]">
        <div className="flex items-center gap-3">
          <Avatar className="h-7 w-7">
            <AvatarImage src={avatar} alt="avatar" />
            <AvatarFallback>{pickCharacters(name)}</AvatarFallback>
          </Avatar>

          <span className="mbutton-semibold16">{name}</span>
        </div>
        <Button variant="default" size="default" onClick={() => handleOpenModalUnblock()}>
          {tBlocking('unblock')}
        </Button>
      </div>

      {isOpenModalUnblock && (
        <Modal
          open={true}
          title={tBlocking('unblockUserTitle')}
          onClose={handleCloseModalUnblock}
          hasCancelButton={false}
          buttons={[
            {
              type: 'button',
              label: tBlocking('cancel'),
              variant: 'outline',
              onClick: () => handleCloseModalUnblock(),
            },
            {
              type: 'button',
              label: tBlocking('confirm'),
              variant: 'destructive',
              onClick: () => handleBlockUser(),
            },
          ]}
        >
          <p>
            {tBlocking.rich('unblockUserDescription', {
              name,
              bold: chunks => <span className="text-primary">{chunks}</span>,
            })}
          </p>
        </Modal>
      )}
    </>
  );
}
