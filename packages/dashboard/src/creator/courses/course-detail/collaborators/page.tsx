'use client';
import { API_ENDPOINT } from '@oe/api';
import { addCoursePartnerService, deleteCoursePartnerService } from '@oe/api';
import type { ICoursePartner } from '@oe/api';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

import { addPartnerSchema } from '@oe/api';
import type { IAddPartnerSchema, IPartnerSchema } from '@oe/api';
import { toast } from '@oe/ui';
import type { FilterOption } from '@oe/ui';
import { type ColumnDef, Table, type TableRef } from '@oe/ui';
import { Badge } from '@oe/ui';
import { Button } from '@oe/ui';
import { Modal } from '@oe/ui';
import { PartnerForm } from './_components/partner-form';

// Form cho thêm partner
const defaultValues = {
  partners: [{ email: '', roles: [], enable: true }],
};

export function CourseDetailCollaboratorsPage() {
  const t = useTranslations('course');
  const tGeneral = useTranslations('general');
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const tableRef = useRef<TableRef<ICoursePartner>>(null);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<IPartnerSchema | null>(null);

  // Định nghĩa cột cho bảng
  const columns: ColumnDef<ICoursePartner>[] = useMemo(
    () => [
      // {
      //   accessorKey: "id",
      //   header: "ID",
      //   enableSorting: false,
      // },
      {
        accessorKey: 'username',
        header: t('partner.username'),
        enableSorting: false,
        size: 180,
      },
      {
        accessorKey: 'email',
        header: t('partner.email'),
        enableSorting: false,
        size: 220,
      },
      {
        accessorKey: 'roles',
        header: t('partner.roles'),
        enableSorting: false,
        cell: ({ row }) => {
          const roles = row.original.roles || [];
          return (
            <div className="flex flex-wrap gap-1">
              {roles.map(role => (
                <Badge key={role} variant="outline">
                  {role}
                </Badge>
              ))}
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: tGeneral('actions'),
        size: 250,
        // sticky: "right",
        cell: ({ row }) => {
          const partner = row.original;
          return (
            <div className="flex justify-end gap-2">
              <Button
                className="h-8 gap-2"
                onClick={() => {
                  setSelectedPartner({
                    roles: partner.roles as IPartnerSchema['roles'],
                    email: partner?.email ?? '',
                    enable: partner.enable,
                  });
                  setModalType('edit');
                }}
                disabled={partner.roles?.includes('owner')}
              >
                <Pencil className="h-4 w-4" />
                {tGeneral('edit')}
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeletePartner(partner.id)}
                className="h-8 gap-2"
                disabled={partner.roles?.includes('owner')}
              >
                <Trash2 className="h-4 w-4" />
                {tGeneral('delete')}
              </Button>
            </div>
          );
        },
      },
    ],
    [t, tGeneral]
  );

  // Filter options
  const filterOptions: FilterOption[] = useMemo(
    () => [
      {
        label: t('partner.username'),
        value: 'username',
        placeholder: t('partner.searchUsername'),
        type: 'search',
        id: 'username',
      },
      {
        label: t('partner.email'),
        value: 'email',
        placeholder: t('partner.searchEmail'),
        type: 'search',
        id: 'email',
      },
    ],
    [t]
  );

  // Handle delete partner
  const handleDeletePartner = async (partnerId: string) => {
    if (!(courseId && partnerId)) {
      return;
    }

    try {
      await deleteCoursePartnerService(undefined, {
        id: courseId,
        queryParams: { user_ids: [partnerId] },
      });

      await tableRef.current?.mutateAndClearCache?.();
      toast.success(t('partner.deleteSuccess'));
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast.error(t('partner.deleteError'));
    }
  };

  // Handle submit thêm partners
  const handleAddPartners = async (data: IAddPartnerSchema) => {
    if (!courseId) {
      return;
    }
    const payload = {
      partners: data.partners?.map(p => ({
        id: p.id,
        enable: p.enable,
        roles: p.roles,
      })),
    };

    try {
      await addCoursePartnerService(undefined, {
        id: courseId,
        payload: payload,
      });

      await tableRef.current?.mutateAndClearCache?.();
      setSelectedPartner(null);
      toast.success(t('partner.addSuccess'));
    } catch (error) {
      console.error('Error adding partners:', error);
      toast.error(t('partner.addError'));
    }
  };

  return (
    <div className="mx-auto h-full max-w-[900px] px-1 py-4">
      <div className="scrollbar flex h-full flex-col gap-4 overflow-auto bg-background p-4">
        {/* <h1 className="font-bold text-2xl">{t("partner.courseCollaborators")}</h1> */}
        <Table
          ref={tableRef}
          api={API_ENDPOINT.COURSES_ID_PARTNERS}
          apiParams={{ id: courseId }}
          columns={columns}
          hasNoColumn
          filterOptions={filterOptions}
          tableOptions={{ manualPagination: true }}
        >
          <Button
            variant="default"
            className="h-8 gap-2"
            onClick={() => {
              setModalType('add');
              setSelectedPartner(null);
            }}
          >
            <Plus className="h-4 w-4" />
            {t('partner.addPartners')}
          </Button>
        </Table>
        <Modal
          title={modalType === 'add' ? t('partner.addPartners') : t('partner.editPartners')}
          description={modalType === 'add' ? t('partner.addPartnersDescription') : t('partner.editPartnersDescription')}
          validationSchema={addPartnerSchema}
          onSubmit={handleAddPartners}
          showSubmit
          open={modalType === 'add' || modalType === 'edit'}
          defaultValues={selectedPartner ? { partners: [selectedPartner] } : defaultValues}
          onClose={() => {
            setModalType(null);
          }}
        >
          {form => <PartnerForm form={form} type={modalType} />}
        </Modal>
      </div>
    </div>
  );
}
