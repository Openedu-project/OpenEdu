'use client';
import {
  API_ENDPOINT,
  type HTTPErrorMetadata,
  type IEventScheduleSchema,
  type IFormUserResponse,
  type IScheduleEvent,
  useDeleteScheduleEvent,
  usePostScheduleEvent,
  usePutScheduleEvent,
} from '@oe/api';
import { formatDate } from '@oe/core';
import type { FilterOption } from '@oe/ui';
import { Button, type ColumnDef, Link, Table, type TableRef, toast } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ScheduleSettingEventActionModal } from './schedule-setting-event-action-modal';
import { ScheduleDeleteEventModal } from './schedule-setting-event-delete-modal';

export function ScheduleSettingEventList({
  scheduleID,
}: {
  scheduleID?: string;
}) {
  const t = useTranslations('schedule.settings.event');
  const tError = useTranslations('errors');
  const [isOpenActionModal, setIsOpenActionModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IScheduleEvent | null>(null);

  const tableRef = useRef<TableRef<IFormUserResponse>>(null);

  const { triggerPostScheduleEvent, isLoadingPostScheduleEvent } = usePostScheduleEvent();
  const { triggerPutScheduleEvent, isLoadingPutScheduleEvent } = usePutScheduleEvent(selectedEvent?.id || '');
  const { triggerDeleteScheduleEvent } = useDeleteScheduleEvent(selectedEvent?.id || '');
  const filterOptions = useMemo(
    () => [
      {
        id: 'name',
        value: 'name',
        label: t('name'),
        type: 'search',
      },
      {
        id: 'location',
        value: 'location',
        label: t('location'),
        type: 'search',
      },
    ],
    [t]
  ) as FilterOption[];

  const handleOpenActionModal = useCallback((data: IScheduleEvent | null) => {
    setSelectedEvent(data);

    setIsOpenActionModal(true);
  }, []);

  const handleCloseActionModal = useCallback(() => {
    setSelectedEvent(null);

    setIsOpenActionModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((data: IScheduleEvent) => {
    setSelectedEvent(data);
    setIsOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsOpenDeleteModal(false);
    setSelectedEvent(null);
  }, []);

  const columns: ColumnDef<IFormUserResponse>[] = useMemo(
    () => [
      {
        header: t('name'),
        accessorKey: 'name',
        enableSorting: false,
      },
      {
        header: t('description'),
        accessorKey: 'description',
        enableSorting: false,
        size: 250,
      },
      {
        header: t('location'),
        accessorKey: 'location',
        enableSorting: false,
      },

      {
        header: t('startAt'),
        accessorKey: 'start_at',
        cell: item => <>{formatDate(Number(item.getValue()))}</>,
      },
      {
        header: t('endAt'),
        accessorKey: 'end_at',
        cell: item => <>{formatDate(Number(item.getValue()))}</>,
      },
      {
        header: t('joinLink'),
        accessorKey: 'join_link',
        cell: item => {
          const url = item.getValue() as string;

          return (
            <Link href={url} className="font-bold text-primary underline" target="_blank">
              {t('link')}
            </Link>
          );
        },
      },
      {
        header: t('action'),
        size: 220,
        cell: ({ row }) => (
          <div className="flex w-[220px] justify-center gap-2">
            <Button onClick={() => handleOpenActionModal(row.original as unknown as IScheduleEvent)}>
              {t('edit')}
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleOpenDeleteModal(row.original as unknown as IScheduleEvent)}
            >
              {t('delete')}
            </Button>
          </div>
        ),
      },
    ],
    [t, handleOpenActionModal, handleOpenDeleteModal]
  );

  const handleSubmitEvent = useCallback(
    async (data: IEventScheduleSchema) => {
      try {
        if (selectedEvent) {
          await triggerPutScheduleEvent({
            ...data,
          });
        } else {
          await triggerPostScheduleEvent({
            ...data,
          });
        }
        toast.success(selectedEvent ? t('updateEventSuccess') : t('createEventSuccess'));
        handleCloseActionModal();
        tableRef.current?.mutateAndClearCache();
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [selectedEvent, triggerPostScheduleEvent, triggerPutScheduleEvent, tError, t, handleCloseActionModal]
  );

  const handleDeleteEvent = useCallback(async () => {
    try {
      await triggerDeleteScheduleEvent();
      toast.success(t('deleteEventSuccess'));
      handleCloseDeleteModal();
      tableRef.current?.mutateAndClearCache();
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [triggerDeleteScheduleEvent, tError, t, handleCloseDeleteModal]);

  return (
    <div className="block">
      <Table
        columns={columns}
        api={API_ENDPOINT.EVENT_SCHEDULES}
        hasNoColumn
        apiQueryParams={{
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
        }}
        height="100%"
        ref={tableRef}
        filterOptions={filterOptions}
        filterSearchProps={{ useQueryParams: true }}
        tableOptions={{
          manualPagination: true,
        }}
      >
        <Button variant="default" onClick={() => handleOpenActionModal(null)}>
          {t('addNewEvent')}
        </Button>
      </Table>
      {isOpenActionModal && (
        <ScheduleSettingEventActionModal
          data={selectedEvent}
          scheduleID={scheduleID ?? ''}
          loading={isLoadingPostScheduleEvent || isLoadingPutScheduleEvent}
          onSubmit={handleSubmitEvent}
          onClose={handleCloseActionModal}
        />
      )}
      {isOpenDeleteModal && <ScheduleDeleteEventModal onClose={handleCloseDeleteModal} onSubmit={handleDeleteEvent} />}
    </div>
  );
}
