import type { IBlockingUser } from '@oe/api/types/user-profile';
import { Modal } from '@oe/ui/components/modal';
import { useTranslations } from 'next-intl';
import UserListForm from './user-list-form';

interface IProps {
  data?: IBlockingUser[];
  page: number;
  totalPages: number;
  totalItems: number;
  isLoading?: boolean;
  onSetPage: () => void;
  setSearchText: (text: string) => void;
  onSubmit: ({ user_ids }: { user_ids: string[] }) => void;
  onClose: () => void;
}

export const BLOCK_USER_MODAL = 'modal_block_user';

export default function BlockUserModal({
  data,
  page,
  totalItems,
  totalPages,
  isLoading,
  onSetPage,
  setSearchText,
  onSubmit,
  onClose,
}: IProps) {
  const t = useTranslations('userProfile.privacy');

  const handleSubmitForm = ({ user_ids }: { user_ids: string[] }) => {
    onSubmit({ user_ids });
  };

  return (
    <Modal open={true} title={t('addUserToBlock')} onClose={onClose} hasCancelButton={false}>
      <UserListForm
        data={data as IBlockingUser[]}
        onSubmit={value => handleSubmitForm(value)}
        onSetPage={onSetPage}
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        setSearchText={value => setSearchText(value)}
        isLoading={isLoading}
        onClose={onClose}
      />
    </Modal>
  );
}
