'use client';
import { isLogin } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button, type ButtonProps } from '#shadcn/button';
import { useLoginRequiredStore } from '../login-required-modal/_store';
import { triggerFollow } from './_action';

interface IFollowButtonProps extends ButtonProps {
  isFollowed: boolean;
  userId: string;
  handleFollow?: () => void;
  validateTags?: string[];
}

export function FollowButton({
  className,
  isFollowed,
  handleFollow,
  userId,
  validateTags,
  ...props
}: IFollowButtonProps) {
  const tGeneral = useTranslations('general');
  const [followed, setFollowed] = useState(isFollowed);
  const { setLoginRequiredModal } = useLoginRequiredStore();

  const handleTriggerFollow = async () => {
    const login = await isLogin();
    if (!login) {
      setLoginRequiredModal(true);
      return;
    }
    await triggerFollow({ userId, followed, validateTags });
    setFollowed(prev => !prev);
  };

  return (
    <Button className={className} onClick={handleTriggerFollow} {...props}>
      {followed ? tGeneral('following') : tGeneral('follow')}
    </Button>
  );
}
