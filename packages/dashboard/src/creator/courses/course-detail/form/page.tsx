'use client';
import type { ICourseFormTrigger } from '@oe/api/schemas/courses/forms';
import { courseFormTriggerSchema } from '@oe/api/schemas/courses/forms';
import { createFormTriggerService, deleteFormTriggerService, updateFormTriggerService } from '@oe/api/services/forms';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { Eye, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

import { formatDate } from '@oe/core/utils/datetime';
import { toCamelCase } from '@oe/core/utils/string';
import { DeleteButton } from '@oe/ui/components/delete-button';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { Modal } from '@oe/ui/components/modal';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { Switch } from '@oe/ui/shadcn/switch';
import { AnswersModal } from './_components/answers-modal';
import { FormTriggerForm } from './_components/form-trigger-form';

const defaultValues: ICourseFormTrigger = {
  enabled: true,
  related_entity_id: '',
  related_entity_type: 'course',
  start_when: {
    type: 'started_lesson',
    entity_id: '',
    entity_type: 'lesson',
  },
  end_when: null,
  confirmation_settings: {
    enabled: false,
    title: '',
    description: '',
    buttons: null,
    is_default: true,
    display_on_detail: false,
    auto_close_after_seconds: 0,
    auto_close_enabled: false,
  },
  type: 'form',
};

export default function CourseDetailFormPage() {
  const t = useTranslations('course');
  const tGeneral = useTranslations('general');
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const tableRef = useRef<TableRef<ICourseFormTrigger>>(null);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [selectedFormTrigger, setSelectedFormTrigger] = useState<ICourseFormTrigger | null>(null);

  const handleToggleFormTrigger = useCallback(
    async (trigger: ICourseFormTrigger, enabled: boolean) => {
      if (!(courseId && trigger.id)) {
        return;
      }

      try {
        await updateFormTriggerService(undefined, {
          id: trigger.id,
          data: {
            ...trigger,
            enabled,
          },
        });
        await tableRef.current?.mutate?.();
        toast.success(t('form.toggleSuccess'));
      } catch (error) {
        console.error('Error toggling form trigger:', error);
        toast.error(t('form.toggleError'));
      }
    },
    [courseId, t]
  );

  const renderedName = useCallback((course: ICourseFormTrigger) => {
    if (course?.type === 'form') {
      return course?.form?.title || course?.name || '-';
    }

    return course?.confirmation_settings?.title || '-';
  }, []);

  const renderedDescription = useCallback((course: ICourseFormTrigger) => {
    if (course?.type === 'form') {
      return course?.form?.description || '-';
    }

    return course?.confirmation_settings?.description || '-';
  }, []);

  const columns: ColumnDef<ICourseFormTrigger>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('form.name'),
        enableSorting: false,
        cell: ({ row }) => (
          <Button
            variant="link"
            onClick={() => {
              setSelectedFormTrigger(row.original);
              setModalType('edit');
            }}
          >
            {renderedName(row.original)}
          </Button>
        ),
        size: 180,
      },
      {
        accessorKey: 'description',
        header: t('form.description'),
        enableSorting: false,
        cell: ({ row }) => renderedDescription(row.original),
        size: 200,
      },
      {
        accessorKey: 'enabled',
        header: t('form.enabled'),
        enableSorting: false,
        cell: ({ row }) => (
          <Switch
            checked={row.original.enabled}
            onCheckedChange={() => {
              handleToggleFormTrigger(row.original, !row.original.enabled);
            }}
          />
        ),
        size: 100,
      },
      {
        accessorKey: 'type',
        header: t('form.type.type'),
        enableSorting: false,
        size: 180,
        align: 'center',
        cell: ({ row }) => {
          const type = row.original.type;
          return (
            <Badge variant={type === 'form' ? 'outline_primary' : 'outline_secondary'}>{t(`form.type.${type}`)}</Badge>
          );
        },
      },
      {
        accessorKey: 'questions',
        header: t('form.questions'),
        enableSorting: false,
        align: 'center',
        cell: ({ row }) => {
          const questions = row.original.form?.questions || [];
          return questions.length;
        },
        size: 100,
      },
      {
        accessorKey: 'update_at',
        header: t('form.lastUpdated'),
        enableSorting: false,
        cell: ({ row }) => {
          const updateAt = row.original.update_at;
          return updateAt ? formatDate(updateAt) : '';
        },
        size: 150,
      },
      {
        accessorKey: 'start_when',
        header: t('form.startWhen'),
        enableSorting: false,
        cell: ({ row }) => {
          const startWhen = row.original.start_when;
          if (!startWhen) {
            return '';
          }
          return `${t(`form.trigger.${toCamelCase(startWhen.type)}`)}`;
        },
        size: 180,
      },
      {
        id: 'actions',
        header: tGeneral('actions'),
        size: 250,
        cell: ({ row }) => {
          const formTrigger = row.original;
          return (
            <div className="flex w-full items-center justify-end gap-2">
              {formTrigger?.type === 'form' && (
                <AnswersModal
                  id={formTrigger.form?.id ?? ''}
                  formUID={formTrigger.form?.uid ?? ''}
                  triggerType={formTrigger.start_when.type}
                  title={t('form.viewAnswers')}
                  trigger={
                    <Button variant="outline" className="h-8 w-auto gap-2 px-2">
                      <Eye className="h-4 w-4" />
                      {t('form.viewAnswers')}
                    </Button>
                  }
                />
              )}
              <DeleteButton
                variant="destructive"
                className="h-8 w-auto gap-2 px-2"
                onDelete={async onClose => {
                  await handleDeleteFormTrigger(formTrigger.id ?? '');
                  onClose?.();
                }}
                confirmBtnMessage={t('form.delete')}
                title={t('form.delete')}
                description={t('form.deleteDescription')}
              >
                <Trash2 className="h-4 w-4" />
                {tGeneral('delete')}
              </DeleteButton>
            </div>
          );
        },
      },
    ],
    [t, tGeneral, handleToggleFormTrigger, renderedDescription, renderedName]
  );

  const filterOptions: FilterOption[] = useMemo(
    () => [
      {
        label: t('form.name'),
        value: 'title',
        placeholder: t('form.searchName'),
        type: 'search',
        id: 'title',
      },
    ],
    [t]
  );

  const handleDeleteFormTrigger = async (triggerId: string) => {
    if (!(courseId && triggerId)) {
      return;
    }

    try {
      await deleteFormTriggerService(undefined, {
        id: triggerId,
      });

      await tableRef.current?.mutateAndClearCache?.();
      toast.success(t('form.deleteSuccess'));
    } catch (error) {
      console.error('Error deleting form trigger:', error);
      toast.error(t('form.deleteError'));
    }
  };

  const handleSubmitFormTrigger = async (data: ICourseFormTrigger) => {
    if (!courseId) {
      return;
    }

    try {
      const payload = {
        ...data,
        related_entity_id: courseId,
        related_entity_type: 'course',
      };

      if (modalType === 'edit' && selectedFormTrigger?.id) {
        await updateFormTriggerService(undefined, {
          id: selectedFormTrigger.id,
          data: payload,
        });
        toast.success(t('form.updateSuccess'));
      } else {
        await createFormTriggerService(undefined, {
          data: {
            ...payload,
            confirmation_settings: payload?.confirmation_settings
              ? {
                  ...payload?.confirmation_settings,
                  enabled: payload.type === 'form' ? !!payload?.confirmation_settings?.enabled : true,
                }
              : undefined,
          },
        });
        toast.success(t('form.addSuccess'));
      }
      await tableRef.current?.mutateAndClearCache?.();
      setModalType(null);
    } catch (error) {
      console.error('Error submitting form trigger:', error);
      toast.error(modalType === 'edit' ? t('form.updateError') : t('form.addError'));
    }
  };

  return (
    <div className="mx-auto h-full max-w-[900px] px-1 py-4">
      <div className="scrollbar flex h-full flex-col gap-4 overflow-auto bg-background p-4">
        <Table
          ref={tableRef}
          api={API_ENDPOINT.COURSES_ID_FORMS}
          apiParams={{ id: courseId }}
          columns={columns}
          hasNoColumn
          filterOptions={filterOptions}
          tableOptions={{ manualPagination: true }}
        >
          <Button variant="default" className="h-8 gap-2" onClick={() => setModalType('add')}>
            <Plus className="h-4 w-4" />
            {t('form.addForm')}
          </Button>
        </Table>
        <Modal
          title={modalType === 'add' ? t('form.addForm') : t('form.editForm')}
          description={modalType === 'add' ? t('form.addFormDescription') : t('form.editFormDescription')}
          validationSchema={courseFormTriggerSchema}
          onSubmit={handleSubmitFormTrigger}
          showSubmit
          open={modalType === 'add' || modalType === 'edit'}
          onClose={() => {
            setModalType(null);
            setSelectedFormTrigger(null);
          }}
          hasScroll={false}
          defaultValues={
            selectedFormTrigger || {
              ...defaultValues,
              related_entity_id: courseId,
            }
          }
        >
          <FormTriggerForm modalType={modalType} />
        </Modal>
      </div>
    </div>
  );
}
