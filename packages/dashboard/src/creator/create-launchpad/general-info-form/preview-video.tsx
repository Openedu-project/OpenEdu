'use client';
import type { IFileResponse } from '@oe/api';
import { CREATE_LAUNCHPAD_MODAL_ID } from '@oe/core';
import { Uploader } from '@oe/ui';
import { Button } from '@oe/ui';
import { Modal } from '@oe/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import type { FieldPath, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { useLaunchpadModalStore } from '../_store/useLaunchpadModalStore';

type ManageVideoProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
};

type PreviewVideoProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
};

const ManageVideo = <TFormValues extends FieldValues>({ form }: ManageVideoProps<TFormValues>) => {
  const previewVideo = useWatch({
    control: form.control,
    name: 'preview_video' as FieldPath<TFormValues>,
  });

  const handleRemove = useCallback(() => {
    form.setValue('preview_video' as FieldPath<TFormValues>, null as PathValue<TFormValues, Path<TFormValues>>);
    form.setValue('preview_video_id' as Path<TFormValues>, null as PathValue<TFormValues, Path<TFormValues>>);
  }, [form]);

  return (
    previewVideo && (
      <div className="flex items-center justify-between rounded-lg border border-primary px-4 py-2">
        <div>
          <p className="font-normal text-xs">{previewVideo.name}</p>
        </div>
        <div>
          <Button variant="ghost" size="sm" onClick={handleRemove}>
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    )
  );
};

const PreviewVideo = <TFormValues extends FieldValues>({ form }: PreviewVideoProps<TFormValues>) => {
  const { modals, setOpenModal } = useLaunchpadModalStore();
  const t = useTranslations('creatorSettingLaunchpad.generalInfo');

  const handleClose = useCallback(() => {
    setOpenModal(CREATE_LAUNCHPAD_MODAL_ID.previewVideo as string, false);
  }, [setOpenModal]);

  return (
    <div className="relative mt-spacing-m space-y-4">
      <div className="flex justify-between">
        <FormField
          control={form.control}
          name={'preview_video' as FieldPath<TFormValues>}
          render={() => (
            <FormItem>
              <FormControl>
                <span>
                  <FormLabel className="font-semibold text-base">{t('previewVideo')} *</FormLabel>
                  <p className="text-gray-500 text-xs">{t('previewVideoDesc')}</p>
                  <FormMessage className="mt-4" />
                </span>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          type="button"
          onClick={() => setOpenModal(CREATE_LAUNCHPAD_MODAL_ID.previewVideo as string, true)}
          className="h-full rounded-xl border-primary text-primary hover:border-primary hover:text-primary"
        >
          {t('uploadVideo')}
        </Button>
      </div>

      <ManageVideo form={form} />

      <Modal
        open={modals[CREATE_LAUNCHPAD_MODAL_ID.previewVideo as string]}
        onClose={handleClose}
        title={t('addPreviewVideo')}
      >
        <div className="flex flex-col gap-spacing-m">
          <div className="flex flex-col gap-spacing-m">
            <FormField
              control={form.control}
              name={'preview_video' as FieldPath<TFormValues>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Uploader
                      accept="video/*"
                      multiple={false}
                      maxSizeBytes={5 * 1024 * 1024 * 1024}
                      value={field.value}
                      onChange={file => {
                        field.onChange(file);

                        if (file) {
                          form.setValue(
                            'preview_video_id' as FieldPath<TFormValues>,
                            (file as IFileResponse).id as PathValue<TFormValues, Path<TFormValues>>
                          );
                          handleClose();
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

PreviewVideo.displayName = 'PreviewVideo';

export { PreviewVideo };
