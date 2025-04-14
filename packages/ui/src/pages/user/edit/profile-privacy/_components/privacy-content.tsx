'use client';

import type { IBlockingUser } from '@oe/api';
import { useAddUserToBlock, useGetListUserAction } from '@oe/api';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from '#shadcn/button';

import type { HTTPErrorMetadata } from '@oe/api';
import { toast } from 'sonner';
import { Spinner } from '#components/spinner';
import { BlockUserModal } from './block-user-modal';
import { UserBlocking } from './user-blocking';

export function PrivacyContent() {
  const tBlocking = useTranslations('userProfile.privacy');
  const tError = useTranslations('errors');

  const [page, setPage] = useState<number>(1);
  const [unblockPage, setUnblockPage] = useState<number>(1);

  const [users, setUsers] = useState<IBlockingUser[]>([]);
  const [usersUnblock, setUsersUnblock] = useState<IBlockingUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [prevSearchTerm, setPrevSearchTerm] = useState<string>('');
  const [isShowModalBlockingUser, setShowModalBlockingUser] = useState<boolean>(false);

  const { dataUserList, mutateUserList, isLoadingUserList } = useGetListUserAction<IBlockingUser>({
    type: 'block',
    page,
  });
  const {
    dataUserList: unblockUserList,
    mutateUserList: unblockUserMutate,
    isLoadingUserList: unblockUserLoading,
  } = useGetListUserAction<IBlockingUser>({
    type: 'unblock',
    page: unblockPage,
    search_categories: 'username,display_name',
    search_term: searchTerm,
  });
  const { triggerAddToBlock } = useAddUserToBlock();

  const handleOpenModalBlockingUser = useCallback(() => {
    setShowModalBlockingUser(true);
  }, []);

  const handleCloseModalBlockingUser = useCallback(() => {
    setShowModalBlockingUser(false);
  }, []);

  const handleBlockUser = useCallback(
    async ({ user_ids }: { user_ids: string[] }) => {
      try {
        setUsersUnblock(prevUsers => prevUsers.filter(user => !user_ids.includes(user.id)));

        await triggerAddToBlock({ user_ids });

        await unblockUserMutate(undefined, {
          revalidate: true,
          populateCache: true,
        });

        await mutateUserList(undefined, {
          revalidate: true,
          populateCache: true,
        });

        toast.success(tBlocking('updateSuccess'));
        handleCloseModalBlockingUser();
        setSearchTerm('');
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [mutateUserList, triggerAddToBlock, unblockUserMutate, tError, handleCloseModalBlockingUser, tBlocking]
  );

  const onUnblockUser = useCallback(
    async (userId: string) => {
      try {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

        await mutateUserList(undefined, {
          revalidate: true,
          populateCache: true,
        });

        await unblockUserMutate(undefined, {
          revalidate: true,
          populateCache: true,
        });

        toast.success(tBlocking('userUnblockSuccess'));
      } catch (error) {
        console.error(error);

        toast.error(tError((error as HTTPErrorMetadata).code.toString()));

        // revert if there was an error
        setUsers(prevUsers => {
          if (!prevUsers.some(user => user.id === userId)) {
            return [...prevUsers, { id: userId } as IBlockingUser];
          }
          return prevUsers;
        });
      }
    },
    [mutateUserList, unblockUserMutate, tError, tBlocking]
  );

  useEffect(() => {
    if (dataUserList?.results) {
      setUsers(prevUsers => {
        const newUsers = dataUserList.results.filter(
          newUser => !prevUsers.some(existingUser => existingUser.id === newUser.id)
        );

        return [...prevUsers, ...newUsers];
      });
    }
  }, [dataUserList]);

  useEffect(() => {
    if (unblockUserList?.results) {
      if (searchTerm === prevSearchTerm) {
        // Same search term or no search term, append new users
        setUsersUnblock(prevUsers => {
          const newUsers = unblockUserList.results.filter(
            newUser => !prevUsers.some(existingUser => existingUser.id === newUser.id)
          );

          return [...prevUsers, ...newUsers];
        });
      } else {
        // New search term, replace the entire list
        setUsersUnblock(unblockUserList.results);
        setPrevSearchTerm(searchTerm);
      }
    }
  }, [unblockUserList, searchTerm, prevSearchTerm]);

  return (
    <div className="flex max-h-[calc(100vh-(var(--header-height)+24px))] w-full flex-col rounded-[12px] border p-6">
      <h4 className="mbutton-semibold16 mb-3">{tBlocking('blockList')}</h4>
      <p className="mb-6">{tBlocking('blockDescription')}</p>

      <Button
        variant="ghost"
        className="mbutton-semibold16 justify-start px-4 py-[14px] text-primary hover:bg-inherit hover:text-primary"
        onClick={() => handleOpenModalBlockingUser()}
      >
        <span className="mr-2 grid h-7 w-7 items-center justify-center rounded-full bg-primary">
          <Plus color="white" size={16} />
        </span>
        {tBlocking('addToBlockList')}
      </Button>

      <div className="flex-1 overflow-y-auto" id="scrollableDiv">
        <InfiniteScroll
          className="!overflow-hidden"
          dataLength={dataUserList?.pagination?.total_items ?? 10}
          next={() => {
            setPage(prev => prev + 1);
          }}
          hasMore={page < (dataUserList?.pagination?.total_pages ?? 1)}
          loader={<Spinner className="mx-auto h-4 w-4 animate-spin" />}
          scrollableTarget="scrollableDiv"
          scrollThreshold="100px"
        >
          {users?.map(user => (
            <UserBlocking
              key={user.id}
              id={user.id}
              avatar={user?.avatar}
              name={user?.display_name?.length > 0 ? user.display_name : user.username}
              onUnbBlockUser={onUnblockUser}
            />
          ))}
          {isLoadingUserList && <Spinner className="mx-auto h-4 w-4 animate-spin" />}
        </InfiniteScroll>
      </div>

      {isShowModalBlockingUser && (
        <BlockUserModal
          onSubmit={value => handleBlockUser(value)}
          data={usersUnblock}
          onSetPage={() => setUnblockPage(prev => prev + 1)}
          page={unblockPage}
          totalPages={unblockUserList?.pagination?.total_pages ?? 1}
          totalItems={unblockUserList?.pagination?.total_items ?? 10}
          setSearchText={value => {
            setSearchTerm(value);
            setUnblockPage(1);
          }}
          onClose={handleCloseModalBlockingUser}
          isLoading={unblockUserLoading}
        />
      )}
    </div>
  );
}
