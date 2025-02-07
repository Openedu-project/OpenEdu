'use client';
import { useTranslations } from 'next-intl';
import { type NavigationOptions, useNavigationGuard } from '#hooks/useNavigationGuard';
import { Button } from '#shadcn/button';
import { WarningDialog } from './warning-dialog';

export function NavigationDialog({
  isEnabled = true,
  hasUnsavedChanges = false,
  title,
  description,
  confirmText,
  cancelText,
}: NavigationOptions) {
  const tDialog = useTranslations('dialog');
  const { isDialogOpen, handleConfirm, handleCancel } = useNavigationGuard({
    isEnabled,
    hasUnsavedChanges,
    title,
    description,
    confirmText,
    cancelText,
  });

  return (
    <WarningDialog
      open={isDialogOpen}
      setOpen={open => !open && handleCancel()}
      title={title ?? tDialog('navigation.title')}
      description={description ?? tDialog('navigation.description')}
      renderActions={
        <>
          <Button variant="outline" onClick={handleCancel}>
            {cancelText ?? tDialog('navigation.cancelText')}
          </Button>
          <Button onClick={handleConfirm}>{confirmText ?? tDialog('navigation.confirmText')}</Button>
        </>
      }
    />
  );
}
