import { type IGeneralInfoLaunchpadSchemaType, generalInfoLaunchpadSchema } from '@oe/api';
import { LAUNCHPAD_ROUTES } from '@oe/core';
import { CREATE_LAUNCHPAD_FORM_ID } from '@oe/core';
import { useRouter } from '@oe/ui';
import { FormNestedProvider, FormNestedWrapper, type INestedFormsValues } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { Textarea } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { LaunchpadNavigationButtons } from '../_components/launchpad-navigation-buttons';
import { useChangeLaunchpadTab } from '../_hooks/useChangeLaunchpadTab';
import { useLaunchpadDetail } from '../_hooks/useLaunchpadDetail';
import { NoticeBlock } from '../notice-block';
import { CategoryAndLevel } from './category-and-level';
import { CourseContent } from './course-content';
import { PreviewVideo } from './preview-video';
import { Thumbnail } from './thumbnail';

interface IGeneralInfoBlockProps {
  onSubmit: (data: INestedFormsValues, nextTab: string | undefined) => void;
}

const GeneralInfoBlock = ({ onSubmit }: IGeneralInfoBlockProps) => {
  const t = useTranslations('creatorSettingLaunchpad.generalInfo');

  const router = useRouter();
  const { nextTab } = useChangeLaunchpadTab();
  const { launchpad } = useLaunchpadDetail();

  const handleOnSubmit = useCallback(
    async (data: INestedFormsValues) => {
      await onSubmit(data, nextTab);
    },
    [onSubmit, nextTab]
  );

  return launchpad ? (
    <FormNestedProvider onSubmit={handleOnSubmit}>
      <div className="mx-auto flex max-w-5xl gap-spacing-m rounded-lg bg-white px-6 py-5">
        <FormNestedWrapper
          id={CREATE_LAUNCHPAD_FORM_ID.generalInfo ?? ''}
          schema={generalInfoLaunchpadSchema}
          className="grid w-full gap-[10px]"
          useFormProps={{
            defaultValues: {
              description: launchpad.description,
              categories: launchpad?.categories || [],
              levels: launchpad?.levels || [],
              thumbnail: launchpad?.thumbnail,
              thumbnail_id: launchpad?.thumbnail?.id || '',
              preview_video: launchpad?.preview_video,
              preview_video_id: launchpad?.preview_video?.id || '',
            },
          }}
        >
          {({ form }) => (
            <>
              <div className="grid w-full gap-5 lg:grid-cols-2">
                <h1 className="col-span-1 font-semibold text-xl lg:col-span-2">{t('title')}</h1>

                <div className="col-span-1 lg:col-span-2">
                  <CourseContent launchpadData={launchpad} />
                </div>

                <FormFieldWithLabel label={`${t('desc')} *`} name="description" className="lg:col-span-2">
                  <Textarea rows={10} />
                </FormFieldWithLabel>

                <div className="col-span-1 lg:col-span-2">
                  <PreviewVideo<IGeneralInfoLaunchpadSchemaType> form={form} />
                </div>

                <Thumbnail<IGeneralInfoLaunchpadSchemaType> form={form} />

                <div className="col-span-1 lg:col-span-2">
                  <CategoryAndLevel<IGeneralInfoLaunchpadSchemaType> form={form} />
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <NoticeBlock
                    title={t('courseFundingNotice')}
                    content={
                      <ul className="list-disc px-4">
                        <li>{t('courseFundingRules.minSections')}</li>
                        <li>{t('courseFundingRules.notFree')}</li>
                      </ul>
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <LaunchpadNavigationButtons
                  onNextClick={handleOnSubmit}
                  onPrevClick={() => router.push(LAUNCHPAD_ROUTES.launchpad)}
                />
              </div>
            </>
          )}
        </FormNestedWrapper>
      </div>
    </FormNestedProvider>
  ) : null;
};

GeneralInfoBlock.displayName = 'GeneralInfoBlock';

export { GeneralInfoBlock };
