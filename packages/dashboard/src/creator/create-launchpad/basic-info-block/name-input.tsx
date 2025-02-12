import { usePatchLaunchpadDetail } from '@oe/api/hooks/useAdminLaunchpad';
import type { ICreateLaunchpadRequest, ILaunchpad } from '@oe/api/types/launchpad';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { Loader2 } from 'lucide-react';
import { Check, PencilLine, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  launchpad: ILaunchpad;
  mutateLaunchpad: () => void;
}

const NameInput = ({ launchpad, mutateLaunchpad }: Props) => {
  const [val, setVal] = useState(launchpad.name);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { triggerPatchLaunchpadDetail: updateLaunchpad, isLoadingPatchLaunchpadDetail: isUpdatingLaunchpad } =
    usePatchLaunchpadDetail(launchpad.id);
  const tError = useTranslations('errors');
  const tCreatorSettingLaunchpad = useTranslations('creatorSettingLaunchpad');

  const handleUpdateLaunchpadTitle = useCallback(
    async (value: string) => {
      const updateData: ICreateLaunchpadRequest = {
        name: value,
      };

      try {
        const res = await updateLaunchpad(updateData);

        if (res) {
          await mutateLaunchpad();
          toast.success(tCreatorSettingLaunchpad('updateNameSuccess'));
        }
      } catch (error) {
        console.error('Handle Update Name Launchpad Error', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [updateLaunchpad, mutateLaunchpad, tError, tCreatorSettingLaunchpad]
  );

  return (
    <div className="flex w-fit items-center gap-spacing-xxs">
      <Input
        ref={inputRef}
        value={val}
        readOnly={!isEditing}
        autoFocus={isEditing}
        onChange={e => setVal(e.target.value)}
        className="!px-0 line-clamp-1 max-w-96 truncate rounded-radius-sm border-transparent border-none font-semibold text-3xl focus-visible:ring-0"
      />
      <div className="flex">
        <Button
          variant="ghost"
          size="icon"
          onClick={async () => {
            if (isEditing) {
              await handleUpdateLaunchpadTitle(val);
              setIsEditing(false);
            } else {
              setIsEditing(true);
              inputRef.current?.focus();
            }
          }}
        >
          {isUpdatingLaunchpad ? (
            <Loader2 className="animate-spin" size={25} />
          ) : (
            <>{isEditing ? <Check size={25} /> : <PencilLine size={25} />}</>
          )}
        </Button>
        {isEditing && (
          <Button
            variant="ghost"
            disabled={isUpdatingLaunchpad}
            size="icon"
            onClick={() => {
              setVal(launchpad.name);
              setIsEditing(false);
            }}
          >
            <X size={25} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NameInput;
