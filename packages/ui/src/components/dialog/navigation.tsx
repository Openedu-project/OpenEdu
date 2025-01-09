'use client';
import { useTranslations } from 'next-intl';
import { useNavigationGuard } from '#hooks/useNavigationGuard';
import { Button } from '#shadcn/button';
import { WarningDialog } from './warning-dialog';

interface NavigationDialogProps {
  isEnabled?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export function NavigationDialog({
  isEnabled = true,
  title,
  description,
  confirmText,
  cancelText,
}: NavigationDialogProps) {
  const tDialog = useTranslations('dialog');
  const { isDialogOpen, handleConfirm, handleCancel } = useNavigationGuard({
    isEnabled,
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

  // return (
  //   <AlertDialog open={isDialogOpen} onOpenChange={open => !open && handleCancel()}>
  //     <AlertDialogContent>
  //       <AlertDialogHeader>
  //         <AlertDialogTitle>{title ?? tDialog('navigation.title')}</AlertDialogTitle>
  //         <AlertDialogDescription>{description ?? tDialog('navigation.description')}</AlertDialogDescription>
  //       </AlertDialogHeader>
  //       <AlertDialogFooter>
  //         <AlertDialogCancel onClick={handleCancel}>{cancelText ?? tDialog('navigation.cancelText')}</AlertDialogCancel>
  //         <AlertDialogAction onClick={handleConfirm}>
  //           {confirmText ?? tDialog('navigation.confirmText')}
  //         </AlertDialogAction>
  //       </AlertDialogFooter>
  //     </AlertDialogContent>
  //   </AlertDialog>
  // );
}
