'use client';
import { useDeleteCoursesFromAffiliateCampaign, usePostCoursesToAffiliateCampaign } from '@oe/api';
import type { IAffiliateCampaignCourse } from '@oe/api';
import { type ColumnDef, Table, type TableRef } from '@oe/ui';

import { Button } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

import { API_ENDPOINT } from '@oe/api';
import { createAPIUrl } from '@oe/api';
import type { HTTPErrorMetadata } from '@oe/api';
import { formatPrice } from '@oe/core';
import { toast } from '@oe/ui';
import { RoleButton } from '@oe/ui';
import { DeleteAffiliateCampaignCourseModal } from './campaign-course-detele-modal';
import { FormAffiliateCampaignCourseModal } from './campaign-course-form-modal';

export function AffiliateCampaignCoursesList() {
  const t = useTranslations('affiliateCampaignDetailAddCourse');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<IAffiliateCampaignCourse>>(null);
  const [selectedCourse, setSelectedCourse] = useState<IAffiliateCampaignCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const { campaignId } = useParams();

  const { triggerPostCourses } = usePostCoursesToAffiliateCampaign(campaignId as string);
  const { triggerDeleteCourses } = useDeleteCoursesFromAffiliateCampaign(campaignId as string);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenDeleteModal = useCallback((course: IAffiliateCampaignCourse) => {
    setSelectedCourse(course);
    setIsOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedCourse(null);
    setIsOpenDeleteModal(false);
  }, []);

  const handleAddCourses = useCallback(
    async (values: { course_cuids: string[] }) => {
      try {
        await triggerPostCourses(values);
        await tableRef.current?.mutate();
        handleCloseModal();
        toast.success(t('addCourseSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleCloseModal, t, tError, triggerPostCourses]
  );

  const handleRemoveCourse = useCallback(async () => {
    if (!selectedCourse) {
      return;
    }

    try {
      await triggerDeleteCourses([selectedCourse.id]);
      await tableRef.current?.mutate();
      handleCloseDeleteModal();
      toast.success(t('removeCourseSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [handleCloseDeleteModal, t, tError, triggerDeleteCourses, selectedCourse]);

  const columns: ColumnDef<IAffiliateCampaignCourse>[] = useMemo(
    () => [
      {
        header: t('courseName'),
        accessorKey: 'course.name',
        size: 250,
        cell: ({ row }) => {
          const item = row.original;
          return <p className="text-sm">{item?.course?.name}</p>;
        },
      },
      {
        header: t('price'),
        accessorKey: 'course.price',
        size: 190,
        cell: ({ row }) => {
          const item = row.original;
          const price_settings = item?.course?.price_settings;

          return (
            <p className="text-sm">
              {price_settings?.is_pay && <span>Fiat: </span>}
              {formatPrice(
                Number.parseFloat(price_settings?.fiat_price ?? '0'),
                price_settings?.fiat_currency,
                !price_settings?.is_pay
              )}

              <span className="inline-block">
                {price_settings?.is_pay &&
                  price_settings?.crypto_payment_enabled &&
                  `${t('token')}: ${price_settings.crypto_price} ${price_settings.crypto_currency}`}
              </span>
            </p>
          );
        },
      },
      {
        header: t('action'),
        cell: ({ row }) => {
          const item = row.original;
          return (
            <RoleButton
              action="delete"
              variant="destructive"
              size="default"
              className="min-w-[100px]"
              onClick={() => handleOpenDeleteModal(item)}
            >
              {t('delete')}
            </RoleButton>
          );
        },
      },
    ],
    [handleOpenDeleteModal, t]
  );

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleOpenModal} className="btn btn-primary">
          {t('addCourses')}
        </Button>
      </div>

      <Table
        api={createAPIUrl({
          endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID_COURSES,
          params: { id: campaignId },
        })}
        apiQueryParams={{
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
        }}
        columns={columns}
        ref={tableRef}
        hasNoColumn
        height="550px"
        border="bordered-rows"
        tableOptions={{
          manualPagination: true,
        }}
      />
      {isModalOpen && <FormAffiliateCampaignCourseModal onSubmit={handleAddCourses} onClose={handleCloseModal} />}
      {isOpenDeleteModal && selectedCourse && (
        <DeleteAffiliateCampaignCourseModal
          open={isOpenDeleteModal}
          id={selectedCourse?.id ?? ''}
          onSubmit={handleRemoveCourse}
          onClose={handleCloseDeleteModal}
        />
      )}
    </>
  );
}
