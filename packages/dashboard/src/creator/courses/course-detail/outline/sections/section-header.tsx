'use client';
import type { ISectionSchema } from '@oe/api';
import { sectionSchema } from '@oe/api';
import { Button } from '@oe/ui';
import { DeleteButton } from '@oe/ui';
import { FormWrapper } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { Input } from '@oe/ui';
import { Check, CopyIcon, PencilLine, Trash2 } from 'lucide-react';
import { MenuIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SegmentBadgeSelect } from '../../../_components/segment-badge-select';
import { useSectionActions } from '../../_hooks/useSectionActions';
import { COURSE_DETAIL_FORM_IDS } from '../../_utils/constants';
import { SectionsDrawer } from './sections-drawer';

export function SectionHeader() {
  const tCourse = useTranslations('course');
  const tOutline = useTranslations('course.outline');
  const { sections, activeSection, handleDeleteSection, handleUpdateSection, handleDuplicateSection } =
    useSectionActions();

  const [edit, setEdit] = useState(false);
  const [duplicateLoading, setDuplicateLoading] = useState(false);

  const onDeleteSection = async (onClose?: () => void) => {
    await handleDeleteSection();
    onClose?.();
  };

  const handleSaveSection = async (data: ISectionSchema) => {
    if (activeSection?.title !== data.title) {
      await handleUpdateSection({ ...activeSection, title: data.title });
    }
    setEdit(false);
  };

  const oDuplicateSection = async () => {
    setDuplicateLoading(true);
    await handleDuplicateSection();
    setDuplicateLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-md border bg-background p-2 md:flex-row md:gap-4">
      <div className="flex flex-1 items-center gap-2">
        <SectionsDrawer
          trigger={
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-4 w-4" />
            </Button>
          }
        />
        {edit ? (
          <FormWrapper
            id={COURSE_DETAIL_FORM_IDS.sectionTitle}
            schema={sectionSchema}
            useFormProps={{
              defaultValues: activeSection as ISectionSchema,
            }}
            onSubmit={handleSaveSection}
            className="flex w-full gap-2 space-y-0"
          >
            {({ loading }) => (
              <>
                <FormFieldWithLabel name="title" formMessageClassName="hidden" className="w-full">
                  <Input type="text" className="h-8" />
                </FormFieldWithLabel>
                <Button size="xs" type="submit" disabled={loading} loading={loading}>
                  <Check className="h-4 w-4" />
                </Button>
              </>
            )}
          </FormWrapper>
        ) : (
          <div className="flex items-center gap-2">
            <span className="giant-iheading-semibold16">{activeSection?.title}</span>
            <Button variant="ghost" size="xs" onClick={() => setEdit(true)}>
              <PencilLine className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <SegmentBadgeSelect className="ml-auto" status={activeSection?.status} data={activeSection} type="section" />
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={oDuplicateSection}
          disabled={duplicateLoading}
          title={tOutline('section.actions.duplicate')}
        >
          <CopyIcon className="h-4 w-4" />
        </Button>
        {(sections?.length ?? 0) > 1 && (
          <DeleteButton
            title={tCourse('common.modal.delete.title', {
              item: tOutline('section.title'),
            })}
            description={tCourse('common.modal.delete.description', {
              item: tOutline('section.title'),
            })}
            onDelete={onDeleteSection}
            variant="outline"
          >
            <Trash2 className="h-4 w-4" />
          </DeleteButton>
        )}
      </div>
    </div>
  );
}
